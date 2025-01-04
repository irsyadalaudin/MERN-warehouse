import { useState } from 'react'

const AddItem = () => {
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newWarehouseItem = { itemName, quantity, price }

        try {
            const response = await fetch('/api/warehouse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newWarehouseItem),
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

        console.log('Item Name:', newWarehouseItem.itemName)
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
                    item Name:
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

export default AddItem
