import { createReducer } from '@reduxjs/toolkit';
import { handleToggleSidebarRoutine } from '@screens/Header/routines';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IHeaderReducerState {
  isSidebarToggled: boolean;
}

const initialState: IHeaderReducerState = {
  isSidebarToggled: false
};

export const headerReducer = createReducer(initialState, {
  [handleToggleSidebarRoutine.SUCCESS]: (state, action) => {
    state.isSidebarToggled = action.payload;
  }
});
