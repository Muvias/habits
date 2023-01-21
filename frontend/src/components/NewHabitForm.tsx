import * as Checkbox from '@radix-ui/react-checkbox';

import { FormEvent, useState } from 'react';
import { Check } from 'phosphor-react';
import { api } from '../lib/axios';

const availableWeekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];

export function NewHabitForm() {
    const [title, setTitle] = useState('');
    const [weekDays, setweekDays] = useState<number[]>([]);

    async function createNewHabit(e: FormEvent) {
        e.preventDefault();

        if (!title || weekDays.length === 0) {
            return
        }

        await api.post('habits', {
            title,
            weekDays,
        })

        setTitle('')
        setweekDays([])

        alert('Hábito criado com sucesso!')
    };

    function handleToggleWeekDays(dayNumber: number) {
        if(weekDays.includes(dayNumber)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== dayNumber);

            setweekDays(weekDaysWithRemovedOne);
        } else {
            const weekDaysWithAddedOne = [...weekDays, dayNumber];

            setweekDays(weekDaysWithAddedOne);
        };
    };

    return (
        <form onSubmit={(e) => createNewHabit(e)}>
            <div className='flex flex-col w-full mt-6'>
                <label htmlFor="title" className='font-semibold leading-tight'>
                    Qual o seu comprometimento?
                </label>

                <input
                    type="text"
                    id='title'
                    placeholder='Exercícios, dormir bem, etc...'
                    className='p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400'
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    value={title}
                />

                <div className='flex flex-col gap-2 mt-6'>
                    {availableWeekDays.map((day, index) => {
                        return (
                            <Checkbox.Root
                                key={day}
                                className="flex items-center gap-3 group"
                                checked={weekDays.includes(index)}
                                onCheckedChange={() => handleToggleWeekDays(index)}
                            >
                                <div className='w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors'>
                                    <Checkbox.Indicator className="text-white">
                                        <Check size={20} weight="bold" />
                                    </Checkbox.Indicator>
                                </div>

                                <span
                                    className='leading-tight group-hover:text-zinc-400 transition-colors'
                                >
                                    {day}
                                </span>
                            </Checkbox.Root>
                        )
                    })}
                </div>

                <button type='submit' className='flex items-center justify-center p-4 gap-3 mt-6 rounded-lg font-semibold bg-green-600 hover:bg-green-500 transition-colors'>
                    <Check size={20} weight="bold" />

                    Confirmar
                </button>
            </div>
        </form>
    );
};