import React from 'react'
import Tooltip from '@components/tags/tooltip/Tooltip'
import texts from '@styles/texts.module.scss'
import Avatar from '@components/assets/avatar/Avatar'
import SimpleItem from '@components/slots/simple-item/SimpleItem'
import './members-list.scss'

export interface MembersListProps {
  members: Array<{
    avatar: string
    fullName: string
  }>
  numberOfAvatarsDisplayed: number
}

export interface MembersListState {
  activeTooltipIndex: number | null
  isMembersListVisible: boolean
}

export default class MembersList extends React.Component<
  MembersListProps,
  MembersListState
> {
  constructor(props: MembersListProps) {
    super(props)
    this.state = {
      activeTooltipIndex: null,
      isMembersListVisible: false,
    }
  }

  render() {
    const { members, numberOfAvatarsDisplayed } = this.props
    const { activeTooltipIndex, isMembersListVisible } = this.state

    return (
      <div className="members-list">
        {members.slice(0, numberOfAvatarsDisplayed).map((member, index) => (
          <div
            key={member.fullName}
            className="members-list__member"
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
            <div className="members-list__avatar">
              <img
                src={member.avatar}
                alt={member.fullName}
              />
            </div>
            {activeTooltipIndex === index && (
              <Tooltip isSingleLine>{member.fullName}</Tooltip>
            )}
          </div>
        ))}
        {members.slice(numberOfAvatarsDisplayed).length > 0 && (
          <div
            className="members-list__remaining"
            onMouseEnter={() => this.setState({ isMembersListVisible: true })}
            onMouseLeave={() => this.setState({ isMembersListVisible: false })}
          >
            <span className={texts.type}>
              +{members.slice(numberOfAvatarsDisplayed).length}
            </span>
            {isMembersListVisible && (
              <Tooltip>
                <div className="members-list__list">
                  {members.slice(numberOfAvatarsDisplayed).map((member) => (
                    <SimpleItem
                      leftPartSlot={
                        <Avatar
                          key={member.fullName}
                          avatar={member.avatar}
                          fullName={member.fullName}
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
