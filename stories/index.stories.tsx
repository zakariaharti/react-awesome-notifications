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
      <PlayGround />
    </Provider>
  )
},{
  info: {
    inline: true,
    source: false,
    propTables: false,
    text: `
      ## Example code
    `
  }
})
