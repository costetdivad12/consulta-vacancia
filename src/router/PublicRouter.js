import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAuthenticate,
    component: Component,
    ...rest
} ) => {
    return (
        <Route { ...rest } component={ ( props ) => (
            ( isAuthenticate )
                ? ( <Redirect to='/admin' /> )
                : <Component { ...props } />
        )  } />
    )
}


PublicRoute.propType = {
    isAuthenticate : PropTypes.bool.isRequired,
    component : PropTypes.func.isRequired
}