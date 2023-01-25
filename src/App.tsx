import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux/es/exports'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import MainContainer from './components/layout/main-container'
import { auth } from './firebase'
import Checkout from './pages/checkout'
import Home from './pages/home'
import Shop from './pages/shop'
import SignIn from './pages/sign-in'
import { setUser } from './store/reducers/user/actionCreators'


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth,(user) => {
      if(user) {
          dispatch(setUser(user));
          return unSubscribe;
      }
      dispatch(setUser(null));
    })
    return unSubscribe;
  })

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainContainer />}>
          <Route index element={<Home />}/>
          <Route path='/shop/*' element={<Shop />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/sign-in' element={<SignIn />}/>
        </Route>
      </Routes>
      <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={3}
          containerClassName=""
          toastOptions={{
            duration: 3000,
          }}
        />
    </div>
  )
}

export default App
