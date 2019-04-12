import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import DesktopHome from './House/DesktopHome'
import EditHome from './House/EditHome'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' render={() => <Redirect to='/home' />} />
        <Route path='/edit' component={EditHome} />

        {/* WEB */}
        <MediaQuery minDeviceWidth={1224}>
          <Route path='/home' component={DesktopHome} />
        </MediaQuery>
        {/* MOBILE */}
        <MediaQuery maxDeviceWidth={1224}>
          
        </MediaQuery>
      </div>
    )
  }
}

export default App
