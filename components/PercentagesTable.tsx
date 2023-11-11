import { calculateMetrics } from '@/util/mathUtils';
import {
  MultiFormulaRepMaxValues,
  RepMaxValueType,
} from '@/util/repMaxFormulas';
import { Accordion, Card, Space, Title } from '@mantine/core';

const InnerContent = ({
  values,
  percentage,
}: {
  values: RepMaxValueType[];
  percentage: number;
}) => {
  const { color, stdDeviation, percentDeviation } = calculateMetrics(
    values.map((c) => (c.value * percentage) / 100)
  );

  return (
    <div>
      <div className='flex text-center'>
        <div className='flex-1'>
          <Title order={4}>Range</Title>
          <div>
            {Math.round(values[values.length - 1].value)} lbs -{' '}
            {Math.round(values[0].value)} lbs
          </div>
        </div>
        <div className='flex-1'>
          <Title order={4}>Std. Deviation</Title>
          <div className={`${color}`}>
            ±{stdDeviation.toFixed(1)} lbs ({percentDeviation.toFixed(1)}%)
          </div>
        </div>
      </div>
      <Space h='lg' />
      {values.map((repMaxCalculation, i) => (
        <div
          key={repMaxCalculation.formula}
          className={`flex px-4 py-1 rounded bg-opacity-5 ${
            i % 2 === 0 ? 'bg-white' : ''
          }`}
        >
          <div className='flex-1'>{repMaxCalculation.formula}</div>
          <div>
            {Math.round((repMaxCalculation.value * percentage) / 100)} lbs
          </div>
        </div>
      ))}
    </div>
  );
};

const PercentagesRow = ({
  values,
  percentage,
}: {
  values: RepMaxValueType[];
  percentage: number;
}) => {
  const { avg, color } = calculateMetrics(
    values.map((c) => (c.value * percentage) / 100)
  );

  return (
    <div className='flex text-lg'>
      <div className='flex-1'>{percentage}%</div>
      <div className='flex-none'>
        <span className={color}>●</span>{' '}
        <span className='font-bold'>{Math.round(avg)} lbs</span>
      </div>
    </div>
  );
};

export default function PercentagesTable({
  repMaxValues,
}: {
  repMaxValues: MultiFormulaRepMaxValues;
}) {
  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 40];
  const avg =
    repMaxValues[1].reduce(
      (acc, repMaxCalculation) => acc + repMaxCalculation.value,
      0
    ) / repMaxValues[1].length;

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Accordion chevronPosition='left' multiple>
        {percentages.map((p) => (
          <Accordion.Item key={p} value={p.toString()}>
            <Accordion.Control>
              <PercentagesRow values={repMaxValues[1]} percentage={p} />
            </Accordion.Control>
            <Accordion.Panel>
              <InnerContent values={repMaxValues[1]} percentage={p} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
}
