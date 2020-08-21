import {GET_CARGOS, GET_CARGO} from "../actions/types";

const initialState = {
    cargos: [],
    cargo: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CARGOS:
            return {
                ...state,
                cargos: payload,
                loading: false,
            };
        case GET_CARGO:
            return {
                ...state,
                cargo: payload,
                loading: false,
            };

        default:
            return state;
    }
}
