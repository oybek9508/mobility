/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import AuthApi from "src/api/auth-api";

const authApi = new AuthApi();

const ActionType = {
  INITIALIZE: "INITIALIZE",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  SOCIAL_LOGIN: "SOCIAL_LOGIN",
  SOCIAL_REGISTER: "SOCIAL_REGISTER",
  LOGIN_REFRESH: "LOGIN_REFRESH",
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  provider: "",
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      provider: user?.provider,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    provider: "",
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  SOCIAL_LOGIN: (state, action) => {
    const { user, provider } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      provider,
    };
  },
  SOCIAL_REGISTER: (state, action) => {
    const { user, provider } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      provider,
    };
  },
  LOGIN_REFRESH: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isInitialized: true,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  platform: "JWT",
  initialize: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  social_login: () => Promise.resolve(),
  social_register: () => Promise.resolve(),
  login_refresh: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("AuthProvider");
    initialize();
  }, []);

  const initialize = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      // console.log(`accessToken`, accessToken)

      if (accessToken) {
        console.log("token", jwtDecode(accessToken));
        const { id, roles } = jwtDecode(accessToken);
        // console.log(`id`, id)
        const res = await authApi.getUserInfo(id);
        if (res.success) {
          const user = res.data;
          // console.log("res", res);
          // console.log('user in useAuth: ', user)

          // console.log(`ActionType`, ActionType)
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
              provider: user?.provider,
            },
          });
        }
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
            provider: "",
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null,
          provider: "",
        },
      });
    }
  };

  const login = async (payload) => {
    // console.log('jwt-context:login', payload)
    const res = await authApi.postLogin(payload);
    const { id, authorizationToken, refreshToken, marvrusUser } = res.data;
    // console.log(`id`, id)
    // console.log(`authorizationToken`, authorizationToken)
    localStorage.setItem("accessToken", authorizationToken);
    localStorage.setItem("refreshToken", refreshToken);
    // console.log(`user`, marvrusUser)

    dispatch({
      type: ActionType.LOGIN,
      payload: {
        user: marvrusUser,
      },
    });
  };

  const social_login = async (payload) => {
    try {
      const res = await authApi.socialLogin(payload);
      const { id, authorizationToken, refreshToken, marvrusUser } =
        res.data.data;
      localStorage.setItem("accessToken", authorizationToken);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch({
        type: ActionType.SOCIAL_LOGIN,
        payload: {
          user: marvrusUser,
          provider: payload.provider,
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = async () => {
    const res = await authApi.Logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({ type: ActionType.LOGOUT });
  };

  const register = async (email, name, password) => {
    const accessToken = await authApi.register({ email, name, password });
    const user = await authApi.me(accessToken);

    localStorage.setItem("accessToken", accessToken);

    dispatch({
      type: ActionType.REGISTER,
      payload: {
        user,
      },
    });
  };

  const social_register = async () => {};

  const login_refresh = async (payload) => {
    localStorage.removeItem("accessToken");
    const res = await authApi.loginRefresh(payload);
    const { id, authorizationToken, refreshToken, marvrusUser } = res.data;
    localStorage.setItem("accessToken", authorizationToken);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch({
      type: ActionType.LOGIN_REFRESH,
      payload: {
        user: marvrusUser,
      },
    });
    return marvrusUser;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        initialize,
        login,
        logout,
        register,
        social_login,
        social_register,
        login_refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
