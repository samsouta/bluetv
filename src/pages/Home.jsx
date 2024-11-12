import React from 'react';
import Hpath_1 from '../components/Home/Hpath-1/Hpath_1';
import Hpath_2 from '../components/Home/Hpath-2/Hpath_2';
import Hpath_3 from '../components/Home/Hpath-3/Hpath_3';

const Home = () => {
  return (
    < >
      <div >
        <Hpath_1 />
        <Hpath_2 />
        <Hpath_3 />
      </div>
      <div className=' relative' >
        <span className=' bottom-[300px] left-[200px] absolute text-white text-3xl montserrat font-semibold' >for Ads</span>
        <div className=' mb-[500px] bg-green-500 ' ></div>
      </div>
    </>
  );
}

export default Home;
