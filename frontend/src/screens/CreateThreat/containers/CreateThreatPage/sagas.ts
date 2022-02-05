import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { sendThreatFormRoutine } from '@screens/CreateThreat/routines';
import createThreatPageService from '@screens/CreateThreat/services/createThreatPage.service';

function* sendThreatForm(action) {
  try {
    const response = yield call(createThreatPageService.sendThreatForm,
      { endpoint: 'create', payload: action.payload });
    yield put(sendThreatFormRoutine.success(response));
    toastr.success('Success', 'Threat created!');
  } catch (error) {
    yield put(sendThreatFormRoutine.failure(error?.message));
    toastr.error('Error', 'Failed to create threat!');
  }
}

function* watchSendThreatFormRequest() {
  yield takeEvery(sendThreatFormRoutine.TRIGGER, sendThreatForm);
}

export default function* createThreatPageSagas() {
  yield all([
    watchSendThreatFormRequest()
  ]);
}
