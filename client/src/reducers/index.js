import {combineReducers} from "redux";
import alert from "./alert";
import auth from "./auth";
import centroDeCusto from "./centroDeCusto";
import cargo from "./cargo";
import departamento from "./departamento";

export default combineReducers({
    alert,
    auth,
    centroDeCusto,
    cargo,
    departamento,
});
