import axios from "axios";
import {setAlert} from "./alert";
import {GET_CENTROS_DE_CUSTOS, GET_CENTRO_DE_CUSTO, ERROR} from "./types";

// Listar centros de custos
export const getCentrosDeCustos = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/centro_de_custos");
        dispatch({
            type: GET_CENTROS_DE_CUSTOS,
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

// Retorna centro de custo por id
export const getCentroDeCusto = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/centro_de_custos/${id}`);
        dispatch({
            type: GET_CENTRO_DE_CUSTO,
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
