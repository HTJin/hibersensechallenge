import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

import './DesktopHome.css'

class DesktopHome extends Component {
  state = {
    rooms: []
  }

  render() {
    return (
      <div className='desktopDisplay'>
        <h1>Welcome Home!</h1>
        <fieldset>
          <legend>My Rooms</legend>
            
        </fieldset>
      </div>
    )
  }
}

export default DesktopHome