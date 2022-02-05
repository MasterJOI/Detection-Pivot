import { createReducer } from '@reduxjs/toolkit';
import { fetchPopularTagsRoutine } from '@screens/Sidebar/routines';

export interface ISidebarReducerState {
  isTagsLoaded: boolean;
}

const initialState: ISidebarReducerState = {
  isTagsLoaded: true
};

export const sidebarReducer = createReducer(initialState, {
  [fetchPopularTagsRoutine.TRIGGER]: state => {
    state.isTagsLoaded = false;
  },
  [fetchPopularTagsRoutine.SUCCESS]: (state, action) => {
    state.isTagsLoaded = true;
  },
  [fetchPopularTagsRoutine.FAILURE]: state => {
    state.isTagsLoaded = true;
  }
});
