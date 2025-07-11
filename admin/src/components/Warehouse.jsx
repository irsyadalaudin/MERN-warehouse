import { useEffect, useRef, useState } from 'react'
import AddItem from './AddItem'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'
import sortItems from '../utils/SortItems'
import { format } from 'date-fns'
// import '../index.css'

const Warehouse = () => {
    const [warehouse, setWarehouse] = useState([])
    const [error, setError] = useState()
    const [activeForm, setActiveForm] = useState()
    const [sortOption, setSortOption] = useState('itemNameA-Z')
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const dropdownRef = useRef()

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev)
    }

    const handleClickOutside = () => {
        if (dropdownVisible) {
            setDropdownVisible(false)
        }
    }

    const sortedWarehouse = sortItems(warehouse, sortOption)

    useEffect(() => {
        const fetchWarehouseItem = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('https://mern-warehouse.onrender.com/api/warehouse', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }})

                if (!response.ok) {
                    throw new Error('error while fetching warehouse items!')
                }

                const data = await response.json()
                setWarehouse(data)
                const sortedData = data.sort((a, b) => a.itemName.localeCompare(b.itemName))
                setWarehouse(sortedData)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchWarehouseItem()
    }, [])

    return (
        <div onClick={handleClickOutside} className='flex flex-col lg:flex-row gap-8 p-8 min-h-screen'>
            {/* ASIDE */}
            <aside className='w-full lg:w-1/4 bg-white p-6 rounded-xl shadow-lg'>
                <h3 className='text-2xl font-bold mb-6 text-gray-900'>Manage Items</h3>
                <div className='space-y-3'>
                    {/* BUTTON TO TOGGLE FORM */}
                    <button
                        onClick={() => setActiveForm('add')}
                        className='w-full py-3 px-6 text-white font-bold rounded-lg shadow-md bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:text-gray-200 disabled:cursor-not-allowed'
                        disabled={activeForm === 'add' || isLoading}
                    >
                        Add Item
                    </button>
                    {/* FORM */}
                    {activeForm === 'add' && <AddItem setActiveForm={setActiveForm} setWarehouse={setWarehouse} isLoading={isLoading} setIsLoading={setIsLoading} />}

                    <button
                        onClick={() => setActiveForm('delete')}
                        className='w-full py-3 px-6 text-white font-bold rounded-lg shadow-md bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:text-gray-200 disabled:cursor-not-allowed mt-4'
                        disabled={activeForm === 'delete' || isLoading}
                    >
                        Delete Item
                    </button>
                    {activeForm === 'delete' && <DeleteItem warehouse={warehouse} setWarehouse={setWarehouse} setActiveForm={setActiveForm} isLoading={isLoading} setIsLoading={setIsLoading} />}

                    <button
                        onClick={() => setActiveForm('edit')}
                        className='w-full py-3 px-6 text-white font-bold rounded-lg shadow-md bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:text-gray-200 disabled:cursor-not-allowed mt-4'
                        disabled={activeForm === 'edit' || isLoading}
                    >
                        Edit Item
                    </button>
                    {activeForm === 'edit' && <EditItem warehouse={warehouse} setWarehouse={setWarehouse} setActiveForm={setActiveForm} isLoading={isLoading} setIsLoading={setIsLoading} />}
                </div>
            </aside>

            {/* MAIN */}
            <div className='flex-1 lg:w-3/4'>
                {/* DROPDOWN BUTON */}
                <div ref={dropdownRef} className='relative'>
                    <div className='flex item-center justify-between'>
                        <h2 className='text-3xl font-bold text-gray-900'>Warehouse Item</h2>
                        <div className='flex gap-3'>
                            <h3 className='align-middle text-md'>Sort By:</h3>
                            <button
                                type='button'
                                onClick={toggleDropdown}
                                className={`mb-0.5 w-40 text-md text-white font-bold rounded-t-lg shadow-lg transition-all ${
                                    dropdownVisible
                                    ? 'opacity-35 bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                    : 'bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                }`}
                                disabled={isLoading}
                                >
                                    {sortOption}
                            </button>
                        </div>
                    </div>

                    {/* DROPDOWN */}
                    {dropdownVisible && (
                        <div className='gap-y-0.5 rounded-b-lg flex flex-col justify-self-end shadow-xl'>
                            {sortOption !== 'itemNameA-Z' && (
                                <button
                                    type='button'
                                    onClick={() => {
                                        setSortOption('itemNameA-Z')
                                        setDropdownVisible(false)
                                    }}
                                    className={`w-40 px-5 text-md text-white font-bold transition-all ${
                                        sortOption === 'itemNameA-Z'
                                            ? 'bg-gradient-to-r from-cyan-800 to-cyan-600'
                                            : 'bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                    }`}
                                    disabled={isLoading}
                                    >
                                        Item Name A-Z
                                </button>
                            )}
                            {sortOption !== 'itemNameZ-A' && (
                                <button 
                                    type='button'
                                    onClick={() => {
                                        setSortOption('itemNameZ-A')
                                        setDropdownVisible(false)
                                    }}
                                    className={`w-40 px-5 text-md text-white font-bold transition-all ${
                                        sortOption === 'itemNameZ-A'
                                            ? 'bg-gradient-to-r from-cyan-800 to-cyan-600'
                                            : 'bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                    }`}
                                    disabled={isLoading}
                                    >
                                        Item Name Z-A
                                </button>
                            )}
                            {sortOption !== 'quantityAsc' && (
                                <button 
                                    type='button'
                                    onClick={() => {
                                        setSortOption('quantityAsc')
                                        setDropdownVisible(false)
                                    }}
                                    className={`w-40 px-5 text-md text-white font-bold transition-all ${
                                        sortOption === 'quantityAsc'
                                            ? 'bg-gradient-to-r from-cyan-800 to-cyan-600'
                                            : 'bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                    }`}
                                    disabled={isLoading}
                                    >
                                        Qty Ascending
                                </button>
                            )}
                            {sortOption !== 'quantityDesc' && (
                                <button 
                                    type='button'
                                    onClick={() => {
                                        setSortOption('quantityDesc')
                                        setDropdownVisible(false)
                                    }}
                                    className={`w-40 px-5 text-md text-white font-bold rounded-b-lg transition-all ${
                                        sortOption === 'quantityDesc'
                                            ? 'bg-gradient-to-r from-cyan-800 to-cyan-600'
                                            : 'bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                    }`}
                                    disabled={isLoading}
                                    >
                                        Qty Descending
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* LOADING INDICATOR */}
                {isLoading && (
                    // <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
                    <div className='fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50'>
                        <div className=' block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
                        <span className='mt-3 text-lg'>Loading...</span>
                    </div>
                )}

                {/* WAREHOUSE ITEM */}
                {!error ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {/* {warehouse.map((item) => ( */}
                        {sortedWarehouse.map((item) => (
                            <div
                                key={item._id}
                                className='bg-white border border-gray-200 mt-6 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1'
                            >
                                <img
                                    // ACCESS FILE url FROM CLOUDINARY (WITH public_id AND url)
                                    src={item.file?.url}
                                    alt={item.itemName} 
                                    className='w-full h-48 object-cover mb-6 rounded-lg'
                                />
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>{item.itemName}</h3>
                                <p className='text-gray-700 mb-1'>{item.weight}kg</p>
                                <p className='text-gray-700 mb-1'>{item.weightDetails}</p>
                                <p className='text-gray-700 font-medium'>Quantity: {item.quantity}</p>
                                <p>{format(new Date(item.createdAt), 'EEEE, dd MM yyyy')}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    !isLoading && <div className='text-red-600 mt-6 font-medium'>Error: {error}</div>
                )}
            </div>
        </div>
    )
}

export default Warehouse 