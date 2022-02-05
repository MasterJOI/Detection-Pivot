import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { isEmptyArray } from 'formik';
import {
  deleteSessionRoutine,
  fetchSessionsRoutine,
  setLoadMoreSessionsRoutine
} from '@screens/SessionsList/routines';
import { ISessionCard } from '@screens/SessionsList/models/ISessionCard';

export interface ISessionsListPageReducerState {
  sessions: ISessionCard[];
  hasMore: boolean;
  loadMore: boolean;
}

const initialState: ISessionsListPageReducerState = {
  sessions: [],
  hasMore: true,
  loadMore: false
};

export const sessionsListPageReducer = createReducer(initialState, {
  [fetchSessionsRoutine.SUCCESS]: (state, { payload }: PayloadAction<ISessionCard[]>) => {
    if (!state.loadMore) {
      state.sessions = payload;
    } else {
      state.sessions = state.sessions.concat(payload);
    }
    state.hasMore = !isEmptyArray(payload);
  },
  [setLoadMoreSessionsRoutine.TRIGGER]: (state, { payload }: PayloadAction<boolean>) => {
    state.loadMore = payload;
  },
  [deleteSessionRoutine.SUCCESS]: (state, action) => {
    if (state.sessions) {
      state.sessions = state.sessions.filter(s => s.id !== action.payload);
    }
  }
});
