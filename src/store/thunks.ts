import { Dispatch } from 'redux';
import uuid from 'uuid/v1';

import {
  addNotification,
  updateNotification
} from './actionCreators';
import { IRootState } from './types';

/**
 * thunk action creator for adding a new notification
 *
 * @param Object notification
 */
export const addNotificationThunk = (notification: ReactNotifiable.INotification) => (dispatch: Dispatch) => {
   if(!notification.id){
     notification.id = uuid();
   }
   dispatch(addNotification(notification));

   return notification;
}

/**
 * thunk action creator for updating notification
 *
 * @param Object notification
 */
export const updateNotificationThunk = (notification: ReactNotifiable.INotification) => (dispatch: Dispatch) => {
   if(!notification.id){
     throw new Error('notification must have an id property to be updated');
   }
   dispatch(updateNotification(notification));

   return notification;
}

/**
 * thunk action creator for creating or updating a notification
 *
 * @param Object notification
 */
export const notifyThunk = (notification: ReactNotifiable.INotification) =>
 (dispatch: Dispatch, getState: () => IRootState) => {
   const notifications = getState().notifications;
   const doesExists = notifications.find(not => not.id == notification.id);

   if(doesExists){
     dispatch(updateNotification(notification));
   }

   return dispatch(addNotification(notification));
}
