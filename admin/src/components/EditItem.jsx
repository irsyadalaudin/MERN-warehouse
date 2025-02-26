import { useState } from 'react'
import PropTypes from 'prop-types'
import '../index.css'

const EditItem = ({ warehouse, setWarehouse, setActiveForm }) => {
    const [itemName, setItemName] = useState('')
    const [error, setError] = useState()
    const [editValues, setEditValues] = useState()
    const [file, setFile] = useState({})

    const handleFind = (e) => {
        e.preventDefault()
        const foundItem = warehouse.find((item) => item.itemName === itemName)

        // HANDLE ERROR WHEN ITEM IS NOT FOUND
        if (!foundItem) {
            setError('item not found!')
            return
        }

        setEditValues(foundItem)
        setItemName('')
        setError()
    }
    
    const handleEdit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('itemName', editValues.itemName)
        formData.append('weight', editValues.weight)
        formData.append('weightDetails', editValues.weightDetails)
        formData.append('quantity', editValues.quantity)

        if (file) {
            formData.append('file', file)
        }

        try {
            const response = await fetch(`/api/warehouse/${editValues._id}`, {
                method: 'PATCH',
                body: formData
            })

            if (!response.ok) {
                throw new Error('error while editing warehouse item!')
            }

            const updatedItem = await response.json()
            
            // UPDATE STATE WAREHOUSE
            const updatedWarehouse = warehouse.map((item) =>
                item.id === updatedItem._id ? updatedItem : item
            )
            setWarehouse(updatedWarehouse)
            setEditValues()
            setItemName('')
        } catch(error) {
            setError(error.message)
        }
    }

    const existingFileName = (filePath) => {
        if (!filePath) {
            return 'no file uploaded'
        } else {
            return filePath.split('/').pop()
        }
    }
    /*
    const part = filePath.split('/')
    // ['', 'uploads', 'image.jpg']
    const element = parts.pop()
    */

    return (
        <>
            {!error ? (
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
                            onChange={(e) => setItemName(e.target.value)}
                            className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                        />
                    </div>
                    <button
                        type='button'
                        onClick={() => setActiveForm()}
                        className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 transition-all'
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
                <div>error: {error}</div>
            )}

            {editValues && (
                <form onSubmit={handleEdit} className='space-y-4'>
                    <div className='relative mt-2'>
                        <label htmlFor='UploadFile' className='pl-2 text-sm text-gray-400 w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none'>
                            Upload File
                        </label>
                        <input
                            type='file'
                            id='UploadFile'
                            onChange={(e) => setFile(e.target.files[0])}
                            className='file-input'             
                        />
                        <div className='mt-2 text-sm text-gray-600'>
                            {existingFileName(editValues.file)}
                        </div>
                    </div>
                    <div className='mt-2'>
                        <label 
                            htmlFor='itemName'
                            className='absolute left-2 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all'
                        >
                            Edit item name:
                        </label>
                        <input
                            type='text'
                            value={editValues.itemName}
                            onChange={(e) => setEditValues({ ...editValues, itemName: e.target.value })}
                            className='peer text-sm w-full pl-2 pt-7 pb-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                        />
                    </div>
                    <div className='relative'>
                        <label 
                            htmlFor='weightsInKgs'
                            className='absolute left-2 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all'
                        >
                            Weights in (Kgs):
                        </label>
                        <input
                            value={editValues.weight}
                            onChange={(e) => setEditValues({ ...editValues, weight: e.target.value })}
                            className='peer text-sm w-full pl-2 pt-7 pb-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                        />
                    </div>
                    <div className='relative'>
                        <label 
                            htmlFor='weightDetails'
                            className='absolute left-2 top-2 text-gray-500 text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 transition-all'
                        >
                            Weight Details:
                        </label>
                        <input 
                            value={editValues.weightDetails}
                            onChange={(e) => setEditValues({ ...editValues, weightDetails: e.target.value })}
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
                            value={editValues.quantity}
                            onChange={(e) => setEditValues({ ...editValues, quantity: e.target.value })}
                            className='peer text-sm w-full pl-2 pt-7 pb-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none'
                        />
                    </div>
                    <button
                        type='button'
                        onClick={() => setActiveForm()}
                        className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 transition-all'
                    >
                        ⬅ Go Back
                    </button>
                    <button
                        type='submit'
                        className='pl-2 text-sm w-full py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-teal-800 hover:to-teal-600 transition-all'
                    >
                        Enter
                    </button>
                </form>
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
    setActiveForm: PropTypes.func.isRequired
}

export default EditItem