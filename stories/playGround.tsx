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
      dismissAfter: 0,
      dismissible: true,
      title: 'a new react.js version has been released',
      message: 'a new react.js version has been released',
      position: 'tr',
      id: 'mlk',
      allowHTML: true,
      closeButton: true,
      buttons: [
        {
          label: 'submit'
        }
      ]
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
