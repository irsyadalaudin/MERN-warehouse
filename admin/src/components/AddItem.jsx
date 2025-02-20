import { useState } from 'react'
import PropTypes from 'prop-types'

const AddItem = ({ setActiveForm }) => {
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [weight, setWeight] = useState('')
    const [weightDetails, setWeightDetails] = useState('')
    const [error, setError] = useState()
    const [file, setFile] = useState()
    const [formErrors, setFormErrors] = useState({
        itemName: '',
        weight: '',
        quantity: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        setFormErrors({
            itemName: '',
            weight: '',
            quantity: ''
        })

        let hasError = false
        const newErrors = {}

        if (!itemName) {
            hasError = true
            newErrors.itemName = 'item name is required' 
        }

        if (!weight || weight <= 0) {
            hasError = true
            newErrors.weight = 'weight is required'
        }

        if (!quantity || quantity <= 0) {
            hasError = true
            newErrors.quantity = 'quantity is required'
        }

        if (hasError) {
            setFormErrors(newErrors)
            return
        }

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

            // PARSE THE RESPONSE BODY AS JSON AND LOG THE SUCCESS MESSAGE WITH THE CREATED ITEM DATA
            const data = await response.json()

            if (!response.ok) {
                // throw new Error('Error while creating new warehouse item!')
                throw new Error(data.error || 'Error while creating new warehouse item!')
            }

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
                    <div className='mt-2'>
                        <label htmlFor='UploadFile' className='pl-2 text-sm text-gray-400 w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'>
                            Upload File
                        </label>
                        <input
                            id='UploadFile'
                            type='file'
                            onChange={(e) => setFile(e.target.files[0])}
                            // className='hidden'
                        />
                    </div>
                    <div>
                        <label htmlFor='itemName' className='sr-only'>
                            Item Name
                        </label>
                        <input
                            id='ItemName'
                            placeholder='Item Name'
                            type='text'
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className={`text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.itemName ? 'border border-red-500' : 'border-none'}`}
                        />
                        {formErrors.itemName && <div className='text-red-500'>{formErrors.itemName}</div>}
                    </div>
                    <div>
                        <label htmlFor='weightsInKgs' className='sr-only'>
                            Weights in Kgs
                        </label>
                        <input
                            id='WeightsInKgs'
                            placeholder='Weights (in Kgs)'
                            type='number'
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className={`text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.weight ? 'border border-red-500' : 'border-none'}`}
                        />
                        {formErrors.weight && <div className='text-red-500'>{formErrors.weight}</div>}
                    </div>
                    <div>
                        <label htmlFor='WeightDetails' className='sr-only'>
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
                    </div>
                    <div>
                        <label htmlFor='Quantity' className='sr-only'>
                            Quantity
                        </label>
                        <input
                            id='Quantity'
                            placeholder='Quantity'
                            type='number'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className={`text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.quantity ? 'border border-red-500' : 'border-none'} `}
                        />
                        {formErrors.quantity && <div className='text-red-500'>{formErrors.quantity}</div>}
                    </div>
                    <button
                        type='button'
                        onClick={() => setActiveForm()}
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 transition-all'
                    >
                        ⬅ Go Back
                    </button>
                    <button
                        type='submit'
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-teal-800 hover:to-teal-600 transition-all'
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