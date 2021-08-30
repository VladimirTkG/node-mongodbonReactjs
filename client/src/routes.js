import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { LinkPage } from './pages/LinkPage'
import { ChangeData } from './pages/ChangeDataPage'


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinkPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/profile" exact>
                    <ChangeData />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }else {
        return(
            <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
        )
    };
};