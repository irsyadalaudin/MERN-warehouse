import { useEffect, useState } from 'react'
import AddItem from './AddItem'
import DeleteItem from './DeleteItem'

const Warehouse = () => {
    const [warehouse, setWarehouse] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        const fetchWarehouseItem = async () => {
            try {
                const response = await fetch('/api/warehouse')

                if (!response.ok) {
                    throw new Error('error while fetching warehouse items!')
                }

                const data = await response.json()
                setWarehouse(data)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchWarehouseItem()
    }, [])

    return (
        <>
            <h2>Warehouse Items</h2>
            {!error ? (
                warehouse.map((item) => (
                    <ul key={item._id}>
                        <li>{item.itemName}</li>
                        <li>{item.quantity}</li>
                        <li>{item.price}</li>
                    </ul>
                ))
            ) : (
                <div>error: {error}</div>
            )}

            {/* DROPDOWN FORM COMPONENT */}
            {/* PROP DRILLING USING useState */}
            <AddItem
                error={error}
                setError={setError}
            />
            <DeleteItem
                warehouse={warehouse}
                setWarehouse={setWarehouse}
                error={error}
                setError={setError}
            />
        </>
    )
}

export default Warehouse
