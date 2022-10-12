import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Order phases for happy path', async () => {
    // Render app
    render(<App />);

    // Add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole(
        'spinbutton',
        { name: 'Vanilla' }
    );

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');

    const cherriesBox = await screen.findByRole(
        'checkbox',
        { name: 'Cherries' }
    );

    await userEvent.click(cherriesBox);

    // Find and click order button ---- Shouldn't work from now

    const orderBtn = screen.getByRole('button', {
        name: /order/i,
    });
    await userEvent.click(orderBtn);

    // Check summary imformation based on an order (It is the right item, with the right quantity)

    // In this page, check everything

    const summaryHeading = screen.getByRole('heading', {
        name: 'Order summary',
    });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', {
        name: 'Scoops: $2.00',
    });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole('heading', {
        name: 'Toppings: $1.50',
    });
    expect(toppingsHeading).toBeInTheDocument();

    expect(
        screen.getByText('1 Vanilla')
    ).toBeInTheDocument();
    expect(
        screen.getByText('Cherries')
    ).toBeInTheDocument();

    // WRONG = I should test for the exact output, not an approximation
    // const vanillaItem = screen.getByText('Vanilla', {
    //     exact: false,
    // });
    // expect(vanillaItem).toHaveTextContent('1');

    // const cherriesItem = screen.getByText('Cherries', {
    //     exact: false,
    // });
    // expect(cherriesItem).toBeInTheDocument();

    // Accept terms and conditions and click button to confirm order

    const tncCheckbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i,
    });
    const submitBtn = screen.getByRole('button', {
        name: /confirm order/i,
    });

    await userEvent.click(tncCheckbox);
    await userEvent.click(submitBtn);

    // Confirm order number on confirmation page
    // Here again, test the whole page

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();

    const thankYouHeader = await screen.findByRole(
        'heading',
        { name: /thank you/i }
    );
    expect(thankYouHeader).toBeInTheDocument();

    const noLoading = screen.queryByText('Loading...');
    expect(noLoading).not.toBeInTheDocument();

    const orderNum = await screen.findByText(
        /order number/i
    );
    expect(orderNum).toBeInTheDocument();

    // Click new order button on confimation page

    const newOrderBtn = screen.getByRole('button', {
        name: /new order/i,
    });
    await userEvent.click(newOrderBtn);

    // Check that scoops and topping subtotals have been reset

    const scoopsSubtotal = await screen.getByText(
        'Scoops total: $0.00'
    );
    expect(scoopsSubtotal).toBeInTheDocument();
    const toppingsSubtotal = await screen.getByText(
        'Toppings total: $0.00'
    );
    expect(toppingsSubtotal).toBeInTheDocument();

    // Do we need to await anything to avoid test errors

    await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    await screen.findByRole('checkbox', {
        name: 'Cherries',
    });
});

test('Order phases for order without toppings', async () => {
    // Render app
    render(<App />);

    // Add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole(
        'spinbutton',
        { name: 'Vanilla' }
    );
    const chocolateInput = await screen.findByRole(
        'spinbutton',
        { name: 'Chocolate' }
    );

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');

    await userEvent.clear(chocolateInput);
    await userEvent.type(chocolateInput, '2');

    // Find and click order button ---- Shouldn't work from now

    const orderBtn = screen.getByRole('button', {
        name: /order/i,
    });
    await userEvent.click(orderBtn);

    // Check summary imformation based on an order (It is the right item, with the right quantity)

    // In this page, check everything

    const summaryHeading = screen.getByRole('heading', {
        name: 'Order summary',
    });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', {
        name: 'Scoops: $6.00',
    });
    expect(scoopsHeading).toBeInTheDocument();

    // Not in the document -- Should fail here
    const noToppingsHeading = screen.queryByRole(
        'heading',
        {
            name: /topping/i,
        }
    );
    expect(noToppingsHeading).not.toBeInTheDocument();

    expect(
        screen.getByText('1 Vanilla')
    ).toBeInTheDocument();

    const tncCheckbox = screen.getByRole('checkbox', {
        name: /terms and conditions/i,
    });
    const submitBtn = screen.getByRole('button', {
        name: /confirm order/i,
    });

    await userEvent.click(tncCheckbox);
    await userEvent.click(submitBtn);

    // Confirm order number on confirmation page
    // Here again, test the whole page

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();

    const thankYouHeader = await screen.findByRole(
        'heading',
        { name: /thank you/i }
    );
    expect(thankYouHeader).toBeInTheDocument();

    const noLoading = screen.queryByText('Loading...');
    expect(noLoading).not.toBeInTheDocument();

    const orderNum = await screen.findByText(
        /order number/i
    );
    expect(orderNum).toBeInTheDocument();

    // Click new order button on confimation page

    const newOrderBtn = screen.getByRole('button', {
        name: /new order/i,
    });
    await userEvent.click(newOrderBtn);

    // Check that scoops and topping subtotals habe been reset

    const scoopsSubtotal = await screen.getByText(
        'Scoops total: $0.00'
    );
    expect(scoopsSubtotal).toBeInTheDocument();
    const toppingsSubtotal = await screen.getByText(
        'Toppings total: $0.00'
    );
    expect(toppingsSubtotal).toBeInTheDocument();

    // Do we need to await anything to avoid test errors

    await screen.findByRole('spinbutton', {
        name: 'Vanilla',
    });
    await screen.findByRole('checkbox', {
        name: 'Cherries',
    });
});
