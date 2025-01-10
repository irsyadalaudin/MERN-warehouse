import { useState } from 'react'

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
            {!error ? (
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <label className='mt-3 block text-sm font-medium text-gray-700'>
                        Item Name:
                        <input
                            type='text'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        />
                    </label>
                    <label className='block text-sm font-medium text-gray-700'>
                        Quantity:
                        <input
                            type='number'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        />
                    </label>
                    <label className='block text-sm font-medium text-gray-700'>
                        Price (in thousand Rupiah):
                        <input
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        />
                    </label>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='mb-5 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        >
                            Enter
                        </button>
                    </div>
                </form>
            ) : (
                <div className='text-red-500'>Error: {error}</div>
            )}
        </>
    )
    
}

export default AddItem
