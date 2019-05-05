import * as React from "react";
import { createContext, useReducer, useEffect, useContext } from "react";
import { JsonServiceClient } from "@servicestack/client";
import * as classNames from "classnames";

export var client = new JsonServiceClient("/");

export {
  errorResponse, errorResponseExcept,
  splitOnFirst, toPascalCase,
  queryString
} from "@servicestack/client";

export {
  ResponseStatus, ResponseError,
  Authenticate, AuthenticateResponse,
  Register,
} from "../dtos";

import {
  ResponseStatus, ResponseError,
  Authenticate, AuthenticateResponse
} from "../dtos";

// Shared state between all Components
interface State {
  isAuthenticated: boolean;
  userSession: { displayName:string } | null;
}
interface Action {
  type: 'signout' | 'signin'
  data?: any
}
const initialState: State = {
  isAuthenticated: false,
  userSession: null
};

const reducer = (state:State, action:Action) => {
  switch (action.type) {
    case 'signin':
      return { ...state, isAuthenticated:true, userSession:action.data };
    case 'signout':
      return { ...state, isAuthenticated:false, userSession:null };
    default:
      throw new Error();
  }
};

interface Context {
  state:State,
  dispatch:React.Dispatch<Action>
}

export const StateContext = createContext({} as Context);

export const StateProvider = (props:any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (<StateContext.Provider value={{ state, dispatch }}>{props.children}</StateContext.Provider>);
};

export const redirect = (url:string) => location.href = url || '/client-react/';

type Dispatch = React.Dispatch<Action>;

export const checkAuth = async (dispatch:Dispatch) => {
  try {
    dispatch({ type: 'signin', data: await client.post(new Authenticate()) });
  } catch (e) {
    dispatch({ type: 'signout' });
  }
};

export const signout = async (dispatch:Dispatch) => {
  dispatch({ type: 'signout'});
  await client.post(new Authenticate({ provider: "logout" }));
};