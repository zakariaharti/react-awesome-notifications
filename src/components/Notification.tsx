import * as React from 'react';
import { connect } from 'react-redux';

import { removeNotification } from '../store/actionCreators';
import { IRemoveNotification } from '../store/types';
import { StyledNotification } from './StyledComponents/StyledNotification';

interface NotificationProps{
  notification: ReactNotifiable.INotification;
  closeNotification: (not: ReactNotifiable.INotification) => IRemoveNotification;
}

interface NotificationState{
  timer: NodeJS.Timer;
}

/**
 * the Notification class component
 *
 * @author Zakaria harti
 */
class Notification extends React.Component<NotificationProps,NotificationState>{

  /**
   * state of the Notification component
   */
  state: NotificationState = {
    timer: setTimeout(() => {
      this.close();
    },this.props.notification.dismissAfter),
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
      notification.onMounted();
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
        timer: setTimeout(() => {
          this.close();
        },nextProps.notification.dismissAfter)
      })
    }
  }

  /**
   * close the notification
   *
   * @private
   * @returns {void}
   */
  private close = (): void => {
    const { closeNotification, notification } = this.props;
    closeNotification(notification);
  }

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
   * get button action callback
   */
  private getButtonAction = (callback: any) => {
    if(callback && typeof callback === 'function'){
      return callback();
    }
    return (): any => null;
  }

  /**
   * render buttons
   */
  private renderButtons = () => {
    const { buttons } = this.props.notification;
    return buttons.map(button => {
      return(
        <button key={button.label} onClick={this.getButtonAction(button.action)}>
          <span>{button.label}</span>
        </button>
      )
    })
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
    return(
      <StyledNotification
        className="wrapper"
        onClick={dismissible && !closeButton ? this.close : null}
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
              <div>
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

export default connect(null, {
  closeNotification: removeNotification
})(Notification);
