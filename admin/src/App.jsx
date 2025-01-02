import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Warehouse from './components/Warehouse'
import Home from './pages/Home'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
				<Warehouse />
			</BrowserRouter>
		</>
	)
}

export default App