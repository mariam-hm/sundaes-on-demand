import {
    render,
    screen,
} from '../../../test-utils/testing-library-utils';
import ScoopOption from '../ScoopOption';
import userEvent from '@testing-library/user-event';

// Yes, we need the provider to check if there are more than 10 scoops
// if it is 10 scoops overall, No if it is max 10 for each

test('Box turns red when input is negative, decimal or superior to 10', async () => {
    render(<ScoopOption />);

    const vanillaInput = screen.getByRole('spinbutton');

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '-3');

    expect(vanillaInput).toHaveClass('is-invalid');

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '2.5');

    expect(vanillaInput).toHaveClass('is-invalid');

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '11');
    // Don't forget to test something specific

    expect(vanillaInput).toHaveClass('is-invalid');

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, '3');
    expect(vanillaInput).not.toHaveClass('is-invalid');
});
