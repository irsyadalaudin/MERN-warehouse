import { useState } from 'react'
import PropTypes from 'prop-types'
import ValidateForm from '../utils/ValidateForm'
import '../index.css'

const AddItem = ({ setActiveForm, setWarehouse, isLoading, setIsLoading }) => {
    const [file, setFile] = useState()
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [weight, setWeight] = useState('')
    const [weightDetails, setWeightDetails] = useState('')
    const [formValues, setFormValues] = useState({})
    const [error, setError] = useState()
    const [formErrors, setFormErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        // VALIDATES THE REQUIRED FORM FIELDS, AND IF THERE ARE ERRORS, DISPLAYS ERROR MESSAGES AND STOPS THE SUBMIT PROCESS
        const formValues = {
            itemName,
            weight,
            quantity
        }
        
        const errors = ValidateForm({ formValues })
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        setIsLoading(true)

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

            // PARSE THE RESPONSE BODY AS JSON AND STORE THE CREATED ITEM DATA IN THE `data` VARIABLE
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error while creating new warehouse item!')
            }

            console.log('Item has been successfully created:', data)

            // ALLOWS TO DISPLAY NEWLY ADDED ITEMS WITHOUT REFRESHING THE BROWSER
            setWarehouse((prevWarehouse) => [...prevWarehouse, data])

            // RESET FORM FIELDS (itemName, quantity, weight, file, and error) AFTER SUCCESSFUL ITEM CREATION
            setFormValues()
            setItemName('')
            setQuantity('')
            setWeightDetails('')
            setWeight('')
            setFile()
            setError()
            setActiveForm()    // TO CLOSE FORM INPUT AFTER SUCCESSFULLY CREATING ITEM
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // DISPLAYS THE PREVIOUSLY UPLOADED FILE NAME IF AVAILABLE; OTHERWISE, SHOWS 'no file uploaded'
    const existingFileName = (filePath) => {
        if (!filePath) {
            return 'no file uploaded'
        } else {
            return filePath.split('/').pop()
        }
    }

    const removeImage = () => {
        setFile()
    }

    return (
        <>
            {!error ? (
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='relative mt-2'>
                        <label 
                            htmlFor='UploadFile'
                            className='px-4 py-2 text-sm w-full rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 transition-all'
                        >
                            Upload File:
                        </label>
                        <input
                            type='file'
                            id='UploadFile'
                            onChange={(e) => setFile(e.target.files[0])}        
                            className='hidden'
                            disabled={isLoading}
                        />
                        <div className='mt-2 text-sm text-gray-600'>
                            {file ? file.name : existingFileName(formValues?.file)}
                            {file && (
                                <button type='button' onClick={removeImage}>
                                    ❌
                                </button>
                            )}
                        </div>
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
                            disabled={isLoading}
                        />
                        {formErrors.itemName && <p className='text-red-500'>{formErrors.itemName}</p>}
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
                            onWheel={(e) => e.target.blur()}
                            className={`text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.weight ? 'border border-red-500' : 'border-none'}`}
                            disabled={isLoading}
                        />
                        {formErrors.weight && <p className='text-red-500'>{formErrors.weight}</p>}
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
                            disabled={isLoading}
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
                            onWheel={(e) => e.target.blur()}
                            className={`text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.quantity ? 'border border-red-500' : 'border-none'}`}
                            disabled={isLoading}
                        />
                        {formErrors.quantity && <p className='text-red-500'>{formErrors.quantity}</p>}
                    </div>
                    <button
                        type='button'
                        onClick={() => setActiveForm()}
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-red-800 hover:to-red-600 transition-all'
                        disabled={isLoading}
                    >
                        Cancel
                        {/* ⬅ Go Back */}
                    </button>
                    <button
                        type='submit'
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-teal-800 hover:to-teal-600 transition-all'
                        disabled={isLoading}
                    >
                        {/* Enter */}
                        {isLoading ? 'Loading...' : 'Enter'}
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
    setActiveForm: PropTypes.func.isRequired,
    setWarehouse: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setIsLoading: PropTypes.func.isRequired
}

export default AddItem