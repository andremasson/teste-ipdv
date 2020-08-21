import React, {Fragment, useEffect} from "react";
import {connect} from "react-redux";

const Painel = () => {
    return <Fragment>Painel de usuários</Fragment>;
};

Painel.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Painel);
