import { useEffect, useState } from 'react'
import AddItem from './AddItem'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'

const Warehouse = () => {
    const [warehouse, setWarehouse] = useState([])
    const [error, setError] = useState()
    const [activeForm, setActiveForm] = useState()

    useEffect(() => {
        const fetchWarehouseItem = async () => {
            try {
                const response = await fetch('/api/warehouse')

                if (!response.ok) {
                    throw new Error('error while fetching warehouse items!')
                }

                const data = await response.json()
                setWarehouse(data)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchWarehouseItem()
    }, [])

    return (
        <div className='flex flex-col lg:flex-row-reverse gap-8 p-8 bg-gray-50 min-h-screen'>
            {/* MAIN */}
            <div className='flex-1 lg:w-3/4'>
                <h2 className='text-3xl font-bold mb-8 text-gray-900 pb-4'>Warehouse Items</h2>
                {!error ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {warehouse.map((item) => (
                            <div
                                key={item._id}
                                className='bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1'
                            >
                                <img
                                    src={`http://localhost:4000${item.file}`}
                                    alt={item.itemName} 
                                    className='w-full h-48 object-cover mb-6 rounded-lg'
                                />
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>{item.itemName}</h3>
                                <p className='text-gray-700 mb-1'>{item.weight}kg</p>
                                <p className='text-gray-700 mb-1'>{item.info}</p>
                                <p className='text-gray-700 font-medium'>Quantity: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-red-600 mt-6 font-medium'>Error: {error}</div>
                )}
            </div>

            {/* ASIDE */}
            <aside className='w-full lg:w-1/4 bg-white p-6 rounded-xl shadow-lg'>
                <h3 className='text-2xl font-bold mb-6 text-gray-900'>Manage Items</h3>
                <div className='space-y-6'>
                    <div>
                        {/* BUTTON TO TOGGLE FORM */}
                        <button
                            onClick={() => setActiveForm('add')}
                            className='w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white font-bold rounded-lg shadow-md hover:from-cyan-800 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:text-gray-200 disabled:cursor-not-allowed'
                            disabled={activeForm === 'add'}
                        >
                            Add Item
                        </button>
                        {/* FORM */}
                        {activeForm === 'add' && <AddItem setActiveForm={setActiveForm} />}

                        <button
                            onClick={() => setActiveForm('delete')}
                            className='w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white font-bold rounded-lg shadow-md hover:from-cyan-800 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:text-gray-200 disabled:cursor-not-allowed mt-4'
                            disabled={activeForm === 'delete'}
                        >
                            Delete Item
                        </button>
                        {activeForm === 'delete' && <DeleteItem warehouse={warehouse} setWarehouse={setWarehouse} setActiveForm={setActiveForm} />}

                        <button
                            onClick={() => setActiveForm('edit')}
                            className='w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white font-bold rounded-lg shadow-md hover:from-cyan-800 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:text-gray-200 disabled:cursor-not-allowed mt-4'
                            disabled={activeForm === 'edit'}
                        >
                            Edit Item
                        </button>
                        {activeForm === 'edit' && <EditItem warehouse={warehouse} setWarehouse={setWarehouse} setActiveForm={setActiveForm} />}
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Warehouse