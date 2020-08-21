import axios from "axios";
import {setAlert} from "./alert";
import {GET_CARGOS, GET_CARGO, ERROR} from "./types";

// Listar cargos
export const getCargos = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/cargos");
        dispatch({
            type: GET_CARGOS,
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

// Retorna cargo por id
export const getCargo = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/cargos/${id}`);
        dispatch({
            type: GET_CARGO,
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
