import React from 'react';
import ListItem from './ListItem';

class List extends React.Component {
  
  render () {
    return this.props.bricks.map(
        brick => <ListItem key={brick.id} data={brick} />
    )
  }

}

export default List;
