import { useEffect, useState } from 'react'
import Icon from '../icon/Icon'
import './thumbnail.scss'

export interface ThumbnailProps {
  src: string
  width?: string
  height?: string
}

const Thumbnail = (props: ThumbnailProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { src, width = '100%', height = '100%' } = props

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
        role="img"
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
      role="img"
      aria-busy={isLoading}
    >
      {isLoading ? (
        <Icon
          type="PICTO"
          iconName="spinner"
          customClassName="thumbnail__loader"
          role="status"
        />
      ) : (
        <img
          className="thumbnail__image"
          src={src}
          loading="lazy"
          alt=""
          role="presentation"
        />
      )}
    </div>
  )
}

export default Thumbnail
