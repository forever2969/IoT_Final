import React from 'react';
import { useEffect, useState } from 'react'
import ShowLatLong from '../components/ShowLatLong';
import BusData from '../components/BusData';
import InputBus from '../components/InputBus';
import BusQuit from '../components/BusQuit';
import GoogleMap from '../components/GoogleMap';

const MainPage = () => {
    const [destData,setDestData] = useState();
    const [destTime,setDestTime] = useState();

    const clickInit = ()=>{
        localStorage.clear();
    }

    return (
        <div>
            <button type="button" onClick={clickInit}>localStorage Initialize</button>
            <GoogleMap />
            <p style={{fontSize:"8px"}}>지도가 보이지 않을시 새로고침 해주세요!</p>
            <h2>나의 현재 위치</h2>
            <ShowLatLong />
            <BusData destData={destData} setDestData={setDestData} destTime={destTime} setDestTime={setDestTime} />
            <InputBus destData={destData} />
            <BusQuit destData={destData} destTime={destTime}/>
        </div>
    );
};

export default MainPage;