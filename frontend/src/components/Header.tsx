import logo from "../assets/logo.svg"

import { Plus } from "phosphor-react";

export function Header() {
    return (
        <div className='w-full max-w-3xl mx-auto flex justify-between items-center'>
            <img src={logo} alt="logo do projeto" />

            <button
                className='flex items-center py-4 px-6 font-semibold gap-3  border rounded-lg border-green-500 hover:border-green-300 transition-colors'
                type='button'
            >
                <Plus size={20} className="text-green-500" />
                
                Novo hábito
            </button>
        </div>
    )
}
