import { useState } from 'react'
import PropTypes from 'prop-types'

const AddItem = ({ setActiveForm }) => {
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState()
    const [file, setFile] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // CREATE A NEW FormData OBJECT AND APPEND THE ITEM DETAILS (itemName, quantity, price)
        const formData = new FormData()
        formData.append('itemName', itemName)
        formData.append('quantity', quantity)
        formData.append('price', price)

        // IF A FILE IS UPLOADED, append() TO THE FormData OBJECT
        if (file) {
            formData.append('file', file)
        }

        try {
            const response = await fetch('/api/warehouse', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error('Error while creating new warehouse item!')
            }

            // PARSE THE RESPONSE BODY AS JSON AND LOG THE SUCCESS MESSAGE WITH THE CREATED ITEM DATA
            const data = await response.json()
            console.log('Item has been successfully created:', data)

            // RESET FORM FIELDS (itemName, quantity, price, file, and error) AFTER SUCCESSFUL ITEM CREATION
            setItemName('')
            setQuantity('')
            setPrice('')
            setFile()
            setError()

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            {!error ? (
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <label>
                        File:
                        <input 
                            type='file'
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
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
                <div className='text-red-500'>Error: {error}</div>
            )}
        </>
    )
    
}

/** PROP VALIDATION FOR setActiveForm */
AddItem.propTypes = {
    setActiveForm: PropTypes.func.isRequired
}

export default AddItem