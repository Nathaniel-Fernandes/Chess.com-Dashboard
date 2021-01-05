import { createPortal } from 'react-dom'
import usePortal from './usePortal'

const Portal = ({ rootRefID, children }) => {
    console.log(rootRefID)
    const target = usePortal(rootRefID)
    // const target = document.getElementById(id)
    return createPortal(
        children,
        target
    )
}

export default Portal