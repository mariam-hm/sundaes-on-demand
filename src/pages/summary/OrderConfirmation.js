import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import axios from 'axios';
import AlertBanner from '../common/AlertBanner';

function OrderConfirmation({ orderPhase, setOrderPhase }) {
    const { resetOrder } = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .post(`http://localhost:3030/order`)
            .then((response) => {
                setOrderNumber(response.data.orderNumber);
            })
            .catch((error) => {
                setError(true);
            });
    }, []);

    if (error) {
        return <AlertBanner />;
    }

    function handleClick() {
        resetOrder();
        setOrderPhase('inProgress');
    }

    if (orderNumber) {
        return (
            <div>
                <h1>Thank you</h1>
                <h3>Your order number is {orderNumber}</h3>
                <p>
                    As per our terms and conditions, nothing
                    will happen now.
                </p>
                <Button
                    variant="light"
                    onClick={handleClick}
                >
                    Create new order
                </Button>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default OrderConfirmation;
