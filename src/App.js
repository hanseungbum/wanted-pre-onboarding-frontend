import './App.css';
import Login from "./Login";
import Todo from "./Todo";
import { BrowserRouter, Link, Route, Routes} from "react-router-dom";


function App() {
  return (
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="todo" element={<Todo/>}/>
            </Routes>
          </BrowserRouter>
  );
}

function Home() {
  return <h2><Login/></h2>
}

export default App;
