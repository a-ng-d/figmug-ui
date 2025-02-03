import React from 'react'
import { SemanticMessage } from '../../../components/dialogs/semantic-message/SemanticMessage'
import { Button } from '../../../components/actions/button/Button'
import './dropzone.scss'
import { Icon } from '../../../components/assets/icon/Icon'

interface FileContent {
  name: string
  content: string | ArrayBuffer | null | undefined
}

export interface DropzoneProps {
  message: string
  warningMessage: string
  errorMessage: string
  cta: string
  acceptedMimeTypes: Array<string>
  isMultiple: boolean
  isLoading?: boolean
  isDisabled?: boolean
  isBlocked?: boolean
  isNew?: boolean
  onImportFiles: (files: Array<FileContent>) => void
}

export interface DropzoneStates {
  status: 'READY' | 'WAITING' | 'WARNING' | 'ERROR'
  isLoading: boolean
  isDraggedOver: boolean
  blackList: Array<string>
}

export class Dropzone extends React.Component<DropzoneProps, DropzoneStates> {
  static defaultProps: Partial<DropzoneProps> = {
    acceptedMimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    isLoading: false,
    isDisabled: false,
    isNew: false,
    isBlocked: false,
  }

  constructor(props: DropzoneProps) {
    super(props)
    this.state = {
      status: 'READY',
      isLoading: this.props.isLoading || false,
      isDraggedOver: false,
      blackList: [],
    }
  }

  // Lifecycle
  componentDidUpdate = (prevProps: Readonly<DropzoneProps>) => {
    if (this.props.isLoading !== prevProps.isLoading && !this.props.isLoading)
      this.setState({
        isLoading: true,
      })
    else if (
      this.props.isLoading !== prevProps.isLoading &&
      this.props.isLoading
    ) {
      this.setState({
        isLoading: false,
      })
      setTimeout(
        () => {
          this.setState({
            isLoading: false,
          })
        },
        2 * 60 * 1000
      )
    }
  }

  // Direct actions
  onImport = (validFiles: Array<File>, unValidFiles: Array<File>) => {
    const { onImportFiles } = this.props
    const fileContents: Array<FileContent> = []

    validFiles.forEach((file: File) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const content = e.target?.result

        fileContents.push({ name: file.name, content: content })

        if (
          fileContents.length === validFiles.length &&
          unValidFiles.length === 0
        ) {
          onImportFiles(fileContents)
          this.setState({
            status: 'READY',
          })
        } else if (
          fileContents.length === validFiles.length &&
          unValidFiles.length > 0
        ) {
          onImportFiles(fileContents)
          this.setState({
            status: 'WARNING',
          })
        }
      }

      if (file.type.startsWith('image/png')) reader.readAsArrayBuffer(file)
      else if (file.type === 'application/pdf') reader.readAsArrayBuffer(file)
      else reader.readAsText(file)
    })
  }

  onValidFilesViaButton = () => {
    const { acceptedMimeTypes, isMultiple } = this.props

    this.setState({
      status: 'WAITING',
      isLoading: true,
      isDraggedOver: false,
    })

    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = acceptedMimeTypes.join(',')
    fileInput.multiple = isMultiple
    fileInput.onchange = (event: Event) => {
      this.setState({
        isLoading: true,
      })
      const target = event.target as HTMLInputElement
      const files = target.files
      this.onImport(Array.from(files || []), [])
    }
    fileInput.click()
    fileInput.remove()
  }

  onValidFilesViaDrop = (event: React.DragEvent) => {
    const { acceptedMimeTypes, isMultiple } = this.props

    event.preventDefault()
    this.setState({
      status: 'WAITING',
      isLoading: true,
      isDraggedOver: false,
    })

    let validFiles: File[] = Array.from(event.dataTransfer.files).filter(
      (file: File) => acceptedMimeTypes.includes(file.type)
    )

    let unValidFiles: File[] = Array.from(event.dataTransfer.files).filter(
      (file: File) => !acceptedMimeTypes.includes(file.type)
    )

    if (!isMultiple && validFiles.length > 1) {
      unValidFiles = unValidFiles.concat(validFiles.slice(1))
      validFiles = validFiles.slice(0, 1)
    }

    this.setState({
      blackList: unValidFiles.map((file) => file.name),
    })

    if (validFiles.length > 0) this.onImport(validFiles, unValidFiles)
    else
      this.setState({
        status: 'ERROR',
        isLoading: false,
      })
  }

  onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    this.setState({
      isDraggedOver: true,
    })
  }

  onDragEnter = (event: React.DragEvent) => {
    event.preventDefault()
    this.setState({
      isDraggedOver: true,
    })
  }

  onDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    this.setState({
      isDraggedOver: false,
    })
  }

  render() {
    const {
      message,
      warningMessage,
      errorMessage,
      cta,
      isDisabled,
      isBlocked,
    } = this.props
    const { status, isLoading, isDraggedOver, blackList } = this.state
    let fragment

    switch (status) {
      case 'READY': {
        fragment = (
          <SemanticMessage
            type="NEUTRAL"
            message={message}
            orientation="VERTICAL"
            actionsSlot={
              <Button
                type="primary"
                label={cta}
                isBlocked={isBlocked}
                isDisabled={isDisabled}
                isNew={this.props.isNew}
                action={() =>
                  !(isBlocked || isDisabled) && this.onValidFilesViaButton()
                }
              />
            }
          />
        )
        break
      }
      case 'WAITING': {
        fragment = null
        break
      }
      case 'WARNING': {
        fragment = (
          <SemanticMessage
            type="WARNING"
            message={warningMessage.replace(
              '$1',
              blackList.map((item) => `"${item}"`).join(', ')
            )}
            orientation="VERTICAL"
            actionsSlot={
              <Button
                type="primary"
                label={cta}
                isBlocked={isBlocked}
                isDisabled={isDisabled}
                isNew={this.props.isNew}
                action={() =>
                  !(isBlocked || isDisabled) && this.onValidFilesViaButton()
                }
              />
            }
          />
        )
        break
      }
      case 'ERROR': {
        fragment = (
          <SemanticMessage
            type="ERROR"
            message={errorMessage}
            orientation="VERTICAL"
            actionsSlot={
              <Button
                type="primary"
                label={cta}
                isBlocked={isBlocked}
                isDisabled={isDisabled}
                isNew={this.props.isNew}
                action={() =>
                  !(isBlocked || isDisabled) && this.onValidFilesViaButton()
                }
              />
            }
          />
        )
        break
      }
    }

    return (
      <div
        className={['dropzone', isDraggedOver && 'dropzone--dragged-over']
          .filter((n) => n)
          .join(' ')}
        onDragOver={this.onDragOver}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onValidFilesViaDrop}
      >
        {isLoading && (
          <Icon
            type="PICTO"
            iconName="spinner"
          />
        )}
        {fragment}
      </div>
    )
  }
}
