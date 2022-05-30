import React from 'react';

import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import NavBar from '../modules/vacancias/components/NavBar';
import HomeScreen from '../modules/vacancias/view/admin/HomeScreen';

export const VacanciaRouter = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path='/admin/home' component={HomeScreen} />
                <Redirect to='/admin/home' />
            </Switch>
        </>
    )
}