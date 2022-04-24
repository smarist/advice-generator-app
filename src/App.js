import React from 'react';
import './index.css';
import {ReactComponent as DiceSvg} from "./images/icon-dice.svg"
import {ReactComponent as DividerSvg} from "./images/pattern-divider-desktop.svg"
import {ReactComponent as DividerSvg1} from "./images/pattern-divider-mobile.svg"
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'
import Loader from './components/Loader';




function App() {
  const [advice, setAdvice] = React.useState({
    loading: false,
    data: ""
  })
  const [start, setStart] = React.useState(false)

  function dice(){
    setStart(prevStart => !prevStart)
  }
/*
  React.useEffect(()=> {
    fetch("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(data => setAdvice(data.slip.advice))
  }, [start])

  */

  React.useEffect(() => {
    setAdvice({
      ...advice,
      loading: true,
    })
    axios.get("https://api.adviceslip.com/advice").then((response) => {
      setAdvice({
        ...advice,
        loading: false,
        data: response.data.slip.advice
      });
    });
  }, [start]);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width:  900px)' })
  const isBigScreen = useMediaQuery({ query: '(min-width: 900px)' })

  return (
    <main>
      {
        advice.loading?
        <Loader/> : ""
      }


      {
         advice.data && !advice.loading?
         <div className="app">
           <div className='mini'>
              <h1 className="advice-title">Advice </h1>
              <p className='advice'>"{advice.data}."</p>
              {isBigScreen && <p ><DividerSvg/></p>}
              {isTabletOrMobile && <p className='divider'><DividerSvg1/></p>}
              
           </div>
            
            <button onClick={()=> dice()}><DiceSvg className='svg'/></button>
         </div>
         : 
               ""
            
      }

      
      
  </main>
  );
}

export default App;
