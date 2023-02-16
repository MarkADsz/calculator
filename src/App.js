import { click } from "@testing-library/user-event/dist/click";
import { useState } from "react";


function App() {
  const[calc,setCalc]=useState("");
  const[res,setRes]=useState("");

  const ops=['/','*','+','-','.'];

  const updateCalc= value =>{
    //We cannot introduce double signs or introduce a sign when there is no number
    if( (ops.includes(value) && calc==='') ||  (ops.includes(value) && ops.includes(calc.slice(-1))))
    {
      return;
    }
    setCalc(calc + value);
    if(!ops.includes(value)){
      setRes(eval(calc+ value).toString());
    }
  }

  const calculate=()=>{
    setCalc(eval(calc).toString());
  }

  const deleteLast= () => {
    if(calc===''){
      return;
    }
   
    const value=calc.slice(0,-1);
    //If the 2nd last element is an operator
    if(!ops.includes(calc.slice(-1)) && ops.includes(calc.slice(-2)[0])){
      setRes(calc.slice(0,-2).toString());
    }
    else //If we have only one digit
      if(calc.length===1){
        setRes(value.toString());
     }
      else{
        setRes(eval(value).toString());
      }
    setCalc(value);
    
  }

  const resetCalc=()=>{
    setRes('');
    setCalc('');
  }

  const createDigits= ()=>{
    const digits=[];
    for(let i=1;i<10;i++){
      digits.push(
        <button onClick={()=>updateCalc(i.toString())} key={i} >{i}</button>
      );
    }
    return digits;
  }

  return (
    <div className="App">
        <div class="calculator">
          <div class="display">
            {res ? <span>({res})</span> : ''} {calc || "0"}
          </div>

          <div class="operators">
            <button onClick={()=>updateCalc('/')}>/</button>
            <button onClick={()=>updateCalc('*')}>*</button>
            <button onClick={()=>updateCalc('+')}>+</button>
            <button onClick={()=>updateCalc('-')}>-</button>
            <button onDoubleClick={resetCalc} onClick={deleteLast}>DEL</button>
          </div>

        <div class="digits">
          {createDigits()}
          <button onClick={()=>updateCalc('0')}>0</button>
          <button onClick={()=>updateCalc('.')}>.</button>
          <button onClick={()=>{calculate()}}>=</button>
        </div>
         
        </div>
        
    </div>
  );
}

export default App;
