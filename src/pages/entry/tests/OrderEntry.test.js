import {
    render,
    screen,
    waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

test('Handles error for scoops and toppings routes', async () => {
    server.resetHandlers(
        rest.get(
            'http://localhost:3030/scoops',
            (req, res, ctx) => res(ctx.status(500))
        ),
        rest.get(
            'http://localhost:3030/toppings',
            (req, res, ctx) => res(ctx.status(500))
        )
    );

    render(<OrderEntry />);

    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert');
        expect(alerts).toHaveLength(2);
    });
});

test('Disables order button if no scoop is added', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // Get the scoop total, check if it is 0
    const scoopsSubtotal = screen.getByText(
        'Scoops total: $',
        { exact: false }
    );
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    const orderBtn = screen.getByRole('button', {
        name: /order sundae/i,
    });

    // expect(scoopsSubtotal).toBeInTheDocument();
    expect(orderBtn).toBeDisabled();

    const vanillaInput = await screen.findByRole(
        'spinbutton',
        { name: 'Vanilla' }
    );

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '1');

    expect(scoopsSubtotal).toHaveTextContent('2.00');
    expect(orderBtn).toBeEnabled();

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '0');

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    expect(orderBtn).toBeDisabled();

    // It wasn't necessary to check the content of the subtotal, since
});
