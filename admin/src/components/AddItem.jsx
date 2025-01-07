import { useState } from 'react'
import PropTypes from 'prop-types'

const AddItem = () => {
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newItem = { itemName, quantity, price }

        try {
            const response = await fetch('/api/warehouse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            })

            if (!response.ok) {
                throw new Error('Error while creating new warehouse item!')
            }

            const data = await response.json()
            setItemName(data.itemName)
            setQuantity(data.quantity)
            setPrice(data.price)
        } catch (error) {
            setError(error.message)
        }

        console.log('Item Name:', newItem.itemName)
        console.log('Quantity:', quantity)
        console.log('Price:', price)

        setItemName('')
        setQuantity('')
        setPrice('')
    }

    return (
        <>
            {error && <div>{error}</div>}
            <h2>Add new item</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    item name:
                    <input
                        type='text'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </label>
                <label>
                    quantity:
                    <input
                        type='number'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </label>
                <label>
                    price:
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <button type='submit'>add item</button>
            </form>
        </>
    )
}

/** PROP VALIDATION FOR error AND setError */
AddItem.propTypes = {
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
}

export default AddItem
