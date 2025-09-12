import React from 'react'
import texts from '@styles/texts/texts.module.scss'
import layouts from '@styles/layouts.module.scss'
import Bar from '@components/slots/bar/Bar'
import Select from '@components/inputs/select/Select'
import Thumbnail from '@components/assets/thumbnail/Thumbnail'
import Button from '@components/actions/button/Button'
import { doClassnames } from '@a_ng_d/figmug-utils'
import type { ConsentConfiguration } from '@tps/consent.types'
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
  }
  validVendor: ConsentConfiguration
  vendorsList: Array<ConsentConfiguration>
  canBeClosed?: boolean
  closeLabel?: string
  onClose?: React.MouseEventHandler & React.KeyboardEventHandler
}

export interface ConsentStates {
  isVendorsOpen: boolean
  vendorsConsent: Array<ConsentConfiguration>
}

export default class Consent extends React.Component<
  ConsentProps,
  ConsentStates
> {
  constructor(props: ConsentProps) {
    super(props)
    this.state = {
      isVendorsOpen: false,
      vendorsConsent: props.vendorsList,
    }
  }

  // Direct Actions
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
      <div
        className="consent__banner"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="consent__banner__message"
          role="region"
        >
          <div className={texts.type}>{welcomeMessage}</div>
          <Button
            type="tertiary"
            label={privacyPolicy.label}
            action={privacyPolicy.action}
            aria-label={privacyPolicy.label}
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
              aria-label={moreDetailsLabel}
              aria-expanded={isVendorsOpen}
            />
          }
          rightPartSlot={
            <div
              className={doClassnames([
                'consent__banner__actions',
                layouts['snackbar--medium'],
              ])}
              role="group"
            >
              <Button
                type="secondary"
                label={consentActions.deny.label}
                action={this.onDenyAll}
                aria-label={consentActions.deny.label}
              />
              <Button
                type="primary"
                label={consentActions.consent.label}
                action={this.onConsentAll}
                aria-label={consentActions.consent.label}
              />
              {this.props.canBeClosed && (
                <Button
                  type="icon"
                  icon="close"
                  helper={
                    this.props.closeLabel !== undefined
                      ? { label: this.props.closeLabel, pin: 'TOP' }
                      : undefined
                  }
                  action={this.props.onClose}
                />
              )}
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
      <div
        className="consent__banner"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="consent__banner__content"
          role="region"
        >
          <div
            className={doClassnames(['consent__banner__message', texts.type])}
            role="status"
            aria-live="polite"
          >
            {vendorsMessage}
          </div>
          <ul
            className="consent__banner__list"
            role="list"
          >
            <li
              className="consent__banner__item"
              role="listitem"
            >
              <Bar
                leftPartSlot={
                  <div className={layouts['snackbar--large']}>
                    <div>
                      <div
                        className={doClassnames([
                          'consent__banner__item__title',
                          texts['type--large'],
                          texts.type,
                        ])}
                        role="heading"
                        aria-level={2}
                      >
                        {validVendor.name}
                      </div>
                      <div
                        className={doClassnames([
                          'consent__banner__item__description',
                          texts.type,
                        ])}
                        role="note"
                      >
                        {validVendor.description}
                      </div>
                    </div>
                  </div>
                }
                rightPartSlot={
                  <div
                    className="consent__banner__item__action"
                    role="switch"
                    aria-checked={validVendor.isConsented}
                    aria-readonly="true"
                  >
                    <Select
                      id={`legit-user-consent`}
                      type="SWITCH_BUTTON"
                      isChecked={validVendor.isConsented}
                      isDisabled={true}
                    />
                  </div>
                }
                border={['BOTTOM']}
                padding="var(--size-pos-xxxsmall) 0 var(--size-pos-xxsmall) 0"
              />
            </li>
            {vendorsList.map((vendor, index) => (
              <li
                key={index}
                className="consent__banner__item"
                role="listitem"
              >
                <Bar
                  leftPartSlot={
                    <div className={layouts['snackbar--large']}>
                      <div
                        className="consent__banner__item__icon"
                        role="img"
                      >
                        <Thumbnail
                          src={vendor.icon}
                          width="32px"
                          height="32px"
                        />
                      </div>
                      <div>
                        <div
                          className={doClassnames([
                            'consent__banner__item__title',
                            texts['type--large'],
                            texts.type,
                          ])}
                          role="heading"
                          aria-level={2}
                        >
                          {vendor.name}
                        </div>
                        <div
                          className={doClassnames([
                            'consent__banner__item__description',
                            texts.type,
                          ])}
                          role="note"
                        >
                          {vendor.description}
                        </div>
                      </div>
                    </div>
                  }
                  rightPartSlot={
                    <div
                      className="consent__banner__item__action"
                      role="switch"
                      aria-checked={vendorsConsent[index].isConsented}
                    >
                      <Select
                        id={`change-${vendor.id}-user-consent`}
                        type="SWITCH_BUTTON"
                        isChecked={vendorsConsent[index].isConsented}
                        action={() => this.consentVendorsHandler(index)}
                      />
                    </div>
                  }
                  border={
                    index === vendorsConsent.length - 1 ? undefined : ['BOTTOM']
                  }
                  padding="var(--size-pos-xxxsmall) 0 var(--size-pos-xxsmall) 0"
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
              aria-label={lessDetailsLabel}
              aria-expanded={!isVendorsOpen}
            />
          }
          rightPartSlot={
            <div
              className={doClassnames([
                'consent__banner__actions',
                layouts['snackbar--medium'],
              ])}
              role="group"
            >
              <Button
                type="secondary"
                label={consentActions.deny.label}
                action={this.onDenyAll}
                aria-label={consentActions.deny.label}
              />
              <Button
                type="primary"
                label={consentActions.save.label}
                action={this.onPartialConsent}
                aria-label={consentActions.save.label}
                isAutofocus
              />
              {this.props.canBeClosed && (
                <Button
                  type="icon"
                  icon="close"
                  helper={
                    this.props.closeLabel !== undefined
                      ? { label: this.props.closeLabel, pin: 'TOP' }
                      : undefined
                  }
                  action={this.props.onClose}
                />
              )}
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
        <dialog className="consent">
          <this.DetailedVendorsList />
        </dialog>
      )
    return (
      <dialog className="consent">
        <this.WelcomeScreen />
      </dialog>
    )
  }
}
