import { isMetricWeights } from '@/util/formatter';
import PlateLoader from './PlateLoader';
import { Title, Text, Space, Anchor, Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function HelpContent() {
  return (
    <>
      <Title order={2} size='h3' className=' text-center'>
        Calculator
      </Title>
      <p>
        This One Rep Max (1RM) calculator can help you estimate your maximum
        strength for any lift across various rep ranges. It also calculates the
        percentages of your 1 rep max required by many training programs. Any
        lift can be used from olympic lifts like Bench Press, Squat, and
        Deadlift to isolation lifts like bicep curls. This calculator uses many{' '}
        <Anchor href='https://en.wikipedia.org/wiki/One-repetition_maximum'>
          well known formulas
        </Anchor>{' '}
        to calculate these estimates. Here&apos;s how to use it:
      </p>
      <ol>
        <li>
          Start by warming up and then performing the lift you&apos;d like to
          calculate in a rep range you&apos;re comfortable with. Generally lower
          rep ranges (less than 8) yield more accurate estimates. Do as many
          reps as you can with good form.
        </li>
        <li>
          Enter the weight you lifted and the number of reps you accomplished in
          the input fields.
        </li>
        <li>
          Your 1 rep max is the first value displayed in the table. That is the
          estimate for the maximum weight you can lift for a single repetition.
          The 2 Rep Max row shows the estimated maximum weight you can lift for
          2 repetitions and so on.
        </li>
      </ol>
      <Space h={48} />
      <Title order={2} size='h3' className=' text-center'>
        Plate Loader
      </Title>
      <p>
        Now that you know what weight you can lift, let&apos;s load up the bar!
        Expand any row to reveal the plate loader. This shows a visualization of
        what plates to load on each side of the bar.{' '}
      </p>
      <p>
        Is the loader showing a plate you don&apos;t have? No problem, pick your
        available plates on the <Anchor href='/settings'>Settings page</Anchor>.
      </p>
      <p>
        The plate loader shows the <span className='font-bold'>difference</span>{' '}
        between the estimated max and the visualized barbell. You can adjust the
        weight on the barbell using the +/- buttons. Go ahead and try below,
        it&apos;s interactive!
      </p>
      <PlateLoader weight={isMetricWeights() ? 75 : 160} />
      <Space h={48} />
      <Title order={2} size='h3' className=' text-center'>
        Formulas
      </Title>
      <p>
        The calculator uses 7 formulas to calculate these estimates: Brzycki,
        Epley, Lander, Lombardi, Mayhew et al., O&apos;Connor et al., and
        Wathan. These estimates are averaged together to give the final estimate
        displayed.
      </p>
      <p>
        What do the colors mean? Since each formula produces a different value,
        the colors represent how much uncertainty there is in the final value.
        The standard deviation of the formulas is used to determine the color.
        The lower the standard deviation, the more agreement there is between
        the formulas.
      </p>
      <ul>
        <li>
          <Text size='lg' c='green'>
            Green: 2% or less
          </Text>
        </li>
        <li>
          <Text size='lg' c='yellow'>
            Orange: 2%-4%
          </Text>
        </li>
        <li>
          <Text size='lg' c='red'>
            Red: Over 4%
          </Text>
        </li>
      </ul>
    </>
  );
}

export default function Help({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <Modal
      opened={opened}
      size='xl'
      fullScreen={isMobile}
      onClose={close}
      title='Help'
    >
      <HelpContent />
    </Modal>
  );
}
