import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { isEmptyArray } from 'formik';
import { IThreatCard } from '@screens/ThreatsList/models/IThreatCard';
import {
  addThreatToSessionRoutine,
  deleteThreatRoutine,
  fetchThreatsRoutine, removeThreatFromSessionRoutine,
  setLoadMoreThreatsRoutine
} from '@screens/ThreatsList/routines';

export interface IThreatsListPageReducerState {
  threats: IThreatCard[];
  hasMore: boolean;
  loadMore: boolean;
}

const initialState: IThreatsListPageReducerState = {
  threats: [],
  hasMore: true,
  loadMore: false
};

export const threatsListPageReducer = createReducer(initialState, {
  [fetchThreatsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IThreatCard[]>) => {
    if (!state.loadMore) {
      state.threats = payload;
    } else {
      state.threats = state.threats.concat(payload);
    }
    state.hasMore = !isEmptyArray(payload);
  },
  [setLoadMoreThreatsRoutine.TRIGGER]: (state, { payload }: PayloadAction<boolean>) => {
    state.loadMore = payload;
  },
  [addThreatToSessionRoutine.SUCCESS]: (state, action) => {
    if (state.threats) {
      state.threats.find(t => t.id === action.payload).active = true;
    }
  },
  [removeThreatFromSessionRoutine.SUCCESS]: (state, action) => {
    if (state.threats) {
      state.threats.find(t => t.id === action.payload).active = false;
    }
  },
  [deleteThreatRoutine.SUCCESS]: (state, action) => {
    if (state.threats) {
      state.threats = state.threats.filter(t => t.id !== action.payload);
    }
  }
});
