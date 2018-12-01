import styled, {createGlobalStyle} from 'styled-components';
import StyledTs from 'styled-components-ts';

import { MixinNotificationVariant } from './mixins';

export const GlobalStyles = createGlobalStyle`
  :root{
    --max-notification-width: 360px;
  }
`;

export const StyledNotificationSystem = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size:   14px;
  line-height: 1.428571429;
`;

export const StyledNotificationContainer = StyledTs<{position: string}>(styled.div)`
  position: fixed;
  z-index:  99999;
  width: var(--max-notification-width);
`;

interface IStyledNotification{
  dismissible: boolean;
  level: string;
}

export const StyledNotification = StyledTs<IStyledNotification>(styled.div)`
  display:    flex;
  width:      100%;
  height:     100%;
  position:   relative;
  min-height: 40px;
  border:     none;
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.3);
  z-index:    999;
  cursor: ${props => props.dismissible ? 'pointer' : 'default'};
  ${MixinNotificationVariant}

  .container{
    display: block;
    width: 100%;
    height: 100%;
    margin-bottom: 24px;
  }

  .notification-content{
    vertical-align: top;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 20px;
  }

  .notification-close-btn{
    padding: 10px 15px;
    box-sizing: border-box;

    .close-btn{
      font-size: 14px !important;
      color:     #524c4c;
      cursor:    pointer;

      &:before {
        content: "\f00d";
      }
      &:hover {
        color: lighten(#524c4c, 10%);
      }
    }
  }

  .title{
     margin: 0 0 10px;
     font-size: 15px;
     font-weight: 700;
     line-height: 1.428571429;
  }

  .message{
    margin: 0;
  }
`;

export const StyledButtonsContainer = StyledTs<{position?: string}>(styled.div)`
   display: flex;
   box-sizing: border-box;
   vertical-align: top;
   justify-content: space-between;
`;

export const StyledButton = StyledTs<{position?: string}>(styled.button)`
   min-height: 40px;
   box-sizing: border-box;
   padding: 0;
   background: none;
   border: none;
   border-radius: 0;
   border-left: 1px solid rgba(0, 0, 0, 0.09);
   outline: none;
   text-align: center;
   color: #524c4c;
   cursor: pointer;

   .btn-text{
     display: block;
     height: 25px;
     padding: 0 15px;
     min-width: $notification-button-min-width;
     max-width:     $notification-button-max-width;
     width: auto;
     white-space: nowrap;
     overflow: hidden;
     margin: 0 auto;
     text-overflow: ellipsis;
     text-align: center;
     font-size: 14px;
     line-height: 25px;
   }

   &:hover {
      color: #349ef3;
   }
`;
