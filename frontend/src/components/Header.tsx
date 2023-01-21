import logo from "../assets/logo.svg"

import { Modal } from "./Modal";

export function Header() {
    return (
        <div className='w-full max-w-3xl mx-auto flex justify-between items-center'>
            <img src={logo} alt="logo do projeto" />

            <Modal />
        </div>
    )
}
