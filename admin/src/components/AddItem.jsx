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
        // const newItem = { itemName, quantity, price, file }

        const formData = new FormData()
        formData.append('itemName', itemName)
        formData.append('quantity', quantity)
        formData.append('price', price)
        if (file) {
            formData.append('file', file)
        }

        try {
            const response = await fetch('/api/warehouse', {
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(newItem)
                body: formData
            })

            if (!response.ok) {
                throw new Error('Error while creating new warehouse item!')
            }

            const data = await response.json()
            // setItemName(data.itemName)
            // setQuantity(data.quantity)
            // setPrice(data.price)
            console.log('Item has been successfully created:', data)

            setItemName('')
            setQuantity('')
            setPrice('')
            setFile()
            setError()

        } catch (error) {
            setError(error.message)
        }

        // console.log('Item Name:', newItem.itemName)
        // console.log('Quantity:', quantity)
        // console.log('Price:', price)

        // setItemName('')
        // setQuantity('')
        // setPrice('')
    }

    // const upload = async () => {
    //     const formData = new FormData()
    //     formData.append('file', file)

    //     try {
    //         const response = await fetch('/api/upload', {
    //             method: 'POST',
    //             body: formData
    //         })

    //         if (!response.ok) {
    //             throw new Error('failed to uploading image')
    //         }

    //         const data = await response.json()
    //         console.log('File:', data)
    //     } catch (error) {
    //         setError(error.messae)
    //     }
    // }

    return (
        <>
            {!error ? (
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <label>
                        File:
                        <input 
                            type='file' 
                            // value={file}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        {/* <button
                            type='button'
                            onClick={upload}
                        >
                            Upload
                        </button> */}
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
