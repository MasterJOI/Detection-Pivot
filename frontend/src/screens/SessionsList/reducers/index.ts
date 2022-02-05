import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { sessionsListPageReducer } from '@screens/SessionsList/containers/SessionsListPage/reducer';
import {
  fetchSessionsRoutine,
  deleteSessionRoutine,
  setLoadMoreSessionsRoutine
} from '@screens/SessionsList/routines';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchSessionsRequest: reducerCreator([fetchSessionsRoutine.TRIGGER]),
  deleteSessionRequest: reducerCreator([deleteSessionRoutine.TRIGGER]),
  setLoadMoreSessionsRequest: reducerCreator([setLoadMoreSessionsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: sessionsListPageReducer
});

const reqs = (state: RootState) => state.sessionsListPageReducer.requests;
const data = (state: RootState) => state.sessionsListPageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchSessionsLoading = state => reqs(state).fetchSessionsRequest.loading;
