import * as React from 'react';

class Notification extends React.Component<ReactNotifiable.INotification>{
  render(){
    return(
      <div>{this.props}</div>
    )
  }
}

export default Notification;
