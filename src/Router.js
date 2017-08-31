import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NoMatch from './view/nomatch'
import Index from './view/index'
import Grid from 'material-ui/Grid'

export default () => (
  <Grid container id="body">
    <Switch>
      <Route exact path='/capsule/:token' component={Index} />
      <Route component={NoMatch} />
    </Switch>
  </Grid>
);