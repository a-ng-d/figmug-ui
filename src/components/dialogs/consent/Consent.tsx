import React from 'react'
import type { ConsentConfiguration } from '../../../types/consent.types'
import { Bar } from '../../slots/bar/Bar'
import { Select } from '../../inputs/select/Select'
import { Button } from '../../actions/button/Button'
import Thumbnail from '../../assets/thumbnail/Thumbnail'
import texts from '../../../styles/texts.module.scss'
import layouts from '../../../styles/layouts.module.scss'
import './consent.scss'

export interface ConsentProps {
  welcomeMessage: string
  vendorsMessage: string
  moreDetailsLabel: string
  lessDetailsLabel: string
  consentActions: {
    consent: {
      label: string
      action: (vendorsConsent: Array<ConsentConfiguration>) => void
    }
    deny: {
      label: string
      action: (vendorsConsent: Array<ConsentConfiguration>) => void
    }
    save: {
      label: string
      action: (vendorsConsent: Array<ConsentConfiguration>) => void
    },
    close: {
      action: React.MouseEventHandler & React.KeyboardEventHandler
    }
  }
  vendorsList: Array<ConsentConfiguration>
}

export interface ConsentStates {
  isVendorsOpen: boolean
  vendorsConsent: Array<ConsentConfiguration>
}

export class Consent extends React.Component<ConsentProps, ConsentStates> {

  constructor(props: ConsentProps) {
    super(props)
    this.state = {
      isVendorsOpen: false,
      vendorsConsent: props.vendorsList
    }
  }

  // Direct actions
  onConsentAll = () => {
    this.props.consentActions.consent.action(
      this.props.vendorsList.map((vendor) => ({
        ...vendor,
        isConsented: true
      }))
    )
  }

  onDenyAll = () => {
    this.props.consentActions.deny.action(
      this.props.vendorsList.map((vendor) => ({
        ...vendor,
        isConsented: false
      }))
    )
  }

  onPartialConsent = () =>
    this.props.consentActions.save.action(this.state.vendorsConsent)

  // Handlers
  consentVendorsHandler = (index: number) => {
    console.log('consentVendorsHandler', index)
    this.setState({
      vendorsConsent: this.state.vendorsConsent.map((consent, i) => {
        if (i === index) return {
          ...consent,
          isConsented: !consent.isConsented
        }
        return {
          ...consent
        }
      })
    })
  }

  // Templates
  WelcomeScreen = () => {
    const {
      welcomeMessage,
      moreDetailsLabel,
      consentActions
    } = this.props

    const {
      isVendorsOpen
    } = this.state

    return (
      <div className="consent-banner">
        <div className="consent-banner__message">
          <div className={['type', texts.type].filter((n) => n).join(' ')}>
            {welcomeMessage}
          </div>
        </div>
        <Bar
          leftPart={(
            <Button
              type="tertiary"
              label={moreDetailsLabel}
              action={() => this.setState({
                isVendorsOpen: !isVendorsOpen
              })}
            />
          )}
          rightPart={(
            <div className={[
              'consent-banner__actions',
              layouts['snackbar--medium']
            ]
              .filter((n) => n)
              .join(' ')
            }>
              <Button
                type="secondary"
                label={consentActions.deny.label}
                action={this.onDenyAll}
              />
              <Button
                type="primary"
                label={consentActions.consent.label}
                action={this.onConsentAll}
              />
              <Button
                type="icon"
                icon="close"
                action={consentActions.close.action}
              />
            </div>
          )}
          padding='0'
        />
      </div>
    )
  }

  DetailedVendorsList = () => {
    const {
      vendorsMessage,
      lessDetailsLabel,
      vendorsList,
      consentActions,
    } = this.props

    const {
      isVendorsOpen,
      vendorsConsent
    } = this.state

    return (
      <div className="consent-banner">
        <div className={[
          'consent-banner__message',
          'type',
          texts.type
        ]
          .filter((n) => n)
          .join(' ')
        }>
          {vendorsMessage}
        </div>
        <ul className="consent-banner__list">
          {vendorsList.map((vendor, index) => (
            <li key={index} className="consent-banner__item">
              <Bar
                leftPart={(
                  <div className={[
                    'consent-banner__item__info',
                    layouts['snackbar--large']
                  ]
                    .filter((n) => n)
                    .join(' ')
                  }>
                    <div className="consent-banner__item__icon">
                      <Thumbnail
                        src={vendor.icon}
                        w="32px"
                        h="32px"
                      />
                    </div>
                    <div>
                      <div className={[
                        'consent-banner__item__title',
                        'type',
                        'type--large',
                        texts.type
                      ]
                        .filter((n) => n)
                        .join(' ')
                      }>
                        {vendor.name}
                      </div>
                      <div className={[
                        'consent-banner__item__description',
                        'type',
                        texts.type
                      ]
                        .filter((n) => n)
                        .join(' ')
                      }>
                        {vendor.description}
                      </div>
                    </div>
                  </div>
                )}
                rightPart={(
                  <div className="consent-banner__item__action">
                    <Select
                      id={`change-${vendor.id}-user-consent`}
                      type="SWITCH_BUTTON"
                      isChecked={vendorsConsent[index].isConsented}
                      onChange={() => this.consentVendorsHandler(index)}
                    />
                  </div>
                )}
                border={["BOTTOM"]}
                padding='var(--size-xxxsmall) 0 var(--size-xxsmall) 0'
              />
            </li>
          ))}
        </ul>
        <Bar
          leftPart={(
            <Button
              type="tertiary"
              label={lessDetailsLabel}
              action={() => this.setState({
                isVendorsOpen: !isVendorsOpen
              })}
            />
          )}
          rightPart={(
            <div className={[
              'consent-banner__actions',
              layouts['snackbar--medium']
            ]
              .filter((n) => n)
              .join(' ')
            }>
              <Button
                type="secondary"
                label={consentActions.deny.label}
                action={this.onDenyAll}
              />
              <Button
                type="primary"
                label={consentActions.save.label}
                action={this.onPartialConsent}
              />
              <Button
                type="icon"
                icon="close"
                action={consentActions.close.action}
              />
            </div>
          )}
          padding='0'
        />
      </div>
    )
  }

  // Render
  render() {
    const {
      isVendorsOpen
    } = this.state

    if (isVendorsOpen) return (
      <div className="consent-overlay recharged">
        <this.DetailedVendorsList />
      </div>
    )
    return (
      <div className="consent-overlay recharged">
        <this.WelcomeScreen />
      </div>
    )
  }
}
