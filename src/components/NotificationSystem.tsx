import * as React from 'react';
import {connect} from 'react-redux';

import NotificationContainer from './NotificationContainer';
import {IRootState} from '../store/types';
import {
  StyledNotificationSystem,
  GlobalStyles
} from './StyledComponents';

interface NotificationSystemProps{
  notifications: ReactNotifiable.INotification[];
  filter: () => void;
}

interface NotificationSystemState{
  windowWidth: number | any;
}

/**
 * the NotificationContainer class component
 *
 * @author zakaria harti
 */
export class NotificationSystem extends React.Component<NotificationSystemProps,NotificationSystemState> {

  state: NotificationSystemState = {
    windowWidth: window.innerWidth
  };

  static defaultProps: Partial<NotificationSystemProps> = {
    notifications: []
  };

  /**
   * Add resize listener to update window width when the window is resized
   * @returns {void}
   */
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowWidth);
  }

  /**
   * Remove resize listener
   * @returns {void}
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  /**
   * Update window width
   * @returns {void}
   * @private
   */
  private updateWindowWidth = () => {
    this.setState({windowWidth: window.innerWidth});
  };

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

    if (this.state.windowWidth < 768) {
      return (
        <NotificationContainer
          key={768}
          position={ReactNotifiable.notificationPosition.TOP_RIGHT}
          notifications={notifications}
        />
      );
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
