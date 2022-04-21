import React from 'react';
import './index.css';
import {ReactComponent as DiceSvg} from "./images/icon-dice.svg"
import {ReactComponent as DividerSvg} from "./images/pattern-divider-desktop.svg"
import {ReactComponent as DividerSvg1} from "./images/pattern-divider-mobile.svg"
import { useMediaQuery } from 'react-responsive'




function App() {
  const [advice, setAdvice] = React.useState({})
  const [start, setStart] = React.useState(false)

  function dice(){
    setStart(prevStart => !prevStart)
  }

  React.useEffect(()=> {
    fetch("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(data => setAdvice(data.slip.advice))
  }, [start])



console.log(advice)
  
  const isTabletOrMobile = useMediaQuery({ query: '(max-width:  1440px)' })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1440px)' })

  return (
    <main>
      {
         advice.length > 0?
         <div className="app">
           <div className='mini'>
              <h1 className="advice-title">Advice </h1>
              <p className='advice'>"{advice}."</p>
              {isBigScreen && <p className='divider'><DividerSvg/></p>}
              {isTabletOrMobile && <p className='divider'><DividerSvg1/></p>}
              
           </div>
            
            <button onClick={()=> dice()}><DiceSvg className='svg'/></button>
         </div>
         : 
          <div className='app'>
            <div className='mini'>
               <h1 className='advice-title'>Loading .....</h1>
            </div>
          </div>
        
      }
      
  </main>
  );
}

export default App;
