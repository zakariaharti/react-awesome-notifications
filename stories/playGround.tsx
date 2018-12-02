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
      position: 'bc',
      id: 'mlk',
      allowHTML: true,
      closeButton: true,
      buttons: [
        {
          label: 'submit'
        }
      ],
      extendStyles: {
        notificationWrapper: `
          background: pink
        `
      }
    });
  }

  render(){
    return(
      <div>
        <NotificationSystem />
        <div>
          <button onClick={this.addNotification}>click me!</button>
        </div>
      </div>
    );
  }
}
// @ts-ignore
export default connect(undefined, {addNotification})(PlayGround);
