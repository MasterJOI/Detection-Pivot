/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createHeaderRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`HEADER:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const handleToggleSidebarRoutine = createHeaderRoutine('TOGGLE_SIDEBAR');
