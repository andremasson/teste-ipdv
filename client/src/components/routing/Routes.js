import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Painel from "../usuarios/Painel";
import PrivateRoute from "../routing/PrivateRoute";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import CentrosDeCustos from "../centro-de-custo/CentrosDeCustos";
import Cargos from "../cargos/Cargos";
import Departamentos from "../departamentos/Departamentos";
import Usuarios from "../usuarios/Usuarios";

export const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/painel" component={Painel} />
                <PrivateRoute
                    exact
                    path="/centro_de_custos"
                    component={CentrosDeCustos}
                />
                <PrivateRoute exact path="/cargos" component={Cargos} />
                <PrivateRoute
                    exact
                    path="/departamentos"
                    component={Departamentos}
                />
                <PrivateRoute exact path="/usuarios" component={Usuarios} />
            </Switch>
        </section>
    );
};
