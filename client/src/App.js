import './App.css';
import Header from './MyComponents/Header';
import Characters from './MyComponents/Characters';
import Character from './MyComponents/Character';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      {/* <Header title="Rick and Monty"/> */}
      <BrowserRouter>
      <Routes>
        
          <Route path='/' element={<Header title="Rick and Morty"/>} />
          <Route path="/charinfo/:id" element={<Character/>} />
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
