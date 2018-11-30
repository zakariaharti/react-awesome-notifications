import {
  actions,
  actionTypes
} from './types';

/**
 * default notification
 */
export const defaultNotification: ReactNotifiable.INotification = {
  level: ReactNotifiable.notificationLevel.PRIMARY,
  dismissAfter: 5000,
  dismissible: true,
  message: '',
  position: ReactNotifiable.notificationPosition.TOP_RIGHT,
  id: '',
  allowHTML: true,
  closeButton: true
}

/**
 * default state
 */
const defaultState: ReactNotifiable.INotification[] | [] = []
/**
 * main store reducer
 *
 * @param {Object} state
 * @param {{type: string, payload: {Object}}} action
 */
const reducer = (
  state: ReactNotifiable.INotification[] | [] = defaultState,
  action: actions) => {
  switch(action.type){
    case actionTypes.ADD_NOTIFICATION:
      const notification = Object.assign({},defaultNotification,action.payload);
      return [
        ...state,
        notification
      ];
    break;

    case actionTypes.UPDATE_NOTIFICATION:
      // @ts-ignore
      return state.map((notification: ReactNotifiable.INotification) => {
        if(notification.id == action.payload.id){
          return Object.assign({},defaultNotification,action.payload);
        }
      });
    break;

    case actionTypes.REMOVE_NOTIFICATION:
      // @ts-ignore
      return state.filter(
        (notification: ReactNotifiable.INotification) => notification.id !== action.payload
      );
    break;

    case actionTypes.REMOVE_ALL_NOTIFICATIONS:
      return [];
    break;


    default:
      return state;
  }
};

export default reducer;
