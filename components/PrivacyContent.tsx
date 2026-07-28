import { Anchor, Text, Title, Stack } from '@mantine/core';
import { CONTACT_EMAIL } from './TermsContent';

export const PRIVACY_VERSION = '1.0';
export const PRIVACY_EFFECTIVE_DATE = 'July 28, 2026';

export default function PrivacyContent() {
  return (
    <Stack gap='sm'>
      <Text size='sm' c='dimmed'>
        Version {PRIVACY_VERSION} &middot; Effective {PRIVACY_EFFECTIVE_DATE}
      </Text>

      <Text fw={700}>
        The 1 Rep Max Calculator has no accounts and no server that stores your
        data. The weights and reps you enter stay in your own browser and are
        never sent to us. We use Google Analytics to see which features get used.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        1. Who We Are
      </Title>
      <Text size='sm'>
        The 1 Rep Max Calculator (the &quot;Application&quot;) is operated by
        Code Gardener LLC, a Colorado limited liability company. This policy is
        incorporated into our{' '}
        <Anchor href='/terms'>Terms of Use</Anchor>.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        2. What Stays on Your Device
      </Title>
      <Text size='sm'>
        The Application has no accounts, no sign-in, and no payment processing,
        so we never ask for your name, email address, or any other identifying
        information. The weights and repetitions you enter, your unit and plate
        preferences, your appearance setting, and the record that you accepted
        our Terms are all saved in your browser&apos;s local storage. That
        information stays on your device, is not transmitted to us, and we cannot
        read it.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        3. Analytics
      </Title>
      <Text size='sm'>
        We use Google Analytics on the published site to understand in aggregate
        which features are used, so we can improve the Application. We record
        only that an action happened, such as a visitor changing the weight field
        or switching between pounds and kilograms.{' '}
        <strong>The values you enter are not attached to those events</strong>{' '}
        and are never sent to Google or to us.
      </Text>
      <Text size='sm'>
        Google Analytics separately collects standard visit information,
        typically including your IP address, approximate location derived from
        it, browser and device type, referring site, and pages viewed, and may
        set cookies or similar identifiers to recognise repeat visits. That
        processing is Google&apos;s, governed by{' '}
        <Anchor
          href='https://policies.google.com/privacy'
          target='_blank'
          rel='noopener noreferrer'
        >
          Google&apos;s Privacy Policy
        </Anchor>
        . You can opt out with the{' '}
        <Anchor
          href='https://tools.google.com/dlpage/gaoptout'
          target='_blank'
          rel='noopener noreferrer'
        >
          Google Analytics opt-out add-on
        </Anchor>{' '}
        or any tracker-blocking browser or extension.
      </Text>
      <Text size='sm'>
        The site is hosted on Cloudflare Pages, which keeps standard server
        request logs and provides Cloudflare Web Analytics. Cloudflare Web
        Analytics is cookieless: it does not use cookies, local storage, or
        device fingerprinting to identify you, and reports only aggregate page
        view and page speed information.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        4. We Do Not Sell Your Information
      </Title>
      <Text size='sm'>
        We do not sell your personal information or share it for cross-context
        behavioral advertising, as those terms are used under the California
        Consumer Privacy Act and the Colorado Privacy Act, and we do not transfer
        it to data brokers or advertisers.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        5. Deleting Your Information
      </Title>
      <Text size='sm'>
        Because everything the Application saves is stored in your own browser,
        you can erase all of it yourself at any time by clearing site data for
        this website in your browser settings, or by using a private window.
        There is no account to close and no request you need to send us. If you
        are somewhere that gives you additional data protection rights and you
        would like help exercising them, write to us at {CONTACT_EMAIL}.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        6. Children
      </Title>
      <Text size='sm'>
        Our Terms of Use require users to be at least 18. The Application is not
        directed to children under 13 and we do not knowingly collect personal
        information from them.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        7. Changes and Contact
      </Title>
      <Text size='sm'>
        If we change this policy we will update the version and effective date
        above. Questions can be sent to {CONTACT_EMAIL}.
      </Text>
    </Stack>
  );
}
