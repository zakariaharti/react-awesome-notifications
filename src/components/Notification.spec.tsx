import * as React from "react";
import { shallow, ShallowWrapper } from 'enzyme';

import Notification from './Notification';

describe('testing the <Notification /> component',() => {

  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Notification
        isOpen={false}
        level='success'
        title='hello world'
        body='body text is coming soon'
        uid='125'
        button={
          {
            label: 'comfirm'
          }
        }
      />
    );
  });

  it('should render the #awesome-notification-wrapper',() => {
    expect(wrapper.find('#awesome-notification-wrapper')).toHaveLength(1);
  });

  it('should the isOpen prop to be false',() => {
    expect(wrapper.prop('isOpen')).toBeFalsy();
  });

  it('should the state props isOpen to be false',() => {
    expect(wrapper.state('isOpen')).toBeFalsy();
  });

  it('should the state be false if the prop has been change',() => {
    wrapper.setProps({ isOpen: true });
    expect(wrapper.state('isOpen')).toBeTruthy();
  })
});
