import {GET_DEPARTAMENTOS} from "../actions/types";

const initialState = {
    departamentos: [],
    departamento: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_DEPARTAMENTOS:
            return {
                ...state,
                departamentos: payload,
                loading: false,
            };

        default:
            return state;
    }
}
