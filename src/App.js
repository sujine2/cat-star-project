
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Main from './views/main';
import StarsVeiw from './views/starView';



function App() {
	
  return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/stars' element={<StarsVeiw />} /> 
			</Routes>
		</BrowserRouter>
  );
}

export default App;
