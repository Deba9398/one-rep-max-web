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
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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
    <Card padding={0} radius='md' withBorder>
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

export function RepMaxChart({
  repMaxValues,
}: {
  repMaxValues: MultiFormulaRepMaxValues;
}) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = 0;

  const data = Object.keys(repMaxValues).map((key) => {
    const rep: { [key: string]: number | string } = {
      name: key,
    };

    repMaxValues[key].forEach((formula) => {
      max = Math.max(formula.value, max);
      min = Math.min(formula.value, min);
      rep[formula.formula] = formula.value;
    });

    return rep;
  });

  const chartColors = [
    '#4169E1', // Royal Blue
    '#DC143C', // Crimson Red
    '#228B22', // Forest Green
    '#FFD700', // Golden Yellow
    '#663399', // Deep Purple
    '#FF8C00', // Burnt Orange
    '#008080', // Teal
  ];

  return (
    <ResponsiveContainer width='95%' height={400}>
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis domain={[Math.floor(min), Math.ceil(max)]} />
        <Tooltip
        // content={({ active, payload, label }) => {
        //   if (active && payload && payload.length) {
        //     return (
        //       <div className='custom-tooltip bg-white'>
        //         {payload.map((p) => (
        //           <li key={p.name}>
        //             {p.name}: {formatWeight(p.value as number)}
        //           </li>
        //         ))}
        //       </div>
        //     );
        //   }

        //   return null;
        // }}
        />
        <Legend />
        {repMaxValues[1]
          .sort((a, b) => a.formula.localeCompare(b.formula))
          .map((c, i) => (
            <Line
              type='linear'
              key={c.formula}
              dataKey={c.formula}
              stroke={chartColors[i]}
              dot={false}
            />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
