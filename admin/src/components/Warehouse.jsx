import { useEffect, useRef, useState } from 'react'
import AddItem from './AddItem'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'
import sortItems from '../utils/SortItems'

const Warehouse = () => {
    const [warehouse, setWarehouse] = useState([])
    const [error, setError] = useState()
    const [activeForm, setActiveForm] = useState()
    const [sortOption, setSortOption] = useState('itemNameA-Z')
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const dropdownRef = useRef()

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev)
        // e.stopPropagation()
        // if (!dropdownVisible) {
        //     setDropdownVisible(true)
        // } else {
        //     setDropdownVisible(false)
        // }
    }

    const handleClickOutside = () => {
        if (dropdownVisible) {
            setDropdownVisible(false)
        }
    }

    const sortedWarehouse = sortItems(warehouse, sortOption)


    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
    //             setDropdownVisible(false)
    //         }
    //     }
    //     document.addEventListener('mousedown', handleClickOutside)

    //     return() => {
    //         document.removeEventListener('mousedown', handleClickOutside)
    //     }
    // }, [dropdownRef])

    useEffect(() => {
        const fetchWarehouseItem = async () => {
            try {
                const response = await fetch('/api/warehouse')

                if (!response.ok) {
                    throw new Error('error while fetching warehouse items!')
                }

                const data = await response.json()
                setWarehouse(data)
                const sortedData = data.sort((a, b) => a.itemName.localeCompare(b.itemName))
                setWarehouse(sortedData)
            } catch (error) {
                setError(error.message)
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
                        disabled={activeForm === 'add'}
                    >
                        Add Item
                    </button>
                    {/* FORM */}
                    {activeForm === 'add' && <AddItem setActiveForm={setActiveForm} />}

                    <button
                        onClick={() => setActiveForm('delete')}
                        className='w-full py-3 px-6 text-white font-bold rounded-lg shadow-md bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:text-gray-200 disabled:cursor-not-allowed mt-4'
                        disabled={activeForm === 'delete'}
                    >
                        Delete Item
                    </button>
                    {activeForm === 'delete' && <DeleteItem warehouse={warehouse} setWarehouse={setWarehouse} setActiveForm={setActiveForm} />}

                    <button
                        onClick={() => setActiveForm('edit')}
                        className='w-full py-3 px-6 text-white font-bold rounded-lg shadow-md bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:text-gray-200 disabled:cursor-not-allowed mt-4'
                        disabled={activeForm === 'edit'}
                    >
                        Edit Item
                    </button>
                    {activeForm === 'edit' && <EditItem warehouse={warehouse} setWarehouse={setWarehouse} setActiveForm={setActiveForm} />}
                </div>
            </aside>

            {/* MAIN */}
            <div /*ref={dropdownRef}*/ className='flex-1 lg:w-3/4'>
                <div ref={dropdownRef} className='relative'>
                    <div className='flex item-center justify-between'>
                        <h2 className='text-3xl font-bold text-gray-900'>Warehouse Item</h2>
                        <button
                            // ref={dropdownRef}
                            type='button'
                            onClick={toggleDropdown}
                            className='mb-1 px-5 w-28 text-xl text-white font-bold rounded-lg shadow-lg bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:text-gray-200'
                            >
                                Sort
                        </button>
                    </div>

                    {dropdownVisible && (
                        <div /*ref={dropdownRef}*/ className='flex flex-col justify-self-end shadow-xl'>
                            <button
                                type='button'
                                onClick={() => {
                                    setSortOption('itemNameA-Z')
                                    setDropdownVisible(false)
                                }}
                                className={`w-28 px-5 text-md text-white font-bold rounded-t-lg transition-all ${
                                    sortOption === 'itemNameA-Z'
                                        ? 'bg-gradient-to-r from-cyan-800 to-cyan-600'
                                        : 'bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                }`}
                                >
                                    A-Z
                            </button>
                            <button 
                                type='button'
                                onClick={() => {
                                    setSortOption('itemNameZ-A')
                                    setDropdownVisible(false)
                                }}
                                className={`w-28 px-5 text-md text-white font-bold transition-all ${
                                    sortOption === 'itemNameZ-A'
                                        ? 'bg-gradient-to-r from-cyan-800 to-cyan-600'
                                        : 'bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                }`}
                                >
                                    Z-A
                            </button>
                            <button 
                                type='button'
                                onClick={() => {
                                    setSortOption('quantityAsc')
                                    setDropdownVisible(false)
                                }}
                                className={`w-28 px-5 text-md text-white font-bold transition-all ${
                                    sortOption === 'quantityAsc'
                                        ? 'bg-gradient-to-r from-cyan-800 to-cyan-600'
                                        : 'bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                }`}
                                >
                                    0-1000
                            </button>
                            <button 
                                type='button'
                                onClick={() => {
                                    setSortOption('quantityDesc')
                                    setDropdownVisible(false)
                                }}
                                className={`w-28 px-5 text-md text-white font-bold rounded-b-lg transition-all ${
                                    sortOption === 'quantityDesc'
                                        ? 'bg-gradient-to-r from-cyan-800 to-cyan-600'
                                        : 'bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600'
                                }`}
                                >
                                    1000-0
                            </button>
                        </div>
                    )}
                </div>

                {!error ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {/* {warehouse.map((item) => ( */}
                        {sortedWarehouse.map((item) => (
                            <div
                                key={item._id}
                                className='bg-white border border-gray-200 mt-6 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1'
                            >
                                <img
                                    src={`http://localhost:4000${item.file}`}
                                    alt={item.itemName} 
                                    className='w-full h-48 object-cover mb-6 rounded-lg'
                                />
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>{item.itemName}</h3>
                                <p className='text-gray-700 mb-1'>{item.weight}kg</p>
                                <p className='text-gray-700 mb-1'>{item.weightDetails}</p>
                                <p className='text-gray-700 font-medium'>Quantity: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-red-600 mt-6 font-medium'>Error: {error}</div>
                )}
            </div>
        </div>
    )
}

export default Warehouse