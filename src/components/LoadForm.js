import React, { useState } from 'react';
import { store } from '../State/store';

const LoadForm = () => {
    const [uname, setUname] = useState("");

    <form>
        <input 
            type="text" 
            value={uname} 
            onChange ={(e) => setUname(e.targe.value)} 
            placeholder="Player Name" 
            name="username"></input>
        <button>Submit</button>
	</form>
}

export default LoadForm;
