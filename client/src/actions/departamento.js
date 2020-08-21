import axios from "axios";
import {setAlert} from "./alert";
import {GET_DEPARTAMENTOS, ERROR} from "./types";

// Listar departamentos
export const getDepartamento = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/departamentos");
        dispatch({
            type: GET_DEPARTAMENTOS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status,
            },
        });
    }
};
