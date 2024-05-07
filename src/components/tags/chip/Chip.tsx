import React from 'react';
import texts from '../../../styles/texts.module.scss';
import './chip.scss';

export interface ChipProps {
  children: React.ReactNode;
}

export const Chip = (props: ChipProps) => {
  const { children } = props;

  return (
    <div className="chip">
      <div className={['chip__text', texts.type].filter((n) => n).join(' ')}>
        {children}
      </div>
    </div>
  );
};
