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
outline: none;
text-transform: capitalize;
color: #ffffff;
background: #fd387b;
font-size: 1.4em;
border-radius: 3px;
cursor: pointer;
transition: .1s ease-in;

&:hover{
  background: #de316c;
}
&:focus{
  border-color: #c31852;
}
`;

interface IPlayGround{
  nots: ReactNotifiable.INotification[];
  addNotification?: (not: any) => void;
};

class PlayGround extends React.Component<IPlayGround>{

  addNotification = () => {
    this.props.nots.map(not => {
      this.props.addNotification(not);
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
