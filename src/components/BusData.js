import React, {useEffect,useState} from 'react';
import axios from 'axios';
import BusPrint from './BusPrint';
import "../style/BusData.css";

const BusData = ({destData,setDestData,destTime,setDestTime}) => {
    const encoding = '%2BuTBi4QWMRKkw5ulnpJ%2FaI7yfnYGMALOZ9sLj1jbdBk6iMTQNKHOFVOGP475Cfylv%2Bthmxi1iTZFClc5t7HBUA%3D%3D';
    const gumiCode = 37050;
    const [nearBusState,setNearBusState] = useState([]);
    const [busNodeNo,setBusNodeNo] = useState([]);
    const [busStop,setBusStop] = useState('');
    const [nodeId,setNodeId] = useState('');
    const [destBus,setDestBus] = useState([]);
    const [time,setTime] = useState(0);
    
    useEffect(()=>{
        if(nearBusState[0]){
            setBusStop(nearBusState[0].replace(' ','_'));
        }
        axios.get(`http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getSttnNoList?serviceKey=${encoding}&cityCode=${gumiCode}&nodeNm=${busStop}&nodeNo=${busNodeNo[0]}&numOfRows=10&pageNo=1&_type=json`)
        .then((res)=>{
            console.log(res.data.response.body.items.item.nodeid);
            setNodeId(res.data.response.body.items.item.nodeid);
        }).catch((err)=>{
            console.log(err);
        })
    },[nearBusState,busNodeNo]);
    setTimeout(()=>{
        setTime(time+1);
    },3000)
    useEffect(()=>{
        console.log(nodeId);
        
        axios.get(`http://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${encoding}&cityCode=${gumiCode}&nodeId=${nodeId}&numOfRows=10&pageNo=1&_type=json`)
        .then((res)=>{
            console.log(res.data.response.body.items.item);
            setDestBus(
                [res.data.response.body.items.item]
            );
        }).catch((err)=>{
            console.log(err);
        })
    },[nodeId,time]);

    useEffect(()=>{
        axios.get(`http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList?serviceKey=${encoding}&gpsLati=${localStorage.getItem('latitude')}&gpsLong=${localStorage.getItem('longitude')}&numOfRows=10&pageNo=1&_type=json`)
        .then((res)=>{
            console.log(res.data.response.body.items);
            for(let i=0; i<res.data.response.body.items.item.length; i++){
                setBusNodeNo([
                    ...busNodeNo,
                    res.data.response.body.items.item[i].nodeno
                ]);
                setNearBusState([
                    ...nearBusState,
                    res.data.response.body.items.item[i].nodenm
                ]);
            }
            
        }).catch((err)=>{
            console.log(err);
        })
    },[]);

    // useEffect(()=>{
    //     for(let i=0; i<nearBusState.length; i++){
    //         nearBusState[i].replace(' ','_');
    //     }
    //     setNearBusState([
    //         ...nearBusState,

    //     ])
    // },[nearBusState]);

    console.log(nearBusState[0]);
    console.log(busNodeNo);
    console.log(destBus);

    // const loop = ()=>{
    //     for(let i=0; i<destBus[0].length; i++){
    //         console.log("hihi");
    //         data += destBus[0][i].routeno;
    //     }
    // }

    const busPrint = ()=>{
        let data = [];
        console.log(destBus[0]);
        console.log(destBus);
        console.log(destBus[0].routeno);
        if(destBus[0] !== undefined && destBus[0].routeno){
            console.log("1");
            data.unshift(destBus[0].routeno);
            return data;
        }else{
            data = destBus[0].map((value,index)=>{
                return (value.routeno);
            })
        }
        console.log(data);
        return data;
    }

    const timePrint = ()=>{
        let data = [];
        if(destBus[0] !== undefined && destBus[0].routeno){
            data.unshift(destBus[0].arrtime);
            return data;
        }else{
            data = destBus[0].map((value,index)=>{
                return (value.arrtime);
            })
        }
        
        console.log(data);
        return data;
    }
    
    useEffect(()=>{
        console.log(destBus);
        destBus[0] === undefined ?
        setDestData(["X"]):
        setDestData(busPrint());

        destBus[0] === undefined ?
        setDestTime(["X"]):
        setDestTime(timePrint());
    },[destBus,time]);

    
    console.log(destData);
    
    return (
        <div id="busDataDiv">
            <p id="locationP">
            {
                (nearBusState[0] === undefined)?
                '':
                nearBusState[0]
            }
            </p>
            <p>
            {
                (destTime !== undefined)?
                (destData !== undefined)?
                <BusPrint destTime={destTime} destData={destData} />:'버스번호 안찍힘':'시간값 안찍힘'
                
            }
            </p>
            
            {/* {
                destBus[0] === undefined ?
                'nothing':
                destBus.map((value,index,arr)=>{
                    return value[0].arrtime;
                })
            } */}
            {/* {
                destData[0] === undefined ?
                '':
                destData.map((value)=>{
                    return value;
                })
            } */}
            
        </div>
    );
};

export default BusData;