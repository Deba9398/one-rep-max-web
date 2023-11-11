import {
  MultiFormulaRepMaxValues,
  RepMaxValueType,
} from '@/util/repMaxFormulas';
import { Accordion, Card } from '@mantine/core';

const RepMaxRow = ({
  repMax,
  repMaxCalculation,
}: {
  repMax: string;
  repMaxCalculation: RepMaxValueType[];
}) => {
  const avg =
    repMaxCalculation.reduce(
      (acc, repMaxCalculation) => acc + repMaxCalculation.value,
      0
    ) / repMaxCalculation.length;

  return (
    <div className='flex'>
      <div className='flex-1'>{repMax}RM</div>
      <div className='flex-none font-bold'>{Math.round(avg)} lbs</div>
    </div>
  );
};

const RepMaxRowContent = ({ values }: { values: RepMaxValueType[] }) => {
  return (
    <div>
      {values.map((repMaxCalculation) => (
        <div key={repMaxCalculation.formula} className='flex'>
          <div className='flex-1'>{repMaxCalculation.formula}</div>
          <div>{Math.round(repMaxCalculation.value)} lbs</div>
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
              <RepMaxRowContent values={repMaxValues[key]} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
}
