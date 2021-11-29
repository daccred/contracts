/* Extend the realm for only managing wizard pages */
import { createRealm } from 'use-realm';

export const CRED_WIZARD_STEP = createRealm<string[]>(['protocol']);
