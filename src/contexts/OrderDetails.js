import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';

const OrderDetails = createContext();

// create custom  hook to check whether we're in a provider
export function useOrderDetails() {
    const contextValue = useContext(OrderDetails);

    if (!contextValue) {
        throw new Error(
            'useOrderDetails must be called from within OrderDetailsProvider'
        );
    }

    return contextValue;
}

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: {}, // { 'Chocolate': 1, 'Vanilla': 2 }
        toppings: {}, // { 'Cherries', 'M&Ms' }
    });

    function updateItemCount(
        itemName,
        newItemCount,
        optionType
    ) {
        // make a copy of existing state
        const newOptionCounts = { ...optionCounts };

        // update the copy with new information
        newOptionCounts[optionType][itemName] =
            newItemCount;

        // update the state with the updated copy
        setOptionCounts(newOptionCounts);
    }

    function resetOrder() {
        setOptionCounts({ scoops: {}, toppings: {} });
    }

    // utility function
    function calculateTotal(optionType) {
        // get an array of counts for the option type
        const countsArray = Object.values(
            optionCounts[optionType]
        );

        // total the values in the array of counts for the numbr of items
        const totalCount = countsArray.reduce(
            (total, value) => total + value,
            0
        );

        // multiply the total number of items by the price for this item type
        return totalCount * pricePerItem[optionType];
    }

    const totals = {
        scoops: calculateTotal('scoops'),
        toppings: calculateTotal('toppings'),
    };

    const value = {
        optionCounts,
        totals,
        updateItemCount,
        resetOrder,
    };
    return (
        <OrderDetails.Provider value={value} {...props} />
    );
}
