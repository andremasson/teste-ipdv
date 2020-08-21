import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/centro_de_custos">Centros de Custos</Link>
            </li>
            <li>
                <Link to="/cargos">Cargos</Link>
            </li>
            <li>
                <Link to="/departamentos">Departamentos</Link>
            </li>
            <li>
                <Link to="/usuarios">Usuários</Link>
            </li>
            <li>
                <Link to="#!" onClick={logout}>
                    Logout
                </Link>
            </li>
        </ul>
    );

    const guessLinks = (
        <ul>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">Home</Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guessLinks}</Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Navbar);
