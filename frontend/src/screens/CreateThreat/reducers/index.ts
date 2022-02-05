import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { createThreatReducer } from '@screens/CreateThreat/containers/CreateThreatPage/reducer';
import { reducerCreator } from '@helpers/reducer.helper';
import { sendThreatFormRoutine } from '@screens/CreateThreat/routines';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  sendThreatFormRequest: reducerCreator([sendThreatFormRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: createThreatReducer
});

const reqs = (state: RootState) => state.createThreatReducer.requests;
const data = (state: RootState) => state.createThreatReducer.data;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractSendThreatFormLoading = state => reqs(state).sendThreatFormRequest.loading;

export const extractData = state => data(state);
