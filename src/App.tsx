import { Route, Routes } from 'react-router-dom'
import './App.scss'
import MainContainer from './components/layout/main-container'
import Home from './pages/home'
import Shop from './pages/shop'


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainContainer />}>
          <Route index element={<Home />}/>
          <Route path='/shop' element={<Shop />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
