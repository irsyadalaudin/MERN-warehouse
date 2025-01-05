import { useState } from 'react'

const DeleteItem = ({ warehouse, setWarehouse, error, setError }) => {
    const [itemName, setItemName] = useState('')

    const handleDelete = async (e) => {
        e.preventDefault()
        const deletingItem = warehouse.find((item) => item.itemName === itemName)

        if (!deletingItem) {
            setError('item not found!')
            return
        }

        try {
            const response = await fetch(`/api/warehouse/${deletingItem._id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('error while deleting warehouse item!')
            }

            const updatedWarehouse = warehouse.filter((item) => item._id !== deletingItem._id)
            setWarehouse(updatedWarehouse)
            setItemName('')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
        {error && <div>{error}</div>}
        <h2>delete item</h2>

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
        </>
    )
}

export default DeleteItem