/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createThreatsListPageRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`THREATS_LIST:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchThreatsRoutine = createThreatsListPageRoutine('FETCH_THREATS');

export const setLoadMoreThreatsRoutine = createThreatsListPageRoutine('SET_LOAD_MORE_THREATS');

export const deleteThreatRoutine = createThreatsListPageRoutine('DELETE_THREAT');

export const addThreatToSessionRoutine = createThreatsListPageRoutine('ADD_THREAT');

export const removeThreatFromSessionRoutine = createThreatsListPageRoutine('REMOVE_THREAT');
