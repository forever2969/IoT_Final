import React,{useEffect ,useState} from 'react';
import axios from 'axios';
import CompleteBus from './CompleteBus';

const BusQuit = ({destData,destTime}) => {
    const [selectOp,setSelectOp] = useState();
    const [passByBus,setPassByBus] = useState(false);

    useEffect(()=>{
        setSelectOp(localStorage.getItem('selectOp'));
        //console.log(destData.indexOf(Number(selectOp)));
    },[destTime]);

    const clickRiding = ()=>{
        if(destData !== undefined){
            if(selectOp !== undefined && destData.indexOf(Number(selectOp)) === -1){
                console.log(destData);
                console.log((selectOp));
                alert('버스탑승이 확인되었습니다.');
                setPassByBus(true);
                axios.post('http://34.82.108.106:5000/riding',{
                    //bus:selectOp,
                    riding:1,
                }).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
            }
            else{
                alert('버스 탑승이 확인되지 않았습니다.');
            }
        }
    };

    return (
        <div>
            {
                (passByBus)?
                <CompleteBus />:
                <button type="button" onClick={clickRiding}>탑승완료 확인</button>
            }
        </div>
    );
};

export default BusQuit;