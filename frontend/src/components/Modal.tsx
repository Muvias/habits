import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'phosphor-react';
import { NewHabitForm } from './NewHabitForm';

export function Modal() {
    return (
        <Dialog.Root>
            <Dialog.Trigger
                type='button'
                className='flex items-center py-4 px-6 font-semibold gap-3  border rounded-lg border-green-500 hover:border-green-300 transition-colors'
            >
                <Plus size={20} className="text-green-500" />

                Novo Hábito
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='w-full h-full fixed inset-0 bg-black/80' />
                <Dialog.Content className='absolute w-full max-w-md p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-900'>

                    <Dialog.Close className='absolute top-6 right-6 text-zinc-400 hover:text-zinc-200'>
                        <X size={24} aria-label="Fechar" />
                    </Dialog.Close>

                    <Dialog.Title className='text-3xl font-bold leading-tight'>
                        Criar hábito
                    </Dialog.Title>

                    <NewHabitForm />

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}