import React from 'react'
import { render } from 'react-dom'
import Dashboard from './Dashboard'
import '../css/main.scss'

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Dashboard />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
