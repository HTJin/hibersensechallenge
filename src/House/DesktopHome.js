import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import AddIcon from '@material-ui/icons/AddRounded'
import ArrowUp from '@material-ui/icons/ArrowDropUpRounded'
import BoltIcon from '@material-ui/icons/FlashOnRounded'
import ArrowDown from '@material-ui/icons/ArrowDropDownRounded'
import CancelIcon from '@material-ui/icons/ClearRounded'
import EditIcon from '@material-ui/icons/EditRounded'
import HouseIcon from '@material-ui/icons/HomeRounded'
import PowerIcon from '@material-ui/icons/PowerRounded'
import RoomIcon from '@material-ui/icons/MeetingRoomRounded'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import './DesktopHome.css'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#5BBD75' }
  },
  overrides: {
    MuiIconButton: {
      colorPrimary: {
        color: '#EE7752',
        '&:hover': { backgroundColor: fade('#EE7752', 0.1) }
      },
      colorSecondary: {
        color: '#23A6D5',
        '&:hover': { backgroundColor: fade('#23A6D5', 0.1) }        
      }
    }
  }
})
class DesktopHome extends Component {
  state = {
    rooms: [],
    roomSelect: [],
    roomTemp: [],
    name: '',
    adding: false,
    editing: false,
    error: false,
    helperText: 'Press Enter',
    roomEdit: '',
    editIndex: 0,
    houseTemp: 67
  }

  addRoom = () => {
    this.setState({ adding: !this.state.adding, name: '' })
  }

  handleCancel = () => {
    this.setState({
      name: '',
      adding: false,
      editing: false,
      helperText: 'Press Enter',
      roomEdit: '',
      editIndex: 0
    })
  }

  handleRoomName = name => event => {
    this.setState({ [name]: event.target.value })
  }

  resetError = () => {
    this.setState({ error: false })
    if (this.state.editing) {
      this.setState({ helperText: 'Editing Room Name' })
    } else {
      this.setState({ helperText: 'Press Enter' })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.name === '') {
      this.setState({ error: true, helperText: 'Please type in a name' })
      setTimeout(this.resetError, 1500)
    } else if (this.state.rooms.indexOf(this.state.name) > -1) {
      this.setState({ error: true, helperText: 'That room name already exists' })
      setTimeout(this.resetError, 1500)
    } else {
      this.state.rooms.push(this.state.name)
      this.state.roomTemp.push(this.roomTempGen())
      this.state.roomSelect.push(false)
      this.setState({ name: '', error: false })
      this.addRoom()
    }
  }

  handleEdit = room => () => {
    let index = this.state.rooms.indexOf(room)
    if (index > -1) {
      this.setState({
        editing: !this.state.editing,
        roomEdit: room,
        editIndex: index,
        helperText: 'Editing Room Name'
      })
    }
  }

  handleEditSubmit = event => {
    event.preventDefault()
    if (this.state.name === '') {
      this.setState({ error: true, helperText: 'Please type in a name' })
      setTimeout(this.resetError, 1500)
    } else if (this.state.rooms.indexOf(this.state.name) > -1) {
      this.setState({ error: true, helperText: 'That room name already exists' })
      setTimeout(this.resetError, 1500)
    } else {
      this.state.rooms.splice(this.state.editIndex, 1, this.state.name)
      this.setState({
        rooms: this.state.rooms,
        editing: !this.state.editing,
        name: '',
        helperText: 'Press Enter'
      })
    }
  }

  handleDelete = index => () => {
    this.state.rooms.splice(index, 1)
    this.setState({ rooms: this.state.rooms })
    this.handleCancel()
  }

  toRoom = index => () => {
    this.state.roomSelect.splice(index, 1, !this.state.roomSelect[index])
    this.setState({ roomSelect: this.state.roomSelect })
  }

  roomTempGen = () => {
    const temp = Math.floor(Math.random()*20)+60
    return temp
  }

  handleTarget = change => () => {
    if (change === 'up') {
      this.setState({ houseTemp: this.state.houseTemp + 1 })
    } else {
      this.setState({ houseTemp: this.state.houseTemp - 1 })      
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='desktop-display'>
          <div className='room-display'>
            <h1>Welcome Home!</h1>
            <fieldset className={this.state.rooms.length === 0 ? 'empty' : 'filled'}>
              <legend>My Rooms</legend>
              { this.state.rooms.length > 0 ? 
                this.state.rooms.map((room, index) => {
                  return (
                    <div className='room-list' key={index}>
                      <RoomIcon
                        className='room-icon'
                        color={this.state.roomSelect[index] ? 'primary' : ''}
                        onClick={this.toRoom(index)}  
                      />
                      <div>
                        <Chip
                          avatar={
                            <Avatar 
                              className={
                              this.state.roomTemp[index] > this.state.houseTemp ? 'warm'
                            : this.state.roomTemp[index] < this.state.houseTemp ? 'cool'
                            : 'match'
                            }
                            >{this.state.roomTemp[index]}°
                            </Avatar>
                          }
                          label={room}
                          color={this.state.roomSelect[index] ? 'primary' : 'default'}
                          variant='outlined'
                          onClick={this.toRoom(index)}
                          deleteIcon={<EditIcon className='edit-icon' />}
                          onDelete={(this.state.adding && !this.state.editing) || (!this.state.adding && this.state.editing) ? this.handleCancel : this.handleEdit(room)}
                        />
                        <CancelIcon className='delete-icon' onClick={this.handleDelete(index)} />
                      </div>
                    </div>
                  )
                })
                : <div><p>Click below to add a room</p></div> }
            </fieldset>
            
            { this.state.adding  && !this.state.editing ?
              <div className='add-new'>
                <Fab className='add-button' variant='extended' onClick={this.addRoom}>
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
              <div className='add-new'>
                <Fab className='add-button' variant='extended' onClick={this.handleCancel}>
                  Cancel<CancelIcon className='func-icon' />
                </Fab>
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
              </div>
            :
              <div className='add-new'>
                <Fab className='add-button' variant='extended' onClick={this.addRoom}>
                  <HouseIcon className='house-icon' />Add a new room<AddIcon className='func-icon' />
                </Fab>
              </div>
            }
          </div>
          <div className='data-display'>
            <div>
              <Tooltip title='Target Temperature' placement='bottom-end'>
                <Avatar className='temperature'>{this.state.houseTemp}°</Avatar>
              </Tooltip>
            </div>
            <div className='temp-control'>
              <Tooltip title='+ 1' placement='right'>
                <IconButton color='primary' onClick={this.handleTarget('up')}><ArrowUp /></IconButton>
              </Tooltip>
              <Tooltip title='- 1' placement='right'>              
                <IconButton color='secondary' onClick={this.handleTarget('down')}><ArrowDown /></IconButton>
              </Tooltip>
            </div>
            <div className='energy-display'>
              <Button>
                <PowerIcon /><BoltIcon />
              </Button>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default DesktopHome