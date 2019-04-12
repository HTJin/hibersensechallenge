import React, { Component } from 'react'

import Fab from '@material-ui/core/Fab'

import HouseIcon from '@material-ui/icons/HomeRounded'
import AddIcon from '@material-ui/icons/AddRounded'
import RoomIcon from '@material-ui/icons/MeetingRoomRounded'

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
            { this.state.rooms.length === 0 ?
              <div className='addNew'>
                <Fab variant='extended'>
                  <HouseIcon className='empty' />Add a new room<AddIcon />
                </Fab>
              </div>
            : 
              <div>
                <RoomIcon />
              </div>
            }
        </fieldset>
      </div>
    )
  }
}

export default DesktopHome