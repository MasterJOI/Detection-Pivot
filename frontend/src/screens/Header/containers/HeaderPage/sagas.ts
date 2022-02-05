import { all, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { handleToggleSidebarRoutine } from '@screens/Header/routines';

function* handleToggleSidebar(action) {
  try {
    yield put(handleToggleSidebarRoutine.success(action.payload));
    toastr.success('Success', 'Sidebar toggled!');
  } catch (error) {
    yield put(handleToggleSidebarRoutine.failure(error?.message));
    toastr.error('Error', 'Toggle sidebar failed!');
  }
}

function* watchHandleToggleSidebarRequest() {
  yield takeEvery(handleToggleSidebarRoutine.TRIGGER, handleToggleSidebar);
}

export default function* headerPageSagas() {
  yield all([
    watchHandleToggleSidebarRequest()
  ]);
}
