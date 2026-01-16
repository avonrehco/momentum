import React, { Component } from 'react'
import Header from './components/Header'
import Clock from './components/Clock'
import Footer from './components/Footer'

export class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Header />
        <Clock />
        <Footer />
      </div>
    )
  }
}

export default App