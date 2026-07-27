'use client';
import { Modal, Title, Text, Button, Stack, ScrollArea } from '@mantine/core';
import { useEffect, useState } from 'react';

const EULA_VERSION = '1.0';
const EULA_STORAGE_KEY = 'eulaAccepted';

export default function EulaModal() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(EULA_STORAGE_KEY);
    if (accepted !== EULA_VERSION) {
      setOpened(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(EULA_STORAGE_KEY, EULA_VERSION);
    setOpened(false);
  }

  // Mantine renders the title inside its own <h2>, so a Title component here would nest
  // headings -- invalid HTML, which React reports as a hydration error.
  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      size='lg'
      title={
        <Text component='span' fz='h3' fw={500}>
          Terms of Use &amp; Disclaimer
        </Text>
      }
      centered
    >
      <ScrollArea h={400} pr='md'>
        <Stack gap='sm'>
          <Text fw={700}>
            Please read and accept the following terms before using this
            application.
          </Text>

          <Title order={3} size='h5' mt='xs'>
            1. For Informational Purposes Only
          </Title>
          <Text size='sm'>
            This application provides one-repetition maximum (1RM) estimates
            solely for general informational and educational purposes. The
            results are mathematical estimates based on publicly available
            formulas and are not guarantees of actual physical capability.
          </Text>

          <Title order={3} size='h5' mt='xs'>
            2. Not Professional Advice
          </Title>
          <Text size='sm'>
            Nothing in this application constitutes medical, fitness,
            nutritional, or professional training advice. Always consult a
            qualified healthcare provider or certified strength and conditioning
            specialist before beginning or modifying any exercise program,
            especially if you have any pre-existing health conditions, injuries,
            or physical limitations.
          </Text>

          <Title order={3} size='h5' mt='xs'>
            3. Assumption of Risk
          </Title>
          <Text size='sm'>
            Weightlifting and resistance training carry inherent risks of
            injury, including but not limited to muscle strains, joint injuries,
            and cardiovascular events. By using this application you voluntarily
            assume all such risks and acknowledge that you are solely responsible
            for your training decisions and physical safety.
          </Text>

          <Title order={3} size='h5' mt='xs'>
            4. Accuracy of Estimates
          </Title>
          <Text size='sm'>
            1RM formulas are statistical models derived from population studies.
            Individual results may vary significantly. Do not attempt to lift a
            weight based solely on an estimate provided by this application
            without proper warm-up, spotting, and professional guidance.
          </Text>

          <Title order={3} size='h5' mt='xs'>
            5. Limitation of Liability
          </Title>
          <Text size='sm'>
            To the fullest extent permitted by applicable law, the developers
            and operators of this application shall not be liable for any
            direct, indirect, incidental, special, consequential, or punitive
            damages arising out of or related to your use of, or inability to
            use, this application or any estimates it provides, including any
            physical injury or death.
          </Text>

          <Title order={3} size='h5' mt='xs'>
            6. No Warranty
          </Title>
          <Text size='sm'>
            This application is provided &quot;as is&quot; without warranty of
            any kind, express or implied. The developers make no representations
            about the suitability, reliability, or accuracy of the application
            for any purpose.
          </Text>

          <Title order={3} size='h5' mt='xs'>
            7. Changes to Terms
          </Title>
          <Text size='sm'>
            These terms may be updated from time to time. Continued use of the
            application following any update constitutes your acceptance of the
            revised terms.
          </Text>
        </Stack>
      </ScrollArea>

      <Button fullWidth mt='md' size='md' onClick={handleAccept}>
        I Understand and Accept
      </Button>
    </Modal>
  );
}
