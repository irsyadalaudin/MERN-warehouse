import { useEffect, useState } from 'react'
import AddItem from './AddItem'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'
import sugarImg from '../assets/sugar.jpg'

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
        <div className='flex flex-col lg:flex-row-reverse gap-4 p-5'>
            {/* MAIN */}
            <div className='flex-1'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 border-b pb-2'>Warehouse Items</h2>
                {!error ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {warehouse.map((item) => (
                            <div
                                key={item._id}
                                className='bg-white border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'
                            >
                                <img
                                    src={sugarImg}
                                    alt={item.itemName}
                                    className='w-full h-32 object-cover mb-4 rounded-md'
                                />
                                <h3 className='text-lg font-semibold text-gray-800 mb-2'>{item.itemName}</h3>
                                <p className='text-gray-600'>Quantity: {item.quantity}</p>
                                <p className='text-gray-600'>
                                    Price: <span className='font-medium text-green-600'>Rp {item.price}.000</span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-red-500 mt-4'>Error: {error}</div>
                )}
            </div>

            {/* ASIDE */}
            <aside className='w-full lg:w-1/3 bg-gray-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold mb-3'>Manage Items</h3>
                <div className='space-y-4'>
                    <div>
                        {/* BUTTON TO TOGLE FORM */}
                        <button
                            onClick={() => setActiveForm('add')}
                            className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700'
                        >
                            Add Item
                        </button>
                        {/* FORM */}
                        {activeForm === 'add' && <AddItem />}

                        <button
                            onClick={() => setActiveForm('delete')}
                            className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700'
                            >
                            Delete Item
                        </button>
                        {activeForm === 'delete' && <DeleteItem warehouse={warehouse} setWarehouse={setWarehouse} />}

                        <button
                            onClick={() => setActiveForm('edit')}
                            className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700'
                            >
                            Edit Item
                        </button>
                        {activeForm === 'edit' && <EditItem warehouse={warehouse} setWarehouse={setWarehouse} />}

                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Warehouse
