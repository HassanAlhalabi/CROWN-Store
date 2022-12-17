import { Outlet } from "react-router-dom"
import Header from "../../header"

const MainContainer = () => {
  return  <>
            <Header/>
            <Outlet />
          </>
  }

export default MainContainer
