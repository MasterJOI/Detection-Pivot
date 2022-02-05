import { all } from 'redux-saga/effects';
import sessionPageSagas from '@screens/SessionPage/containers/sagas';

export default function* sessionSagas() {
  yield all([
    sessionPageSagas()
  ]);
}
