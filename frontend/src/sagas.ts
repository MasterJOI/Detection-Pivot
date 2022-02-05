import { all } from 'redux-saga/effects';
/* PlopJS import placeholder. Do not remove */
import sessionPageSagas from '@screens/SessionPage/sagas';
import sessionsListPageSagas from '@screens/SessionsList/sagas';
import threatsListPageSagas from '@screens/ThreatsList/sagas';
import createThreatSagas from '@screens/CreateThreat/sagas';
import headerSagas from '@screens/Header/sagas';

export default function* rootSaga() {
  yield all([
    /* PlopJS sagas placeholder. Do not remove */
    sessionPageSagas(),
    sessionsListPageSagas(),
    threatsListPageSagas(),
    headerSagas(),
    createThreatSagas()
  ]);
}
