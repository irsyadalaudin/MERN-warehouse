import { useState } from 'react'
import PropTypes from 'prop-types'

const AddItem = ({ setActiveForm }) => {
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [weight, setWeight] = useState('')
    const [weightDetails, setWeightDetails] = useState('')
    const [error, setError] = useState()
    const [file, setFile] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // CREATE A NEW FormData OBJECT AND APPEND THE ITEM DETAILS (itemName, quantity, weight)
        const formData = new FormData()
        formData.append('itemName', itemName)
        formData.append('weight', weight)
        formData.append('weightDetails', weightDetails)
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
            setWeightDetails('')
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
                    <label htmlFor='UploadFile' className='block mt-2 pl-2 text-sm text-gray-400 w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'>
                        Upload File
                    </label>
                    <input
                        id='UploadFile'
                        type='file'
                        onChange={(e) => setFile(e.target.files[0])}
                        className='hidden'
                    />
                    <label htmlFor='itemName' className='sr-only'>
                        Item Name
                    </label>
                    <input
                        id='ItemName'
                        placeholder='Item Name'
                        type='text'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className='text-sm block w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                    />

                    <label htmlFor='weightsInKgs' className='sr-only block'>
                        Weights in Kgs
                    </label>
                    <input
                        id='WeightsInKgs'
                        placeholder='Weights (in Kgs)'
                        type='number'
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                    />

                    <label htmlFor='WeightDetails' className='sr-only block'>
                        Weight Details
                    </label>
                    <input
                        id='WeightsDetails'
                        placeholder='Weight details'
                        type='text' 
                        value={weightDetails}
                        onChange={(e) => setWeightDetails(e.target.value)}
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                    />

                    <label htmlFor='Quantity' className='sr-only block'>
                        Quantity
                    </label>
                    <input
                        id='Quantity'
                        placeholder='Quantity'
                        type='number'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                    />
                    <button
                        type='button'
                        onClick={() => setActiveForm()}
                        className='text-sm block w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 transition-all'
                    >
                        ⬅ Go Back
                    </button>
                    <button
                        type='submit'
                        className='text-sm block w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-teal-800 hover:to-teal-600 transition-all'
                    >
                        Enter
                    </button>
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