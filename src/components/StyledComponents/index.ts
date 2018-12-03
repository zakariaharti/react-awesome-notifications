import styled, {createGlobalStyle} from 'styled-components';
import StyledTs from 'styled-components-ts';

import { MixinNotificationVariant } from './mixins';


export const GlobalStyles = createGlobalStyle`
  :root{
    --max-notification-width: 360px;
    --primary-bg: #d2d2d2;
    --success-bg: #8BC34A;
    --info-bg: #9adfff;
    --warning-bg: #ff9800;
    --error-bg: #f44336;
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
  padding: 13px 0;
  ${(props: any) => {
    if(props.position == 'tc'){
      return`
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
      `;
    }
    if(props.position == 'tr'){
      return`
         top:   20px;
         right: 20px;
      `;
    }
    if(props.position == 'tl'){
      return`
        top:  20px;
        left: 20px;
      `;
    }
    if(props.position == 'bc'){
      return`
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      `;
    }
    if(props.position == 'br'){
      return`
        bottom: 0;
        right:  20px;
      `;
    }
    if(props.position == 'bl'){
      return`
        bottom: 0;
        left:   20px;
      `;
    }

    return `
      top:   20px;
      right: 20px;
    `;
  }};

  @media (max-width: 768px) {
      width: 100%;
      top:   0;
      left:  0;
      padding: 0;

      .notification-wrapper {
          margin: 0;
      }
  }

  .notification-wrapper-enter{
    ${(props: any) => {
      if(props.position == 'tr' || props.position == 'br'){
        return `
          transform: translateX(80em);
          opacity: 0;
          transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'tc'){
        return `
          transform: translateY(-80em);
          opacity: 0;
          transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'bc'){
        return `
          transform: translateY(80em);
          opacity: 0;
          transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'tl' || props.position == 'bl'){
        return `
          transform: translateX(-80em);
          opacity: 0;
          transition: all 300ms ease-out;
        `;
      }
    }}
  }
  .notification-wrapper-enter-active{
    ${(props: any) => {
      if(props.position == 'tr' || props.position == 'br'){
        return `
          transform: translateX(0em);
          opacity: 1;
          transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'tc' || props.position == 'bc'){
        return `
          transform: translateY(0em);
          opacity: 1;
          transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'tl' || props.position == 'bl'){
        return `
          transform: translateX(0em);
          opacity: 1;
          transition: all 300ms ease-out;
        `;
      }
    }}
  }
  .notification-wrapper-exit{
    ${(props: any) => {
      if(props.position == 'tr' || props.position == 'br'){
        return `
          transform: translateX(0em);
          opacity: .8;
           transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'tc' || props.position == 'bc'){
        return `
          transform: translateY(0em);
          opacity: .8;
          transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'tl' || props.position == 'bl'){
        return `
          transform: translateX(0em);
          opacity: .8;
          transition: all 300ms ease-out;
        `;
      }
    }}
  }
  .notification-wrapper-exit-active{
    ${(props: any) => {
      if(props.position == 'tr' || props.position == 'br'){
        return `
          transform: translateX(80em);
          opacity: 0;
          transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'tc'){
        return `
          transform: translateY(-80em);
          opacity: 0;
          transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'bc'){
        return `
          transform: translateY(80em);
          opacity: 0;
          transition: all 300ms ease-out;
        `;
      }
      if(props.position == 'tl' || props.position == 'bl'){
        return `
          transform: translateX(-80em);
          opacity: 0;
          transition: all 300ms ease-out;
        `;
      }
    }}
  }
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
  cursor: ${(props: any) => props.dismissible ? 'pointer' : 'default'};
  margin: 10px 0;
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
    padding: 8px 15px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;

    .close-btn{
      font-size: 1.5em;
      cursor: pointer;
      transition: .2s ease-in;
      color: ${(props: any) => {
        if(props.level == 'primary') return '#888888';
        return '#888888';
      }};

      &:hover{
        color: #4c4b4b;
      }
    }
  }
`;

export const ExtendedStyledNotification = styled(StyledNotification)`
  ${props => props.extendedStyles}
`;

export const StyledTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 1.1em;
  font-weight: 700;
  line-height: 1.428571429;
  color: ${props => {
    if(props.level == 'primary') return '#585858';
    if(props.level == 'success') return '#608c2d';
    if(props.level == 'info') return '#4b8dab';
    if(props.level == 'warning') return '#a57938';
    if(props.level == 'error') return '#ad3f37';
    return '#585858'
 }};
`;

export const ExtendedStyledTitle = styled(StyledTitle)`
  ${props => props.extendedStyles}
`;

export const StyledMessage = styled.p`
  margin: 0;
  color: ${props => {
    if(props.level == 'primary') return '#756f6f';
    if(props.level == 'success') return '#5f8435';
    if(props.level == 'info') return '#538fab';
    if(props.level == 'warning') return '#b18646';
    if(props.level == 'error') return '#af4c45';
    return '#756f6f'
  }};
`;

export const ExtendedStyledMessage = styled(StyledMessage)`
  ${props => props.extendedStyles}
`;

export const StyledButtonsContainer = StyledTs<{position?: string}>(styled.div)`
   display: flex;
   box-sizing: border-box;
   vertical-align: top;
   justify-content: flex-start;
   flex-wrap: wrap;
   padding: 0 20px;
`;

export const ExtendedStyledButtonsContainer = styled(StyledButtonsContainer)`
  ${props => props.extendedStyles}
`;

export const StyledButton = StyledTs<{position?: string,level?: string}>(styled.button)`
   min-height: 30px;
   box-sizing: border-box;
   padding: 0;
   margin-right: 5px;
   background: ${(props: any) => {
     if(props.level == 'primary') return '#a2a2a2';
     if(props.level == 'success') return '#6c9838';
     if(props.level == 'info') return '#3c9dca';
     if(props.level == 'warning') return '#ca9240';
     if(props.level == 'error') return '#ce4035';
     return '#a2a2a2';
   }};
   border: none;
   border-radius: 0;
   border-left: 1px solid rgba(0, 0, 0, 0.09);
   outline: none;
   text-align: center;
   color: ${(props: any) => {
     if(props.level == 'primary') return '#524c4c';
     return '#e6e6e6';
   }};
   cursor: pointer;
   transition: background .2s ease-in;

   .btn-text{
     display: block;
     height: 25px;
     padding: 0 15px;
     min-width: 90px;
     max-width: 150px;
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
      background: ${(props: any) => {
        if(props.level == 'primary') return '#969696';
        if(props.level == 'success') return '#709c3d';
        if(props.level == 'info') return '#3594bf';
        if(props.level == 'warning') return '#c78e39';
        if(props.level == 'error') return '#ca443a';
        return '#969696';
      }};;
   }
`;

export const ExtendedStyledButton = styled(StyledButton)`
  ${props => props.extendedStyles}
`;
