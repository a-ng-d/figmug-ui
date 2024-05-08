import type { IconList } from '../../types/icon.types';
import icons from '../../styles/icons.module.scss';
import './icon.scss';

export interface IconProps {
  iconName: IconList
  iconColor?: string
}

export const Icon = (props: IconProps) => {
  const { iconName = 'adjust', iconColor = 'var(--figma-color-icon, rgba(0, 0, 0, 0.9))' } = props;

  return (
    <div
      style={{
        backgroundColor: iconColor
      }}
      className={[
        'icon-box',
        icons.icon,
        icons[`icon--${iconName}`],
      ]
        .filter((n) => n)
        .join(' ')}
    />
  );
};
