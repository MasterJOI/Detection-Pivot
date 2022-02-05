import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { threatsListPageReducer } from '@screens/ThreatsList/containers/ThreatsListPage/reducer';
import {
  deleteThreatRoutine,
  fetchThreatsRoutine,
  setLoadMoreThreatsRoutine
} from '@screens/ThreatsList/routines';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchThreatsRequest: reducerCreator([fetchThreatsRoutine.TRIGGER]),
  deleteThreatRequest: reducerCreator([deleteThreatRoutine.TRIGGER]),
  setLoadMoreThreatsRequest: reducerCreator([setLoadMoreThreatsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: threatsListPageReducer
});

const reqs = (state: RootState) => state.threatsListPageReducer.requests;
const data = (state: RootState) => state.threatsListPageReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchThreatsLoading = state => reqs(state).fetchThreatsRequest.loading;
