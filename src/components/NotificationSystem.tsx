import * as React from 'react';
import {connect} from 'react-redux';

import NotificationContainer from './NotificationContainer';
import {IRootState} from '../store/types';
import {
  StyledNotificationSystem,
  GlobalStyles
} from './StyledComponents';

interface NotificationContainerProps{
  notifications: ReactNotifiable.INotification[];
  filter: () => void;
}

/**
 * the NotificationContainer class component
 *
 * @author zakaria harti
 */
export class NotificationSystem extends React.Component<NotificationContainerProps> {

  static defaultProps: Partial<NotificationContainerProps> = {
    notifications: []
  }

  /**
   * render Notification Containers
   *
   * @returns {ReactElement}
   * @private
   */
  private renderNotificationContainers = () => {
    const { filter } = this.props;
    const containers = [];
    const positions = ['tr','tc','tl','br','bc','bl'];

    let notifications = this.props.notifications;

    if(filter && typeof filter === 'function'){
      notifications = notifications.filter(filter);
    }

    containers.push(positions.map(position => {
      const notifs = this.props.notifications.filter(notif => {
        return notif.position === position;
      });

      return(
        <NotificationContainer
          key={position}
          position={position}
          notifications={notifs}
        />
      )
    }));
    return containers;
  }

  render(){
    return(
      <StyledNotificationSystem>
        <GlobalStyles />
        {this.renderNotificationContainers()}
      </StyledNotificationSystem>
    )
  }
}

/**
 * map state to props
 *
 * @param {state} state
 * @returns {object}
 */
const mapStateToProps = (state: IRootState) : IRootState => {
  return{
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(NotificationSystem);
