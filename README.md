# React-awesome-notifications
[![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/zakariaharti/react-awesome-notifications/blob/master/LICENSE)
[![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://zakariaharti.github.io/react-awesome-notifications/)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

A beautiful fully customizable React + Redux notification System built with styled-components

## Table of contents

* [Demo](#demo)
* [Installation](#installation)
* [Integration](#integration)
* [Usage](#usage)
* [API documentation](#api-documentation)
* [Contributing guide](#contributing-guide)
* [License](#license)

## Demo

Check out the [demo](https://zakariaharti.github.io/react-awesome-notifications/)

## Installation

**using npm**

```
npm install react-awesome-notifications --save
```

**using yarn**

```
yarn add react-awesome-notifications
```

## Integration

Follow this 4 steps to integrate react-awesome-notifications to your application.

### Integrate `NotificationsSystem` React component

Render this component at the root of your web application to avoid position conflicts.

``` js
import React, {Component} from 'react';
import NotificationsSystem from 'react-awesome-notifications';

class ATopLevelComponent extends Component {
  render() {
    return (
      <div>
        <NotificationsSystem />
      </div>
    );
  }
}
```

### Apply `thunk` middleware and add notifications reducer to Redux store

1. Since react-awesome-notifications use thunk async actions creator, you must apply `thunk` middleware from [redux-thunk](https://github.com/gaearon/redux-thunk) to your Redux store. Install it with `npm install --save redux-thunk`.
2. Add notifications reducer as `notifications` to your root reducer.


``` js
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as notificationsReducer} from 'react-awesome-notifications';

// store
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore);
const store = createStoreWithMiddleware(combineReducers({
  // reducer must be mounted as `notifications` !
  notifications: notificationsReducer()
  // your reducers here
}), {});
```
> notice: reducer must be mounted as notifications

## Usage

### In a React component

If you are not familiar with react-redux library or the way to connect a React component with a Redux store, I recommend you to read [Redux documentation - Usage with React](http://redux.js.org/docs/advanced/UsageWithReact.html) to understand this example.

``` js
import React, {Component} from 'react';
import {connect} from 'react-redux';
// 1. we import `addNotification` (thunk action creator)
import { addNotification } from 'react-awesome-notifications';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    // 4. don't forget to bind method
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    const {addNotification} = this.props;
    // 3. we use `notify` to create a notification
    addNotification({
      title: 'Welcome',
      message: 'you clicked on the button',
      level: 'success',
      dismissible: true,
      dismissAfter: 3000
    });
  }

  render() {
    return (
      <div>
        // 5. we notify user when he click on the button
        <button onClick={this._onClick}>Add a notification</button>
      </div>
    );
  }
}
// 2. we map dispatch to props `addNotification` async action creator
//    here we use a shortcut instead of passing a `mapDispathToProps` function
export default connect(null, {addNotification})(MyComponent);
```

### In a Redux async action creator

If you are not familiar with async actions creator, I recommend you to read [Redux documentation - Async actions](http://redux.js.org/docs/advanced/AsyncActions.html) to understand this example.

``` js
// 1. we import `notify` (thunk action creator)
import {notify} from 'react-awesome-notifications';

// we add a notification to inform user about
// state of his request (success or failure)
const sendResetPasswordLink = (props) => (dispatch) => {
    axios.post('https://api.example.com/users/ask-reset-password', props)
      .then((res) => {
        // 2. we use `dispatch` to notify user.
        dispatch(notify({message: res.data.detail, level: 'success'}));
      })
      .catch((res) => {
       // 3. same thing here
        dispatch(notify({message: res.data.detail, level: 'error'}));
      });
    };
};
```

## API Documentation

* [Objects](https://github.com/zakariaharti/react-awesome-notifications#objects)
    * [Notification](https://github.com/zakariaharti/react-awesome-notifications#notification)
    * [Notification button](https://github.com/zakariaharti/react-awesome-notifications#notification-button)
    * [ExtendStyles](https://github.com/zakariaharti/react-awesome-notifications#extend-styles)
* [Action creators](https://github.com/zakariaharti/react-awesome-notifications#action-creators)
    * [Update or create a notification](https://github.com/zakariaharti/react-awesome-notificationsREADME.md#update-or-create-a-notification)
    * [Create a notification](https://github.com/zakariaharti/react-awesome-notifications#create-a-notification)
    * [Update a notification](https://github.com/zakariaharti/react-awesome-notifications#update-a-notification)
    * [Remove a notification](https://github.com/zakariaharti/react-awesome-notifications#remove-a-notification)
    * [Remove all notifications](https://github.com/zakariaharti/react-awesome-notifications#remove-all-notifications)
* [Notification system component](https://github.com/zakariaharti/react-awesome-notifications#notification-system-component)

### Objects

#### Notification

| Property     | Type             | Default | Description |
| ------------ | ---------------- | ------- | ----------- |
| id           | String or Number |         | ID of the notification. If not provided during creation, will be generated automatically using the universal id. |
| title        | String           |         | Title of the notification |
| message      | String           |         | Message of the notification |
| level       | String | primary | level of the notification, available options : primary, info, success, warning, error.|
| position     | String           | tr      | Position of the notification, available options : `tc`, `tl`, `tr`, `bc`, `br`, `bl`. |
| dismissible  | Boolean          | true    | Define if a notification is dismissible by clicking on it |
| dismissAfter | Number           | 5000    | Time before the notification disappear (ms). Paused when mouse is hovering the notification. 0: infinite. |
| closeButton  | Boolean          | false   | Display a close button if it is dismissible |
| buttons      | Array            |         | Array of [button](https://github.com/zakariaharti/react-awesome-notifications/blob/master/README.md#notification-button) objects. |
| onMounted        | Function         |         | Function executed at component lifecycle : `componentDidMount` |
| onUnmounted     | Function         |         | Function executed at component lifecycle : `componentWillUnmount` |
| allowHTML    | Boolean          | false   | Allow HTML in title and message of the notification |
| extendStyles      | Object            |         | add custom styles to the notification see. [ExtendStyles](https://github.com/zakariaharti/react-awesome-notifications#extend-styles). |

#### Notification button

| Property     | Type     | Default | Description |
| ------------ | :------: | :-----: | ----------- |
| label         | String   |         | Title of the button |
| action      | Function |         | Function executed when user click on it |

#### ExtendStyles

| Property     | Type     | Default | Description |
| ------------ | :------: | :-----: | ----------- |
| notificationWrapper         | String   |         | Add custom styles for the notification wrapper |
| notificationTitle         | String   |         | Add custom styles for the notification title |
| notificationMessage         | String   |         | Add custom styles for the notification message |
| notificationButtonsContainer         | String   |         | Add custom styles for the notification buttons container |
| notificationButton         | String   |         | Add custom styles for the notification button |

### Action creators

#### Update or create a notification

Updates a notification if it does exist or creates it. It returns the notification just updated or created.
**You basically want to use this function all the time to update and create notifications.**

##### Syntax

``` js
notify(notification);
```

##### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/zakariaharti/react-awesome-notifications#notification) object |


##### Example

``` js
// add a notification
let notif = notify({
  title: 'Upload status',
  message: 'Your file is uploading...',
  level: 'info',
  dismissible: false,
  dismissAfter: 0
});

// simulate file upload
setTimeout(function() {
  notif.level = 'success';
  notif.message = 'Your file has been successfully uploaded';
  notif.dismissible = true;
  notif.dismissAfter = 5000;
  // update the notification
  notify(notif);
}, 10000);
```

#### Create a notification

Creates a notification and returns it.

##### Syntax

``` js
addNotification(notification);
```

##### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/zakariaharti/react-awesome-notifications#notification) object |

##### Example

``` js
const notif = addNotification({
  title: 'Welcome on demo!',
  message: 'Hey buddy, here you can see what you can do with it.',
  position: 'br',
  level: 'info',
  dismissAfter: 10000,
  dismissible: false,
  onMounted: function() {
    console.log('hey buddy');
  },
  onUnmounted: function() {
      console.log('cya buddy');
  },
  buttons:[{
    label: 'OK',
    action: () => {
      console.log('i\'m OK too');
    }
  }] 
});
console.log(JSON.stringify(notif));
/*
{
  "id":1463345312016,
  "title":"Welcome on demo!",
  "message":"Hey buddy, here you can see what you can do with it.",
  "position":"br",
  "level":"info",
  "dismissAfter":10000,
  "dismissible":false,
  "buttons":[{
    "label":"OK",
  }]
}
*/

```

#### Update a notification

Updates a notification and returns it. If the notification has been removed, it will not display it again.

##### Syntax

``` js
updateNotification(notification);
```

##### Parameters

| Parameter    | Type     | Description |
| ------------ | -------- | ----------- |
| notification | Object   | A [notification](https://github.com/zakariaharti/react-awesome-notifications#notification) object |


##### Example

``` js
let notif = addNotification({
  title: 'Upload status',
  message: 'Your file is uploading...',
  level: 'info',
  dismissible: false,
  dismissAfter: 0
});

// simulate file upload
setTimeout(function() {
  notif.level = 'success';
  notif.message = 'Your file has been successfully uploaded';
  notif.dismissible = true;
  notif.dismissAfter = 5000;
  updateNotification(notif);
}, 10000);
```

#### Remove a notification

Removes a notification.

##### Syntax

``` js
removeNotification(id);
```

##### Parameters

| Parameter   | Type   | Description |
| ----------- | ------ | ----------- |
| id          | String or Number | ID of the notification |

#### Remove all notifications

Removes all notifications.

##### Syntax

``` js
removeAllNotifications();
```

## Contributing guide

Read [Contributing guide](https://github.com/zakariaharti/react-awesome-notifications/blob/master/CONTRIBUTING.md)

## License

Reapop is under [MIT License](https://github.com/zakariaharti/react-awesome-notifications/blob/master/LICENSE)
