import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/summary/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
    const [orderPhase, setOrderPhase] =
        useState('inProgress');

    let Component = OrderEntry;

    switch (orderPhase) {
        case 'inProgress':
            Component = OrderEntry;
            break;
        case 'review':
            Component = OrderSummary;
            break;
        case 'completed':
            Component = OrderConfirmation;
    }

    return (
        <Container>
            <OrderDetailsProvider>
                {/* Summary page and entry page need provider */}
                {
                    <Container>
                        <Component
                            orderPhase={orderPhase}
                            setOrderPhase={setOrderPhase}
                        />
                    </Container>
                }
            </OrderDetailsProvider>
            {/* Confirmation page doesn't need provider */}
        </Container>
    );
}

export default App;
