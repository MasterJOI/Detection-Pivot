/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createSessionsListPageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`SESSIONS_LIST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchSessionsRoutine = createSessionsListPageRoutine('FETCH_SESSIONS');

export const setLoadMoreSessionsRoutine = createSessionsListPageRoutine('SET_LOAD_MORE_SESSIONS');

export const deleteSessionRoutine = createSessionsListPageRoutine('DELETE_SESSION');
