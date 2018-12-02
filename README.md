# React-awesome-notifications
[![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/zakariaharti/react-awesome-notifications/blob/master/LICENSE)
[![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://zakariaharti.github.io/react-awesome-notifications/)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

A beautiful fully customizable React + Redux notification System built with styled-components

![Logo of the project](./screenshot.PNG)

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

Read [API documentation](https://github.com/zakariaharti/react-awesome-notifications/blob/master/docs/api.md) to discover all possibilities.

## Contributing guide

Read [Contributing guide](https://github.com/zakariaharti/react-awesome-notifications/blob/master/CONTRIBUTING.md)

## License

Reapop is under [MIT License](https://github.com/zakariaharti/react-awesome-notifications/blob/master/LICENSE)
