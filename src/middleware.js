import React from 'react'
import {Helmet} from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Router from './Router'
import reducers from './reducers'
import asyncBootstrapper from 'react-async-bootstrapper'

export default (req, res) => {
	if(process.env.NODE_ENV === 'development') {
		res.send(`
			<!doctype html>
			<html>
				<head>
					<title>this Is Not server rendering</title>
					<link rel="icon" href="/assets/favicon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				</head>
				<body>
					<div id='app'></div>
					<script id="preload"></script>
					<script src='/bundle.js'></script>
				</body>
			</html>
		`);
	} else if(process.env.NODE_ENV === 'production') {
		const store = createStore(reducers)
		const app = (
			<Provider store={store}>
				<StaticRouter location={req.url} context={{}}>
					<Router />
				</StaticRouter>
			</Provider>
		)

		asyncBootstrapper(app).then(() => {
			const preState = store.getState()
			// console.log('preSTATE:::', preState)
			const reactString = renderToString(app)
			const helmet = Helmet.renderStatic()
			const html = `
				<!doctype html>
				<html ${helmet.htmlAttributes.toString()}>
					<head>
						<meta charSet="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
						<link rel='stylesheet' href='/bundle.css' />
						<link rel="icon" href="/assets/favicon.ico" />
						${helmet.title.toString()}
						${helmet.meta.toString()}
						${helmet.link.toString()}
						<script id="preload">
						window.__PRELOADED__STATE=${JSON.stringify(preState).replace(/</g, '\\u003c')}
						</script>
					</head>
					<body>
						<div id='app'>${reactString}</div>
						<script src='/bundle.js'></script>
					</body>
				</html>
			`
	
			res.send(html)
		})
	}
};
