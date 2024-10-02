import { createReducer } from "@reduxjs/toolkit";

export const Reducer = createReducer({}, (builder) => {
  builder
    .addCase('DATA_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('DATA_SUCCESS', (state, action) => {
      state.loading = false;
      state.ticket = action.payload.tickets;
      state.user = action.payload.users;
    })
    .addCase('DATA_FAILURE', (state) => {
      state.loading = false;
      state.ticket = [];
      state.user = [];
    });
});

export const DataReducer = createReducer({}, (builder) => {
  builder
    .addCase('SELECT_DATA_REQUEST', (state) => {
      state.loading = true;
      state.selectData = [];
    })
    .addCase('SELECT_DATA_SUCCESS', (state, action) => {
      state.loading = false;
      state.selectData = action.payload.selectData;
      state.user = action.payload.user;
    })
    .addCase('SELECT_DATA_FAILURE', (state, action) => {
      state.loading = false;
      state.selectData = [];
      state.message = action.payload.message;
    });
});
