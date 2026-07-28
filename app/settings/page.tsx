import type { Metadata } from 'next';
import SettingsPanel from '@/components/Settings';
import { pageSocialMetadata } from '@/util/site';

const title = 'Settings | 1 Rep Max (1RM) Calculator';
const description =
  'Choose which barbell plates you have available and set your appearance preference for the 1 Rep Max Calculator.';

// A server component so it can declare its own metadata. Previously this page
// inherited the root title and description verbatim, giving the site two pages
// with identical tags. It holds only local preferences, so it is also noindex.
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/settings',
  },
  ...pageSocialMetadata({ title, description, path: '/settings' }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function Settings() {
  return <SettingsPanel />;
}
