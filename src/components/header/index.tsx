import { Link } from "react-router-dom"
import './style.scss'
import logo  from "../../assets/logo.svg";

const Header = () => {
  return <header className="navigation">
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} />
                </Link>
            </div>
            <nav>
                <ul className="nav-links-container">
                    <Link className="nav-link" to="/shop">Shop</Link>
                    <Link className="nav-link" to="/sign-in">Sign In</Link>
                </ul>
            </nav>
        </header>
}

export default Header
