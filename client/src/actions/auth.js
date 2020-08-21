import axios from "axios";
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "./types";
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get("/api/auth");

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = ({nome, email, senha, departamento, cargo}) => async (
    dispatch
) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({nome, email, senha, departamento, cargo});

    try {
        const res = await axios.post("/api/usuarios", body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login User
export const login = (email, senha) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({email, senha});

    try {
        const res = await axios.post("/api/auth", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Logout
export const logout = () => (dispatch) => {
    dispatch({type: LOGOUT});
};
