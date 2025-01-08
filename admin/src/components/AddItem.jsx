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
            <h2 className='text-2xl font-semibold mb-4'>Add New Item</h2>
            {!error ? (
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Item Name:
                            <input
                                type='text'
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Quantity:
                            <input
                                type='number'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </label>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Price (in thousand Rupiah):
                            <input
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </label>
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        >
                            Add Item
                        </button>
                    </div>
                </form>
            ) : (
                <div className='text-red-500'>Error: {error}</div>
            )}
        </>
    )
    
}

/** PROP VALIDATION FOR error AND setError */
AddItem.propTypes = {
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
}

export default AddItem
