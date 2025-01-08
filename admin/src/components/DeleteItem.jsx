import { useState } from 'react'
import PropTypes from 'prop-types'

const DeleteItem = ({ warehouse, setWarehouse }) => {
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
            <h2>delete item</h2>
            {!error ? (
                <form onSubmit={handleDelete}>
                    <label>
                        name of the item to delete:
                        <input
                            type='text'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </label>
                    <button type='submit'>delete item</button>
                </form>
            ) : (
                <div>error: {error}</div>
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
}

export default DeleteItem