import * as React from 'react';
import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
//import styled from 'styled-components';
import { Provider } from 'react-redux';

import store from './store';
import PlayGround from './playGround';

// @ts-ignore
const stories = storiesOf('React awesome notifications', module).addDecorator(withInfo);

// @ts-ignore
stories.add('welcome',() => {
  return(
    <Provider store={store}>
      <PlayGround
        nots={
          [
            {
              level: ReactNotifiable.notificationLevel.PRIMARY,
              dismissAfter: 0,
              dismissible: true,
              title: 'a new react.js version has been released',
              message: 'a new react.js version has been released',
              position: 'tr',
              id: 'mlk',
              allowHTML: true,
              closeButton: true,
              buttons: [
                {
                  label: 'submit'
                }
              ]
            },
            {
              level: ReactNotifiable.notificationLevel.INFO,
              dismissAfter: 0,
              dismissible: true,
              title: 'it\'s been a while no see',
              message: 'a new react.js version has been released',
              position: 'bl',
              id: 'mlkfg',
              allowHTML: true,
              closeButton: true,
              buttons: [
                {
                  label: 'show'
                }
              ]
            },
            {
              level: ReactNotifiable.notificationLevel.SUCCESS,
              dismissAfter: 0,
              dismissible: true,
              title: 'it\'s been a while no see',
              message: 'a new react.js version has been released',
              position: 'bl',
              id: 'mlkfghj',
              allowHTML: true,
              closeButton: true,
              buttons: [
                {
                  label: 'show'
                }
              ]
            }
          ]
        }
      />
    </Provider>
  )
},{
  info: {
    inline: true,
    source: false,
    propTables: false,
    text: `
      ## Description
      see more on [react-awesome-notifications](https://github.com/zakariaharti/react-awesome-notifications.git)

      ## Installing
          yarn add react-awesome-notifications

      ## Example code


           import NotificationSystem from 'react-awesome-notifications';
           import {connect} from 'react-redux';

           class MyComponent extends React.Component{

             state = {
              nots: [
                {
                 level: 'primary',
                 dismissAfter: 0,
                 dismissible: true,
                 title: 'a new react.js version has been released',
                 message: 'a new react.js version has been released',
                 position: 'tr',
                 id: 'mlk',
                 allowHTML: true,
                 closeButton: true,
                 buttons: [
                  {
                    label: 'submit'
                  }
                ]
              },
              {
                level: 'info',
                dismissAfter: 0,
                dismissible: true,
                title: 'it\'s been a while no see',
                message: 'a new react.js version has been released',
                position: 'bl',
                id: 'mlkfg',
                allowHTML: true,
                closeButton: true,
                buttons: [
                {
                  label: 'show'
                }
              ]
             },
             {
               level: 'success',
               dismissAfter: 0,
               dismissible: true,
               title: 'it\'s been a while no see',
               message: 'a new react.js version has been released',
               position: 'bl',
               id: 'mlkfghj',
               allowHTML: true,
               closeButton: true,
               buttons: [
                {
                  label: 'show'
                }
              ]
             }
           ]
           };

           addNotification = () => {
              this.state.nots.map(not => {
                this.props.addNotification(not);
              });
            }

           render(){
             return(
               <div>
                 <NotificationSystem />
                 <div>
                     <button onClick={this.addNotification}>click me!</button>
                 </div>
               </div>
             );
           }
          }
          export default connect(undefined, {addNotification})(PlayGround);

    `
  }
});

// @ts-ignore
const stories2 = storiesOf('React awesome notifications/Examples', module).addDecorator(withInfo);

// @ts-ignore
stories.add('basic usage (dismissible)',() => {
  return(
    <Provider store={store}>
      <PlayGround
        nots={
          [
            {
              level: ReactNotifiable.notificationLevel.INFO,
              dismissAfter: 0,
              dismissible: true,
              title: 'a new react.js version has been released',
              message: 'a new react.js version has been released',
              position: 'tl',
              id: 'mlk',
              allowHTML: true,
              closeButton: false,
              buttons: [
                {
                  label: 'submit'
                }
              ]
            },
            {
              level: ReactNotifiable.notificationLevel.SUCCESS,
              dismissAfter: 0,
              dismissible: true,
              title: 'a new react.js version has been released',
              message: 'a new react.js version has been released',
              position: 'tr',
              id: 'mlkdd',
              allowHTML: true,
              closeButton: false,
              buttons: [
                {
                  label: 'submit'
                }
              ]
            },
            {
              level: ReactNotifiable.notificationLevel.WARNING,
              dismissAfter: 0,
              dismissible: true,
              title: 'a new react.js version has been released',
              message: 'a new react.js version has been released',
              position: 'bc',
              id: 'mlkhj',
              allowHTML: true,
              closeButton: false,
              buttons: [
                {
                  label: 'submit'
                }
              ]
            }
          ]
        }
      />
    </Provider>
  )
},{
  info: {
    inline: true,
    source: false,
    propTables: false,
  }
});

// @ts-ignore
stories.add('dismiss after duration',() => {
  return(
    <Provider store={store}>
      <PlayGround
        nots={
          [
            {
              level: ReactNotifiable.notificationLevel.ERROR,
              dismissAfter: 5000,
              dismissible: true,
              title: 'I will dismiss in 5s',
              message: 'here is the body',
              position: 'tl',
              id: 'mlk',
              allowHTML: true,
              closeButton: true,
              buttons: [
                {
                  label: 'submit'
                }
              ]
            },
            {
              level: ReactNotifiable.notificationLevel.SUCCESS,
              dismissAfter: 2000,
              dismissible: true,
              title: 'I will dismiss in 2s',
              message: 'here is the body',
              position: 'tr',
              id: 'mlkdd',
              allowHTML: true,
              closeButton: true,
              buttons: [
                {
                  label: 'submit'
                }
              ]
            },
            {
              level: ReactNotifiable.notificationLevel.WARNING,
              dismissAfter: 0,
              dismissible: true,
              title: 'I will stay forever until you click me',
              message: 'here is the body',
              position: 'bc',
              id: 'mlkhj',
              allowHTML: true,
              closeButton: true,
              buttons: [
                {
                  label: 'submit'
                }
              ]
            },
            {
              level: ReactNotifiable.notificationLevel.PRIMARY,
              dismissAfter: 10000,
              dismissible: true,
              title: 'I will dimiss in 10s',
              message: 'here is the body',
              position: 'bl',
              id: 'mlkhfj',
              allowHTML: true,
              closeButton: true,
              buttons: [
                {
                  label: 'submit'
                }
              ]
            }
          ]
        }
      />
    </Provider>
  )
},{
  info: {
    inline: true,
    source: false,
    propTables: false,
  }
});
