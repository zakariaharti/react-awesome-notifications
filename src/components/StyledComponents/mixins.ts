import {css} from 'styled-components';

interface IStyledNotificationVariant{
  level: string;
}

export const MixinNotificationVariant = css<IStyledNotificationVariant>`
  background: ${(props) => {
    if(props.level == 'primary'){
      return 'var(--primary-bg)';
    }
    if(props.level == 'success'){
      return 'var(--success-bg)';
    }
    if(props.level == 'info'){
      return 'var(--info-bg)';
    }
    if(props.level == 'warning'){
      return 'var(--warning-bg)';
    }
    if(props.level == 'error'){
      return 'var(--error-bg)';
    }
    return 'var(--primary-bg)';
  }};
`;
