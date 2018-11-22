export interface IRootState{
  notifications: ReactNotifiable.INotification[] | [];
}

export enum actionTypes {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
  UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION',
  REMOVE_ALL_NOTIFICATIONS = 'REMOVE_ALL_NOTIFICATIONs',
}

export interface IAddNotification{
  type: actionTypes.ADD_NOTIFICATION;
  payload: ReactNotifiable.INotification;
}

export interface IRemoveNotification{
  type: actionTypes.REMOVE_NOTIFICATION;
  payload: ReactNotifiable.INotification;
}

export interface IUpdateNotification{
  type: actionTypes.UPDATE_NOTIFICATION;
  payload: ReactNotifiable.INotification;
}

export interface IRemoveAllNotifications{
  type: actionTypes.REMOVE_ALL_NOTIFICATIONS;
}

export type actions = IAddNotification |
                      IRemoveNotification |
                      IRemoveAllNotifications |
                      IUpdateNotification
