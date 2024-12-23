import React, { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("")

  // ref
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  useEffect(() => {
    setMsg("")
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  const copyPasswordToClipbloard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20)
    const copiedPassword = window.navigator.clipboard.writeText(password);
    if(copiedPassword){
      setMsg("Password is Copied to Clipboard!")
    } else{
      setMsg("")
    }
  } ,[password])


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 relative top-12 bg-gray-800 text-orange-500">
      <h1 className='text-4xl text-center pt-8 px-4'>Password Generator</h1>
      <div className='flex shadow-lg rounded-lg overflow-hidden pb-6 pt-8 px-3'>
        <input
          type="text"
          value={password}
          placeholder='Password'
          className="outline-none rounded-l-lg w-full py-2 px-3"
          readOnly
          ref={passwordRef}
        />
        <button
           onClick={copyPasswordToClipbloard}
          className='-pl-0.5 rounded-r-lg bg-blue-800 px-2 hover:bg-blue-600 text-white'>
          Copy
        </button>
      </div>

      <p className={`text-green-300 text-lg text-center pb-4 my-2 h-[1.5rem] ${msg ? 'visible' : 'invisible'}`}>{msg}</p>


      <div className='flex text-base gap-x-2 pb-3'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            value={length}
            className='cursor-pointer'
            min={6}
            max={50}
            id='Range'
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="Range">Length : ({length})</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          className='cursor-pointer'
          id='numInput'
          onChange={() => setNumberAllowed((prev) => !prev)}
           />
           <label htmlFor="numInput"> Numbers </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          className='cursor-pointer'
          id='charInput'
          onChange={() => setCharAllowed((prev) => !prev)}
           />
           <label htmlFor="charInput"> Characters </label>
        </div>
      </div>

    </div>
  )
}

export default App