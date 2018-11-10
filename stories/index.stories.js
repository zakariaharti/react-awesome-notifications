"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("@storybook/react");
var addon_actions_1 = require("@storybook/addon-actions");
var addon_info_1 = require("@storybook/addon-info");
var styled_components_1 = require("styled-components");
var Notification_1 = require("../src/components/Notification");
//import NotificationStack from '../src/components/NotificationStack';
// @ts-ignore
var stories = react_1.storiesOf('Notification component', module);
var PlayGround = /** @class */ (function (_super) {
    __extends(PlayGround, _super);
    function PlayGround() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
            nots: [
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
            ],
            exampleOne: {
                title: 'hello world',
                body: 'upon a homely object love can wink!!',
                uid: '123',
                duration: 4000,
                button: {
                    label: 'got it!'
                }
            }
        };
        _this.onClick = function () { return _this.setState({ isOpen: !_this.state.isOpen }); };
        return _this;
    }
    PlayGround.prototype.render = function () {
        return this.props.render(this.state, this.onClick);
    };
    return PlayGround;
}(React.Component));
var StyledContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  width: 100%;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 5em 0;\n\n  .btn-not{\n    padding: 10px 20px;\n    text-transform: capitalize;\n    color: #ffffff;\n    border: none;\n    background: #03A9F4;\n    font-size: 1.2em;\n    border-radius: 6px;\n    border: 2px solid transparent;\n    cursor: pointer;\n    transition: .3s ease-out;\n\n    &:hover{\n      background-color: #077fb5;\n    }\n\n    &:focus{\n      border-color: #21a5e0;\n    }\n  }\n"], ["\n  height: 100%;\n  width: 100%;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 5em 0;\n\n  .btn-not{\n    padding: 10px 20px;\n    text-transform: capitalize;\n    color: #ffffff;\n    border: none;\n    background: #03A9F4;\n    font-size: 1.2em;\n    border-radius: 6px;\n    border: 2px solid transparent;\n    cursor: pointer;\n    transition: .3s ease-out;\n\n    &:hover{\n      background-color: #077fb5;\n    }\n\n    &:focus{\n      border-color: #21a5e0;\n    }\n  }\n"])));
// @ts-ignore
stories.addDecorator(addon_info_1.withInfo({
    header: true,
    inline: true,
    text: "\n  source code\n\n  ~~~js\n    class MyComponent extends React.Component{\n      state = {\n        isOpen: false;\n      }\n\n      onClick = () => this.setState({ isOpen: !this.state.isOpen });\n\n      render(){\n        return(\n          <React.fragment>\n            <button onClick={this.onClick}>click me!</button>\n\n            <Notification\n              isOpen={this.state.isOpen}\n              title=\"my titile\"\n              body=\"my body text here\"\n              dismissDelay={null} // for forever\n              onDismiss={() => console.log('dismissed')}\n            />\n          </React.fragment />\n        )\n      }\n    }\n  ~~~\n  ",
    source: false,
    propTables: false
})).add('Notification basic usage', function () { return React.createElement(PlayGround, { render: function (state, onClick) {
        return (React.createElement(StyledContainer, null,
            React.createElement("button", { className: "btn-not", onClick: onClick }, "click me!"),
            React.createElement(Notification_1.default, __assign({ isOpen: state.isOpen, dismissDelay: 4000, onDismiss: addon_actions_1.action('notification dismissed') }, state.exampleOne))));
    } }); });
stories.addDecorator(addon_info_1.withInfo({
    header: true,
    inline: true,
    text: "\n  source code\n\n    ~~~js\n      class MyComponent extends React.Component{\n        state = {\n          isOpen: false;\n        }\n\n        onClick = () => this.setState({ isOpen: !this.state.isOpen });\n\n        render(){\n          return(\n            <React.fragment>\n              <button onClick={this.onClick}>click me!</button>\n\n              <Notification\n                isOpen={this.state.isOpen}\n                title=\"my titile\"\n                body=\"my body text here\"\n                dismissDelay={4000} // will dismiss on 4s\n                onDismiss={() => console.log('dismissed')}\n              />\n            </React.fragment />\n          )\n        }\n      }\n    ~~~\n    ",
    source: false,
    propTables: false
})).add('dismissble notifications', function () { return React.createElement(PlayGround, { render: function (state, onClick) {
        return (React.createElement(StyledContainer, null,
            React.createElement("button", { className: "btn-not", onClick: onClick }, "click me!"),
            React.createElement(Notification_1.default, __assign({ isOpen: state.isOpen, dismissDelay: 4000, onDismiss: addon_actions_1.action('notification dismissed') }, state.exampleOne))));
    } }); });
stories.addDecorator(addon_info_1.withInfo({
    header: true,
    inline: true,
    text: "\n      source code\n\n      ~~~js\n        class MyComponent extends React.Component{\n          state = {\n            isOpen: false;\n          }\n\n          onClick = () => this.setState({ isOpen: !this.state.isOpen });\n\n          render(){\n            return(\n              <React.fragment>\n                <button onClick={this.onClick}>click me!</button>\n\n                <Notification\n                  isOpen={this.state.isOpen}\n                  title=\"my titile\"\n                  body=\"my body text here\"\n                  dismissDelay={null} // for forever\n                  onDismiss={() => console.log('dismissed')}\n                />\n              </React.fragment />\n            )\n          }\n        }\n      ~~~\n      ",
    source: false,
    propTables: false
})).add('positioning notifications', function () { return React.createElement(PlayGround, { render: function (state, onClick) {
        return (React.createElement(StyledContainer, null,
            React.createElement("button", { className: "btn-not", onClick: onClick }, "click me!"),
            React.createElement(Notification_1.default, __assign({ isOpen: state.isOpen, dismissDelay: 4000, position: 'br', onDismiss: addon_actions_1.action('notification dismissed') }, state.exampleOne))));
    } }); });
stories.addDecorator(addon_info_1.withInfo({
    header: true,
    inline: true,
    text: "\n        source code\n\n        ~~~js\n          class MyComponent extends React.Component{\n            state = {\n              isOpen: false;\n            }\n\n            onClick = () => this.setState({ isOpen: !this.state.isOpen });\n\n            render(){\n              return(\n                <React.fragment>\n                  <button onClick={this.onClick}>click me!</button>\n\n                  <Notification\n                    isOpen={this.state.isOpen}\n                    title=\"my titile\"\n                    level=\"warning\"\n                    body=\"my body text here\"\n                    dismissDelay={null} // for forever\n                    onDismiss={() => console.log('dismissed')}\n                  />\n                </React.fragment />\n              )\n            }\n          }\n        ~~~\n        ",
    source: false,
    propTables: false
})).add('variation', function () { return React.createElement(PlayGround, { render: function (state, onClick) {
        return (React.createElement(StyledContainer, null,
            React.createElement("button", { className: "btn-not", onClick: onClick }, "click me!"),
            React.createElement(Notification_1.default, __assign({ isOpen: state.isOpen, dismissDelay: 4000, onDismiss: addon_actions_1.action('notification dismissed'), level: "warning" }, state.exampleOne))));
    } }); });
var templateObject_1;
//# sourceMappingURL=index.stories.js.map