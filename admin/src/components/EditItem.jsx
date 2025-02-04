import { useState } from 'react'
import PropTypes from 'prop-types'

const EditItem = ({ warehouse, setWarehouse, setActiveForm }) => {
    const [itemName, setItemName] = useState('')
    const [error, setError] = useState()
    const [editValues, setEditValues] = useState()

    const handleFind = (e) => {
        e.preventDefault()
        const foundItem = warehouse.find((item) => item.itemName === itemName)

        // HANDLE ERROR WHEN ITEM IS NOT FOUND
        if (!foundItem) {
            setError('item not found!')
            return
        }

        setEditValues(foundItem)
        setError()
    }
    
    const handleEdit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/warehouse/${editValues._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/JSON' },
                body: JSON.stringify(editValues)
            })

            if (!response.ok) {
                throw new Error('error while editing warehouse item!')
            }

            const updatedItem = await response.json()
            
            /** UPDATE STATE WAREHOUSE */
            const updatedWarehouse = warehouse.map((item) => item.id === updatedItem._id ? updatedItem : item)
            setWarehouse(updatedWarehouse)
            setEditValues()
            setItemName('')
        } catch(error) {
            setError(error.message)
        }
    }

    return (
        <>
            {!error ? (
                <form onSubmit={handleFind} className='space-y-4'>
                    <label className='mt-3 block text-sm font-medium text-gray-700'>
                        Which item you want to edit:
                        <input
                            type='text'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-idnigo-500 focus:border-500'
                        />
                    </label>
                    <div className='flex justify-between'>
                        <button
                            type='button'
                            onClick={() => setActiveForm()}
                            className='mb-5 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        >
                            ⬅ Go Back
                        </button>
                        <button
                            type='submit'
                            className='mb-5 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        >
                            Enter
                        </button>
                    </div>
                </form>
            ) : (
                <div>error: {error}</div>
            )}

            {editValues && (
                <form onSubmit={handleEdit} className='space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>
                        Item name:
                        <input 
                            type='text'
                            value={editValues.itemName}
                            onChange={(e) => setEditValues({ ...editValues, itemName: e.target.value })}
                            className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-idnigo-500 focus:border-500'
                        />
                    </label>
                    <label>
                        Quantity:
                        <input 
                            type='number'
                            value={editValues.quantity}
                            onChange={(e) => setEditValues({ ...editValues, quantity: e.target.value })}
                            className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-idnigo-500 focus:border-500'
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type='number'
                            value={editValues.price}
                            onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                            className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-idnigo-500 focus:border-500'
                        />
                    </label>
                    <div className='flex justify-between'>
                        <button
                            onClick={() => setActiveForm()}
                            className='mb-5 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        >
                            ⬅ Go Back
                        </button>
                        <button
                            type='submit'
                            className='mb-5 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        >
                            Enter
                        </button>
                    </div>
                </form>
            )}
        </>
    )
}

/** PROP VALIDATION FOR warehouse, setWarehouse error, setError, setActiveForm */
EditItem.propTypes = {
    warehouse: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            itemName: PropTypes.string.isRequired,
        })
    ).isRequired,
    setWarehouse: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
    setActiveForm: PropTypes.func.isRequired
}

export default EditItem