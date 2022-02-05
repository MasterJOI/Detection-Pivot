import { createReducer } from '@reduxjs/toolkit';
import {
  toggleSnifferStateRoutine,
  sendSessionFormRoutine,
  fetchInterfacesRoutine, loadCurrentSessionRoutine, closeSessionRoutine
} from '@screens/SessionPage/routines';
import { ISession } from '@screens/SessionPage/models/ISession';
import { IInterface } from '@screens/SessionPage/models/IInterface';

export interface ISessionPageReducerState {
  isSessionPresent: boolean;
  isInterfacesLoading: boolean;
  session: ISession;
  interfaces: IInterface[];
}

const initialState: ISessionPageReducerState = {
  isSessionPresent: false,
  isInterfacesLoading: false,
  session: {
    id: '',
    interfaceName: '',
    interfaceDescription: '',
    snifferOn: false,
    createdAt: '',
    state: '',
    packets: []
  },
  interfaces: []
};

export const sessionPageReducer = createReducer(initialState, {
  [toggleSnifferStateRoutine.SUCCESS]: (state, action) => {
    state.session.snifferOn = action.payload;
  },
  [sendSessionFormRoutine.SUCCESS]: (state, action) => {
    state.isSessionPresent = true;
    state.session = action.payload;
  },
  [fetchInterfacesRoutine.TRIGGER]: state => {
    state.isInterfacesLoading = true;
  },
  [fetchInterfacesRoutine.SUCCESS]: (state, action) => {
    state.interfaces = action.payload;
    state.isInterfacesLoading = false;
  },
  [fetchInterfacesRoutine.FAILURE]: state => {
    state.isInterfacesLoading = false;
  },
  [loadCurrentSessionRoutine.SUCCESS]: (state, action) => {
    state.isSessionPresent = true;
    state.session = action.payload;
  },
  [closeSessionRoutine.SUCCESS]: state => {
    state.session = initialState.session;
    state.isSessionPresent = false;
  }
});
