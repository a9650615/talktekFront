import React, {Component} from 'react'
import {Helmet} from 'react-helmet'

export default class Head extends Component {

  render() {
    return (
      <Helmet>
        <title>{this.props.title}</title>
      </Helmet>
    )
  }
}