import { genNotification, mockStore } from '../helpers/configureTests';
import { removeAllNotifications, removeNotification } from './actionCreators';
import {
  addNotificationThunk,
  notifyThunk
} from './thunks';
import reducer, { defaultNotification } from './reducers';
import { actionTypes } from './types';

describe('testing store',() => {
  let notification: any;

  beforeEach(() => {
    notification = genNotification();
  });

  describe('actions',() => {
    describe('addNotification() thunk action creator',() => {
      let store: any = null;

      beforeEach(() => {
        store = mockStore({ notifications: [] });
      });

      it('should create an action to add a new notifiction',() => {
        const id = 'my_id';
        notification.id = id;
        notification.level = 'success';

        const notAdded = store.dispatch(addNotificationThunk(notification));
        const expectedAction = {
          type: actionTypes.ADD_NOTIFICATION,
          payload: Object.assign({}, notification, {
            id: notAdded.id,
            level: ReactNotifiable.notificationLevel.SUCCESS
          })
        };

        expect(notAdded.id).toEqual(id);
        expect(store.getActions()).toEqual([expectedAction]);
      });
    });
    describe('notify() thunk action creator',() => {
      let store: any = null;

      beforeEach(() => {
        store = mockStore({ notifications: [notification] });
      });

      it('should create an action to add a new notifiction',() => {
        store = mockStore({ notifications: [] });

        store.dispatch(notifyThunk(notification));
        const expectedAction = {
          type: actionTypes.ADD_NOTIFICATION,
          payload: notification
        };

        expect(store.getActions()).toEqual([expectedAction]);
      });

      it('should create a notification without id',() => {
        store = mockStore({ notifications: [] });
        delete notification.id;

        const added = store.dispatch(notifyThunk(notification));
        const expectedAction = {
          type: actionTypes.ADD_NOTIFICATION,
          payload: Object.assign({}, notification, {
            id: added.id
          })
        };

        expect(store.getActions()).toEqual([expectedAction]);
      });

      it('should update a notification',() => {
        const expectedAction = {
          type: actionTypes.UPDATE_NOTIFICATION,
          payload: notification
        };

        store.dispatch(notifyThunk(notification));

        expect(store.getActions()).toEqual([expectedAction]);
      });
    });
    describe('removeNotification() actions',() => {
      it('should remove a notification',() => {
        const expectedAction = {
          type: actionTypes.REMOVE_NOTIFICATION,
          payload: 'my_id'
        };
        expect(removeNotification('my_id')).toEqual(expectedAction);
      });
      it('should remove a all notification',() => {
        const expectedAction = {
          type: actionTypes.REMOVE_ALL_NOTIFICATIONS,
        };
        expect(removeAllNotifications()).toEqual(expectedAction);
      });
    });
  });

  describe('reducers',() => {
    it('should returns the iniale state',() => {
      // @ts-ignore
      expect(reducer(undefined, {})).toEqual([]);
    });

    it('should handle ADD_NOTIFICATION',() => {
      const not = genNotification();

      expect(reducer([],{
        type: actionTypes.ADD_NOTIFICATION,
        payload: notification
      })).toEqual([notification]);
      expect(reducer([notification],{
        type: actionTypes.ADD_NOTIFICATION,
        payload: not
      })).toEqual([notification,not]);
    });

    it('should handle ADD_NOTIFICATION with default props',() => {
      delete notification.level;
      delete notification.dismissAfter;
      delete notification.dismissible;
      delete notification.message;
      delete notification.position;
      delete notification.allowHTML;
      delete notification.closeButton;

      const state = reducer([],{
        type: actionTypes.ADD_NOTIFICATION,
        payload: notification
      })[0];

      expect(state.level).toEqual(defaultNotification.level);
      expect(state.dismissAfter).toEqual(defaultNotification.dismissAfter);
      expect(state.dismissible).toEqual(defaultNotification.dismissible);
      expect(state.message).toEqual(defaultNotification.message);
      expect(state.position).toEqual(defaultNotification.position);
      expect(state.allowHTML).toEqual(defaultNotification.allowHTML);
      expect(state.closeButton).toEqual(defaultNotification.closeButton);
    });

    it('should handle UPDATE_NOTIFICATION',() => {
      expect(reducer([notification],{
        type: actionTypes.UPDATE_NOTIFICATION,
        payload: notification
      })).toEqual([notification]);
    });

    it('should handle UPDATE_NOTIFICATION with default props',() => {
      delete notification.level;
      delete notification.dismissAfter;
      delete notification.dismissible;
      delete notification.message;
      delete notification.position;
      delete notification.allowHTML;
      delete notification.closeButton;

      const state = reducer([notification],{
        type: actionTypes.UPDATE_NOTIFICATION,
        payload: notification
      })[0];

      expect(state.level).toEqual(defaultNotification.level);
      expect(state.dismissAfter).toEqual(defaultNotification.dismissAfter);
      expect(state.dismissible).toEqual(defaultNotification.dismissible);
      expect(state.message).toEqual(defaultNotification.message);
      expect(state.position).toEqual(defaultNotification.position);
      expect(state.allowHTML).toEqual(defaultNotification.allowHTML);
      expect(state.closeButton).toEqual(defaultNotification.closeButton);
    });

    it('should handle REMOVE_NOTIFICATION',() => {
      expect(reducer([notification],{
        type: actionTypes.REMOVE_NOTIFICATION,
        payload: notification.id
      })).toEqual([]);
    });

    it('should handle REMOVE_ALL_NOTIFICATIONS',() => {
      expect(reducer([notification],{
        type: actionTypes.REMOVE_ALL_NOTIFICATIONS,
      })).toEqual([]);
    });
  });
});
