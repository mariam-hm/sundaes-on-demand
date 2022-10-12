import React from 'react';
import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

function OrderSummary({ setOrderPhase }) {
    const { totals, optionCounts } = useOrderDetails();

    const scoopArray = Object.entries(optionCounts.scoops); //
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    const toppingArray = Object.keys(optionCounts.toppings);
    const toppingList = toppingArray.map((key) => (
        <li key={key}>{key}</li>
    ));

    const toppingComponent =
        toppingList.length === 0 ? (
            <div></div>
        ) : (
            <div>
                <h2>
                    Toppings:{' '}
                    {formatCurrency(totals.toppings)}
                </h2>
                <ul>{toppingList}</ul>
            </div>
        );

    return (
        <div>
            <h1>Order summary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>{scoopList}</ul>
            {toppingComponent}
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    );
}

export default OrderSummary;
