import { AccordionValue } from '@mantine/core';
import { useState } from 'react';

export function useAccordionState(): [
  AccordionValue<true>,
  (value: AccordionValue<true>) => void
] {
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
    } else {
      setOpenPanels(value);
    }
  };

  return [openPanels, onAccordionStateChange];
}
