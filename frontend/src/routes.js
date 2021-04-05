import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import EstablishmentsGrid from './pages/EstablishmentsGrid';
import RegisterForm from './pages/RegisterForm';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={EstablishmentsGrid} />
                <Route path='/cadastro' component={RegisterForm} />
            </Switch>
        </BrowserRouter>
    );
}