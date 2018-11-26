import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { PERMISSIONS } from '../root';

export default class publicRoot extends Component {
    render() {
        if (!this.props.isSignIn) {
            return (
                <Route {...this.props} />
            );
        } else {
            switch (this.props.permission) {
                case PERMISSIONS.TECHNICIAN:
                    return (<Redirect to={'/shopsActivity'} />);
                case PERMISSIONS.SHOP_OWNER:
                    return (<Redirect to={'/shopsList'} />);
                case PERMISSIONS.FRANCHISER:
                    return (<Redirect to={'/shopsList'} />);
                case PERMISSIONS.AGENT:
                    return (<Redirect to={'/cards'} />);
                case PERMISSIONS.SHOP_MANAGER:
                    return (<Redirect to={'/shopsList'} />);
                default:
                    return (<Redirect to={'/users'} />);
            }
        }
    }
}
publicRoot.defaultTypes = {
    permission: 'USER',
}
publicRoot.propTypes = {
    isSignIn: propTypes.bool.isRequired,
    permission: propTypes.string,
}