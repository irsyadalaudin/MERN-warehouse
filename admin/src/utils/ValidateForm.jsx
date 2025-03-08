const ValidateForm = ({ formValues }) => {
    const errors = {}

    if (!formValues.itemName.trim())
        errors.itemName = 'this field is required'

    // IF weight IS NOT IN formValues, SKIP THIS CONDITION
    if ('weight' in formValues && (!formValues.weight || formValues.weight.toString().trim() === ''))
        errors.weight = 'this field is required'

    // IF quantity IS NOT IN formValues, SKIP THIS CONDITION
    if ('quantity' in formValues && (!formValues.quantity || formValues.quantity.toString().trim() === ''))
        errors.quantity = 'this field is required'

    return errors
}

export default ValidateForm