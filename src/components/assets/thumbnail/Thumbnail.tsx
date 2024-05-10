import { useState, useEffect } from 'react';
import { Icon } from '../icon/Icon';
import './thumbnail.scss';

export interface Props {
  src: string;
  w?: string;
  h?: string;
}

export const Thumbnail = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { src, w = '100%', h = '100%' } = props;

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsError(true);
  }, [src]);

  if (isError) {
    return (
      <div
        className="thumbnail"
        style={{
          width: w,
          height: h,
        }}
      >
        <Icon
          type="PICTO"
          iconName="warning"
          customClassName="thumbnail__error"
        />
      </div>
    );
  }

  return (
    <div
      className="thumbnail"
      style={{
        width: w,
        height: h,
      }}
    >
      {isLoading ? (
        <Icon
          type="PICTO"
          iconName="spinner"
          customClassName="thumbnail__loader"
        />
      ) : (
        <img className="thumbnail__image" src={src} loading="lazy" alt="" />
      )}
    </div>
  );
};

export default Thumbnail;
