import { Link } from "react-router-dom";
import './style.scss';
import logo  from "../../assets/logo.svg";
import { useContext, useState } from 'react';
import { AuthContext } from "../../context/auth";
import { firebaseLogOut } from "../../firebase";
import CartIcon from "../cart-icon";
import CartDropdown from "../cart-dropdown";

const Header = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const {user} = useContext(AuthContext);

    const handleLogout = async () => {
        await firebaseLogOut();
    }

    const toggleCart = () => setIsCartOpen(prev => !prev)

    return  <header className="navigation">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>
                <nav className="nav-links-container">
                    <ul className="nav-links-container">
                        <Link className="nav-link" to="/shop">Shop</Link>
                        {
                            !user ?  <Link className="nav-link" to="/sign-in">Sign In</Link> :
                                    <span className="nav-link" onClick={handleLogout}>Sign Out</span>
                        }
                        <CartIcon toggleCart={toggleCart} />
                    </ul>
                    {isCartOpen && <CartDropdown />}
                </nav>
            </header>
}

export default Header
