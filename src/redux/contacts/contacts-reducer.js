import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  fetchContacts,
  deleteContact,
  addContacts,
} from "./contacts-operations";
import { changeFilter } from "./contacts-actions";

const itemsReducer = createReducer([], {
  [fetchContacts.fulfilled]: (_, action) => action.payload,

  [addContacts.fulfilled]: (state, { payload }) => {
    return [...state, payload];
  },

  [deleteContact.fulfilled]: (state, { payload }) => {
    const val = state.filter((item) => item.id !== payload);
    console.log("Payload: ", payload);
    return val;
    // return state.filter((item) => item.id !== payload);
  },
});

const filterReducer = createReducer("", {
  [changeFilter]: (_, { payload }) => payload,
});

const loadingReducer = createReducer(false, {
  [addContacts.pending]: () => true,
  [addContacts.fulfilled]: () => false,
  [addContacts.rejected]: () => false,
  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
});

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  loading: loadingReducer,
});
