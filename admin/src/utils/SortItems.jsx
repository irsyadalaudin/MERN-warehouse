const sortItems = (items, option) => {
    // IF NO SORT OPTION, RETURN AS-IS
    if(!option) {
        return items
    }

    return [...items].sort((a, b) => {
        // SWITCH TO DETERMINE HOW TO SORT BASED ON THE PROVIDED OPTION
        switch (option) {
            case 'itemNameA-Z':
                return a.itemName.localeCompare(b.itemName)
            case 'itemNameZ-A':
                return b.itemName.localeCompare(a.itemName)
            case 'quantityAsc':
                return a.quantity-b.quantity
            case 'quantityDesc':
                return b.quantity-a.quantity
            // DEFAULT CASE WHEN NO MATCH IS FOUND, RETURN 0 (NO CHANGE IN ORDER)
            default:
                return 0
        }
    })
}

export default sortItems