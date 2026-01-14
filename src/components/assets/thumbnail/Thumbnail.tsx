import { useEffect, useState } from 'react'
import Icon from '../icon/Icon'
import './thumbnail.scss'

export interface ThumbnailProps {
  /**
   * Image source URL to display
   */
  src: string
  /**
   * Width of the thumbnail
   * @default '100%'
   */
  width?: string
  /**
   * Height of the thumbnail
   * @default '100%'
   */
  height?: string
  /**
   * Alt text for the image
   * @default 'Image thumbnail'
   */
  alt?: string
}

const Thumbnail = (props: ThumbnailProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const {
    src,
    width = '100%',
    height = '100%',
    alt = 'Image thumbnail',
  } = props

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setIsLoading(false)
    img.onerror = () => setIsError(true)
  }, [src])

  if (isError)
    return (
      <div
        className="thumbnail"
        style={{
          width: width,
          height: height,
        }}
      >
        <Icon
          type="PICTO"
          iconName="warning"
          customClassName="thumbnail__error"
          aria-hidden="true"
        />
      </div>
    )

  return (
    <div
      className="thumbnail"
      style={{
        width: width,
        height: height,
      }}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <Icon
          type="PICTO"
          iconName="spinner"
          customClassName="thumbnail__loader"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <img
          className="thumbnail__image"
          src={src}
          loading="lazy"
          alt={alt}
          role="img"
        />
      )}
    </div>
  )
}

export default Thumbnail
