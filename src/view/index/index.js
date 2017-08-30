import React, {Component} from 'react'
import Firebase from '../../lib/FirebaseDB'
import Button from 'material-ui/Button'

let data = {}

export default class Index extends Component {
 
  async asyncBootstrap() {
    data = await new Firebase().readOnce('capsules/-Ks8Mn5r1iPn7FB8mLWI/audios/-Ks8MqMDif2LhT5Tf88F')
    
    return true
  }

  render() {
    return <div>
      {data.audioName}
      <Button>
        asdasd
      </Button>
    </div>
  }
}
