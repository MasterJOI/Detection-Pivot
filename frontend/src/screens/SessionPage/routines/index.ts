/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createSessionPageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`SESSION_PAGE:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const toggleSnifferStateRoutine = createSessionPageRoutine('TOGGLE_SNIFFER_STATE');
export const sendSessionFormRoutine = createSessionPageRoutine('SEND_SESSION_FORM');
export const fetchInterfacesRoutine = createSessionPageRoutine('FETCH_INTERFACES');
export const loadCurrentSessionRoutine = createSessionPageRoutine('LOAD_CURRENT_SESSION');
export const closeSessionRoutine = createSessionPageRoutine('CHANGE_SESSION_STATE');
