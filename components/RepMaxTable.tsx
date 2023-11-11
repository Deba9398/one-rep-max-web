import { formatWeight } from '@/util/formatter';
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
          {formatWeight(avg)}
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
  const { color, stdDeviation, percentDeviation } = calculateMetrics(
    repMaxCalculation.map((c) => c.value)
  );

  return (
    <div>
      <div className='flex text-center'>
        <div className='flex-1'>
          <Title order={4}>Range</Title>
          <div>
            {formatWeight(
              repMaxCalculation[repMaxCalculation.length - 1].value
            )}{' '}
            - {formatWeight(repMaxCalculation[0].value)}
          </div>
        </div>
        <div className='flex-1'>
          <Title order={4}>Std. Deviation</Title>
          <Text c={color} fw={500}>
            ±{formatWeight(stdDeviation, 1)} ({percentDeviation.toFixed(1)}%)
          </Text>
        </div>
      </div>
      <Space h='lg' />
      <Table striped highlightOnHover>
        <Table.Tbody>
          {repMaxCalculation.map((calculation, i) => (
            <Table.Tr key={calculation.formula}>
              <Table.Td>{calculation.formula}</Table.Td>
              <Table.Td align='right'>
                {formatWeight(calculation.value)}
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
  return (
    <Card shadow='sm' padding={0} radius='md' withBorder>
      <Accordion chevronPosition='left' multiple>
        {Object.keys(repMaxValues).map((key) => (
          <Accordion.Item key={key} value={key}>
            <Accordion.Control>
              <RepMaxRow
                label={`${key} Rep Max`}
                repMaxCalculation={repMaxValues[key]}
              />
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
