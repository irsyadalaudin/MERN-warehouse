import { useState } from 'react'
import PropTypes from 'prop-types'

const DeleteItem = ({ warehouse, setWarehouse, setActiveForm }) => {
    const [itemName, setItemName] = useState('')
    const [error, setError] = useState()

    const handleDelete = async (e) => {
        e.preventDefault()
        const foundItem = warehouse.find((item) => item.itemName === itemName)

        // IF THE ITEM IS NOT FOUND IN THE WAREHOUSE, SET AN ERROR MESSAGE
        // AND STOP FURTHER EXECUTION TO PREVENT UNNECESSARY API CALLS
        if (!foundItem) {
            setError('item not found!')
            return
        }

        try {
            // USE AN ID IN THE URL
            const response = await fetch(`/api/warehouse/${foundItem._id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('error while deleting warehouse item!')
            }

            // REMOVE ITEM FROM THE DB, AFTER SUCCESSFULLY MATCHING THE ITEM NAME TO BE DELETED
            const updatedWarehouse = warehouse.filter((item) => item._id !== foundItem._id)
            setWarehouse(updatedWarehouse)
            setItemName('')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            {!error ? (
                <form onSubmit={handleDelete} className='space-y-4'>
                    <label className='mt-3 block text-sm font-medium text-gray-700'>
                        Name of the item to delete:
                        <input
                            type='text'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
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
            ) : (
                <div className='text-red-500'>error: {error}</div>
            )}
        </>
    )
}

/** PROP VALIDATION FOR warehouse, setWarehouse error AND setError */
DeleteItem.propTypes = {
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

export default DeleteItem