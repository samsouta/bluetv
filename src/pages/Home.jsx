import React, { useContext } from 'react';
import {
  HomeSlider,
  HomeCatagory,
  HomeVideoList,
} from '../components/Home/index'
import { useTimeoutError } from '../Hooks/useTimeoutError';
import { stateContext } from '../context/StateContext';
import ErrorPage from '../components/Ui/ServerErrorPage/ErrorPage';

const Home = () => {
  const {loading} = useContext(stateContext);
  const isTimeoutError = useTimeoutError(loading, 30000);

  if(isTimeoutError){
    return <ErrorPage/>
  }
  return (
    <>
      <HomeSlider/>
      <HomeCatagory />
      <HomeVideoList />

    </>
  );
}

export default Home;
