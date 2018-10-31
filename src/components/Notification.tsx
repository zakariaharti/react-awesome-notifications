import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import StyledTs from 'styled-components-ts';

const fontUrl = require('../assets/fonts/OpenSans-Regular.ttf');

import { NotificationType } from '../../index';

interface ThemesElems{
  primaryColor: string,
  backgroundColor: string,
  headerColor: string,
  bodyColor: string,
  buttonColor: string,
  iconColor: string
}

interface NotificationThemes {
  default: ThemesElems;
  success: ThemesElems;
  error: ThemesElems;
  warning: ThemesElems;
  primary: ThemesElems;
  info: ThemesElems;
}

interface ThemeType{
  theme?: ThemesElems;
}

const StyledNotificationWrapper = styled.div`
  @font-face{
    font-family: 'Open Sans';
    src: url(${fontUrl});
  }

  font-family: 'Open Sans';

  .notification-enter{
    transition: all .3s ease-out;
    opacity: .1;
    transform: translateX(-80em);
  }

  .notification-enter-active{
    transition: all .3s ease-out;
    opacity: 1;
    transform: translateX(0);
  }

  .notification-exit{
    transition: all .3s ease-out;
    opacity: 1;
  }

  .notification-exit-active{
    transition: all .3s ease-out;
    opacity: 0;
  }
`;

const StyledNotificationContainer = StyledTs<ThemeType>(styled.div)`
  position: fixed;
  width: 23em;
  min-height: 5em;
  border-radius: 6px;
  padding: 15px 20px;
  margin: 20px;
  top: auto;
  left: 0;
  right: 0;
  border-top: 1px solid ${props => props.theme.primaryColor};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background: ${props => props.theme.backgroundColor };
`;

const StyledNotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5.notification-title{
    font-size: 1em;
    text-transform: capitalize;
    color: ${props => props.theme.headerColor };
    padding: 0;
    margin: 0;
  }

  button.close-icon{
    background: transparent;
    border: none;
    padding: 0;

    span{
      padding: 0px 6px;
      border-radius: 50%;
      background: ${props => props.theme.iconColor };
      color: #ffffff;
      font-size: 1.5em;
    }
  }
`;

const StyledNotificationBody = styled.div`
  margin: 10px 0;
  margin-bottom: 15px;

  p.notification-body{
    color: ${props => props.theme.bodyColor };
    font-size: .8em;
  }
`;

const StyledNotificationFooter = styled.div`
  button{
    border: none;
    color: rgba(255, 255, 255, 0.84);
    background: ${props => props.theme.buttonColor };
    padding: 7px 29px;
    text-transform: capitalize;
    font-weight: bold;
  }
`;

const NotificationTitle: React.SFC<NotificationType> = (props) => {
  if(!props.title){
    return null;
  }

  return(
    <h5 className="notification-title">
     {props.title.length >= 35 ? props.title.slice(0,35) : props.title}
    </h5>
  );
}

const NotificationCloseIcon: React.SFC<NotificationType & {onClick: () => void}> = (props) => {
  if(!props.showCloseIcon){
    return null;
  }

  return(
    <div>
      <button className="close-icon" onClick={props.onClick}>
        <span>&times;</span>
      </button>
    </div>
  )
}

interface NotificationState{
  isOpen: boolean;
}


class Notification extends React.Component<NotificationType,NotificationState>{

  state: NotificationState = {
    isOpen: false
  }

  static defaultProps: NotificationType = {
    isOpen: false,
    body: '',
    duration: 300,
    dismissDelay: 4000,
    level: 'default',
    button: null,
    position: 'tr',
    showCloseIcon: true,
    uid: ''
  }

  timeOutDelay: any;

  notificationThemes: NotificationThemes = {
    default: {
      primaryColor: 'rgb(82, 80, 80)',
      backgroundColor: 'rgb(82, 80, 80)',
      headerColor: '#ffffff',
      bodyColor: 'rgba(255, 255, 255, 0.8)',
      buttonColor: '#3a3a3a',
      iconColor: 'transparent'
    },
    success: {
      primaryColor: 'rgb(139, 195, 74)',
      backgroundColor: 'rgb(139, 195, 74)',
      headerColor: '#ffffff',
      bodyColor: 'rgba(255, 255, 255, 0.8)',
      buttonColor: '#5fab07',
      iconColor: 'transparent'
    },
    error: {
      primaryColor: 'rgb(255, 85, 73)',
      backgroundColor: 'rgb(255, 85, 73)',
      headerColor: '#ffffff',
      bodyColor: 'rgba(255, 255, 255, 0.8)',
      buttonColor: '#da1708',
      iconColor: 'transparent'
    },
    warning: {
      primaryColor: 'rgb(255, 152, 0)',
      backgroundColor: 'rgb(255, 152, 0)',
      headerColor: '#ffffff',
      bodyColor: 'rgba(255, 255, 255, 0.8)',
      buttonColor: '#d6850f',
      iconColor: 'transparent'
    },
    info: {
      primaryColor: 'rgb(84, 189, 236)',
      backgroundColor: 'rgb(84, 189, 236)',
      headerColor: '#ffffff',
      bodyColor: 'rgba(255, 255, 255, 0.8)',
      buttonColor: '#179dda',
      iconColor: 'transparent'
    },
    primary: {
      primaryColor: '#2196F3',
      backgroundColor: '#2196F3',
      headerColor: '#ffffff',
      bodyColor: 'rgba(255, 255, 255, 0.84)',
      buttonColor: '#03A9F4',
      iconColor: ''
    }
  };

  componentDidUpdate(prevProps: NotificationType){
    if(prevProps.isOpen !== this.props.isOpen){
      this.setState({ isOpen: this.props.isOpen});
    }

    if(this.state.isOpen && this.props.dismissDelay){
      this.timeOutDelay = window.setTimeout(
        () => {
            this.close();
            this.getOnDismiss();
        },
        this.props.dismissDelay
      );
    }
  }

  componentWillUnmount(){
    window.clearTimeout(this.timeOutDelay);
  }

  getOnDismiss = () => {
    if(this.props.onDismiss && typeof this.props.onDismiss == 'function'){
      return this.props.onDismiss(this);
    }
    return (): any => null;
  }

  getOnButtonClickEvent = () => {
    if(this.props.button.onClickEvent && typeof this.props.button.onClickEvent == 'function'){
      return this.props.button.onClickEvent(this);
    }
    return (): any => null;
  }

  getTheme = () => {
    if(this.props.level && this.notificationThemes[this.props.level]){
      return this.notificationThemes[this.props.level];
    }

    return 'default';
  }

  close = () => {
    if(this.state.isOpen){
      this.setState({ isOpen: false });
    }
  }

  render(){
    return(
      <StyledNotificationWrapper>
        <CSSTransition
          in={this.state.isOpen}
          classNames="notification"
          timeout={this.props.duration}
          unmountOnExit
        >
          {state => (
            <ThemeProvider theme={this.getTheme} >
              <StyledNotificationContainer>
                <StyledNotificationHeader>
                  <NotificationTitle {...this.props} />
                  <NotificationCloseIcon onClick={() => this.close()} {...this.props} />
                </StyledNotificationHeader>
                <StyledNotificationBody>
                  <p className="notification-body">
                    {this.props.body.length >= 55 ?
                      this.props.body.slice(0,55) : this.props.body}
                  </p>
                </StyledNotificationBody>
                <StyledNotificationFooter>
                  {
                    this.props.button &&
                    <button
                      onClick={this.getOnButtonClickEvent}
                    >
                      {this.props.button.label}
                    </button>
                  }
                </StyledNotificationFooter>
              </StyledNotificationContainer>
            </ThemeProvider>
          )}
        </CSSTransition>
      </StyledNotificationWrapper>
    )
  }
};

export default Notification;
