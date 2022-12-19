import { Outlet } from "react-router-dom"
import Header from "../../header"

const MainContainer = () => {
  return  <div className="container">
            <Header/>
            <Outlet />
          </div>
  }

export default MainContainer
