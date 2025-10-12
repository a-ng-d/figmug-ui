import React from 'react'
import texts from '@styles/texts/texts.module.scss'
import Tooltip from '@components/tags/tooltip/Tooltip'
import SimpleItem from '@components/slots/simple-item/SimpleItem'
import Avatar from '@components/assets/avatar/Avatar'
import './members-list.scss'

export interface MembersListProps {
  members: Array<{
    avatar: string
    fullName: string
  }>
  numberOfAvatarsDisplayed: number
  isInverted?: boolean
}

export interface MembersListState {
  activeTooltipIndex: number | null
  isMembersListVisible: boolean
}

export default class MembersList extends React.Component<MembersListProps, MembersListState> {
  static defaultProps: Partial<MembersListProps> = {
    isInverted: false,
  }

  constructor(props: MembersListProps) {
    super(props)
    this.state = {
      activeTooltipIndex: null,
      isMembersListVisible: false,
    }
  }

  render() {
    const { members, numberOfAvatarsDisplayed, isInverted } = this.props
    const { activeTooltipIndex, isMembersListVisible } = this.state

    return (
      <div
        className={`members-list ${isInverted ? 'members-list--inverted' : ''}`}
        role="list"
      >
        {members.slice(0, numberOfAvatarsDisplayed).map((member, index) => {
          const zIndex = isInverted
            ? index + 1
            : numberOfAvatarsDisplayed - index

          return (
            <div
              key={member.fullName}
              className="members-list__member"
              role="listitem"
              style={{ zIndex }}
              onMouseEnter={() =>
                this.setState({
                  activeTooltipIndex: index,
                })
              }
              onMouseLeave={() =>
                this.setState({
                  activeTooltipIndex: null,
                })
              }
            >
              <div
                className="members-list__avatar"
                role="presentation"
              >
                <img
                  src={member.avatar}
                  alt={member.fullName}
                  aria-hidden="true"
                />
              </div>
              {activeTooltipIndex === index && (
                <Tooltip>{member.fullName}</Tooltip>
              )}
            </div>
          )
        })}
        {members.slice(numberOfAvatarsDisplayed).length > 0 && (
          <div
            className="members-list__remaining"
            role="listitem"
            onMouseEnter={() => this.setState({ isMembersListVisible: true })}
            onMouseLeave={() => this.setState({ isMembersListVisible: false })}
          >
            <span
              className={texts.type}
              aria-hidden="true"
            >
              +{members.slice(numberOfAvatarsDisplayed).length}
            </span>
            {isMembersListVisible && (
              <Tooltip>
                <div
                  className="members-list__list"
                  role="list"
                >
                  {members.slice(numberOfAvatarsDisplayed).map((member) => (
                    <SimpleItem
                      key={member.fullName}
                      leftPartSlot={
                        <Avatar
                          key={member.fullName}
                          avatar={member.avatar}
                          fullName={member.fullName}
                          isAccented
                        />
                      }
                      isTransparent
                      alignment="CENTER"
                    />
                  ))}
                </div>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    )
  }
}
