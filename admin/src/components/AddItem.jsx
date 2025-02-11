import { useState } from 'react'
import PropTypes from 'prop-types'

const AddItem = ({ setActiveForm }) => {
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [info, setInfo] = useState('')
    const [weight, setWeight] = useState('')
    const [error, setError] = useState()
    const [file, setFile] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // CREATE A NEW FormData OBJECT AND APPEND THE ITEM DETAILS (itemName, quantity, weight)
        const formData = new FormData()
        formData.append('itemName', itemName)
        formData.append('weight', weight)
        formData.append('info', info)
        formData.append('quantity', quantity)

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

            // RESET FORM FIELDS (itemName, quantity, weight, file, and error) AFTER SUCCESSFUL ITEM CREATION
            setItemName('')
            setQuantity('')
            setInfo('')
            setWeight('')
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
                    <label className='block mt-1 pl-2 text-sm text-gray-400 w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'>
                        Upload File
                        <input 
                            type='file'
                            onChange={(e) => setFile(e.target.files[0])}
                            className='hidden'
                        />
                    </label>
                    <label className='block'>
                        <input
                            placeholder='Item Name'
                            type='text'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className='pl-2 text-sm block w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                        />
                    </label>
                    <label className='block'>
                        <input
                            placeholder='Weights (in Kgs)'
                            type='number'
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                        />
                    </label>
                    <label className='block'>
                        <input
                            placeholder='Additional Info'
                            type='text' 
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                        />
                    </label>
                    <label className='block'>
                        <input
                            placeholder='Quantity'
                            type='number'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                        />
                    </label>
                    <div className='flex justify-between'>
                        <button
                            type='button'
                            onClick={() => setActiveForm()}
                            className='mb-5 py-2 px-4 bg-gradient-to-r from-cyan-800 to-cyan-600 text-white font-semibold rounded-md shadow-md hover:from-cyan-900 hover:to-cyan-700 transition-all'
                        >
                            ⬅ Go Back
                        </button>
                        <button
                            type='submit'
                            className='mb-5 py-2 px-4 bg-gradient-to-r from-cyan-800 to-cyan-600 text-white font-semibold rounded-md shadow-md hover:from-cyan-900 hover:to-cyan-700 transition-all'
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