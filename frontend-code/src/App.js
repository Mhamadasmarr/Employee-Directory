import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Homepage from './component/Homepage';
import AddForm from './component/AddForm';
import EditForm from './component/EditForm';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">

< Router>
 
  <Routes>             
          <Route path="/" element={ <Homepage />} />
          <Route path="/addform" element={<AddForm />} />
          <Route path="/employee/edit/" element={<EditForm />}></Route>
  </Routes>
  </Router>
     
    </div>
  );
}

export default App;
