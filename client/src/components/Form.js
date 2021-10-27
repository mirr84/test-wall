import React from 'react';

class Form extends React.Component {
  
  state = {
    text: ""
  }

  onInputChange = (e) => this.setState({ [e.target.name]: e.target.value })
  onButtonClick = () => this.props.addNewBrick(this.state.text)

  render () {

    return (
      <div>
        <input type="text" value={this.state.text} name="text" onChange={this.onInputChange} />
        <button onClick={this.onButtonClick} >send message</button>
      </div>
    )
  }

}

export default Form;
