import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import styled from 'styled-components';

import Notification from '../src/components/Notification';
//import NotificationStack from '../src/components/NotificationStack';

// @ts-ignore
const stories = storiesOf('Notification component', module);

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
  padding: 5em 0;

  .btn-not{
    padding: 10px 20px;
    text-transform: capitalize;
    color: #ffffff;
    border: none;
    background: #03A9F4;
    font-size: 1.2em;
    border-radius: 6px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: .3s ease-out;

    &:hover{
      background-color: #077fb5;
    }

    &:focus{
      border-color: #21a5e0;
    }
  }
`;


// @ts-ignore
stories.addDecorator(withInfo({
  header: true,
  inline: true,
  text: `
  source code

  ~~~js
    class MyComponent extends React.Component{
      state = {
        isOpen: false;
      }

      onClick = () => this.setState({ isOpen: !this.state.isOpen });

      render(){
        return(
          <React.fragment>
            <button onClick={this.onClick}>click me!</button>

            <Notification
              isOpen={this.state.isOpen}
              title="my titile"
              body="my body text here"
              dismissDelay={null} // for forever
              onDismiss={() => console.log('dismissed')}
            />
          </React.fragment />
        )
      }
    }
  ~~~
  `,
  source: false,
  propTables: false
})).add(
  'Notification basic usage',
  () => <PlayGround render={(state: any,onClick: any) => {
    return(
      <StyledContainer>
        <button className="btn-not" onClick={onClick}>click me!</button>

        <Notification
          isOpen={state.isOpen}
          dismissDelay={4000}
          onDismiss={action('notification dismissed')}
          {...state.exampleOne}
        />

      </StyledContainer>
    )
  }} />);


stories.addDecorator(withInfo({
  header: true,
  inline: true,
  text: `
  source code

    ~~~js
      class MyComponent extends React.Component{
        state = {
          isOpen: false;
        }

        onClick = () => this.setState({ isOpen: !this.state.isOpen });

        render(){
          return(
            <React.fragment>
              <button onClick={this.onClick}>click me!</button>

              <Notification
                isOpen={this.state.isOpen}
                title="my titile"
                body="my body text here"
                dismissDelay={4000} // will dismiss on 4s
                onDismiss={() => console.log('dismissed')}
              />
            </React.fragment />
          )
        }
      }
    ~~~
    `,
    source: false,
    propTables: false
})).add(
  'dismissble notifications',
  () => <PlayGround render={(state: any,onClick: any) => {
      return(
        <StyledContainer>
          <button className="btn-not" onClick={onClick}>click me!</button>

          <Notification
            isOpen={state.isOpen}
            dismissDelay={4000}
            onDismiss={action('notification dismissed')}
            {...state.exampleOne}
          />

        </StyledContainer>
      )
}} />);

    stories.addDecorator(withInfo({
      header: true,
      inline: true,
      text: `
      source code

      ~~~js
        class MyComponent extends React.Component{
          state = {
            isOpen: false;
          }

          onClick = () => this.setState({ isOpen: !this.state.isOpen });

          render(){
            return(
              <React.fragment>
                <button onClick={this.onClick}>click me!</button>

                <Notification
                  isOpen={this.state.isOpen}
                  title="my titile"
                  body="my body text here"
                  dismissDelay={null} // for forever
                  onDismiss={() => console.log('dismissed')}
                />
              </React.fragment />
            )
          }
        }
      ~~~
      `,
      source: false,
      propTables: false
    })).add(
      'positioning notifications',
      () => <PlayGround render={(state: any,onClick: any) => {
        return(
          <StyledContainer>
            <button className="btn-not" onClick={onClick}>click me!</button>

            <Notification
              isOpen={state.isOpen}
              dismissDelay={4000}
              position='br'
              onDismiss={action('notification dismissed')}
              {...state.exampleOne}
            />

          </StyledContainer>
        )
      }} />);

      stories.addDecorator(withInfo({
        header: true,
        inline: true,
        text: `
        source code

        ~~~js
          class MyComponent extends React.Component{
            state = {
              isOpen: false;
            }

            onClick = () => this.setState({ isOpen: !this.state.isOpen });

            render(){
              return(
                <React.fragment>
                  <button onClick={this.onClick}>click me!</button>

                  <Notification
                    isOpen={this.state.isOpen}
                    title="my titile"
                    level="warning"
                    body="my body text here"
                    dismissDelay={null} // for forever
                    onDismiss={() => console.log('dismissed')}
                  />
                </React.fragment />
              )
            }
          }
        ~~~
        `,
        source: false,
        propTables: false
      })).add(
        'variation',
        () => <PlayGround render={(state: any,onClick: any) => {
          return(
            <StyledContainer>
              <button className="btn-not" onClick={onClick}>click me!</button>

              <Notification
                isOpen={state.isOpen}
                dismissDelay={4000}
                onDismiss={action('notification dismissed')}
                level="warning"
                {...state.exampleOne}
              />

            </StyledContainer>
          )
        }} />);
