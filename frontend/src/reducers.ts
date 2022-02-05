import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import sessionPageReducer from '@screens/SessionPage/reducers';
import headerReducer from '@screens/Header/reducers';
import sidebarReducer from '@screens/Sidebar/reducers';
import sessionsListPageReducer from '@screens/SessionsList/reducers';
import threatsListPageReducer from '@screens/ThreatsList/reducers';
import createThreatReducer from '@screens/CreateThreat/reducers';

export default combineReducers({
  toastr,
  /* PlopJS reducer placeholder. Do not remove */
  sessionPageReducer,
  headerReducer,
  sidebarReducer,
  sessionsListPageReducer,
  threatsListPageReducer,
  createThreatReducer
});
