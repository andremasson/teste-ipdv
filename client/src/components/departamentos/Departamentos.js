import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getDepartamento} from "../../actions/departamento";

const Cargos = ({getDepartamento, departamento: {departamentos}}) => {
    useEffect(() => {
        getDepartamento();
    }, [getDepartamento]);

    return (
        <Fragment>
            <div>
                <h4>Departamentos</h4>
            </div>
            <div className="container">
                <table>
                    <tr>
                        <th>Departamento</th>
                        <th>Centro de Custo</th>
                    </tr>
                    {departamentos.map((item) => (
                        <tr>
                            <td className="my-1">{item.nome}</td>
                            <td className="my-1">{item.CentroDeCusto.nome}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </Fragment>
    );
};

Cargos.propTypes = {
    getCargos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    departamento: state.departamento,
});

export default connect(mapStateToProps, {getDepartamento})(Cargos);
