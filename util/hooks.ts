import { AccordionValue } from '@mantine/core';
import { useState } from 'react';
import { LogEvent } from './analytics';

export function useAccordionState(
  accordionName: string
): [AccordionValue<true>, (value: AccordionValue<true>) => void] {
  const [openPanels, setOpenPanels] = useState<AccordionValue<true>>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const onAccordionStateChange = (value: AccordionValue<true>) => {
    const panelClosed = openPanels.length - value.length > 0;

    // Cancel any pending timeout actions.
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    if (panelClosed) {
      const timeout = setTimeout(() => setOpenPanels(value));
      setTimeoutId(timeout);
      LogEvent(`accordion_${accordionName}_panel_closed`);
    } else {
      setOpenPanels(value);
      LogEvent(`accordion_${accordionName}_panel_opened`);
    }
  };

  return [openPanels, onAccordionStateChange];
}
