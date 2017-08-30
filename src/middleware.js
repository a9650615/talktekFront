import React from 'react'
import {Helmet} from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Router from './Router'
import reducers from './reducers'

export default (req, res) => {
	if(process.env.NODE_ENV === 'development') {
		res.send(`
			<!doctype html>
			<html>
				<head>
					<title>this Is Not server rendering</title>
				</head>
				<body>
					<div id='app'></div>
					<script src='bundle.js'></script>
				</body>
			</html>
		`);
	} else if(process.env.NODE_ENV === 'production') {
		const reactString = renderToString(
			<Provider store={createStore(reducers)}>
				<StaticRouter location={req.url} context={{}}>
					<Router />
				</StaticRouter>
			</Provider>
		)
		const helmet = Helmet.renderStatic()
		const html = `
			<!doctype html>
			<html ${helmet.htmlAttributes.toString()}>
				<head>
				 	<meta charSet="utf-8">
        	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
					${helmet.title.toString()}
					${helmet.meta.toString()}
					${helmet.link.toString()}
				</head>
				<body>
					<div id='app'>${reactString}</div>
					<script src='bundle.js'></script>
				</body>
			</html>
		`

		res.send(html)
	}
};
