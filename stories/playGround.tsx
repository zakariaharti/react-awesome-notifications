import * as React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from '../src';

import { addNotification } from '../src';

interface IPlayGround{
  addNotification?: (not: any) => void;
};

class PlayGround extends React.Component<IPlayGround>{

  addNotification = () => {
    this.props.addNotification({
      level: ReactNotifiable.notificationLevel.PRIMARY,
      dismissAfter: 5000,
      dismissible: true,
      message: 'what else',
      body: 'hello this is a body',
      position: 'tr',
      id: 'mlk',
      allowHTML: true,
      closeButton: true
    });
  }

  render(){
    return(
      <div>
        <NotificationSystem />
        <button onClick={this.addNotification}>click me!</button>
      </div>
    );
  }
}

/*const mapDispatchToProps = (dispatch: any, ownProps: IPlayGroundState) => {
  return{
    addNotification: dispatch(addNotification(ownProps.notification)),
  }
}*/
// @ts-ignore
export default connect(undefined, {addNotification})(PlayGround);
