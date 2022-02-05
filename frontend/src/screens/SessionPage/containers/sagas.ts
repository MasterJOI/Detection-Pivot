import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  toggleSnifferStateRoutine,
  sendSessionFormRoutine,
  fetchInterfacesRoutine,
  loadCurrentSessionRoutine,
  closeSessionRoutine
} from '../routines';
import sessionPageService from '@screens/SessionPage/services/sessionPage.service';
import { toastr } from 'react-redux-toastr';

function* toggleSnifferState(action) {
  try {
    const response = yield call(sessionPageService.sendIsSnifferOn,
      { endpoint: 'toggle-state', payload: action.payload });
    yield put(toggleSnifferStateRoutine.success(response));
    if (response === true) {
      toastr.success('Success', 'Sniffer launched!');
    } else {
      toastr.success('Success', 'Sniffer stopped!');
    }
  } catch (error) {
    yield put(toggleSnifferStateRoutine.failure(error?.message));
    toastr.error('Error', 'Failed to connect to sniffer!');
  }
}

function* sendSessionForm(action) {
  try {
    const response = yield call(sessionPageService.sendSessionForm,
      { endpoint: 'create', payload: action.payload });
    localStorage.setItem('CURRENT_SESSION_ID', response.id);
    yield put(sendSessionFormRoutine.success(response));
    toastr.success('Success', 'Session created!');
  } catch (error) {
    yield put(sendSessionFormRoutine.failure(error?.message));
    toastr.error('Error', 'Failed to create session!');
  }
}

function* fetchInterfaces() {
  try {
    const interfaces = yield call(sessionPageService.getInterfaces,
      { endpoint: 'all' });
    yield put(fetchInterfacesRoutine.success(interfaces));
  } catch (error) {
    yield put(fetchInterfacesRoutine.failure(error?.message));
    toastr.error('Error', 'Failed to load interfaces!');
  }
}

function* loadCurrentSession() {
  const sessionId = localStorage.getItem('CURRENT_SESSION_ID'); // сделать получение id из компонента
  try {
    const currentSession = yield call(sessionPageService.getCurrentSession,
      { endpoint: sessionId });
    yield put(loadCurrentSessionRoutine.success(currentSession));
    toastr.success('Success', 'Session loaded!');
  } catch (error) {
    yield put(loadCurrentSessionRoutine.failure(error?.message));
    toastr.error('Error', 'Failed to load current session!');
  }
}

function* closeSession(action) {
  try {
    const response = yield call(sessionPageService.closeSession,
      { endpoint: action.payload.sessionId });
    localStorage.removeItem('CURRENT_SESSION_ID');
    yield put(closeSessionRoutine.success());
    toastr.success('Success', 'Session closed!');
  } catch (error) {
    yield put(closeSessionRoutine.failure(error?.message));
    toastr.error('Error', 'Failed to close session!');
  }
}

function* watchToggleSnifferStateRequest() {
  yield takeEvery(toggleSnifferStateRoutine.TRIGGER, toggleSnifferState);
}

function* watchSendSessionFormRequest() {
  yield takeEvery(sendSessionFormRoutine.TRIGGER, sendSessionForm);
}

function* watchFetchInterfacesRequest() {
  yield takeEvery(fetchInterfacesRoutine.TRIGGER, fetchInterfaces);
}

function* watchLoadCurrentSessionRequest() {
  yield takeEvery(loadCurrentSessionRoutine.TRIGGER, loadCurrentSession);
}

function* watchCloseSessionRequest() {
  yield takeEvery(closeSessionRoutine.TRIGGER, closeSession);
}

export default function* sessionPageSagas() {
  yield all([
    watchToggleSnifferStateRequest(),
    watchSendSessionFormRequest(),
    watchFetchInterfacesRequest(),
    watchLoadCurrentSessionRequest(),
    watchCloseSessionRequest()
  ]);
}
