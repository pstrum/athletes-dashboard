import React from 'react'
import { render } from 'react-dom'
import Dashboard from './Dashboard'
import '../css/main.scss'

const App = React.createClass({
  render () {
    return (
      <div className='app'>
        <Dashboard />
      </div>
    )
  }
})

render(<App />, document.getElementById('app'))
