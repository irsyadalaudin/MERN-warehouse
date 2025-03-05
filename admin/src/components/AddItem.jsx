import { useState } from 'react'
import PropTypes from 'prop-types'
import ValidateForm from '../utils/ValidateForm'
import '../index.css'

const AddItem = ({ setActiveForm, setWarehouse }) => {
    const [file, setFile] = useState()
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [weight, setWeight] = useState('')
    const [weightDetails, setWeightDetails] = useState('')
    const [error, setError] = useState()
    // const [formErrors, setFormErrors] = useState({
    //     itemName: '',
    //     weight: '',
    //     quantity: ''
    // })
    const [formErrors, setFormErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        /*
        setFormErrors({
            itemName: '',
            weight: '',
            quantity: ''
        })

        const { hasError, newErrors } = ValidateForm({ itemName, weight, quantity })

        if (hasError) {
            setFormErrors(newErrors)
            return
        }
        */

       // VALIDATES THE REQUIRED FORM FIELDS, AND IF THERE ARE ERRORS, DISPLAYS ERROR MESSAGES AND STOPS THE SUBMIT PROCESS
        const formValues = {
            itemName,
            weight,
            quantity
        }
        
        const errors = ValidateForm({formValues})
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
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

            // PARSE THE RESPONSE BODY AS JSON AND STORE THE CREATED ITEM DATA IN THE `data` VARIABLE
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error while creating new warehouse item!')
            }

            console.log('Item has been successfully created:', data)

            // ALLOWS TO DISPLAY NEWLY ADDED ITEMS WITHOUT REFRESHING THE BROWSER
            setWarehouse((prevWarehouse) => [...prevWarehouse, data])

            // RESET FORM FIELDS (itemName, quantity, weight, file, and error) AFTER SUCCESSFUL ITEM CREATION
            setItemName('')
            setQuantity('')
            setWeightDetails('')
            setWeight('')
            setFile()
            setError()
            setActiveForm()    // TO CLOSE FORM INPUT AFTER SUCCESSFULLY CREATING ITEM
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            {!error ? (
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='relative mt-2'>
                        <label
                            htmlFor='UploadFile'
                            className='absolute left-2 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all'
                            >
                            Upload File:
                        </label>
                        <input
                            type='file'
                            id='UploadFile'
                            onChange={(e) => setFile(e.target.files[0])}
                            className='file-input peer text-sm w-full pt-4 pb-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
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
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-red-800 hover:to-red-600 transition-all'
                    >
                        Cancel
                        {/* ⬅ Go Back */}
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
    setActiveForm: PropTypes.func.isRequired,
    setWarehouse: PropTypes.func.isRequired
}

export default AddItem