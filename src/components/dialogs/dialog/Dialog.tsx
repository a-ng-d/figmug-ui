import { SyntheticEvent } from 'react';
import { PopIn } from '../../slots/popin/Popin';
import './dialog.scss';

export interface DialogProps {
  title: string;
  actions: {
    primary?: {
      label: string;
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING';
      action: React.ReactEventHandler | (() => void);
    };
    secondary?: {
      label: string;
      state?: 'DEFAULT' | 'DISABLED' | 'LOADING';
      action: React.ReactEventHandler | (() => void);
    };
  };
  select?: {
    label: string;
    state: boolean;
    action: React.MouseEventHandler & React.KeyboardEventHandler;
  };
  indicator?: string;
  isForward?: boolean;
  children: React.ReactNode;
  onClose: React.ReactEventHandler;
}

export const Dialog = (props: DialogProps) => {
  const { title, actions, select, indicator, isForward = true, children, onClose } =
    props;

  const closeHandler = (e: SyntheticEvent) => {
    if (e.currentTarget === e.target) onClose(e);
  };

  return (
    <div
      className="dialog"
      style={{
        position: isForward ? 'absolute' : 'relative',
      }}
      role="button"
      tabIndex={-1}
      onMouseDown={closeHandler}
    >
      <PopIn
        title={title}
        actions={actions}
        select={select}
        indicator={indicator}
        onClose={onClose}
      >
        {children}
      </PopIn>
    </div>
  );
};
