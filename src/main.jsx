
import ReactDOM from 'react-dom/client'
import './App.css'
import Heading from './Heading'
import { App } from './Cards'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  
  <Heading text='Pokemon Memory' divClassName='head-div-1' headNumber = {1}/>
  <App />
  </>
    
  
)
