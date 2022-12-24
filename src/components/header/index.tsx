import { Link } from "react-router-dom";
import './style.scss';
import logo  from "../../assets/logo.svg";
import { useContext } from 'react';
import { AuthContext } from "../../context/auth";
import { firebaseLogOut } from "../../firebase";

const Header = () => {
    
    const {user} = useContext(AuthContext);

    const handleLogout = async () => {
        await firebaseLogOut();
    }

    return  <header className="navigation">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} />
                    </Link>
                </div>
                <nav>
                    <ul className="nav-links-container">
                        <Link className="nav-link" to="/shop">Shop</Link>
                        {
                            !user ?  <Link className="nav-link" to="/sign-in">Sign In</Link> :
                                    <span className="nav-link" onClick={handleLogout}>Sign Out</span>
                        }
            
                    </ul>
                </nav>
            </header>
}

export default Header
