import React, { useState } from 'react';

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

// LoadForm.whyDidYouRender = true

export default LoadForm;
