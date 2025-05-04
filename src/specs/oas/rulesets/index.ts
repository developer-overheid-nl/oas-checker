import { Rulesets } from '../../../spectral';
import featuresCore, { OGC_API_FEATURES_CORE_URI } from './features-core';
import featuresOas30, { OGC_API_FEATURES_OAS3_URI } from './features-oas30';

const rulesets: Rulesets = {
  // Features - Part 1
  [OGC_API_FEATURES_CORE_URI]: featuresCore,
  [OGC_API_FEATURES_OAS3_URI]: featuresOas30,
};

export default rulesets;
