import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NoMatch from './view/nomatch'
import Index from './view/index'

export default () => (
  <Switch>
    <Route exact path='/' component={Index} />
    <Route component={NoMatch} />
  </Switch>
);