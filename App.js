import logo from './logo.svg';
import {useCallback, useState ,useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState("8");
  const [number, setNumber] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setpassword] = useState("");

  const passwordGenerator = useCallback(() => {  // THIS FUNCTION STORE THE VALUE IN THE CACHE MEMORY 

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str+= "0123456789";
    if (charAllow) str+= "`!@#$%^&*(){[/?.,<>;'";

    for (let i = 1; i <length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass+= str.charAt(char);
    }
    setpassword(pass)
  }, [length, number, charAllow, setpassword])
  
   const passref=useRef(null)  // USEREF IS USED FOR TAKING THE REFERENCES 

  const copypaste = useCallback(()=>{
    window.navigator.clipboard.writeText(password);  // USE FOR COPY THE PASSWORD
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,charAllow,passwordGenerator])   //HOOK FOR DISPLAYING THE PASSWORD VALUE

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-600">
        <h1 className="text-white text-center"> Password Generator </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}  // password comes from the function or from the usestate hooks
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passref}
            onClick={copypaste()}
          />
          <button className='text-white bg-blue-600 px-3 py-1'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <input

            type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setlength(e.target.value) }}   // CHANGE THE LENGTH VALUE 
          />
          <label>length:{length}</label>

          <div className='flex items-center gap-x-2'>
            <input

              type='checkbox'
              defaultChecked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !(prev))}   // IF THE NUMBEER IS FALSE THEN IT GET TRUE AND IF TRUE THEN IT GET FALSE
            />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-2'>
              <input
                type = 'checkbox'
                defaultChecked={charAllow}
                id='charinput'
                onChange={()=>setcharAllow((prev)=>!(prev))}    // IF THE CHARACTER IS FALSE THEN IT GET TRUE AND IF TRUE THEN IT GET FALSE
              />
              <label>Characters</label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
