import * as React from 'react';
import { mount, CommonWrapper, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { actionTypes } from '../store/types';
import { Timer } from '../helpers/misc';
import { ExpectedNotification } from '../helpers/expectedComponents'
import ConnectedNotification,{ Notification } from './Notification';
import { removeNotification } from '../store/actionCreators';
import { genNotification, mockStore } from '../helpers/configureTests';

type NoteType = CommonWrapper<ReactNotifiable.INotification,{timer: Timer}>;

describe('test <Notification /> component',() => {
  let notification: any = null;
  let store: any = null;

  beforeEach(() => {
    notification = genNotification();
    store = mockStore({ notifications: [] });
  });

  it('should mount with initiale state',() => {
    notification.dismissAfter = 0;

    let wrapper: NoteType = mount(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    expect(wrapper.state().timer).toEqual(null);

    notification.dismissAfter = 1;

    wrapper = mount(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    expect(wrapper.state().timer).toBeTruthy();
  });

  it('should update state when receiving new prop chang',() => {
    notification.dismissAfter = 0;

    let wrapper: NoteType = mount(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    expect(wrapper.state().timer).toEqual(null);

    notification.dismissAfter = 1;

    wrapper = mount(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    wrapper.setProps(notification);
    expect(wrapper.state().timer).toBeTruthy();
  });

  it('should render without errors (without title)',() => {
    notification.title = null;

    const wrapper: NoteType = shallow(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} closeNotification={removeNotification} />
    );

    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should render component with message (with html)',() => {
    notification.title = `${notification.title} <b>JS</b>`;
    notification.allowHTML = true;

    const wrapper: NoteType = shallow(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} closeNotification={removeNotification} />
    );

    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should render component with closeButton',() => {
    notification.buttons = [];
    notification.dismissible = true;
    notification.closeButton = true;

    const wrapper: NoteType = shallow(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} closeNotification={removeNotification} />
    );

    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should render component without closeButton',() => {
    notification.buttons = [];
    notification.dismissible = true;
    notification.closeButton = false;

    const wrapper: NoteType = shallow(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} closeNotification={removeNotification} />
    );

    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should render component with 2 buttons',() => {
    const wrapper: NoteType = shallow(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} closeNotification={removeNotification} />
    );

    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should render component 1 button',() => {
    delete notification.buttons[1];

    const wrapper: NoteType = shallow(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} closeNotification={removeNotification} />
    );

    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should render component without buttons',() => {
    notification.buttons = [];

    const wrapper: NoteType = shallow(
      <Notification notification={notification} closeNotification={removeNotification} />
    );
    const expectedComponent = shallow(
      <ExpectedNotification notification={notification} closeNotification={removeNotification} />
    );

    expect(wrapper.html()).toEqual(expectedComponent.html());
  });

  it('should run onMounted on componentDidMount lifecycle',() => {
    let count = 0;

    notification.onMounted = () => count++;

    mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );

    expect(count).toBe(1);
  });

  it('should run onUnMounted on componentWillUnmountMount lifecycle',() => {
    let count = 0;

    notification.onUnmounted = () => count++;

    let wrapper = mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );

    wrapper.unmount();
    expect(count).toBe(1);
  });

  it('should not throw an error in componentDidMount',() => {
    notification.onMounted = null;

    mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );
  });

  it('should not throw an error in componentWillUnmount',() => {
    notification.onUnmounted = null;

    mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );
  });

  it('should dispatch an action to remove the notification',() => {
    notification.buttons = [];
    notification.closeButton = false;
    notification.dismissible = true;

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );

    const expectedAction = {
      type: actionTypes.REMOVE_NOTIFICATION,
      payload: notification.id
    };

    wrapper.find(ConnectedNotification).simulate('click');
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('should dispatch an action to remove the notification (when close button is clicked)',() => {
    notification.buttons = [];
    notification.closeButton = true;
    notification.dismissible = true;

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );

    const expectedAction = {
      type: actionTypes.REMOVE_NOTIFICATION,
      payload: notification.id
    };

    wrapper.find('.notification-close-btn span.close-btn').simulate('click');
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('should dispatch an action to remove the notification (when dismissible is false)',() => {
    notification.dismissible = false;

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );

    const expectedAction = {
      type: actionTypes.REMOVE_NOTIFICATION,
      payload: notification.id
    };

    wrapper.find('notification-button').first().simulate('click');
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('should remove the notification after dismissAfter',(done) => {
    const expectedAction = {
      type: actionTypes.REMOVE_NOTIFICATION,
      payload: notification.id
    };

    notification.dismissAfter = 10;
    notification.buttons = [];

    mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );

    expect(store.getActions()).toEqual([]);
    setTimeout(() => {
      expect(store.getActions()).toEqual([expectedAction]);
      done();
    }, 15);
  });

  it('should not remove the notification when hovering over it',(done) => {
    notification.dismissAfter = 100;
    notification.buttons = [];

    const expectedAction = {
      type: actionTypes.REMOVE_NOTIFICATION,
      payload: notification.id
    };

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    ).find(ConnectedNotification);

    setTimeout(() => {
      wrapper.simulate('mouseEnter');
    }, 50);

    setTimeout(() => {
      expect(store.getActions()).toEqual([]);

      wrapper.simulate('mouseLeave');
    }, 150);

    setTimeout(() => {
      expect(store.getActions()).toEqual([expectedAction]);

      done();
    }, 410);
  });

  it('should not remove the notification when dismissible is false',() => {
    notification.dismissible = false;

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );

    wrapper.find(ConnectedNotification).simulate('click');
    expect(store.getActions()).toEqual([]);
  });

  it('should not remove the notification when closeButton is true',() => {
    notification.dismissible = true;
    notification.buttons = [];
    notification.closeButton = true;

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );

    wrapper.find(ConnectedNotification).simulate('click');
    expect(store.getActions()).toEqual([]);
  });

  it('should not remove the notification when dismissAfter is 0',(done) => {
    notification.dismissAfter = 0;

    mount(
      <Provider store={store}>
        <ConnectedNotification
          notification={notification}
          closeNotification={removeNotification}
        />
      </Provider>
    );

    setTimeout(() => {
      expect(store.getActions()).toEqual([]);
      done();
    }, 10);
  });
});
