
import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route, react } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Main from './views/main';
import StarsVeiw from './views/starView';
import { klaytn} from './wallet/caver.js';

// import { ConnectCypress } from './component/wallet/ConnectCypress.js';


function App() {
	const [isKaikasInstalled, setIsKaikasInstalled] = React.useState(false);
	const [isKaikasConnected, setIsKaikasConnected] = React.useState(false);
	// const [isNetworkCypress, setIsNetworkCypress] = useState(false);

	useEffect(() => {
		const checkIsKaikasInstalled = async () => {
			if (klaytn === undefined) {
				setIsKaikasInstalled(false);
			} else {
				setIsKaikasInstalled(true);
			}
		};
		checkIsKaikasInstalled();
		// console.log('isKaikasInstalled', isKaikasInstalled);
	});

	useEffect(() => {
		if (!klaytn) {
			return;
		}
		const checkIsKaikasConnected = async () => {
			if (klaytn._kaikas.isEnabled()) {
				setIsKaikasConnected(true);
			} else {
				setIsKaikasConnected(false);
			}
		};
		checkIsKaikasConnected();
		// console.log('isKaikasConnected', isKaikasConnected);
	});

	// useEffect(() => {
	// 	if (!klaytn) {
	// 		return;
	// 	}
	// 	const checkIsNetworkCypress = async () => {
	// 		const network = await klaytn.networkVersion;
	// 		if (network === 8217) {
	// 			// console.log('cypress main network');
	// 			setIsNetworkCypress(true);
	// 		} else {
	// 			setIsNetworkCypress(false);
	// 		}
	// 	};
	// 	checkIsNetworkCypress();
	// 	// console.log('isNetworkCypress', isNetworkCypress);
	// 	klaytn.enable();
	// });



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
