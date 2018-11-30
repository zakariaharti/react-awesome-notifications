import * as React from 'react';
import { storiesOf } from '@storybook/react';
/*import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import styled from 'styled-components';*/
import { Provider } from 'react-redux';

import store from './store';
import PlayGround from './playGround';

/*const not = {
  level: ReactNotifiable.notificationLevel.PRIMARY,
  dismissAfter: 5000,
  dismissible: true,
  message: '',
  position: ReactNotifiable.notificationPosition.TOP_RIGHT,
  id: 'mlk',
  allowHTML: true,
  closeButton: true
}*/

const stories = storiesOf('Notification component', module);

stories.add('first example',() => {
  return(
    <Provider store={store}>
      <PlayGround />
    </Provider>
  )
})
