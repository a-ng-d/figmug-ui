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
  isDisabled?: boolean
  isBlocked?: boolean
  isNew?: boolean
  onImportFiles: (files: Array<FileContent>) => void
}

export interface DropzoneStates {
  status: 'LOADING' | 'READY' | 'WARNING' | 'ERROR'
  isDraggedOver: boolean
  blackList: Array<string>
}

export class Dropzone extends React.Component<DropzoneProps, DropzoneStates> {
  static defaultProps: Partial<DropzoneProps> = {
    acceptedMimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    isNew: false,
    isBlocked: false,
    isDisabled: false,
  }

  constructor(props: DropzoneProps) {
    super(props)
    this.state = {
      status: 'READY',
      isDraggedOver: false,
      blackList: [],
    }
  }

  // Direct actions
  onImport = (event: React.DragEvent) => {
    const { acceptedMimeTypes, onImportFiles } = this.props

    event.preventDefault()
    this.setState({
      status: 'LOADING',
      isDraggedOver: false,
      blackList: [],
    })

    const validFiles: File[] = Array.from(event.dataTransfer.files).filter(
      (file: File) => acceptedMimeTypes.includes(file.type)
    )

    const unValidFiles: File[] = Array.from(event.dataTransfer.files).filter(
      (file: File) => !acceptedMimeTypes.includes(file.type)
    )

    this.setState({
      blackList: unValidFiles.map((file) => file.name),
    })

    const fileContents: Array<FileContent> = []

    if (validFiles.length > 0) {
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
          } else {
            this.setState({
              status: 'WARNING',
            })
          }
        }

        if (file.type.startsWith('image/png')) {
          reader.readAsArrayBuffer(file)
        } else if (file.type === 'application/pdf') {
          reader.readAsArrayBuffer(file)
        } else {
          reader.readAsText(file)
        }
      })
    } else {
      this.setState({
        status: 'ERROR',
      })
    }
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
    const { status, isDraggedOver, blackList } = this.state
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
                action={() => !(isBlocked || isDisabled) && this.onImport}
              />
            }
          />
        )
        break
      }
      case 'LOADING': {
        fragment = (
          <Icon
            type="PICTO"
            iconName="spinner"
          />
        )
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
                action={() => !(isBlocked || isDisabled) && this.onImport}
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
                action={() => !(isBlocked || isDisabled) && this.onImport}
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
        onDrop={this.onImport}
      >
        {fragment}
      </div>
    )
  }
}
