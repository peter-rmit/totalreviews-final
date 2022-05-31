import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest, select } from "redux-saga/effects";
import { getUserByToken, getAdminByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
  setClients: "[Set Clients] Action",
  setAdmin: "[Set Admin] Action",
  setPages: "[Set Pages] Action",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  clients: undefined,
  isAdmin: undefined,
  pages: undefined,
};

export const reducer = persistReducer(
  { storage, key: "v713-demo1-auth", whitelist: ["user", "authToken", "clients", "isAdmin", "pages"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken, isAdmin } = action.payload;

        return { authToken, user: undefined, isAdmin };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined, isAdmin: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }
      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }
      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }
      case actionTypes.setClients: {
        const { clients } = action.payload;
        return { ...state, clients };
      }
      case actionTypes.setAdmin: {
        const { isAdmin } = action.payload;
        return { ...state, isAdmin };
      }
      case actionTypes.setPages: {
        console.log(action.payload);
        const { pages } = action.payload;
        console.log('inCase:', pages)
        return { ...state, pages };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken, isAdmin) => ({ type: actionTypes.Login, payload: { authToken, isAdmin } }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
  setClient: (clients) => ({ type: actionTypes.setClients, payload: { clients } }),
  setAdmin: (isAdmin) => ({ type: actionTypes.setAdmin, payload: { isAdmin } }),
  setPage: (pages) => ({ type: actionTypes.setPages, payload: { pages } }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { auth: { authToken, isAdmin } } = yield select();
    if (isAdmin === false) {
      const { data: { data: { user } } } = yield getUserByToken(authToken);
      yield put(actions.fulfillUser(user));
    }
    else if (isAdmin === true) {
      const { data: { data: { user } } } = yield getAdminByToken(authToken);
      yield put(actions.fulfillUser(user));
    }
  });

  // yield takeLatest(actionTypes.UserRequested, function* storeData() {
  //   const { auth: { authToken, isAdmin } } = yield select();
  //   if (isAdmin === false) {
  //     yield put(actions.fulfillUser());
  //   }
  // });

}
