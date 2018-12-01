import * as React from 'react';
import { connect } from 'react-redux';

const uuid = require('uuid/v1');

import { removeNotification } from '../store/actionCreators';
import { Timer } from '../helpers/misc';
import { NotificationProps } from '../types';
import { NotificationState } from '../types';
import {
  ExtendedStyledButton,
  ExtendedStyledButtonsContainer,
  ExtendedStyledMessage,
  ExtendedStyledNotification,
  ExtendedStyledTitle
} from './StyledComponents';

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
    closeNotification(notification.id);
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
   * get extended styles
   */
  private getStyles = (prop: string) => {
    if(typeof this.props.notification.extendStyles !== 'undefined'){
      if(typeof this.props.notification.extendStyles[prop] !== 'undefined'){
        return this.props.notification.extendStyles[prop];
      }
    }
    return ``;
  }

  /**
   * render buttons
   */
  private renderButtons = () => {
    const { buttons } = this.props.notification;
    return buttons.map(button => {
      return(
        <ExtendedStyledButton
          key={uuid()}
          onClick={() => {
            if(button.action && typeof button.action === 'function'){
              return button.action();
            }
            return null;
          }}
          level={this.props.notification.level}
          extendedStyles={this.getStyles('notificationButton')}
        >
          <span className="btn-text">{button.label}</span>
        </ExtendedStyledButton>
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
      title,
      level
    } = this.props.notification;

    const { timer } = this.state;

    if(timer){
      this.resumeTimer();
    }

    return(
      <ExtendedStyledNotification
        className={`notification-wrapper`}
        onClick={dismissible && !closeButton ? this.close : null}
        onMouseEnter={timer ? this.pauseTimer : null}
        onMouseLeave={timer ? this.resumeTimer : null}
        dismissible={dismissible}
        level={level}
        extendedStyles={this.getStyles('notificationWrapper')}
      >
        <div className='container'>
          <div className="notification-content">
            {
              title
                ?
                allowHTML
                  ?
                  <ExtendedStyledTitle
                    level={level}
                    dangerouslySetInnerHTML={this.setHTML(title)}
                    extendedStyles={this.getStyles('notificationTitle')}
                  >
                  </ExtendedStyledTitle>
                  :
                  <ExtendedStyledTitle
                    level={level}
                    extendedStyles={this.getStyles('notificationTitle')}
                  >
                    {title}
                  </ExtendedStyledTitle>
                :
                null
            }
            {
              message
                ?
                allowHTML
                  ?
                  <ExtendedStyledMessage
                    level={level}
                    dangerouslySetInnerHTML={this.setHTML(message)}
                    extendedStyles={this.getStyles('notificationMessage')}
                  >
                  </ExtendedStyledMessage>
                  :
                  <ExtendedStyledMessage
                    level={level}
                    extendedStyles={this.getStyles('notificationMessage')}
                  >
                      {message}
                  </ExtendedStyledMessage>
                :
                null
            }
          </div>
          {
            dismissible && closeButton
            ? (
              <div className={`notification-close-btn`}>
                <span className="close-btn" onClick={this.close}>&times;</span>
              </div>
            ) :
            null
          }
          {buttons && buttons.length
            ? (
              <ExtendedStyledButtonsContainer extendedStyles={this.getStyles('notificationButtonsContainer')}>
                {this.renderButtons()}
              </ExtendedStyledButtonsContainer>
            )
            :
            null
          }
        </div>
      </ExtendedStyledNotification>
    )
  }
}

export default connect<NotificationProps>(null, {
  closeNotification: removeNotification
})(Notification);
