import type { RulesetDefinition } from '@stoplight/spectral-core';
import { oas3_0 } from '@stoplight/spectral-formats';
import { pattern, or, schema, casing } from '@stoplight/spectral-functions';

export const ADR_URI = 'https://logius-standaarden.github.io/API-Design-Rules';

const adrCore: RulesetDefinition = {
  documentationUrl: 'https://logius-standaarden.github.io/API-Design-Rules',
  description: 'NLGov REST API Design Rules',
  formats: [oas3_0],
  rules: {
    'missing-version-header': {
      severity: "error",
      given: "$..[responses][?(@property && @property.match(/(2|3)\\d\\d/))][headers]",
      then: {
        function: or,
        functionOptions: {
          properties: [
            "API-Version",
            "Api-Version",
            "Api-version",
            "api-version",
            "API-version"
          ]
        }
      },
      message: "/core/version-header: Return the full version number in a response header: https://logius-standaarden.github.io/API-Design-Rules/#/core/version-header"
    },
    "include-major-version-in-uri": {
      severity: "error",
      given: [
        "$.servers[*]"
      ],
      then: {
        function: pattern,
        functionOptions: {
          match: "\\/v[\\d+]"
        },
        field: "url"
      },
      message: "/core/uri-version: Include the major version number in the URI: https://logius-standaarden.github.io/API-Design-Rules/#/core/uri-version"
    },
    "paths-no-trailing-slash": {
      severity: "error",
      given: [
        "$.paths"
      ],
      then: {
        function: pattern,
        functionOptions: {
          notMatch: ".+\\/$"
        },
        field: "@key"
      },
      message: "/core/no-trailing-slash: Leave off trailing slashes from URIs: https://logius-standaarden.github.io/API-Design-Rules/#/core/no-trailing-slash"
    },
    "info-contact-fields-exist": {
      severity: "error",
      given: [
        "$.info.contact"
      ],
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: [
              "email",
              "name",
              "url"
            ]
          }
        }
      },
      message: "Missing fields in `info.contact` field. Must specify email, name and url."
    },
    "http-methods": {
      severity: "error",
      given: [
        "$.paths[?(@property && @property.match(/(description|summary)/i))]"
      ],
      then: {
        function: pattern,
        functionOptions: {
          match: "post|put|get|delete|patch|parameters"
        },
        field: "@key"
      },
      message: "/core/http-methods: Only apply standard HTTP methods: https://logius-standaarden.github.io/API-Design-Rules/#http-methods"
    },
    "paths-kebab-case": {
      severity: "warn",
      message: "{{property}} is not kebab-case.",
      given: "$.paths[?(@property && !@property.match(/\\/openapi\\.json/))]~",
      then: {
        function: pattern,
        functionOptions: {
          match: "^(\\/|(\\/_[a-z]+|\\/(([a-z\\-]+|{[a-z]+})(\\/([a-z\\-\\.]+|{[a-z]+}))*)(\\/_[a-z]+)?)\\/?)$"
        }
      }
    },
    "schema-camel-case": {
      severity: "warn",
      message: "Schema name should be CamelCase in {{path}}",
      given: "$.components.schemas[*]~",
      then: {
        function: casing,
        functionOptions: {
          type: "pascal",
          separator: {
            char: ""
          }
        }
      }
    },
    "servers-use-https": {
      severity: "warn",
      message: "Server URL {{value}} {{error}}.",
      given: [
        "$.servers[*]",
      ],
      then: {
        field: "url",
        function: pattern,
        functionOptions: {
          match: "^https://.*"
        }
      }
    },
    "use-problem-schema": {
      severity: "warn",
      message: "The content type of an error response should be application/problem+json or application/problem+xml to match RFC 9457.",
      given: "$..[responses][?(@property && @property.match(/(4|5)\\d\\d/))].content",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            anyOf: [
              {
                required: [
                  "application/problem+json"
                ]
              },
              {
                required: [
                  "application/problem+xml"
                ]
              }
            ]
          }
        }
      }
    },
    "property-casing": {
      severity: "warn",
      message: "Properties should be lowerCamelCase in {{path}}",
      given: "$..properties",
      then: {
        function: casing,
        functionOptions: {
          type: "camel",
        },
        field: "@key"
      }
    },
  },
};

export default adrCore;



