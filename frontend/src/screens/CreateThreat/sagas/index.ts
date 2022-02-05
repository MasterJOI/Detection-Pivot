import { all } from 'redux-saga/effects';
import createThreatPageSagas from '@screens/CreateThreat/containers/CreateThreatPage/sagas';

export default function* createThreatSagas() {
  yield all([
    createThreatPageSagas()
  ]);
}
