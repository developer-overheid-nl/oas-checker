import { SpecResponseMapper, APPLICATION_OPENAPI_JSON_3_0_TYPE, handleResponse, SpecLinter, APPLICATION_JSON_TYPE, handleResponseJson, spectralLinter, Spec } from '@geonovum/standards-checker';
import example from './example.json';
import rulesets from './rulesets';
import { RulesetDefinition } from '@stoplight/spectral-core';

const responseMapper: SpecResponseMapper = async responseText => {
  let document;

  try {
    document = JSON.parse(responseText);
  } catch {
    return Promise.resolve({ content: responseText });
  }

  const links = document.links;

  if (Array.isArray(links)) {
    const serviceDescLink = links.find(
      link => link.rel === 'service-desc' && link.type === APPLICATION_OPENAPI_JSON_3_0_TYPE
    );

    const conformanceLink = links.find(link => link.rel === 'conformance');

    if (serviceDescLink) {
      const content = await fetch(serviceDescLink.href, {
        headers: { Accept: serviceDescLink.type },
      }).then(response => handleResponse(response, serviceDescLink.href));

      const linters: SpecLinter[] = [];

      if (conformanceLink) {
        const conformance = await fetch(conformanceLink.href, {
          headers: { Accept: APPLICATION_JSON_TYPE },
        }).then(response => handleResponseJson(response, conformanceLink.href));

        const conformsTo = conformance.conformsTo;

        if (Array.isArray(conformsTo)) {
          conformsTo.forEach(reqClass => {
            if (typeof reqClass === 'string' && rulesets[reqClass]) {
              linters.push({
                name: reqClass,
                linter: spectralLinter(reqClass, rulesets[reqClass]),
              });
            }
          });
        }
      }

      return { content, linters };
    }
  }

  return Promise.resolve({ content: responseText });
};

const linterName = (confClass: string) => confClass.replace('http://www.opengis.net/spec/', '');

const spec: Spec = {
  name: 'ADR 2.1',
  slug: 'adr-21',
  example: JSON.stringify(example, undefined, 2),
  linters: Object.entries(rulesets).map(entry => ({
    name: linterName(entry[0]),
    linter: spectralLinter(linterName(entry[0]), entry[1] as RulesetDefinition),
  })),
  responseMapper,
};

export default spec;
