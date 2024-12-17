import React from 'react'
import layouts from '../../../styles/layouts.module.scss'
import texts from '../../../styles/texts.module.scss'
import type { ConsentConfiguration } from '../../../types/consent.types'
import { Button } from '../../actions/button/Button'
import Thumbnail from '../../assets/thumbnail/Thumbnail'
import { Select } from '../../inputs/select/Select'
import { Bar } from '../../slots/bar/Bar'
import './consent.scss'

export interface ConsentProps {
  welcomeMessage: string
  vendorsMessage: string
  privacyPolicy: {
    label: string
    action: React.MouseEventHandler & React.KeyboardEventHandler
  }
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
    }
    close: {
      action: React.MouseEventHandler & React.KeyboardEventHandler
    }
  }
  validVendor: ConsentConfiguration
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
      vendorsConsent: props.vendorsList,
    }
  }

  // Direct actions
  onConsentAll = () => {
    const { vendorsList, consentActions } = this.props

    consentActions.consent.action(
      vendorsList.map((vendor) => ({
        ...vendor,
        isConsented: true,
      }))
    )
  }

  onDenyAll = () => {
    const { vendorsList, consentActions } = this.props

    consentActions.deny.action(
      vendorsList.map((vendor) => ({
        ...vendor,
        isConsented: false,
      }))
    )
  }

  onPartialConsent = () => {
    const { consentActions } = this.props
    const { vendorsConsent } = this.state

    consentActions.save.action(vendorsConsent)
  }

  // Handlers
  consentVendorsHandler = (index: number) => {
    const { vendorsConsent } = this.state

    this.setState({
      vendorsConsent: vendorsConsent.map((consent, i) => {
        if (i === index)
          return {
            ...consent,
            isConsented: !consent.isConsented,
          }
        return {
          ...consent,
        }
      }),
    })
  }

  // Templates
  WelcomeScreen = () => {
    const { welcomeMessage, privacyPolicy, moreDetailsLabel, consentActions } =
      this.props

    const { isVendorsOpen } = this.state

    return (
      <div className="consent-banner">
        <div className="consent-banner__message">
          <div className={['type', texts.type].filter((n) => n).join(' ')}>
            {welcomeMessage}
          </div>
          <Button
            type="tertiary"
            label={privacyPolicy.label}
            action={privacyPolicy.action}
          />
        </div>
        <Bar
          leftPartSlot={
            <Button
              type="tertiary"
              label={moreDetailsLabel}
              action={() =>
                this.setState({
                  isVendorsOpen: !isVendorsOpen,
                })
              }
            />
          }
          rightPartSlot={
            <div
              className={[
                'consent-banner__actions',
                layouts['snackbar--medium'],
              ]
                .filter((n) => n)
                .join(' ')}
            >
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
          }
          padding="0"
        />
      </div>
    )
  }

  DetailedVendorsList = () => {
    const {
      vendorsMessage,
      lessDetailsLabel,
      validVendor,
      vendorsList,
      consentActions,
    } = this.props

    const { isVendorsOpen, vendorsConsent } = this.state

    return (
      <div className="consent-banner">
        <div className="consent-banner__content">
          <div
            className={['consent-banner__message', 'type', texts.type]
              .filter((n) => n)
              .join(' ')}
          >
            {vendorsMessage}
          </div>
          <ul className="consent-banner__list">
            <li className="consent-banner__item">
              <Bar
                leftPartSlot={
                  <div
                    className={[layouts['snackbar--large']]
                      .filter((n) => n)
                      .join(' ')}
                  >
                    <div>
                      <div
                        className={[
                          'consent-banner__item__title',
                          'type',
                          'type--large',
                          texts.type,
                        ]
                          .filter((n) => n)
                          .join(' ')}
                      >
                        {validVendor.name}
                      </div>
                      <div
                        className={[
                          'consent-banner__item__description',
                          'type',
                          texts.type,
                        ]
                          .filter((n) => n)
                          .join(' ')}
                      >
                        {validVendor.description}
                      </div>
                    </div>
                  </div>
                }
                rightPartSlot={
                  <div className="consent-banner__item__action">
                    <Select
                      id={`legit-user-consent`}
                      type="SWITCH_BUTTON"
                      isChecked={validVendor.isConsented}
                      isDisabled={true}
                    />
                  </div>
                }
                border={['BOTTOM']}
                padding="var(--size-xxxsmall) 0 var(--size-xxsmall) 0"
              />
            </li>
            {vendorsList.map((vendor, index) => (
              <li
                key={index}
                className="consent-banner__item"
              >
                <Bar
                  leftPartSlot={
                    <div
                      className={[layouts['snackbar--large']]
                        .filter((n) => n)
                        .join(' ')}
                    >
                      <div className="consent-banner__item__icon">
                        <Thumbnail
                          src={vendor.icon}
                          w="32px"
                          h="32px"
                        />
                      </div>
                      <div>
                        <div
                          className={[
                            'consent-banner__item__title',
                            'type',
                            'type--large',
                            texts.type,
                          ]
                            .filter((n) => n)
                            .join(' ')}
                        >
                          {vendor.name}
                        </div>
                        <div
                          className={[
                            'consent-banner__item__description',
                            'type',
                            texts.type,
                          ]
                            .filter((n) => n)
                            .join(' ')}
                        >
                          {vendor.description}
                        </div>
                      </div>
                    </div>
                  }
                  rightPartSlot={
                    <div className="consent-banner__item__action">
                      <Select
                        id={`change-${vendor.id}-user-consent`}
                        type="SWITCH_BUTTON"
                        isChecked={vendorsConsent[index].isConsented}
                        onChange={() => this.consentVendorsHandler(index)}
                      />
                    </div>
                  }
                  border={
                    index === vendorsConsent.length - 1 ? undefined : ['BOTTOM']
                  }
                  padding="var(--size-xxxsmall) 0 var(--size-xxsmall) 0"
                />
              </li>
            ))}
          </ul>
        </div>
        <Bar
          leftPartSlot={
            <Button
              type="tertiary"
              label={lessDetailsLabel}
              action={() =>
                this.setState({
                  isVendorsOpen: !isVendorsOpen,
                })
              }
            />
          }
          rightPartSlot={
            <div
              className={[
                'consent-banner__actions',
                layouts['snackbar--medium'],
              ]
                .filter((n) => n)
                .join(' ')}
            >
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
          }
          padding="0"
        />
      </div>
    )
  }

  // Render
  render() {
    const { isVendorsOpen } = this.state

    if (isVendorsOpen)
      return (
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
