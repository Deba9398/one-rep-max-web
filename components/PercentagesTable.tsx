import {
  MultiFormulaRepMaxValues,
  RepMaxValueType,
} from '@/util/repMaxFormulas';
import { Accordion, Card } from '@mantine/core';

const InnerContent = ({
  values,
  percentage,
}: {
  values: RepMaxValueType[];
  percentage: number;
}) => {
  return (
    <div>
      {values.map((repMaxCalculation) => (
        <div key={repMaxCalculation.formula} className='flex'>
          <div className='flex-1'>{repMaxCalculation.formula}</div>
          <div>
            {Math.round((repMaxCalculation.value * percentage) / 100)} lbs
          </div>
        </div>
      ))}
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
              <div className='flex'>
                <div className='flex-1'>{p}%</div>
                <div className='flex-none font-bold'>
                  {Math.round((avg * p) / 100)} lbs
                </div>
              </div>
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
