import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'

class OpemAppBanner extends Component {
  componentDidMount() {
    require('./style.scss')
  }

  render() {
    return (
      <div className="openAppBanner">
        <Grid container className="container">
          <Grid item xs={12} sm={8} className="title">
            <Typography type="subheading" gutterBottom>
              聽更多？ 立即打開 App 更多精彩小講等著你
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button raised className="open-btn" color="accent">立即開啟</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default OpemAppBanner
