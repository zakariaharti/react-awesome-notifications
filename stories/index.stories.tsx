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
          title="Get ready for it !"
          body={'Uopn a homely object love can wink !!'}
          level="primary"
          duration={300}
          dismissDelay={null}
          onDismiss={() => console.log('dismissed')}
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
