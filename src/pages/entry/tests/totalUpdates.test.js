import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('Update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />, {
        wrapper: OrderDetailsProvider,
    });

    // Make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText(
        'Scoops total: $',
        { exact: false }
    );
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // Update vanilla scoops to 1 and check total
    const vanillaInput = await screen.findByRole(
        'spinbutton',
        { name: 'Vanilla' }
    );
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');

    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // Update chocolate scoops to 2 and check total
    const chocolateInput = await screen.findByRole(
        'spinbutton',
        { name: 'Chocolate' }
    );
    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '2');

    expect(scoopsSubtotal).toHaveTextContent('6.00');
});
