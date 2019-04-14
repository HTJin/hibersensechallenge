import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'

import AddIcon from '@material-ui/icons/AddRounded'
import EditIcon from '@material-ui/icons/Edit'
import HouseIcon from '@material-ui/icons/HomeRounded'
import CancelIcon from '@material-ui/icons/Clear'
import RoomIcon from '@material-ui/icons/MeetingRoomRounded'

import './DesktopHome.css'

class DesktopHome extends Component {
  state = {
    rooms: [],
    name: '',
    adding: false,
    editing: false,
    error: false,
    helperText: 'Press Enter',
    roomEdit: '',
    editIndex: 0
  }

  constructor(props) {
    super(props)
    this.toRoom = this.toRoom.bind(this)
  }

  addRoom = () => {
    this.setState({
      adding: !this.state.adding
    })
  }

  handleRoomName = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  resetError = () => {
    this.setState({ error: false })
    if (this.state.editing) {
      this.setState({
        helperText: 'Editing Room Name'
      })
    } else {
      this.setState({
        helperText: 'Press Enter'
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.name === '') {
      this.setState({ error: true, helperText: 'Please type in a name' })
      setTimeout(this.resetError, 2000)
    } else {
      this.state.rooms.push(this.state.name)
      this.setState({ name: '', error: false })
      this.addRoom()
    }
  }

  handleEdit = room => () => {
    let index = this.state.rooms.indexOf(room)
    if (index > -1) {
      this.setState({ editing: !this.state.editing, roomEdit: room, editIndex: index, helperText: 'Editing Room Name' })
    }
  }

  handleEditSubmit = event => {
    event.preventDefault()
    if (this.state.name === '') {
      this.setState({ error: true, helperText: 'Please type in a name' })
      setTimeout(this.resetError, 2000)
    } else {
      this.state.rooms.splice(this.state.editIndex, 1, this.state.name)
      this.setState({ rooms: this.state.rooms, editing: !this.state.editing, name: '', helperText: 'Press Enter' })
    }
  }

  toRoom = room => () => {
    let path = room
    this.props.history.push(path)
  }

  render() {
    return (
      <div className='desktop-display'>
        <h1>Welcome Home!</h1>
        <fieldset>
          <legend>My Rooms</legend>
          { this.state.rooms.length > 0 ? 
            this.state.rooms.map((room, index) => {
              return (
                <div className='room-list' key={index}>
                  <Chip
                    avatar={<Avatar><RoomIcon /></Avatar>}
                    label={room}
                    onClick={this.toRoom(room)}
                    deleteIcon={<EditIcon className='edit-icon' />}
                    onDelete={this.handleEdit(room)}
                  />
                </div>
              )
            })
          : '' }
        </fieldset>
        
        { this.state.adding  && !this.state.editing ?
          <div className='add-new'>
            <Fab variant='extended' onClick={this.addRoom}>
              Cancel<CancelIcon className='func-icon' />
            </Fab>
            <form className='add-new' onSubmit={this.handleSubmit}>
              <RoomIcon />
              <TextField
                autoFocus
                variant='outlined'
                label='Room Name'
                onChange={this.handleRoomName('name')}
                value={this.state.name}
                helperText={this.state.helperText}
                error={this.state.error}
              />
            </form>
          </div>
        : !this.state.adding && this.state.editing ?
            <form className='add-new' onSubmit={this.handleEditSubmit}>
              <RoomIcon />
              <TextField
                autoFocus
                variant='outlined'
                label={this.state.roomEdit}
                onChange={this.handleRoomName('name')}
                value={this.state.name}
                helperText={this.state.helperText}
                error={this.state.error}
              />
            </form>
        :
          <div className='add-new'>
            <Fab variant='extended' onClick={this.addRoom}>
              <HouseIcon className='house-icon' />Add a new room<AddIcon className='func-icon' />
            </Fab>
          </div>
        }
      </div>
    )
  }
}

export default DesktopHome