import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const uuidv1 = require('uuid/v1');

export const mockStore = (reducers: any) => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  return mockStore(reducers);
}

export function genNotifications(numb: number, notification = {}) {
  let notifications = [];
  for (let i = 0; i < numb; i++) {
    notifications.push(genNotification(notification));
  }
  return notifications;
}

export function genNotification(notification = {}) {
  const numb = 7;

  return Object.assign({}, {
    id: 'my_id',
    title: 'hello world',
    message: 'hello text',
    position: ReactNotifiable.notificationPosition.TOP_RIGHT,
    level: ReactNotifiable.notificationLevel.PRIMARY,
    dismissible: true,
    dismissAfter: 4000,
    allowHTML: false,
    closeButton: true,
    buttons: [{
      id: uuidv1(),
      label: 'submit',
      action: () => {
        return numb * 2;
      }
    }, {
      id: uuidv1(),
      label: 'submit',
      action: () => {
        return numb * 3;
      }
    }],
    onMounted: () => {
      return numb;
    },
    onUnmounted: () => {
      return numb * 2;
    }
  }, notification);
}
