import * as React from 'react';
import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import styled from 'styled-components';

// @ts-ignore
import Notification from '../src/Components/Notification';
//import NotificationStack from '../src/components/NotificationStack';

// @ts-ignore
const stories = storiesOf('Notification basic usage', module).addDecorator(withInfo);

class PlayGround extends React.Component<{render:any}>{

  state = {
    isOpen: false,
    nots: [
      {
        level: 'primary',
        title: 'hello world',
        body: 'body text is coming soon',
        uid: '123',
        duration: 4000,
        button: {
          label: 'comfirm'
        }
      },
      {
        level: 'error',
        title: 'hello world',
        body: 'body text is coming soon',
        uid: '124',
        button: {
          label: 'comfirm'
        }
      },
      {
        level: 'success',
        title: 'hello world',
        body: 'body text is coming soon',
        uid: '125',
        button: {
          label: 'comfirm'
        }
      }
    ],
    exampleOne: {
      level: 'primary',
      title: 'hello world',
      body: 'upon a homely object love can wink!!',
      uid: '123',
      duration: 4000,
      button: {
        label: 'got it!'
      }
    }
  }

  onClick = () => this.setState({ isOpen: !this.state.isOpen });

  render(){
    return this.props.render(this.state,this.onClick)
  }
}

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15em 0;

  .btn-not{
    padding: 10px 20px;
    text-transform: capitalize;
    color: #ffffff;
    border: none;
    background: #03A9F4;
    font-size: 1.2em;
    border-radius: 6px;
    cursor: pointer;
    transition: .3s ease-out;

    &:hover{
      background-color: #077fb5;
    }
  }
`;

stories
.add(
  'Notification component',
  () => <PlayGround render={(state: any,onClick: any) => {
    return(
      <StyledContainer>
        <button className="btn-not" onClick={onClick}>click me!</button>

        <Notification
          isOpen={state.isOpen}
          {...state.exampleOne}
        />

      </StyledContainer>
    )
  }} />
);
