import { calculateMetrics, calculateStandardDeviation } from '@/util/mathUtils';
import {
  MultiFormulaRepMaxValues,
  RepMaxValueType,
} from '@/util/repMaxFormulas';
import { Accordion, Card, Space, Title } from '@mantine/core';

const RepMaxRow = ({
  repMax,
  repMaxCalculation,
}: {
  repMax: string;
  repMaxCalculation: RepMaxValueType[];
}) => {
  const { avg, color } = calculateMetrics(
    repMaxCalculation.map((c) => c.value)
  );

  return (
    <div className='flex text-lg'>
      <div className='flex-1'>{repMax}RM</div>
      <div className='flex-none'>
        <span className={color}>●</span>{' '}
        <span className='font-bold'>{Math.round(avg)} lbs</span>
      </div>
    </div>
  );
};

const RepMaxRowContent = ({
  repMaxCalculation,
}: {
  repMaxCalculation: RepMaxValueType[];
}) => {
  const { color, stdDeviation, percentDeviation } = calculateMetrics(
    repMaxCalculation.map((c) => c.value)
  );

  return (
    <div>
      <div className='flex text-center'>
        <div className='flex-1'>
          <Title order={4}>Range</Title>
          <div>
            {Math.round(repMaxCalculation[repMaxCalculation.length - 1].value)}{' '}
            lbs - {Math.round(repMaxCalculation[0].value)} lbs
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
      {repMaxCalculation.map((calculation, i) => (
        <div
          key={calculation.formula}
          className={`flex px-4 py-1 rounded bg-opacity-5 ${
            i % 2 === 0 ? 'bg-white' : ''
          }`}
        >
          <div className='flex-1'>{calculation.formula}</div>
          <div>{Math.round(calculation.value)} lbs</div>
        </div>
      ))}
    </div>
  );
};

export default function RepMaxTable({
  repMaxValues,
}: {
  repMaxValues: MultiFormulaRepMaxValues;
}) {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Accordion chevronPosition='left' multiple>
        {Object.keys(repMaxValues).map((key) => (
          <Accordion.Item key={key} value={key}>
            <Accordion.Control>
              <RepMaxRow repMax={key} repMaxCalculation={repMaxValues[key]} />
            </Accordion.Control>
            <Accordion.Panel>
              <RepMaxRowContent repMaxCalculation={repMaxValues[key]} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
}
