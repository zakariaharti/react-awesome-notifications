import {css, } from 'styled-components';

interface IStyledNotificationVariant{
  level: string;
}

export const MixinNotificationVariant = css<IStyledNotificationVariant>`
  background: ${(props) => {
    if(props.level == 'primary'){
      return 'blue';
    }
    return 'blue';
  }};
`;
