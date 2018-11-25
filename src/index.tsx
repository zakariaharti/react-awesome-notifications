import NotificationSystem from './components/NotificationSystem';

import {
  addNotificationThunk as addNotification,
  notifyThunk as notify,
  updateNotificationThunk as updateNotification
} from './store/thunks';

import { 
  removeAllNotifications,
  removeNotification
} from './store/actionCreators';

import reducer from './store/reducers';

export {
  addNotification,
  notify,
  updateNotification,
  removeNotification,
  removeAllNotifications,
  reducer
};

export default NotificationSystem;
