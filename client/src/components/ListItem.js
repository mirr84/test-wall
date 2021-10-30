import React from 'react';

class ListItem extends React.Component {
  
  render () {
    return (
      <>
        {
          this.props.data.text
        }
        {
          " "
        }
      </>
    )
  }

}

export default ListItem;
