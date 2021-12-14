import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GoBackButton } from '../components/components.index';
import { Home, AnimateMenu, Screen } from '../views/views.index';

const RouteIndex = () => {
    return (
        <Router>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/:path">
                <GoBackButton />
            </Route>
            <Route path="/animate">
                <Route path="/animate" exact>
                    <AnimateMenu />
                </Route>
                <Route path="/animate/screen">
                    <Screen />
                </Route>
            </Route>
        </Router>
    );
}

export default RouteIndex;
