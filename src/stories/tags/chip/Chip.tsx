import texts from '../../../styles/texts.module.scss';
import './chip.scss';

export interface Props {
  children: React.ReactNode;
}

export const Chip = (props: Props) => {
  const { children } = props;

  return (
    <div className="chip">
      <div className={['chip__text', texts.type].filter((n) => n).join(' ')}>
        {children}
      </div>
    </div>
  );
};
