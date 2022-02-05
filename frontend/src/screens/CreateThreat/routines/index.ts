/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createCreateThreatRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`CREATE_THREAT:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const sendThreatFormRoutine = createCreateThreatRoutine('SEND_FORM');
