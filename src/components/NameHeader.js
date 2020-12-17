import React from 'react'
import { store } from '../State/store'

const NameHeader = () => {
    const name = store(state => state.UserName);

    return (
        <div class="name-header">
            Hello {name}!
        </div>
    )
}

export default NameHeader;