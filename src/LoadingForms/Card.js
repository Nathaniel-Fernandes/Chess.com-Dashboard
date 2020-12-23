import React, { useState } from 'react';
import UsernameForm from './UsernameForm'
import ChesscomLogin from './ChesscomLogin'
import Portal from '../Portal'

const FormCard = () => {
    const [page, setPage] = useState(0)

    return (
        <Portal rootRefID="modal-root-form">
            { 
                (page === 0) ? <UsernameForm setPage={setPage} /> :
                (page === 1) ? <ChesscomLogin setPage={setPage} /> : null

            }
        </Portal>
    )
}

export default FormCard;