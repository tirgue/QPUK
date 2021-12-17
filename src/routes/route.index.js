import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GoBackButton } from '../components/components.index';
import Console, { AddTeam } from '../views/Console/Console';
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
                <Route path="/animate/console">
                    <Console>
                        <Route path="/animate/console/add">
                            <AddTeam />
                        </Route>
                        <Route path="/animate/console/nine-points"></Route>
                        <Route path="/animate/console/four-in-a-row"></Route>
                        <Route path="/animate/console/face-to-face"></Route>
                    </Console>
                </Route>
            </Route>
        </Router>
    );
}

export default RouteIndex;
