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
                    <div className='mt-2'>
                        <label htmlFor='NameOfTheItemToDelete' className='sr-only'>
                            Name of the item to delete
                        </label>
                        <input
                            id='NameOfTheItemToDelete'
                            placeholder='Name of the item to delete'
                            type='text'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                            />
                    </div>
                    <button
                        type='button'
                        onClick={() => setActiveForm()}
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-red-800 hover:to-red-600 transition-all'
                    >
                        Cancel
                        {/* ⬅ Go Back */}
                    </button>
                    <button
                        type='submit'
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-teal-800 hover:to-teal-600 transition-all'
                    >
                        Enter
                    </button>
                </form>
            ) : (
                <div className='text-red-500'>error: {error}</div>
            )}
        </>
    )
}

/** PROP VALIDATION FOR warehouse, setWarehouse error, setError, setActiveForm */
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