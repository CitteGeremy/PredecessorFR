import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

import './App.scss'
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {

  //désactive le clique droit sur le site

  window.addEventListener('contextmenu', function (e) {
    console.log('context menu disabled');
    e.preventDefault();
  }, false);
  
  document.addEventListener('mouseup', function (e) {
    if (e.button === 2) {
      console.log('right-click enabled');
    }
  }, false);

  return (
    <BrowserRouter>
      <Header />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
