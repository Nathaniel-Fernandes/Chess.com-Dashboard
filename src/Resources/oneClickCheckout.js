import { FaShoppingCart } from 'react-icons/fa'

const OneClickBuyAll = () => {

    return (
        <button className="resources-section yellow-button buyall-button" >
            <div className="shopping-cart-icon"><FaShoppingCart size={25} /> </div>
            <div>Add 7 to Cart - Amazon.com</div>
        </button>
    )
}

export default OneClickBuyAll;