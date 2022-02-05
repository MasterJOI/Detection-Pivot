import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { threatsListPageService } from '@screens/ThreatsList/services/threatsList';
import {
  addThreatToSessionRoutine,
  deleteThreatRoutine,
  fetchThreatsRoutine,
  removeThreatFromSessionRoutine
} from '@screens/ThreatsList/routines';

function* fetchThreats(action) {
  try {
    let response = null;
    const sessionId = localStorage.getItem('CURRENT_SESSION_ID');
    if (sessionId) {
      response = yield call(threatsListPageService.getThreats,
        { endpoint: sessionId, payload: action.payload });
    } else {
      response = yield call(threatsListPageService.getThreats,
        { endpoint: 'all', payload: action.payload });
    }
    console.log(response);
    yield put(fetchThreatsRoutine.success(response));
  } catch (error) {
    yield put(fetchThreatsRoutine.failure(error?.message));
    toastr.error('Error', 'Loading threats failed!');
  }
}

function* addThreatToSession(action) {
  try {
    const response = yield call(threatsListPageService.addThreatToSession,
      { endpoint: 'add-threat', payload: action.payload });
    yield put(addThreatToSessionRoutine.success(response));
    toastr.success('Success', 'Threat added to current session!');
  } catch (error) {
    yield put(addThreatToSessionRoutine.failure(error?.message));
    toastr.error('Error', 'Failed to add threat to current session!');
  }
}

function* removeThreatFromSession(action) {
  try {
    const response = yield call(threatsListPageService.removeThreatFromSession,
      { endpoint: 'remove-threat', payload: action.payload });
    yield put(removeThreatFromSessionRoutine.success(response));
    toastr.success('Success', 'Threat removed from current session!');
  } catch (error) {
    yield put(addThreatToSessionRoutine.failure(error?.message));
    toastr.error('Error', 'Failed to remove threat from current session!');
  }
}

function* deleteThreat(action) {
  try {
    const response = yield call(threatsListPageService.deleteThreat,
      { endpoint: action.payload.threatId });
    yield put(deleteThreatRoutine.success(response));
    toastr.success('Success', 'Threat deleted');
  } catch (error) {
    yield put(deleteThreatRoutine.failure(error?.message));
    toastr.error('Error', 'Deleting threat failed');
  }
}

function* watchFetchThreatsRequest() {
  yield takeEvery(fetchThreatsRoutine.TRIGGER, fetchThreats);
}

function* watchDeleteThreatRequest() {
  yield takeEvery(deleteThreatRoutine.TRIGGER, deleteThreat);
}

function* watchAddThreatToSessionRequest() {
  yield takeEvery(addThreatToSessionRoutine.TRIGGER, addThreatToSession);
}

function* watchRemoveThreatFromSessionRequest() {
  yield takeEvery(removeThreatFromSessionRoutine.TRIGGER, removeThreatFromSession);
}

export default function* threatsListSagas() {
  yield all([
    watchFetchThreatsRequest(),
    watchDeleteThreatRequest(),
    watchAddThreatToSessionRequest(),
    watchRemoveThreatFromSessionRequest()
  ]);
}
