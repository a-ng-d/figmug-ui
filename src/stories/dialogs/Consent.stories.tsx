import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { action } from 'storybook/actions'
import Consent from '@components/dialogs/consent/Consent'

const mock = fn()

const meta = {
  title: 'Components/Dialogs/Consent',
  component: Consent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Consent>

export default meta
type Story = StoryObj<typeof meta>

export const SingleVendor: Story = {
  args: {
    welcomeMessage: 'Acme Inc. uses cookies to improve your experience',
    vendorsMessage:
      'We use these vendors to provide you with the best experience. You can change your preferences at any time.',
    privacyPolicy: {
      label: 'Read our Privacy Policy',
      action: action('privacyPolicy.action'),
    },
    moreDetailsLabel: 'More details',
    lessDetailsLabel: 'Less details',
    consentActions: {
      consent: {
        label: 'Accept all',
        action: action('consent.action'),
      },
      deny: {
        label: 'Deny all',
        action: action('consent.deny'),
      },
      save: {
        label: 'Save your preferences',
        action: action('consent.save'),
      },
    },
    validVendor: {
      name: 'Functional Cookies',
      id: 'functional',
      icon: '',
      description:
        'These cookies are necessary for the plugin to function and cannot be switched off in our systems.',
      isConsented: true,
      action: mock,
    },
    vendorsList: [
      {
        name: 'Mixpanel',
        id: 'mixpanel',
        icon: 'https://asset.brandfetch.io/idr_rhI2FS/ideb-tnj2D.svg',
        description:
          'A top analytics platform for tracking and understanding user interactions',
        isConsented: false,
      },
    ],
  },
}

export const SeveralVendors: Story = {
  args: {
    welcomeMessage: 'Acme Inc. uses cookies to improve your experience',
    vendorsMessage:
      'We use these vendors to provide you with the best experience. You can change your preferences at any time.',
    privacyPolicy: {
      label: 'Read our Privacy Policy',
      action: action('privacyPolicy.action'),
    },
    moreDetailsLabel: 'More details',
    lessDetailsLabel: 'Less details',
    consentActions: {
      consent: {
        label: 'Accept all',
        action: action('consent.consent'),
      },
      deny: {
        label: 'Deny all',
        action: action('consent.deny'),
      },
      save: {
        label: 'Save your preferences',
        action: action('consent.save'),
      },
    },
    validVendor: {
      name: 'Functional Cookies',
      id: 'functional',
      icon: '',
      description:
        'These cookies are necessary for the plugin to function and cannot be switched off in our systems.',
      isConsented: true,
      action: mock,
    },
    vendorsList: [
      {
        name: 'Mixpanel',
        id: 'mixpanel',
        icon: 'https://asset.brandfetch.io/idr_rhI2FS/ideb-tnj2D.svg',
        description:
          'A top analytics platform for tracking and understanding user interactions',
        isConsented: false,
        action: mock,
      },
      {
        name: 'Google Analytics',
        id: 'google-analytics',
        icon: 'https://asset.brandfetch.io/id6O2oGzv-/idvNIQR3p7.svg',
        description:
          'Measure your advertising ROI as well as track your Flash, video, and social networking sites and applications',
        isConsented: false,
        action: mock,
      },
      {
        name: 'Facebook Pixel',
        id: 'facebook-pixel',
        icon: 'https://asset.brandfetch.io/idpKX136kp/idgHU5-81-.svg',
        description:
          'Track conversions from your Facebook ads, optimize ads based on collected data, build targeted audiences for future ads, and remarket to qualified leads',
        isConsented: false,
        action: mock,
      },
    ],
  },
  argTypes: {},
}
