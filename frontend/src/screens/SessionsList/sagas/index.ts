import { all } from 'redux-saga/effects';
import sessionsListSagas from '@screens/SessionsList/containers/SessionsListPage/sagas';

export default function* sessionsListPageSagas() {
  yield all([
    sessionsListSagas()
  ]);
}
