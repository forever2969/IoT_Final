import { useCallback, useEffect, useRef } from 'react';
import React from 'react';


function GoogleMap() {
  const mapElement = useRef(null);
  const googleKey = "AIzaSyAGkAmj0hrHc0Kfo_C_4g3shYfPJmkcEAk";

  // 컴포넌트가 마운트될 때, 수동으로 스크립트를 넣어줍니다. 
  // ﻿이는 script가 실행되기 이전에 window.initMap이 먼저 선언되어야 하기 때문입니다.
  const loadScript = useCallback((url: string) => {
    const firstScript = window.document.getElementsByTagName('script')[0];
    const newScript = window.document.createElement('script');
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);


  // script에서 google map api를 가져온 후에 실행될 callback 함수
  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google) return;


    const location = { lat: Number(localStorage.getItem('latitude')), lng: Number(localStorage.getItem('longitude')) };
    const map = new google.maps.Map(mapElement.current, {
      zoom: 14,
      center: location,
    });
    new google.maps.Marker({
      position: location,
      map,
    });
  }, []);


  useEffect(() => {
    const script = window.document.getElementsByTagName('script')[0];
    const includeCheck = script.src.startsWith(
      'https://maps.googleapis.com/maps/'
    );


    // script 중복 호출 방지
    if (includeCheck) return initMap();


    window.initMap = initMap;
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${googleKey}&callback=initMap&language=en`
    );
  }, [initMap, loadScript]);


  return <div ref={mapElement} style={{ minHeight: '400px' }} />;
}


export default GoogleMap;