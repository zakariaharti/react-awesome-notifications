import * as React from 'react';
import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import Notification from '../src/components/Notification';

const stories = storiesOf('Components', module);

class PlayGround extends React.Component{

  state = {
    isOpen: false
  }

  onClick = () => this.setState({ isOpen: true });

  render(){
    return(
      <React.Fragment>
        <button onClick={this.onClick}>click me!</button>

        <Notification
          isOpen={this.state.isOpen}
          title="notification title"
          body="notification body"
          onDismiss={() => console.log('hello world')}
          duration={300}
          button={{
            label: 'comfirm',
          }}
          uid={"ml"}
        />
      </React.Fragment>
    )
  }
}

stories.add(
  'Notification component',
  () => <PlayGround />
);
