import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowrd, setNumAllowed] = useState(false)
  const [charAllowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState('')

  //user Ref
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numAllowrd) { str += '1234567890' }
    if (charAllowed) { str += "!?#$%&'*+,-./:;<=>?@[\\]^_`{|}~" }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowrd, charAllowed, setPassword])

  const copyPasswordcb = useCallback(()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=> {
    passwordGenerator()
  }, [length, numAllowrd, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
          <button onClick={copyPasswordcb} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'></div>
        
        <div className='flex items-center gap-x-7'>
          <input type="range" min={6} max={20} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
          <label>Lenght: ({length})</label>


          <div className='items-center gap-x-1 flex'>
            <input type='checkbox' defaultChecked={numAllowrd} id='numberInput' onChange={() => {
              setNumAllowed((prev) => !prev)
            }} />
            <label htmlFor='numberInput'>Number</label>
          </div>

          <div className='items-center gap-x-1 flex'>
            <input type='checkbox' defaultChecked={charAllowed} id='charInput' onChange={() => {
              setCharallowed((prev) => !prev)
            }} />
            <label htmlFor='numberInput'>Charactors</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
