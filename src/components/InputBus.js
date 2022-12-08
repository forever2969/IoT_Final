import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React,{useState} from 'react';
import axios from 'axios';

function InputBus({destData}) {

    const [selectOp,setSelectOp] = useState();

    const handleChange = ({ target: { value } }) => setSelectOp(value);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectOp);
        alert(`탑승하실 버스는 ${selectOp}번 버스 입니다.`);
        localStorage.setItem('selectOp',selectOp);
        axios.post('http://34.82.108.106:5000/',{
            //bus:selectOp,
            bus:selectOp,
        }).then((res)=>{
            console.log(res);
            localStorage.setItem('selectOp',selectOp);
        }).catch((err)=>{
             console.log(err);
        })
      };
  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">탑승할 버스 선택</Form.Label>
          <Form.Select onChange={handleChange} id="disabledSelect">
            {
                (destData !== undefined)?
                destData.map((val,i)=>{
                    return <option key={i}>{val}</option>
                }):''
                
            }
          </Form.Select>
        </Form.Group>

        <Button type="submit">제출</Button>
      </fieldset>
    </Form>
  );
}

export default InputBus;