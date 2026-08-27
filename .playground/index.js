import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

import './style.css'
import Homepage from './views/homepage'
import TermsConditions from './views/terms-conditions'
import BetNow from './views/bet-now'
import NotFound from './views/not-found'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route component={Homepage} exact path="/homepage" />
                <Route component={TermsConditions} exact path="/terms-conditions" />
                <Route component={BetNow} exact path="/" />
                <Route component={NotFound} path="**" />
                <Redirect to="**" />
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
