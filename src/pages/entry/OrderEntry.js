import React from 'react';
import Options from './Options';
import { formatCurrency } from '../../utilities';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Button from 'react-bootstrap/Button';

function OrderEntry({ setOrderPhase }) {
    const { totals } = useOrderDetails();

    return (
        <div>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>
                Grand total:{' '}
                {formatCurrency(
                    totals['scoops'] + totals['toppings']
                )}
            </h2>
            <Button
                variant="light"
                onClick={() => setOrderPhase('review')}
            >
                Order sundae!
            </Button>
        </div>
    );
}

export default OrderEntry;
