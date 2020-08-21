import {GET_CENTROS_DE_CUSTOS, GET_CENTRO_DE_CUSTO} from "../actions/types";

const initialState = {
    centros_de_custos: [],
    centro_de_custo: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CENTROS_DE_CUSTOS:
            return {
                ...state,
                centros_de_custos: payload,
                loading: false,
            };
        case GET_CENTRO_DE_CUSTO:
            return {
                ...state,
                centro_de_custo: payload,
                loading: false,
            };

        default:
            return state;
    }
}
