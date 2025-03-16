import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import '../index.css'
import ValidateForm from '../utils/ValidateForm'

const EditItem = ({ warehouse, setWarehouse, setActiveForm, isLoading, setIsLoading }) => {
    const [file, setFile] = useState()
    const [itemName, setItemName] = useState('')
    const [formValues, setFormValues] = useState()
    const [isEditActive, setIsEditActive] = useState(false)
    const [error, setError] = useState()
    const [formErrors, setFormErrors] = useState({})

    const handleFind = (e) => {
        e.preventDefault()

        // VALIDATION IF itemName IS EMPTY
        if (!itemName.trim()) {
            setFormErrors({ itemName: 'this field is required' })
            return
        }

        const lowerCaseItemName = itemName.toLocaleLowerCase()
        const foundItem = warehouse.find((item) => item.itemName.toLowerCase() === lowerCaseItemName)

        // HANDLE ERROR WHEN ITEM IS NOT FOUND
        if (!foundItem) {
            setError('item not found')
            return
        }

        // IF ITEM IS FOUND, SAVE THE DATA TO formValues AND DISPLAY THE EDIT FORM
        setFormValues(foundItem)
        setItemName('')
        setIsEditActive(true)
        setError()
        setFormErrors({})
    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError()
            }, 7000)
            return () => clearTimeout(timer)
        }
    }, [error])

    const handleEdit = async (e) => {
        e.preventDefault()

        // VALIDATES THE REQUIRED FORM FIELDS, AND IF THERE ARE ERRORS, DISPLAYS ERROR MESSAGES AND STOPS THE SUBMIT PROCESS
        const errors = ValidateForm({formValues})

        // CHECK IF THERE ARE (errors), SET THEM WITH `setFormErrors(errors)` AND STOP THE PROCESS WITH return
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }
        console.log(Object.keys(errors))               // ['itemName']
        console.log(Object.keys(errors).length > 0)    // true

        setIsLoading(true)

        // CONTINUE EDITING IF THERE ARE NO (errors)
        const formData = new FormData()
        formData.append('itemName', formValues.itemName)
        formData.append('weight', formValues.weight)
        formData.append('weightDetails', formValues.weightDetails)
        formData.append('quantity', formValues.quantity)

        if (file instanceof File) {
            formData.append('file', file)
        }

        try {
            const response = await fetch(`/api/warehouse/${formValues._id}`, {
                method: 'PATCH',
                body: formData
            })

            // PARSE THE RESPONSE BODY AS JSON AND STORE THE EDITED ITEM DATA IN THE `updatedItem` VARIABLE
            const updatedItem = await response.json()

            if (!response.ok) {
                throw new Error('error while editing warehouse item')
            }

            console.log('Item has been suceesfully updated:', updatedItem)

            // ALLOWS TO DISPLAY EDITED ITEMS WITHOUT REFRESHING THE BROWSER
            setWarehouse((prevWarehouse) => 
                prevWarehouse.map((item) => 
                    item._id === updatedItem._id ? updatedItem : item
                )
            )

            setFormValues()
            setItemName('')
            setActiveForm()    // TO CLOSE FORM INPUT AFTER SUCCESSFULLY UPDATING ITEM
            setError()
            setFormErrors({})
        } catch(error) {
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
            {!isEditActive ? (
                <form onSubmit={handleFind} className='space-y-4'>
                    <div className='mt-2'>
                        <label htmlFor='whichItemYouWantToEdit' className='sr-only'>
                            Which item you want to edit
                        </label>
                        <input
                            id='whichItemYouWantToEdit'
                            placeholder='Which item you want to edit'
                            type='text'
                            value={itemName}
                            onChange={(e) => { setItemName(e.target.value); setFormErrors({}); setError() }}
                            className={`pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.itemName ? 'border border-red-500' : 'border-none' }`}
                        />
                        {formErrors.itemName && <p className='text-red-500'>{formErrors.itemName}</p>}
                    </div>
                    {error && <div className='text-red-500'>{error}</div>}

                    <button
                        type='button'
                        onClick={() => setActiveForm()}
                        className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-red-800 hover:to-red-600 transition-all'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-teal-800 hover:to-teal-600 transition-all'
                    >
                        Enter
                    </button>
                </form>

            ) : isEditActive && formValues ? (
                <form onSubmit={handleEdit} className='space-y-4'>
                    <div className='relative mt-4'>
                        <label 
                            htmlFor='UploadFile'
                            className='px-4 py-2 text-sm w-full  rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 transition-all'
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
                            {file ? file.name : existingFileName(formValues.file)}
                            {file && (
                                <button type='button' onClick={removeImage}>
                                    ❌
                                </button>
                            )}
                        </div>
                    </div>

                    <div className='relative'>
                        <label 
                            htmlFor='itemName'
                            className='absolute left-2 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all'
                        >
                            Edit item name:
                        </label>
                        <input
                            type='text'
                            value={formValues.itemName}
                            onChange={(e) => setFormValues({ ...formValues, itemName: e.target.value })}
                            className={`peer text-sm w-full pl-2 pt-7 pb-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.itemName ? 'border border-red-500' : 'border-none'}`}
                            disabled={isLoading}
                        />
                        {formErrors.itemName && <p className='text-red-500'>{formErrors.itemName}</p>}
                    </div>
                    <div className='relative'>
                        <label 
                            htmlFor='weightsInKgs'
                            className='absolute left-2 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all'
                        >
                            Weights in (Kgs):
                        </label>
                        <input
                            value={formValues.weight}
                            onChange={(e) => setFormValues({ ...formValues, weight: e.target.value })}
                            onWheel={(e) => e.target.blur()}
                            className={`peer text-sm w-full pl-2 pt-7 pb-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.weight ? 'border border-red-500' : 'border-none'}`}
                            disabled={isLoading}
                        />
                        {formErrors.weight && <p className='text-red-500'>{formErrors.weight}</p>}
                    </div>
                    <div className='relative'>
                        <label 
                            htmlFor='weightDetails'
                            className='absolute left-2 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all'
                        >
                            Weight Details:
                        </label>
                        <input 
                            value={formValues.weightDetails}
                            onChange={(e) => setFormValues({ ...formValues, weightDetails: e.target.value })}
                            onWheel={(e) => e.target.blur()}
                            className='peer text-sm w-full pl-2 pt-7 pb-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                        />
                    </div>
                    <div className='relative'>
                        <label
                            htmlFor='quantity'
                            className='absolute left-2 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all'
                        >
                            Quantity:
                        </label>
                        <input
                            type='number'
                            value={formValues.quantity}
                            onChange={(e) => setFormValues({ ...formValues, quantity: e.target.value })}
                            onWheel={(e) => e.target.blur()}
                            className={`peer text-sm w-full pl-2 pt-7 pb-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.quantity ? 'border border-red-500' : 'border-none'}`}
                            disabled={isLoading}
                        />
                        {formErrors.quantity && <p className='text-red-500'>{formErrors.quantity}</p>}
                    </div>
                    <button
                        type='button'
                        onClick={() => {
                            setIsEditActive(false)
                            setFormErrors({})
                        }}
                        className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 transition-all'
                        disabled={isLoading}
                    >
                        ⬅ Go Back
                    </button>
                    <button
                        type='submit'
                        className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-teal-800 hover:to-teal-600 transition-all'
                        disabled={isLoading}
                    >
                        Enter
                    </button>
                </form>
            ) : (
                <div className='text-red-500'>{error}</div>
            )}
        </>
    )
}

/** PROP VALIDATION FOR warehouse, setWarehouse error, setError, setActiveForm */
EditItem.propTypes = {
    warehouse: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            itemName: PropTypes.string.isRequired,
        })
    ).isRequired,
    setWarehouse: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
    setActiveForm: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setIsLoading: PropTypes.func.isRequired
}

export default EditItem