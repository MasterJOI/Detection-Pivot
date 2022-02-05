import { all } from 'redux-saga/effects';
import threatsListSagas from '@screens/ThreatsList/containers/ThreatsListPage/sagas';

export default function* threatsListPageSagas() {
  yield all([
    threatsListSagas()
  ]);
}
