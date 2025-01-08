import navLogo from '../assets/nav-logo2.png'
// import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='flex flex-row items-center justify-between sticky top-0 z-10 px-8 py-2 bg-gray-300 shadow-xl'>
            <div className='flex items-center'>
                <img className='w-16 h-16 object-contain' src={navLogo} alt='nav-logo' />
                <span className='text-2xl font-bold ml-2'>My Warehouse</span>
            </div>

            {/* <div className='md:flex gap-6'>
                <Link
                    to='/'
                    className='text-black font-semibold hover:text-gray-200 transition-colors duration-300'>
                    Home
                </Link>
                <Link
                    to='/'
                    className='text-black font-semibold hover:text-gray-200 transition-colors duration-300'>
                    AddItem
                </Link>
            </div> */}
        </nav>
    )
}

export default Navbar