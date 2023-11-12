import { MultiFormulaRepMaxValues } from '@/util/repMaxFormulas';
import { Accordion, Card } from '@mantine/core';
import { RepMaxRow, RepMaxRowContent } from './RepMaxTable';

export default function PercentagesTable({
  repMaxValues,
}: {
  repMaxValues: MultiFormulaRepMaxValues;
}) {
  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 40];

  return (
    <Card padding={0} radius='lg' withBorder>
      <Accordion chevronPosition='left' multiple>
        {percentages.map((p) => {
          const values = repMaxValues[1].map((r) => ({
            formula: r.formula,
            value: (r.value * p) / 100,
          }));
          return (
            <Accordion.Item key={p} value={p.toString()}>
              <Accordion.Control>
                <RepMaxRow label={`${p}%`} repMaxCalculation={values} />
              </Accordion.Control>
              <Accordion.Panel
                styles={{
                  content: {
                    padding: 0,
                  },
                }}
              >
                <RepMaxRowContent repMaxCalculation={values} />
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Card>
  );
}
