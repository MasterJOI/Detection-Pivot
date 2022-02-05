import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { headerReducer } from '@screens/Header/containers/HeaderPage/reducer';
import { handleToggleSidebarRoutine } from '@screens/Header/routines';
import { reducerCreator } from '@helpers/reducer.helper';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  handleToggleSidebarRequest: reducerCreator([handleToggleSidebarRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: headerReducer
});

const reqs = (state: RootState) => state.headerReducer.requests;
const data = (state: RootState) => state.headerReducer.data;

export const extractData = state => data(state);
