import type { RulesetDefinition } from '@stoplight/spectral-core';
import specs from './specs';
import { RulesetPlugin, RulesetPluginIndex } from '@geonovum/standards-checker';
import adr20Rulesets from './specs/adr-20/rulesets';
import adr21Rulesets from './specs/adr-21/rulesets';
import oasRuleSets from './specs/oas/rulesets';

/**
 * Minimal metadata needed to construct a CLI-ready ruleset plugin.
 * Consumers add a new entry here and let the helper produce the final structure.
 */
interface PluginConfig {
  slug: string;
  rulesets: Record<string, RulesetDefinition>;
  version?: string;
  description?: string;
  targets?: string[];
}

const specsBySlug = new Map(specs.map(spec => [spec.slug, spec]));

interface RulesetSource {
  slug: string;
  rulesets: Record<string, RulesetDefinition>;
}

const collectRulesetGroups = (...sources: RulesetSource[]) => {
  const groups = new Map<string, Record<string, RulesetDefinition>>();

  sources.forEach(({ slug, rulesets }) => {
    if (!specsBySlug.has(slug)) {
      return;
    }

    const existing = groups.get(slug) ?? {};
    groups.set(slug, { ...existing, ...rulesets });
  });

  return groups;
};

const buildPlugin = ({ slug, rulesets }: PluginConfig): RulesetPlugin => {
  return {
    id: slug,
    rulesets,
  };
};

const rulesetGroups = collectRulesetGroups(
  { slug: 'adr-20', rulesets: adr20Rulesets },
  { slug: 'adr-21', rulesets: adr21Rulesets },
  { slug: 'adr', rulesets: oasRuleSets }
);

const plugins = Array.from(rulesetGroups.entries()).reduce<RulesetPluginIndex>((acc, [slug, rulesets]) => {
  acc[slug] = buildPlugin({ slug, rulesets });
  return acc;
}, {});

export type { PluginConfig };
export default plugins;
