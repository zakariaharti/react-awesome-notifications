import * as React from 'react';
import { mount, CommonWrapper } from 'enzyme';

import { NotificationContainerProps } from '../types';
import { NotificationSystem } from './NotificationSystem';

type NoteType = CommonWrapper<NotificationContainerProps,{}>;

describe('testing <NotificationSystem />',() => {

  it('should mount with default props',() => {
    let wrapper: NoteType = mount(
      <NotificationSystem  />
    );

    expect(wrapper.props().notifications).toEqual([]);
  });

});
