> A beautiful fully customizable React notifications Component

## Installing for **React ^16.x**

This component is available as CommonJS and UMD module. Install via NPM running:

**npm**
```
npm install react-awesome-notifications
```

**yarn**
```
yarn add react-awesome-notifications
```

## live demo

please see the [example code](https://zakariaharti.github.io/docs-react-awesome-notification).

## Using

For optimal appearance, this component **must be rendered on a top level HTML element** in your application to avoid position conflicts.

Here is a basic example. For a more advanced usage, please see the [example code](https://zakariaharti.github.io/docs-react-awesome-notification).

# for simple usage

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Notification} from 'awesome-react-notifications';

class MyComponent extends React.Component{
  state = {
    isOpen: false;
  }

  myRef = React.createRef();

  componentDidMount(){
    // do whatever with this.myRef.current
    // see the section below for documentation about the Notification api
  }

  onClick = () => this.setState({ isOpen: !this.state.isOpen });

  render(){
    return(
      <React.fragment>
        <button onClick={this.onClick}>click me!</button>

        <Notification
          ref={this.myRef}
          isOpen={this.state.isOpen}
          title="my titile"
          level="warning"
          body="my body text here"
          dismissDelay={null} // for forever
          onDismiss={() => console.log('dismissed')}
        />
      </React.fragment />
    )
  }
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById('app')
);
```

# for more than one notification you should use NotificationStack

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NotificationStack} from 'awesome-react-notifications';

class MyComponent extends React.Component{
  state = {
    isOpen: false;
    notifictions: [
      {
        level: 'primary',
        title: 'hello world',
        body: 'body text is coming soon',
        uid: '123',
        duration: 4000,
        button: {
          label: 'comfirm'
        }
      },
      {
        level: 'error',
        title: 'hello world',
        body: 'body text is coming soon',
        uid: '124',
        button: {
          label: 'comfirm'
        }
      },
      {
        level: 'success',
        title: 'hello world',
        body: 'body text is coming soon',
        uid: '125',
        button: {
          label: 'comfirm'
        }
      }
    ]
  }

  myRef = React.createRef();

  componentDidMount(){
    // do whatever with this.myRef.current
    // see the section below for documentation about the Notification api
  }

  onClick = () => this.setState({ isOpen: !this.state.isOpen });

  closeAll = () => this.myRef.current.closeNotifications();

  render(){
    return(
      <React.fragment>
        <button onClick={this.onClick}>click me!</button>
        <button onClick={this.closeAll}>close all!</button>

        <NotificationStack
          ref={this.myRef}
          isOpen={this.state.isOpen}
          notifictions={this.state.notifictions}
        />
      </React.fragment />
    )
  }
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById('app')
);
```

## Methods for the NotificationStack Component

### `addNotification(notification)`

Add a notification object. This displays the notification based on the [object](#creating-a-notification) you passed.

Returns the notification object to be used to programmatically dismiss a notification.

### `removeNotification(notification)`

Remove a notification programmatically.If passing an object, you need to make sure it must contain the `uid` property.

### `closeNotifications()`

Removes ALL notifications programatically.

## Creating a notification

The notification object has the following properties:

| Name         | Type            | Default   | Description                                                                                                                                                               |
|------------  |---------------  |---------  |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| title        | string          | null      | Title of the notification                                                                                                                                                 |
| body     | string          | null      | Message of the notification                                                                                                                                              |
| level        | string          | "default"      | Level of the notification. Available: **primary**,**default**, **success**, **error**, **warning**, **info**                                                                                    |
| position     | string          | tr        | Position of the notification. Available: **tr (top right)**, **tl (top left)**, **tc (top center)**, **br (bottom right)**, **bl (bottom left)**, **bc (bottom center)**  |
| dismissDelay  | integer         | 4         | Delay in seconds for the notification go away. Set this to null for forever notifiction                                                                      |
| button  | object          | null      | wether to display the button or not it takes an object of the chape {label: string, onClickEvent: callback,styles: string}                                                                         |
| onDismiss       | function          | null      | Add a callback to be called right after the dismiss of the notification                                                                                                        |
| duration       | integer          | null      | the duration of the notification to display                                                                                                      |
| showCloseIcon | boolean | true | wether or not to display the close icon |
| extendContainerStyles     | string        | null      | extend the Container styles |
| extendTitleStyles     | string        | null      | extend the title styles |
| extendBodyStyles     | string        | null      | extend the Body styles |
| enableAnimation     | boolean        | true      | enable animation |
| animationClassNames     | string        | 'notifiction'      | override the default animations class names useful for customizing the default animations see below for more information |
| uid          | integer/string           | null      | Overrides the internal `uid`. Useful if you are managing your notifications id. Notifications with same `uid` won't be displayed. |


### Dismissible

If set to null, the notification will not be dismissed unless dismissDelay is assigned a specefic duration. [See more](#removenotificationnotification)

### Button

Add a button and a callback function to the notification. If this button is clicked, the callback function is called (if provided) with the Notification instance as the first argument.

```js
notification = {
  [...],
  button: {
    label: 'Button name',
    onClickEvent: function(notifiction) {
      console.log('Notification button clicked!');
      notifiction.close();
    }
  }
}

```

### closing the Notification

you can add a ref to the Notification component and the call the close method to fully unmount the Component from the DOM

```js
class MyComponent extends Component{
  myRef = React.createRef();

  componentDidMount(){
    this.myRef.current.close();
  }

  render(){
    return(
      <Notification
        {...}
        ref={this.myRef}
      />
    )
  }
}

```


## Styles

This component styles is built with Styled Components so it easier to override the default styles .
you can override the default styles by providing your own styles.
notice that the styles accept any features bt Styled commonents like : &-,nesting..

### Overriding

to override the button elemnt:

```js

<Notification
 ref="notification"
 button={
   {
     label: 'comfirm',
     styles: `
       color: blue,
       transition: .3s ease-out;

       &:hover{
         color: yellow;
       }

       &:focus{
         background-color: gray;
       }
     `
   }
 }
 />

```

to override the entire component you can use **extendContainerStyles**
**extendTitleStyles**
**extendBodyStyles**:

```js

<Notification
 ref="notification"
 extendContainerStyles={`
   /* styles goes here */
  `}
 extendTitleStyles={`
   /* styles goes here */
  `}
 extendBodyStyles={`
   /* styles goes here */
`}
 />

```

### animation

to override the animation you should provide your own className to the
**classNames** prop
The animation classNames applied to the component as it enters, exits or has finished the transition. A single name can be provided and it will be suffixed for each stage: e.g.

classNames="fade" applies fade-enter, fade-enter-active, fade-enter-done, fade-exit, fade-exit-active, fade-exit-done, fade-appear, and fade-appear-active
then provide your own styles for each stage :

```js

.fade-enter {
  opacity: 0.01;
  transform: scale(0.9) translateY(50%);
}
.fade-enter-active {
  opacity: 1;
  transform: scale(1) translateY(0%);
  transition: all 300ms ease-out;
}
.fade-exit {
  opacity: 1;
  transform: scale(1) translateY(0%);
}
.fade-exit-active {
  opacity: 0.01;
  transform: scale(0.9) translateY(50%);
  transition: all 300ms ease-out;
}


```

## Roadmap

* Improve tests and coverage
* Improve performance

## Contributions
