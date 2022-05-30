import React from 'react';

import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import GetNivel from '../modules/vacancias/view/GetNivel';
import { LoginScreen } from '../modules/vacancias/view/LoginScreen';

export const AuthRouter = () => {
    return (
        <Switch>
            <Route path='/public/vacancia' component={GetNivel} />
            <Route path='/public/login' component={LoginScreen} />
            <Redirect to='/public/vacancia' />
        </Switch>
    )
}