import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Storage from './components/Storage'
import Home from './pages/Home'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
				<Storage />
			</BrowserRouter>
		</>
	)
}

export default App