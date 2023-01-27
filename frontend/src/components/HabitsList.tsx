import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';

import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps {
    date: Date
    onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string,
        title: string,
        created_at: string
    }>,
    completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString(),
            }
        }).then(res => {
            setHabitsInfo(res.data)
        })
    }, []);

    async function handleToggleHabit(habitId: string) {
        await api.patch(`habits/${habitId}/toggle`);
        
        const ishabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);
        let completedHabits: string[] = [];
        
        if (ishabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId];
        }
        
        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        });

        onCompletedChanged(completedHabits.length);
    };

    const isDateIsPast = dayjs(date).endOf('day').isBefore(new Date());

    return (
        <div className='flex flex-col mt-4'>
            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root
                        key={habit.id}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        disabled={isDateIsPast}
                        className="flex items-center gap-3 mt-2 group disabled:cursor-not-allowed"
                    >
                        <div className='w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors'>
                            <Checkbox.Indicator className="text-white">
                                <Check size={20} weight="bold" />
                            </Checkbox.Indicator>
                        </div>

                        <span
                            className='text-xl font-semibold leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 transition-all'
                        >
                            {habit.title}
                        </span>
                    </Checkbox.Root>
                )
            })}
        </div>

    )
}