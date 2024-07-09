import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CRUDSlice from "./slices/customersCRUD.slice.jsx";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

// debugger;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  crud: CRUDSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(store);
