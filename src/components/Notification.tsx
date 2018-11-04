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

interface PositionType{
  position: 'tr' | 'tl' | 'tc' | 'br' | 'bl' | 'bc';
}

const StyledNotificationWrapper = StyledTs<PositionType & {enableAnimation: boolean}>(styled.div)`
  @font-face{
    font-family: 'Open Sans';
    src: url(${fontUrl});
  }

  font-family: 'Open Sans';

  .notification-enter{
    transition: all .3s ease-out;
    opacity: .1;
    transform: translate(${props => {
       if(props.position == 'tl' || props.position == 'bl'){
         return '80em';
       }
       if(props.position == 'tr' || props.position == 'br'){
         return '-80em';
       }
       return '0';
    }}, ${props => {
       if(props.position == 'tc'){
          return '-80em';
       }
       if(props.position == 'bc'){
          return '80em';
       }
       return '0';
     }});
  }

  .notification-enter-active{
    transition: all .3s ease-out;
    opacity: 1;
    transform: translate(0,0);
  }

  .notification-enter-done{

  }

  .notification-exit{
    transition: all .3s ease-out;
    opacity: 1;
  }

  .notification-exit-active{
    transition: all .3s ease-out;
    opacity: 0;
  }

  .notification-exit-done{

  }
`;

const StyledNotificationContainer = StyledTs<ThemeType & PositionType>(styled.div)`
  position: fixed;
  width: 23em;
  min-height: 5em;
  border-radius: 6px;
  padding: 15px 20px;
  margin: 20px;
  top: ${props => props.position == 'br' ||
  props.position == 'bc' || props.position == 'bl' ? 'auto' : '0'};
  left: ${props => {
    if(props.position == 'tl' || props.position == 'bl'){
      return 'auto';
    }
    if(props.position == 'tc' || props.position == 'bc'){
      return '25%';
    }
    return '0';
  }};
  right: ${props => props.position == 'br' || props.position == 'bc' ? 'auto' : '0'};
  bottom: ${props => props.position == 'br'
  || props.position == 'bc' || props.position == 'bl' ? '0' : 'auto'};
  border-top: 1px solid ${props => props.theme.primaryColor};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background: ${props => props.theme.backgroundColor };
`;

const StyledExtendedContainer = StyledTs<PositionType & { exStyles: string}>(styled(StyledNotificationContainer))`
  ${props => props.exStyles }
`;

const StyledNotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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
      cursor: pointer;
      outline: none;
      transition: .1s ease-out;

      &:hover{
        color: rgba(255, 255, 255, 0.88);
      }
    }
  }
`;

const StyledTitle = styled.div`
  font-size: 1em;
  text-transform: capitalize;
  color: ${props => props.theme.headerColor };
  padding: 0;
  margin: 0;
`;

const StyledExtendedTitle = StyledTs<{ exStyles: string}>(styled(StyledTitle))`
  ${props => props.exStyles }
`;

const StyledNotificationBody = styled.div`
  margin: 10px 0;
  margin-bottom: 15px;
`;

const StyledParagraph = styled.div`
  color: ${props => props.theme.bodyColor };
  font-size: .8em;
`;

const StyledExtendedParagraph = StyledTs<{ exStyles: string}>(styled(StyledParagraph))`
  ${props => props.exStyles }
`;

const StyledNotificationFooter = styled.div`
  display: flex;
`;

const StyledButton = styled.div`
  border: none;
  color: rgba(255, 255, 255, 0.84);
  background: ${props => props.theme.buttonColor };
  padding: 7px 29px;
  text-transform: capitalize;
  font-weight: bold;
`;

const StyledExtendedButton = StyledTs<{ExStyles: string}>(styled(StyledButton))`
  ${props => props.ExStyles}
`;

const NotificationTitle: React.SFC<NotificationType & {exStyles: string}> = (props) => {
  if(!props.title){
    return null;
  }

  return(
    <StyledExtendedTitle exStyles={props.exStyles} {...props} >
      {props.title.length >= 35 ? props.title.slice(0,35) : props.title}
    </StyledExtendedTitle>
  );
}

const NotificationBody: React.SFC<NotificationType & {exStyles: string}> = (props) => {
  if(!props.body){
    return null;
  }

  if(typeof props.body === 'string'){
    return(
      <StyledExtendedParagraph exStyles={props.exStyles} {...props} >
        {props.body}
      </StyledExtendedParagraph>
    )
  }

  return null;
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
    title: '',
    body: '',
    duration: 300,
    dismissDelay: 4000,
    level: 'default',
    button: null,
    position: 'tr',
    showCloseIcon: true,
    uid: '',
    extendBodyStyles: '',
    extendContainerStyles: '',
    extendTitleStyles: '',
    enableAnimation: true,
    animationClassNames: 'notification'
  }

  private timeOutDelay: any;

  private notificationThemes: NotificationThemes = {
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
        },
        this.props.dismissDelay
      );
    }
  }

  componentWillUnmount(){
    window.clearTimeout(this.timeOutDelay);
  }

  private getPosition = () => this.props.position;

  private getOnDismiss = () => {
    if(this.props.onDismiss && typeof this.props.onDismiss == 'function'){
      return this.props.onDismiss();
    }
    return (): any => null;
  }

  private getOnButtonClickEvent = () => {
    if(this.props.button.onClickEvent && typeof this.props.button.onClickEvent == 'function'){
      return this.props.button.onClickEvent(this);
    }
    return (): any => null;
  }

  private getTheme = () => {
    if(this.props.level && this.notificationThemes[this.props.level]){
      return this.notificationThemes[this.props.level];
    }

    return 'default';
  }

  private getButtonExtendedStyles = () => {
    if(this.props.button.styles && typeof this.props.button.styles == 'string'){
      return this.props.button.styles;
    }
    return ``;
  }

  close = () => {
    if(this.state.isOpen){
      this.setState({ isOpen: false });
      this.getOnDismiss();
    }
  }

  render(){
    return(
      <StyledNotificationWrapper
        enableAnimation={this.props.enableAnimation}
        position={this.getPosition()}>
        <CSSTransition
          in={this.state.isOpen}
          classNames={this.props.animationClassNames}
          timeout={this.props.duration}
          unmountOnExit
        >
          {state => (
            <ThemeProvider theme={this.getTheme} >
              <StyledExtendedContainer
                exStyles={this.props.extendContainerStyles || ''}
                position={this.getPosition()} >
                <StyledNotificationHeader>
                  <NotificationTitle
                    exStyles={this.props.extendTitleStyles || ''}
                    {...this.props} />
                  <NotificationCloseIcon onClick={() => this.close()} {...this.props} />
                </StyledNotificationHeader>
                <StyledNotificationBody>
                  <NotificationBody
                    exStyles={this.props.extendBodyStyles || ''}
                    {...this.props} />
                </StyledNotificationBody>
                <StyledNotificationFooter>
                  {
                    this.props.button &&
                    <StyledExtendedButton
                      ExStyles={this.getButtonExtendedStyles()}
                      onClick={this.getOnButtonClickEvent}
                    >
                      {this.props.button.label}
                    </StyledExtendedButton>
                  }
                </StyledNotificationFooter>
              </StyledExtendedContainer>
            </ThemeProvider>
          )}
        </CSSTransition>
      </StyledNotificationWrapper>
    )
  }
};

export default Notification;
