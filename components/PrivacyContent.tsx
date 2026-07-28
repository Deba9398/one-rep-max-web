import { Anchor, Text, Title, Stack } from '@mantine/core';
import { CONTACT_EMAIL } from './TermsContent';

// Mantine theme variable so the table borders follow light/dark like everything else.
const cellBorder = { borderColor: 'var(--mantine-color-default-border)' };

export const PRIVACY_VERSION = '1.0';
export const PRIVACY_EFFECTIVE_DATE = 'July 28, 2026';

// Keys the Application writes to localStorage. Keep this in sync with the code -- the
// policy is only accurate if this table is.
const STORED_ITEMS = [
  ['unitPreference', 'Whether you prefer pounds or kilograms'],
  ['lastWeightLifted', 'The weight from your most recent calculation'],
  ['lastRepsPerformed', 'The rep count from your most recent calculation'],
  [
    'availableWeightslbs, availableWeightskg',
    'Which barbell plates you have marked as available',
  ],
  ['eulaAccepted', 'The version of the Terms of Use you accepted'],
  ['eulaAcceptedAt', 'The date and time you accepted them'],
  ['mantine-color-scheme-value', 'Whether you prefer light or dark appearance'],
];

export default function PrivacyContent() {
  return (
    <Stack gap='sm'>
      <Text size='sm' c='dimmed'>
        Version {PRIVACY_VERSION} &middot; Effective {PRIVACY_EFFECTIVE_DATE}
      </Text>

      <Text fw={700}>
        The 1 Rep Max Calculator has no accounts and no server that stores your
        data. Your lifts, preferences, and settings stay in your own browser and
        are never sent to us.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        1. Who We Are
      </Title>
      <Text size='sm'>
        The 1 Rep Max Calculator (the &quot;Application&quot;) is operated by
        Code Gardener LLC, a Colorado limited liability company (&quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;). This Privacy Policy explains what
        information the Application handles and how. It applies to the web
        application only, and is incorporated into our{' '}
        <Anchor href='/terms'>
          Terms of Use
        </Anchor>
        .
      </Text>

      <Title order={3} size='h5' mt='xs'>
        2. Information You Give Us Directly
      </Title>
      <Text size='sm'>
        None. The Application has no accounts, no registration, no sign-in, and
        no payment processing. We do not ask for your name, email address,
        postal address, phone number, date of birth, or any government
        identifier. The only circumstance in which we receive information from
        you directly is if you choose to email us, in which case we receive
        whatever you put in that email.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        3. Information Stored in Your Browser
      </Title>
      <Text size='sm'>
        The weights and repetitions you enter, and your settings, are saved in
        your browser&apos;s local storage so the Application remembers them on
        your next visit. This information stays on your device. It is not
        transmitted to us, and we cannot read it.
      </Text>
      {/* Plain HTML rather than Mantine's Table: this is a server component, and
          compound components from a 'use client' package resolve to undefined across
          the boundary. Keeping it server-rendered keeps the policy text out of the
          client bundle. */}
      <div className='overflow-x-auto'>
        <table className='w-full text-sm border-collapse mt-2'>
          <thead>
            <tr>
              <th className='text-left p-2 border-b' style={cellBorder}>
                Stored item
              </th>
              <th className='text-left p-2 border-b' style={cellBorder}>
                What it holds
              </th>
            </tr>
          </thead>
          <tbody>
            {STORED_ITEMS.map(([key, description]) => (
              <tr key={key}>
                <td className='p-2 align-top border-b' style={cellBorder}>
                  <code className='text-xs'>{key}</code>
                </td>
                <td className='p-2 align-top border-b' style={cellBorder}>
                  {description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Title order={3} size='h5' mt='xs'>
        4. Analytics
      </Title>
      <Text size='sm'>
        The Application uses Google Analytics to understand how the Application
        is used in aggregate, so we can improve it. Google Analytics is not
        loaded when the Application is run locally in development; it runs only
        on the published site.
      </Text>
      <Text size='sm'>
        We record which features are used, as event names only. For example, we
        record that a visitor changed the weight field, opened a rep max row, or
        switched between pounds and kilograms.{' '}
        <strong>
          We do not attach the values you enter to these events.
        </strong>{' '}
        The weights, repetitions, and estimates themselves are never sent to
        Google Analytics or to us.
      </Text>
      <Text size='sm'>
        Google Analytics itself collects additional standard information when
        you visit, which typically includes your IP address, approximate
        geographic location derived from it, browser and device type, operating
        system, screen size, referring website, and the pages you view. Google
        may set cookies or similar identifiers in your browser to distinguish
        repeat visits. This processing is carried out by Google, and its use of
        that information is governed by{' '}
        <Anchor
          href='https://policies.google.com/privacy'
          target='_blank'
          rel='noopener noreferrer'
        >
          Google&apos;s Privacy Policy
        </Anchor>
        . You can prevent Google Analytics from collecting your data by
        installing the{' '}
        <Anchor
          href='https://tools.google.com/dlpage/gaoptout'
          target='_blank'
          rel='noopener noreferrer'
        >
          Google Analytics opt-out browser add-on
        </Anchor>
        , by blocking analytics cookies or scripts in your browser, or by using
        a browser or extension that blocks trackers.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        5. Server Logs
      </Title>
      <Text size='sm'>
        The Application is a static website served by a hosting provider. Like
        essentially all web hosts, that provider may automatically log requests,
        including IP addresses, timestamps, requested files, and user agent
        strings, for security and operational purposes. We do not control the
        retention period for those logs and do not use them to build profiles of
        visitors.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        6. Cookies and Similar Technologies
      </Title>
      <Text size='sm'>
        We do not set cookies of our own. The Application relies on browser local
        storage, described in Section 3, for its own functionality. Google
        Analytics may set its own cookies and local storage entries as described
        in Section 4. You can clear or block these at any time through your
        browser settings, though clearing local storage will also erase your
        saved preferences and your record of accepting the Terms of Use.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        7. How We Use Information
      </Title>
      <Text size='sm'>
        We use aggregate analytics information solely to understand which
        features are used and to improve the Application. We do not use it to
        identify you, to make decisions about you, or to build an individual
        profile.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        8. We Do Not Sell or Share Your Personal Information
      </Title>
      <Text size='sm'>
        We do not sell your personal information, and we do not share it for
        cross-context behavioral advertising, as those terms are used under the
        California Consumer Privacy Act and the Colorado Privacy Act. We do not
        transfer your information to data brokers or advertisers. We may disclose
        information if required to do so by law, or where necessary to protect
        our legal rights.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        9. Health and Fitness Information
      </Title>
      <Text size='sm'>
        The weights and repetitions you enter may reveal something about your
        physical condition. That is precisely why the Application keeps them in
        your browser rather than sending them anywhere. We do not receive them,
        store them on a server, or share them. We are not a covered entity or
        business associate under HIPAA, and the Application is not a medical
        record system.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        10. Children
      </Title>
      <Text size='sm'>
        The Application is intended for adults, and our Terms of Use require
        users to be at least 18 years old. The Application is not directed to
        children under 13, and we do not knowingly collect personal information
        from them. If you believe a child has provided us with personal
        information, contact us at {CONTACT_EMAIL} and we will address it.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        11. Your Choices and Rights
      </Title>
      <Text size='sm'>
        Because everything the Application saves is stored in your own browser,
        you can delete all of it yourself at any time by clearing site data for
        this website in your browser settings, or by using a private or incognito
        window. There is no account to close and no request you need to send us
        in order to do it.
      </Text>
      <Text size='sm'>
        Depending on where you live, you may have rights under laws such as the
        Colorado Privacy Act, the California Consumer Privacy Act, or the
        European Union General Data Protection Regulation, including rights to
        access, correct, delete, or obtain a copy of personal information, and to
        opt out of certain processing. Because we do not hold accounts or
        identifiable records, we usually cannot connect a request to a particular
        person. Requests concerning information held by Google Analytics are
        generally best directed to the controls described in Section 4. You may
        still contact us at {CONTACT_EMAIL} and we will do what we reasonably can
        to help, and will not discriminate against you for exercising these
        rights.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        12. International Visitors
      </Title>
      <Text size='sm'>
        We operate from the United States, and any information processed in
        connection with the Application, including by Google Analytics, may be
        processed in the United States or other countries whose data protection
        laws may differ from those in your country. By using the Application, you
        understand that your information may be processed in those locations.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        13. Security
      </Title>
      <Text size='sm'>
        The Application is served over an encrypted connection. Because your data
        stays in your browser rather than on our servers, the security of that
        data depends primarily on the security of your own device and browser. No
        method of transmission or storage is completely secure, and we cannot
        guarantee absolute security.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        14. Third-Party Links
      </Title>
      <Text size='sm'>
        The Application links to external websites, such as reference material
        about lifting standards and one-repetition maximum formulas. We do not
        control those sites and are not responsible for their content or privacy
        practices. Their own policies govern what they collect when you visit
        them.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        15. Changes to This Policy
      </Title>
      <Text size='sm'>
        We may update this Privacy Policy from time to time. When we do, we will
        revise the version number and effective date shown above. Material
        changes will be reflected here, and your continued use of the Application
        after a change constitutes acceptance of the updated policy.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        16. Contact
      </Title>
      <Text size='sm'>
        Questions or requests concerning this Privacy Policy may be sent to{' '}
        {CONTACT_EMAIL}.
      </Text>
    </Stack>
  );
}
