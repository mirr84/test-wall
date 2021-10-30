import React from 'react';

import Form from './components/Form'
import MyLayout from './components/Layout';
import List from './components/List'

class App extends React.Component {
  
  state = {
    bricks: []
  }

  componentDidMount () {    
    this.fetchAllBricks()
  }

  fetchAllBricks = () => {
    fetch("/api/bricks")
      .then( resp => resp.json() )
      .then( bricks => { this.setState({bricks}) } )
  }

  addNewBrick = (text) => {
    fetch("/api/bricks", {
        method:"post", 
        body: JSON.stringify({text}),
        headers: { "Content-Type": "application/json" }
      })
      .then(resp => resp.json())
      .then(() => this.fetchAllBricks() )
  }

  render () {

    const {bricks} = this.state

    return (
      // <div>
      //   App
      //   <Form addNewBrick={this.addNewBrick} />
      //   <List bricks={bricks} />
      // </div>
      <MyLayout />
    )
  }

}

export default App;
