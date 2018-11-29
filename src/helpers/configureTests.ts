import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

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
    id: 8,
    title: 'hello world',
    message: 'hello text',
    position: 'tl',
    level: 'primary',
    dismissible: true,
    dismissAfter: 4000,
    allowHTML: false,
    closeButton: true,
    buttons: [{
      id: 'mlf',
      label: 'submit',
      action: () => {
        return numb * 2;
      }
    }, {
      id: 'kjf',
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
