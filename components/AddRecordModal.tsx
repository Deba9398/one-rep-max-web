import React, { useState } from 'react';
import {
  Modal,
  Button,
  Box,
  Group,
  NumberInput,
  Autocomplete,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import { useAuth } from './AuthContext';
import { db } from '@/util/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function AddRecordModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const authContext = useAuth();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      exercise: '',
      weight: '',
      reps: '',
      date: new Date(),
    },

    validate: {
      exercise: (value: string) =>
        /^.+$/.test(value) ? null : 'Exercise name is required',
      weight: (value: string) => {
        const num = parseFloat(value);
        return num >= 0 && num <= 1000
          ? null
          : 'Weight must be between 0 and 1000';
      },
      reps: (value: string) => {
        const num = parseFloat(value);
        return num >= 1 && num <= 15 ? null : 'Reps must be between 1 and 15';
      },
      date: (value: Date) =>
        !isNaN(value.getTime()) ? null : 'Date is required',
    },
  });

  return (
    <Modal title='Add Record' opened={opened} onClose={close}>
      <Box maw={340} mx='auto'>
        <form
          onSubmit={form.onSubmit(async (values) => {
            var user = authContext.currentUser;
            if (!user) {
              user = await authContext.signInAnonymously();
            }

            if (!user) {
              throw new Error('Anonymous Authentication failed');
            }

            addDoc(collection(db, 'users', user.uid, 'records'), values);
            close();
          })}
        >
          <Autocomplete
            withAsterisk
            label='Exercise'
            placeholder='Squat'
            size='lg'
            data={[
              // TODO: Add exercises dynamically from list of records
              'Bench Press',
              'Deadlift',
              'Overhead Press',
              'Power Clean',
              'Power Snatch',
              'Squat',
            ]}
            key={form.key('exercise')}
            {...form.getInputProps('exercise')}
          />

          <NumberInput
            withAsterisk
            size='lg'
            allowNegative={false}
            inputMode='decimal'
            label='Weight Lifted'
            min={0}
            max={1000}
            hideControls
            placeholder='100'
            key={form.key('weight')}
            {...form.getInputProps('weight')}
          />

          <NumberInput
            withAsterisk
            size='lg'
            allowNegative={false}
            inputMode='decimal'
            label='Reps Performed'
            min={1}
            max={15}
            hideControls
            placeholder='8'
            key={form.key('reps')}
            {...form.getInputProps('reps')}
          />

          <DateTimePicker
            label='Date'
            size='lg'
            withAsterisk
            key={form.key('date')}
            {...form.getInputProps('date')}
          />

          <Group justify='flex-end' mt='md'>
            <Button type='submit' size='lg'>
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
