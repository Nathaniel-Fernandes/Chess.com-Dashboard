import React from 'react'
import { store } from '../State/store'

const NameHeader = () => {
    const name = store(state => state.UserName);

    return (
        <h2 class="name-header">
            Hello {name}!
        </h2>
    )
}

export default NameHeader;