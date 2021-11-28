import { createRealm } from 'use-realm';

export const CRED_WIZARD_STEP = createRealm<string[]>(['default']);
export const CREATE_WIZARD_DATA = createRealm<Record<string, unknown>>({});
