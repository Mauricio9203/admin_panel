import './App.css';
import LoginApp from './components/LoginApp';
import Sidebar from './components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { updateSesion } from './reducers/LoginSlice';
import { useEffect } from 'react';



function App() {
  const dispatch = useDispatch();
  const sesionValue = useSelector((state) => state.sesionSlice);

  const handleIniciarSesion = (user, password) => {
    dispatch(updateSesion(true))
    localStorage.setItem('isLoggedIn', true);
  }

  useEffect(() => {
    let sesion = localStorage.getItem('isLoggedIn');

    if(sesion === "true"){
      dispatch(updateSesion(true))
    }else{
      dispatch(updateSesion(false))
    }
     // eslint-disable-next-line
  }, []);

  return (
  <>
  {!sesionValue &&
    <LoginApp handleIniciarSesion={handleIniciarSesion} />
  }
  
  {sesionValue &&
  <Sidebar />
  }

  </>
  );
}

export default App;


