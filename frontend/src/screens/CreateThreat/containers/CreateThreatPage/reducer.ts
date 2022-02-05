import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { sendThreatFormRoutine } from '@screens/CreateThreat/routines';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreateThreatReducerState {
}

const initialState: ICreateThreatReducerState = {
};

export const createThreatReducer = createReducer(initialState, {
});
