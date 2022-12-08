import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function CompleteBus() {
    const dummy = ["금오공과대학교_종점","거상빌딩","4공단입구","삼구아파트","옥계태백타운"];
    const [selectStop,SetselectStop] = useState();
    const handleChange = ({ target: { value } }) => SetselectStop(value);
    const [quit,setQuit] = useState(false);
    const handleSubmit = (event)=>{
    event.preventDefault();
        setTimeout(()=>{
            setQuit(true);
        },5000)
        localStorage.setItem('selectStop',selectStop);
        axios.post('http://34.82.108.106:5000/stop',{
            busStop:selectStop,
            buzzerBool:1,
        }).then((res)=>{
            console.log(res);
            localStorage.setItem('selectStop',selectStop);
        }).catch((err)=>{
             console.log(err);
        })
  }
    return (
        <>
        <Form onSubmit={handleSubmit}>
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">내릴 정류장 선택</Form.Label>
          <Form.Select onChange={handleChange} id="disabledSelect">
            {
                (dummy !== undefined)?
                dummy.map((val,i)=>{
                    return <option key={i}>{val}</option>
                }):''
                
            }
          </Form.Select>
        </Form.Group>
        
        <Button type="submit">제출</Button>
      </fieldset>
    </Form>
        <div>
        {
            (quit)?'벨이 울렸습니다.':'정류장에 도착하지 않았습니다.'
        }
        </div>
    
        </>
    
  );
}

export default CompleteBus;