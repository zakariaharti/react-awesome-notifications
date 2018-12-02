import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import NotificationSystem from '../src';
import { addNotification } from '../src';

const StyledContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const StyledButton = styled.button`
padding: 15px 40px;
border: 2px solid;
text-transform: capitalize;
color: #ffffff;
background: #fd387b;
font-size: 1.4em;
border-radius: 3px;
cursor: pointer;
transition: .3s ease-in;

&:hover{
  background: #de316c;
  border-color: #c31852;
}
`;

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
        <StyledContainer>
          <StyledButton onClick={this.addNotification}>click me!</StyledButton>
        </StyledContainer>
      </div>
    );
  }
}
// @ts-ignore
export default connect(undefined, {addNotification})(PlayGround);
