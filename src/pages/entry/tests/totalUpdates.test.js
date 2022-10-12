import {
    render,
    screen,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import OrderEntry from '../OrderEntry';

test('Update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />);

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

test('Update topping total when toppings change', async () => {
    render(<Options optionType="toppings" />);

    // Testing initial condition
    const toppingsSubtotal = screen.getByText(
        'Toppings total: $',
        { exact: false }
    );
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // Testing to add a topping
    const cherriesBox = await screen.findByRole(
        'checkbox',
        { name: 'Cherries' }
    );
    await userEvent.click(cherriesBox);

    expect(toppingsSubtotal).toHaveTextContent('1.50');

    // Testing adding a second topping
    const mnmsBox = await screen.findByRole('checkbox', {
        name: 'M&Ms',
    });
    await userEvent.click(mnmsBox);

    expect(toppingsSubtotal).toHaveTextContent('3.00');

    // Testing removing a topping
    await userEvent.click(cherriesBox);

    expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('Grand total', () => {
    test('Grand total starts at 0.00 and updates properly if scoop is added first', async () => {
        // We test both here to get rid of  the warning
        render(<OrderEntry />);

        const grandTotal = screen.getByText(
            'Grand total: $',
            { exact: false }
        );
        expect(grandTotal).toHaveTextContent('0.00');

        const vanillaInput = await screen.findByRole(
            'spinbutton',
            { name: 'Vanilla' }
        );
        const cherriesBox = await screen.findByRole(
            'checkbox',
            { name: 'Cherries' }
        );

        await userEvent.clear(vanillaInput);
        await userEvent.type(vanillaInput, '1');
        await userEvent.click(cherriesBox);

        expect(grandTotal).toHaveTextContent('3.50');
    });

    test('Grand total updates properly if topping is added first', async () => {
        render(<OrderEntry />);

        const grandTotal = screen.getByText(
            'Grand total: $',
            { exact: false }
        );

        const vanillaInput = await screen.findByRole(
            'spinbutton',
            { name: 'Vanilla' }
        );
        const cherriesBox = await screen.findByRole(
            'checkbox',
            { name: 'Cherries' }
        );

        await userEvent.click(cherriesBox);
        await userEvent.clear(vanillaInput);
        await userEvent.type(vanillaInput, '1');

        expect(grandTotal).toHaveTextContent('3.50');
    });
    test('Grand total updates properly if item is removed', async () => {
        render(<OrderEntry />);

        const grandTotal = screen.getByText(
            'Grand total: $',
            { exact: false }
        );

        const vanillaInput = await screen.findByRole(
            'spinbutton',
            { name: 'Vanilla' }
        );
        const cherriesBox = await screen.findByRole(
            'checkbox',
            { name: 'Cherries' }
        );

        await userEvent.click(cherriesBox);
        await userEvent.clear(vanillaInput);
        await userEvent.type(vanillaInput, '2');

        expect(grandTotal).toHaveTextContent('5.50');

        await userEvent.clear(vanillaInput);
        await userEvent.type(vanillaInput, '1');

        expect(grandTotal).toHaveTextContent('3.50');

        await userEvent.click(cherriesBox);

        expect(grandTotal).toHaveTextContent('2.00');
    });
});
