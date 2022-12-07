import React,{useState,useEffect} from 'react';
import Print from './Print';
import "../style/BusPrint.css";
import PrintTime from './PrintTime';

const BusPrint = ({destTime,destData}) => {
    
    
    return (
        <div id="printDiv">
            <div id="dataDiv">
                {
                    destData.map((val,i)=>
                        <Print key={i} val={val} />
                    )
                }
            </div>
            <div id="timeDiv">
                {
                    destTime.map((val,i)=>
                        <PrintTime key={i} val={val} />
                    )
                }
            </div>
        </div>
    );
};

export default BusPrint;