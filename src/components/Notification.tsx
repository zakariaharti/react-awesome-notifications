import * as React from 'react';
import { connect } from 'react-redux';

import { removeNotification } from '../store/actionCreators';
import { StyledNotification } from './StyledComponents/StyledNotification';
import { Timer } from '../helpers/misc';
import { NotificationProps } from '../types';
import { NotificationState } from '../types';

/**
 * Create a timer
 * @param {Number} dismissAfter
 * @param {Function} callback
 * @returns {Function|null} a Timer
 */
function createTimer(dismissAfter: number, callback: any) {
  if (dismissAfter > 0) {
    return new Timer(dismissAfter, callback);
  }
  return null;
}

/**
 * the Notification class component
 *
 * @author Zakaria harti
 */
export class Notification extends React.Component<NotificationProps,NotificationState>{
  /**
   * close the notification
   *
   * @private
   * @returns {void}
   */
  private close = () => {
    const { closeNotification, notification } = this.props;
    closeNotification(notification);
  }

  /**
   * state of the Notification component
   */
  state: NotificationState = {
    timer: createTimer(this.props.notification.dismissAfter, this.close),
  }

  /**
   * run onMounted when the component mount on the DOM
   *
   * @returns {void}
   */
  componentDidMount(){
    const { notification } = this.props;
    if(typeof notification.onMounted === 'function'){
      notification.onMounted();
    }
  }

  /**
   * run onUnMounted when the component unmount on the DOM
   *
   * @returns {void}
   */
  componentWillUnmount(){
    const { notification } = this.props;
    if(typeof notification.onUnmounted === 'function'){
      notification.onUnmounted();
    }
  }

  /**
   * update the notification timer in case of props change
   *
   * @param {object} nexProps
   */
  componentDidUpdate(nextProps: NotificationProps){
    if(nextProps.notification != this.props.notification){
      this.setState({
        timer: createTimer(nextProps.notification.dismissAfter, this.close)
      })
    }
  }

  /**
   * Pauses the timer
   * @returns {void}
   * @private
   */
  private pauseTimer = () => {
    const {timer} = this.state;
    timer.pause();
  };

  /**
   * Resumes the timer
   * @returns {void}
   * @private
   */
  private resumeTimer = () => {
    const {timer} = this.state;
    timer.resume();
  };

  /**
   * Wrap content in an object ready for HTML
   * @param {String} content a text
   * @returns {Object}
   * @private
   */
  private setHTML = (content: string): {__html: string} => {
    return {
      __html: content
    };
  };

  /**
   * render buttons
   */
  private renderButtons = () => {
    const { buttons } = this.props.notification;
    return buttons.map(button => {
      return(
        <button
          key={button.id}
          onClick={() => button.action()}
          className="react-notifiable-action-btn"
        >
          <span>{button.label}</span>
        </button>
      )
    });
  }

  /**
   * render markup
   */
  render(){
    const {
      allowHTML,
      buttons,
      closeButton,
      dismissible,
      message,
      title
    } = this.props.notification;

    const {timer} = this.state;

    if(timer){
      this.resumeTimer();
    }

    return(
      <StyledNotification
        className="wrapper"
        onClick={dismissible && !closeButton ? this.close : null}
        onMouseEnter={timer ? this.pauseTimer : null}
        onMouseLeave={timer ? this.resumeTimer : null}
      >
        <div className="container">
          <div className="not-content">
            {
              title
                ?
                allowHTML
                  ? <h4 dangerouslySetInnerHTML={this.setHTML(title)}></h4>
                  : <h4>{title}</h4>
                :
                null
            }
            {
              message
                ?
                allowHTML
                  ? <h4 dangerouslySetInnerHTML={this.setHTML(message)}></h4>
                  : <h4>{message}</h4>
                :
                null
            }
          </div>
          {
            dismissible && closeButton
            ? (
              <div className="react-notifiable-close-btn">
                <span onClick={this.close}/>
              </div>
            ) :
            null
          }
          {buttons.length
            ? (
              <div onClick={this.close}>
                {this.renderButtons()}
              </div>
            )
            :
            null
          }
        </div>
      </StyledNotification>
    )
  }
}

export default connect<NotificationProps>(null, {
  closeNotification: removeNotification
})(Notification);
