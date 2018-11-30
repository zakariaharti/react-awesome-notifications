import {
  actionTypes,
  IAddNotification,
  IRemoveAllNotifications,
  IRemoveNotification,
  IUpdateNotification
} from './types';

/**
 * add a new notification (action creator)
 *
 * @param Object not notification
 * @returns {type: string, payload: Object}
 */
export const addNotification = (not: ReactNotifiable.INotification): IAddNotification => {
  return{
    type: actionTypes.ADD_NOTIFICATION,
    payload: not
  }
}

/**
 * remove a notification (action creator)
 *
 * @param Object not notification
 * @returns {type: string, payload: Object}
 */
export const removeNotification = (id: any): IRemoveNotification => {
  return{
    type: actionTypes.REMOVE_NOTIFICATION,
    payload: id
  }
}

/**
 * update a  notification (action creator)
 *
 * @param Object not notification
 * @returns {type: string, payload: Object}
 */
export const updateNotification = (not: ReactNotifiable.INotification): IUpdateNotification => {
  return{
    type: actionTypes.UPDATE_NOTIFICATION,
    payload: not
  }
}

/**
 * remove all notifications (action creator)
 *
 * @returns {type: string}
 */
export const removeAllNotifications = (): IRemoveAllNotifications => {
  return{
    type: actionTypes.REMOVE_ALL_NOTIFICATIONS,
  }
}
