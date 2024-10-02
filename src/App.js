import './App.css';
import Body from './Component/Body/Body';
import Header from './Component/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './Utils/Api';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();
  const {ticket}=useSelector(state=>state.Reducer);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch])
  return ticket ? (
    <div className='main'>
    <Header/>
    <Body/>
    </div>
  ):""
}

export default App;
