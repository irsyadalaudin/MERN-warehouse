import { useEffect, useState } from 'react'
import AddItem from './AddItem'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'

const Warehouse = () => {
    const [warehouse, setWarehouse] = useState([])
    const [error, setError] = useState()

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
                <h2 className='text-xl font-bold mb-4'>Warehouse Items</h2>
                {!error ? (
                    warehouse.map((item) => (
                        <ul key={item._id} className='border-b py-2'>
                            <li className='text-gray-800'>{item.itemName}</li>
                            <li className='text-gray-600'>Quantity: {item.quantity}</li>
                            <li className='text-gray-600'>Price: Rp {item.price}.000</li>
                        </ul>
                    ))
                ) : (
                    <div className='text-red-500'>Error: {error}</div>
                )}
            </div>
    
            {/* ASIDE */}
            <aside className='w-full lg:w-1/3 bg-gray-100 p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold mb-3'>Manage Items</h3>
                <div className='space-y-4'>
                    <AddItem />
                    <DeleteItem warehouse={warehouse} setWarehouse={setWarehouse} />
                    <EditItem warehouse={warehouse} setWarehouse={setWarehouse} />
                </div>
            </aside>
        </div>
    )
}

export default Warehouse
