import React, { useEffect,useState } from 'react'
import useWatchLocation from '../hook/useWatchLocation';

// 컴포넌트 안쪽에서 선언하면 에러 발생
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
}

const ShowLatLong = () => {
  const location = useWatchLocation(geolocationOptions);
  const [pos,setPos] = useState({});

  console.log(location);
  setTimeout(()=>{
    if(location){
      setPos(location);
      localStorage.setItem('latitude',pos.latitude);
      localStorage.setItem('longitude',pos.longitude);
      console.log(pos);
    }
  },10000);
  
  return (
      <div>
          {/* <p>{location.latitude}</p>
          <p>{location.longitude}</p> */}
          
          <p>나의 위도 : {pos.latitude}</p>
          <p>나의 경도 : {pos.longitude}</p>
          
      </div>
  );
}

export default ShowLatLong;