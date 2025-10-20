import { Rulesets } from '@geonovum/standards-checker';
import adrCore, { ADR_URI } from './adr-21';

const rulesets: Rulesets = {
  [ADR_URI]: adrCore
};

export default rulesets;
