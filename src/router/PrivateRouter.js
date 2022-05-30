import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

export const PrivateRouter = ({
    isAuthenticate,
    component: Component,
    ...rest
}) => {
    return (
        <Route { ...rest } component={ ( props ) => (
            ( isAuthenticate )
                ? <Component { ...props } />
                : ( <Redirect to='/public/login' /> )
        )  } />
    )
}


PrivateRouter.propType = {
    isAuthenticate : PropTypes.bool.isRequired,
    component : PropTypes.func.isRequired
}