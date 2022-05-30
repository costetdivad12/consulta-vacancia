import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

import {
    HashRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import Loading from '../modules/vacancias/components/Loading';
import useAuth from '../modules/vacancias/hooks/useAuth';

import { AuthRouter } from './AuthRouter';
import { PrivateRouter } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';
import { VacanciaRouter } from './VacanciaRouter';

// import { PrivateRouter } from './PrivateRouter';

export const AppRouter = () => {

    const { checking, isLoggedIn } = useAuth();

    if (checking) return ( <Loading /> )

    return (
        <Router>
            <div>
                <div className="container mb-3">
                    <img src={process.env.PUBLIC_URL + '/img/logos_nuevos.png'} className='img-responsive' alt='logo' />
                </div>
                <div className='container'>
                    <Switch>
                        <PublicRoute path="/public" component={AuthRouter} isAuthenticate={isLoggedIn} />
                        <PrivateRouter path="/admin" component={VacanciaRouter} isAuthenticate={isLoggedIn} />
                        <Redirect to='/public/vacancia' />
                    </Switch>
                </div>
                <div className='fixed-bottom'>
                    <img src={process.env.PUBLIC_URL + '/img/pleca_nueva20.png'} width="100%" alt='logo' />
                </div>
            </div>
        </Router>
    )
}