
// const ValidateForm = ({ itemName, weight, quantity }) => {
//         let hasError = false
//         const newErrors = {}

//         if (!itemName) {
//             hasError = true
//             newErrors.itemName = 'item name is required' 
//         }

//         if (!weight || weight <= 0) {
//             hasError = true
//             newErrors.weight = 'weight is required'
//         }

//         if (!quantity || quantity <= 0) {
//             hasError = true
//             newErrors.quantity = 'quantity is required'
//         }

//         return { hasError, newErrors }
// }


const ValidateForm = ({ formValues }) => {
    const errors = {}

    if (!formValues.itemName.trim())
        errors.itemName = 'this field is required'

    if (!formValues.weight || formValues.weight.toString().trim() === '')
        errors.weight = 'this field is required'

    if (!formValues.quantity || formValues.quantity.toString().trim() === '')
        errors.quantity = 'this field is required'

    return errors
}

export default ValidateForm