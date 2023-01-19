import logo  from "../../assets/logo.svg";
import { useContext, useState } from 'react';
import { AuthContext } from "../../context/auth";
import { firebaseLogOut } from "../../firebase";
import CartIcon from "../cart-icon";
import CartDropdown from "../cart-dropdown";
import { LogoContainer, NavigationContainer, NavLink, NavLinksContainer } from './style';

const Header = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const {user} = useContext(AuthContext);

    const handleLogout = async () => {
        await firebaseLogOut();
    }

    const toggleCart = () => setIsCartOpen(prev => !prev)

    return  <NavigationContainer>
                <LogoContainer>
                    <NavLink to="/">
                        <img src={logo} />
                    </NavLink>    
                </LogoContainer>
                <div>
                    <NavLinksContainer>
                        <NavLink to="/shop">Shop</NavLink>
                        {
                            !user ?  <NavLink to="/sign-in">Sign In</NavLink> :
                                    <NavLink as='span' onClick={handleLogout}>Sign Out</NavLink>
                        }
                        <CartIcon toggleCart={toggleCart} />
                        {isCartOpen && <CartDropdown />}
                    </NavLinksContainer>
                </div>
            </NavigationContainer>
}

export default Header
