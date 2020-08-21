import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCentrosDeCustos} from "../../actions/centroDeCusto";

const CentrosDeCustos = ({
    getCentrosDeCustos,
    centroDeCusto: {centros_de_custos},
}) => {
    useEffect(() => {
        getCentrosDeCustos();
    }, [getCentrosDeCustos]);

    return (
        <Fragment>
            <div>
                <h4>Centros de Custos</h4>
            </div>
            <div className="container">
                {centros_de_custos.map((item) => (
                    <div>
                        <p className="my-1">{item.nome}</p>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

CentrosDeCustos.propTypes = {
    getCentrosDeCustos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    centroDeCusto: state.centroDeCusto,
});

export default connect(mapStateToProps, {getCentrosDeCustos})(CentrosDeCustos);
