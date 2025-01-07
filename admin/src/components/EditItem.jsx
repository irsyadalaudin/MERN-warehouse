import { useState } from 'react'
import PropTypes from 'prop-types'

const EditItem = ({ warehouse, setWarehouse }) => {
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
            {error && <div>{error}</div>}
            <h2>edit item</h2>

            <form onSubmit={handleFind}>
                <label>
                    which item you want to edit:
                    <input
                        type='text'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </label>
                <button type='submit'>find item and edit</button>
            </form>

            {editValues && (
                <form onSubmit={handleEdit}>
                    <label>
                        item name:
                        <input 
                            type='text'
                            value={editValues.itemName}
                            onChange={(e) => setEditValues({ ...editValues, itemName: e.target.value })}
                        />
                    </label>
                    <label>
                        quantity:
                        <input 
                            type='number'
                            value={editValues.quantity}
                            onChange={(e) => setEditValues({ ...editValues, quantity: e.target.value })}
                        />
                    </label>
                    <label>
                        <input
                            type='number'
                            value={editValues.price}
                            onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                        />
                    </label>
                    <button type='submit'>update item</button>
                </form>
            )}
        </>
    )
}

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
}

export default EditItem