import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import DesktopHome from './House/DesktopHome'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={DesktopHome} />
      </div>
    );
  }
}

export default App
