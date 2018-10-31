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
          body="hello Mr. james I'm so excited about the new conf.."
          level="default"
          duration={300}
          onDismiss={(not) => console.log(not)}
          button={{
            label: 'comfirm',
            onClickEvent: (not) => not.close()
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
