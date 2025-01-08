import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Warehouse from './components/Warehouse'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Warehouse />
			</BrowserRouter>
		</>
	)
}

export default App