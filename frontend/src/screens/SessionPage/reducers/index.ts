import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { sessionPageReducer } from '@screens/SessionPage/containers/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  fetchInterfacesRoutine,
  toggleSnifferStateRoutine,
  sendSessionFormRoutine,
  loadCurrentSessionRoutine
} from '@screens/SessionPage/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  toggleSnifferStateRequest: reducerCreator([toggleSnifferStateRoutine.TRIGGER, toggleSnifferStateRoutine.SUCCESS]),
  fetchInterfacesRequest: reducerCreator([fetchInterfacesRoutine.TRIGGER, fetchInterfacesRoutine.SUCCESS]),
  sendSessionFormRequest: reducerCreator([sendSessionFormRoutine.TRIGGER, sendSessionFormRoutine.SUCCESS]),
  loadCurrentSessionRequest: reducerCreator([loadCurrentSessionRoutine.TRIGGER, loadCurrentSessionRoutine.SUCCESS])
});

export default combineReducers({
  requests,
  data: sessionPageReducer
});

const reqs = (state: RootState) => state.sessionPageReducer.requests;
const data = (state: RootState) => state.sessionPageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractToggleSnifferStateLoading = state => reqs(state).toggleSnifferStateRequest.loading;
export const extractToggleSnifferStateError = state => reqs(state).toggleSnifferStateRequest.error;
export const extractFetchInterfacesLoading = state => reqs(state).fetchInterfacesRequest.loading;
export const extractFetchInterfacesError = state => reqs(state).fetchInterfacesRequest.error;

export const extractData = state => data(state);
