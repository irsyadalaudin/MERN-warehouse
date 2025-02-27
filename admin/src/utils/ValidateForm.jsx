const ValidateForm = ({ itemName, weight, quantity }) => {
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

        return { hasError, newErrors }
}

export default ValidateForm