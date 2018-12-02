import * as React from 'react';
import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
//import styled from 'styled-components';
import { Provider } from 'react-redux';

import store from './store';
import PlayGround from './playGround';

// @ts-ignore
const stories = storiesOf('Notification component', module).addDecorator(withInfo);

// @ts-ignore
stories.add('first example',() => {
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
      ## Example code


           import NotificationSystem from 'react-awesome-notifications';
           import {connect} from 'react-redux';

           class MyComponent extends React.Component>{

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
})
