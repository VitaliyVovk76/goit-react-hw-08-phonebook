import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./contacts/contacts-reducer";
import authReducer from "./auth/auth-slice";

//tomorrow
// const rootReducer = combineReducers({
//   contacts: contactsReducer,
// });

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], //мы хотим сохранить только свойство "token" (1:19:14) из обьекта auth
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    logger,
  ],
  devTools: process.env.NODE_ENV === "development",
});

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => [
//     ...getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//     logger,
//   ],
//   devTools: process.env.NODE_ENV === "development",
// });

export const persistor = persistStore(store);

// export default { store, persistor };

// export { store };
