import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ValidateForm from '../utils/ValidateForm'

const DeleteItem = ({ warehouse, setWarehouse, setActiveForm, setIsLoading }) => {
    const [itemName, setItemName] = useState('')
    const [error, setError] = useState()
    const [formErrors, setFormErrors] = useState({})

    const handleDelete = async (e) => {
        e.preventDefault()

        // VALIDATES THE REQUIRED FORM FIELDS, AND IF THERE ARE ERRORS, DISPLAYS ERROR MESSAGES AND STOPS THE SUBMIT PROCESS
        const formValues = { itemName }

        const errors = ValidateForm({ formValues })
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        const foundItem = warehouse.find((item) => item.itemName === itemName)
        
        if (!foundItem) {
            setError('item not found')
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch(`/api/warehouse/${foundItem._id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('error while deleting warehouse item')
            }

            const updatedWarehouse = warehouse.filter((item) => item._id !== foundItem._id)
            setWarehouse(updatedWarehouse)
            setItemName('')
            setError()
            setActiveForm()    // TO CLOSE FORM INPUT AFTER SUCCESSFULLY DELETING ITEM
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError()
            }, 7000)
            return () => clearTimeout(timer)
        }
    }, [error])

    return (
        <>
            <form onSubmit={handleDelete} className='space-y-4'>
                <div className='mt-2'>
                    <label htmlFor='NameOfTheItemToDelete' className='sr-only'>
                        Name of the item to delete
                    </label>
                    <input
                        id='NameOfTheItemToDelete'
                        placeholder='Name of the item to delete'
                        type='text'
                        value={itemName}
                        onChange={(e) => { setItemName(e.target.value); setError() }}
                        className={`text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none ${formErrors.itemName ? 'border border-red-500' : 'border-none'}`}
                    />
                    {formErrors.itemName && <p className='text-red-500'>{formErrors.itemName}</p>}
                </div>
                {error && <div className='text-red-500'>{error}</div>}

                <button
                    type='button'
                    onClick={() => setActiveForm()}
                    className='text-sm w-full pl-2 py-2 rounded-md shadow-lg hover:shadow-xl focus:outline-none hover:text-white bg-gradient-to-r hover:from-red-800 hover:to-red-600 transition-all'
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
        </>
    )
}

/** PROP VALIDATION FOR warehouse, setWarehouse error, setError, setActiveForm */
DeleteItem.propTypes = {
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

export default DeleteItem