import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  deleteSessionRoutine,
  fetchSessionsRoutine
} from '@screens/SessionsList/routines';
import { toastr } from 'react-redux-toastr';
import { sessionsListPageService } from '@screens/SessionsList/services/sessionsList';
import {closeSessionRoutine } from '@screens/SessionPage/routines';

function* fetchSessions(action) {
  try {
    const response = yield call(sessionsListPageService.getSessions,
      { endpoint: 'all', payload: action.payload });
    yield put(fetchSessionsRoutine.success(response));
  } catch (error) {
    yield put(fetchSessionsRoutine.failure(error?.message));
    toastr.error('Error', 'Loading sessions failed!');
  }
}

function* deleteSession(action) {
  try {
    const response = yield call(sessionsListPageService.deleteSession,
      { endpoint: action.payload.sessionId });
    if (localStorage.getItem('CURRENT_SESSION_ID') === action.payload.sessionId) {
      localStorage.removeItem('CURRENT_SESSION_ID');
      yield put(closeSessionRoutine.success());
    }
    yield put(deleteSessionRoutine.success(response));
    toastr.success('Success', 'Session deleted');
  } catch (error) {
    yield put(deleteSessionRoutine.failure(error?.message));
    toastr.error('Error', 'Deleting failed');
  }
}

function* watchFetchSessionsRequest() {
  yield takeEvery(fetchSessionsRoutine.TRIGGER, fetchSessions);
}

function* watchDeleteSessionRequest() {
  yield takeEvery(deleteSessionRoutine.TRIGGER, deleteSession);
}

export default function* sessionsListSagas() {
  yield all([
    watchFetchSessionsRequest(),
    watchDeleteSessionRequest()
  ]);
}
