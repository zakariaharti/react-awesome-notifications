import {css} from 'styled-components';

interface IStyledNotificationVariant{
  background: string;
  borderColor: string;
  icon: string;
}

export const StyledNotificationVariant = css`
  background: ${(props: IStyledNotificationVariant) => props.background};
  border-left: 2px solid ${(props: IStyledNotificationVariant) => props.background};

  .notification-icon:before{
    ${(props: IStyledNotificationVariant) => {
      if(props.icon != ''){
        return `
          content: ${props.icon};
          color: ${props.borderColor}
        `;
      }
      return `
        display: none;
      `;
    }}
  }
`;
