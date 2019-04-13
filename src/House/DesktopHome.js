import React, { Component } from 'react'

import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'

import HouseIcon from '@material-ui/icons/HomeRounded'
import AddIcon from '@material-ui/icons/AddRounded'
import RoomIcon from '@material-ui/icons/MeetingRoomRounded'

import './DesktopHome.css'

class DesktopHome extends Component {
  state = {
    rooms: [],
    editing: false
  }

  addRoom = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleRoomName = (event) => {
    event.preventDefault()
    this.state.rooms.push(event.target.value)
  }

  render() {
    return (
      <div className='desktopDisplay'>
        <h1>Welcome Home!</h1>
        <fieldset>
          <legend>My Rooms</legend>
            { this.state.rooms.length === 0 && !this.state.editing ?
              <div className='addNew'>
                <Fab variant='extended' onClick={this.addRoom}>
                  <HouseIcon className='empty' />Add a new room<AddIcon />
                </Fab>
              </div>
            :
              <div>
                <div className='addNew'>
                  <Fab variant='extended' onClick={this.addRoom}>
                    <HouseIcon className='empty' />Add a new room<AddIcon />
                  </Fab>
                </div>
                <form className='roomList' onSubmit={this.handleRoomName}>
                  <RoomIcon />
                  <TextField
                    variant='outlined'
                    label='Room Name'
                    onChange={this.handleRoomName}
                  />
                </form>
              </div>
            }
        </fieldset>
      </div>
    )
  }
}

export default DesktopHome