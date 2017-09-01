import React from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import Router from './Router'
import reducers from './reducers'
import './App.scss'

const preloadedState = window.__PRELOADED__STATE
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createBrowserHistory()
const store = createStore(reducers, preloadedState,
  composeEnhancers( 
    applyMiddleware(routerMiddleware(history))
  )
)

if (process.env.NODE_ENV === 'product') {
  document.getElementById('preload').remove()
  delete window.__PRELOADED__STATE
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router />
    </ConnectedRouter>
  </Provider>
, document.getElementById('app'));

if(process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept()
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default)
  })
}
