/**
 * Source that generated app/opengraph-image.png. Not wired into the build.
 *
 * The generated PNG is committed rather than rendered on every build because Next's
 * dynamic `app/opengraph-image.tsx` route exports to an extensionless file
 * (`out/opengraph-image`) under `output: 'export'`. Static hosts serve that as
 * application/octet-stream, and social crawlers reject an og:image that is not served
 * with an image content type. A committed `opengraph-image.png` gets a real extension
 * and the correct type.
 *
 * To regenerate: copy this to app/opengraph-image.tsx, run `yarn build`, then
 * `cp out/opengraph-image app/opengraph-image.png` and delete the route again.
 */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const dynamic = 'force-static';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt =
  '1 Rep Max Calculator - estimate your one rep max for any lift';

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public', 'icon-large.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A1B1E',
          color: '#F8F9FA',
          fontFamily: 'sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={140} height={140} alt='' />
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            marginTop: 28,
            letterSpacing: -1,
          }}
        >
          1 Rep Max Calculator
        </div>
        <div
          style={{
            fontSize: 34,
            marginTop: 16,
            color: '#A6A7AB',
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          Estimate your 1RM for any lift, see every percentage, and load the bar.
        </div>
        <div
          style={{
            fontSize: 26,
            marginTop: 40,
            color: '#4DABF7',
          }}
        >
          onerepmaxcalc.com
        </div>
      </div>
    ),
    size
  );
}
