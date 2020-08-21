import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCargos} from "../../actions/cargo";

const Cargos = ({getCargos, cargo: {cargos}}) => {
    useEffect(() => {
        getCargos();
    }, [getCargos]);

    return (
        <Fragment>
            <div>
                <h4>Cargos</h4>
            </div>
            <div className="container">
                {cargos.map((item) => (
                    <div>
                        <p className="my-1">{item.nome}</p>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

Cargos.propTypes = {
    getCargos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    cargo: state.cargo,
});

export default connect(mapStateToProps, {getCargos})(Cargos);
