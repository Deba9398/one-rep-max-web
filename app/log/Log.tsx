import { useAuth } from '@/components/AuthContext';
import { db } from '@/util/firebase';
import {
  DocumentData,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { AuthContextType } from '@/components/AuthContext';
import {
  Accordion,
  ActionIcon,
  Affix,
  Button,
  Card,
  Loader,
  NavLink,
  Text,
} from '@mantine/core';
import { RepMaxRowContent } from '@/components/RepMaxTable';
import { useAccordionState } from '@/util/hooks';
import { calculateRepMaxValues } from '@/util/repMaxFormulas';
import { calculateMetrics } from '@/util/mathUtils';
import { FormatWeight } from '@/util/formatter';
import AddRecordModal from '@/components/AddRecordModal';
import { useDisclosure } from '@mantine/hooks';
import { IconPhone, IconPlus } from '@tabler/icons-react';

const addRow = async (authContext: AuthContextType) => {
  var user = authContext.currentUser;
  if (!user) {
    user = await authContext.signInAnonymously();
  }

  if (!user) {
    throw new Error('Anonymous Authentication failed');
  }

  addDoc(collection(db, 'users', user.uid, 'records'), {
    lift: Math.random() > 0.5 ? 'Bench Press' : 'Squat',
    date: getRandomDateFromLastSixMonths(),
    reps: Math.round(Math.random() * 10) + 1,
    weight: Math.round(Math.random() * 200) + 100,
  });
};

function getRandomDateFromLastSixMonths() {
  const now = new Date();
  const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));

  const randomTimestamp =
    sixMonthsAgo.getTime() +
    Math.random() * (Date.now() - sixMonthsAgo.getTime());
  return new Date(randomTimestamp);
}

export default function Log() {
  const authContext = useAuth();
  const [selectedLift, setSelectedLift] = useState<string | null>(null);
  const [items, setItems] = useState<DocumentData[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authContext.currentUser) {
      setItems([] as DocumentData[]);
      setLoading(false);
      return;
    }
    const q = query(
      collection(db, 'users', authContext.currentUser.uid, 'records'),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log(querySnapshot);
      setItems(data);
      setLoading(false);
      setSelectedLift(
        Array.from(new Set(data.map((data) => data.exercise))).sort()[0]
      );
    });

    return () => unsubscribe();
  }, [authContext.currentUser]);

  const recordsView = (
    <div className='container mx-auto mt-8'>
      <div className='flex flex-col items-center justify-center xl:flex-row xl:items-start -mx-2 lg:-mx-0'>
        <div className='px-2 xl:px-4 w-full xl:w-1/2 max-w-[600px]'>
          <LiftsList
            items={items}
            selectedLift={selectedLift}
            setSelectedLift={setSelectedLift}
          />
        </div>
        <div className='px-2 xl:px-4 w-full xl:w-1/2 max-w-[600px]'>
          <LogData items={items} selectedLift={selectedLift} />
        </div>
      </div>
    </div>
  );

  const loader = (
    <div className='flex justify-center'>
      <Loader color='blue' />
    </div>
  );

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <ActionIcon color='blue' radius='xl' size={60} onClick={open}>
          <IconPlus stroke={1.5} size={30} />
        </ActionIcon>
      </Affix>
      <AddRecordModal opened={opened} close={close} />
      {loading ? loader : recordsView}
    </>
  );
}

const LiftsList = ({
  items,
  selectedLift,
  setSelectedLift,
}: {
  items: DocumentData[];
  selectedLift: string | null;
  setSelectedLift: Dispatch<SetStateAction<string | null>>;
}) => {
  const lifts = Array.from(new Set(items.map((item) => item.exercise))).sort();

  return (
    <Card padding='none' radius='lg' withBorder>
      {Array.from(lifts).map((lift) => (
        <NavLink
          onClick={() => setSelectedLift(lift)}
          active={selectedLift === lift}
          description={
            items.filter((item) => item.exercise === lift).length + ' records'
          }
          key={lift}
          label={lift}
        />
      ))}
    </Card>
  );
};

const LogData = ({
  items,
  selectedLift,
}: {
  items: DocumentData[];
  selectedLift: string | null;
}) => {
  const records = items.filter((item) => item.exercise === selectedLift);

  if (!selectedLift) {
    return null;
  }

  return (
    <Card padding='none' radius='lg' withBorder>
      <LiftRecordsTable records={records} />
    </Card>
  );
};

const LiftRecordsTable = ({ records }: { records: DocumentData[] }) => {
  const [openPanels, onAccordionStateChange] = useAccordionState('records');

  return (
    <Accordion
      onChange={onAccordionStateChange}
      chevronPosition='left'
      multiple
    >
      {records.map((record) => {
        const repMaxValues = calculateRepMaxValues(record.weight, record.reps);
        const { avg, color } = calculateMetrics(
          repMaxValues[1].map((c) => c.value)
        );

        const formattedDate = new Date(
          record.date.seconds * 1000
        ).toDateString();
        return (
          <Accordion.Item key={record.id} value={record.id}>
            <Accordion.Control>
              <div className='flex text-lg'>
                <div className='flex-1'>{formattedDate}</div>
                <div className='flex-none'>
                  <Text size='lg' c={color} fw={500}>
                    <FormatWeight
                      weight={avg}
                      decimalPlaces={1}
                      forceDecimals={true}
                    />
                  </Text>
                </div>
              </div>
            </Accordion.Control>
            <Accordion.Panel
              styles={{
                content: {
                  padding: 0,
                },
              }}
            >
              {openPanels.includes(record.id) ? (
                <RepMaxRowContent repMaxCalculation={repMaxValues[1]} />
              ) : null}
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
