import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Firebase from '../../lib/FirebaseDB'
import CapsuleAction from '../../reducers/capsule/capsuleAction'
import jwtDecode from 'jwt-decode'
import AudioPlayer from '../../components/audioPlayer'
import Grid from 'material-ui/Grid'

class Index extends Component {
 
  state = {
    data: {}
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      this.getData().then((data) => {
        this.props.actions.setCapsuleInfo(data)
      })
    }
  }

  async getData () {
    const { token } = this.props.match.params
    if (token) {
      try{
        const { capsuleId, parentId } = jwtDecode(token)
        
        return new Firebase().readOnce(`capsules/${parentId}/audios/${capsuleId}`)
      } catch (e) {
        
      }
    }
  }

  async asyncBootstrap() {
    const data = await this.getData()
    this.setState({
      data
    })
    this.props.actions.setCapsuleInfo(data)
    return true
  }

  render() {
    return (
      <Grid item xs={12} sm={10}>
        <AudioPlayer src={this.props.url} />
        {this.props.audioName}
        <div dangerouslySetInnerHTML={{__html: this.props.draft}} />
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    audioName: state.capsule.audioName,
    draft: state.capsule.draft,
    url: state.capsule.url
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...CapsuleAction}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
