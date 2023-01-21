import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { Check } from 'phosphor-react';
import { ProgressBar } from './ProgressBar';

interface HabitDayContainerProps {
    date: Date
    completed?: number
    amount?: number
}

export function HabitDayContainer({ completed = 0, amount = 0, date }: HabitDayContainerProps) {
    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

    const dayAndMonth = dayjs(date).format('DD/MM');
    const dayOfWeek = dayjs(date).format('dddd');

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx('h-10 w-10 border-2 rounded-lg', {
                'border-zinc-800 bg-zinc-900': completedPercentage === 0,
                'bg-green-900 border-green-700': completedPercentage > 0 && completedPercentage < 20,
                'bg-green-800 border-green-600': completedPercentage >= 20 && completedPercentage < 40,
                'bg-green-700 border-green-500': completedPercentage >= 40 && completedPercentage < 60,
                'bg-green-600 border-green-500': completedPercentage >= 60 && completedPercentage < 80,
                'bg-green-500 border-green-400': completedPercentage >= 80,
            })} />

            <Popover.Portal>
                <Popover.Content className='flex flex-col min-w-[320px] p-6 rounded-2xl bg-zinc-900'>
                    <span className='font-extrabold text-zinc-400'>{dayOfWeek}</span>
                    <span className='mt-1 font-semibold text-3xl leading-tight'>{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage} />

                    <div className='flex flex-col mt-6'>
                        <Checkbox.Root className="flex items-center gap-3 group" id="habits">
                            <div className='w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors'>
                                <Checkbox.Indicator className="text-white">
                                    <Check size={20} weight="bold" />
                                </Checkbox.Indicator>
                            </div>

                            <label
                                htmlFor="habits"
                                className='text-xl font-semibold leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 transition-all'
                            >
                                Accept
                            </label>
                        </Checkbox.Root>
                    </div>

                    <Popover.Arrow height={8} width={18} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};