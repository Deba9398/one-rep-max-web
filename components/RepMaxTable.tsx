import { FormatWeight, formatWeight } from '@/util/formatter';
import { calculateMetrics } from '@/util/mathUtils';
import {
  MultiFormulaRepMaxValues,
  RepMaxValueType,
} from '@/util/repMaxFormulas';
import {
  Accordion,
  Card,
  Space,
  Title,
  Text,
  Table,
  Divider,
} from '@mantine/core';
import PlateLoader from './PlateLoader';
import { useAccordionState } from '@/util/hooks';

export const RepMaxRow = ({
  label,
  repMaxCalculation,
}: {
  label: string;
  repMaxCalculation: RepMaxValueType[];
}) => {
  const { avg, color } = calculateMetrics(
    repMaxCalculation.map((c) => c.value)
  );

  return (
    <div className='flex text-lg'>
      <div className='flex-1'>{label}</div>
      <div className='flex-none'>
        <Text size='lg' c={color} fw={500}>
          <FormatWeight weight={avg} decimalPlaces={1} forceDecimals={true} />
        </Text>
      </div>
    </div>
  );
};

export const RepMaxRowContent = ({
  repMaxCalculation,
}: {
  repMaxCalculation: RepMaxValueType[];
}) => {
  const { avg, color, stdDeviation, percentDeviation } = calculateMetrics(
    repMaxCalculation.map((c) => c.value)
  );

  return (
    <div>
      <div className='flex pt-4 px-6 text-center'>
        <div className='flex-1'>
          <Title order={3} size='h4'>
            Calculation Range
          </Title>
          <Text size='lg'>
            {formatWeight(
              repMaxCalculation[repMaxCalculation.length - 1].value,
              1
            )}{' '}
            - {formatWeight(repMaxCalculation[0].value, 1)}
          </Text>
        </div>
        <div className='flex-1'>
          <Title order={3} size='h4'>
            Std. Deviation
          </Title>
          <Text size='lg' c={color}>
            ±{formatWeight(stdDeviation, 1)} ({percentDeviation.toFixed(1)}%)
          </Text>
        </div>
      </div>
      <Space h='lg' />
      <div className='flex justify-center'>
        <PlateLoader weight={avg} />
      </div>
      <Divider />

      <Table striped highlightOnHover horizontalSpacing='md'>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Calculation Formula</Table.Th>
            <Table.Th style={{ textAlign: 'right' }}>Result</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {repMaxCalculation.map((calculation, i) => (
            <Table.Tr key={calculation.formula}>
              <Table.Td>{calculation.formula}</Table.Td>
              <Table.Td align='right'>
                {formatWeight(calculation.value, 1)}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default function RepMaxTable({
  repMaxValues,
}: {
  repMaxValues: MultiFormulaRepMaxValues;
}) {
  const [openPanels, onAccordionStateChange] = useAccordionState('repmax');

  return (
    <Card padding={0} radius='lg' withBorder>
      <Accordion
        onChange={onAccordionStateChange}
        chevronPosition='left'
        multiple
      >
        {Object.keys(repMaxValues).map((key) => (
          <Accordion.Item key={key} value={key}>
            <Accordion.Control>
              <RepMaxRow
                label={`${key} Rep Max`}
                repMaxCalculation={repMaxValues[key]}
              />
            </Accordion.Control>
            <Accordion.Panel
              styles={{
                content: {
                  padding: 0,
                },
              }}
            >
              {openPanels.includes(key) ? (
                <RepMaxRowContent repMaxCalculation={repMaxValues[key]} />
              ) : null}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
}
