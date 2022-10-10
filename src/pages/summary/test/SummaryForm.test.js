import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('By default, checkbox is unchecked and button is disabled', () => {
    render(<SummaryForm />);

    const tncCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const submitBtn = screen.getByRole('button', { name: /confirm order/i });

    expect(tncCheckbox).not.toBeChecked();
    expect(submitBtn).toBeDisabled();
});

test('Checking box enables and disables submit button', () => {
    render(<SummaryForm />);

    const tncCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const submitBtn = screen.getByRole('button', { name: /confirm order/i });

    // Checkbox enables button
    userEvent.click(tncCheckbox);
    expect(submitBtn).toBeEnabled();

    // Checkbox disables button
    userEvent.click(tncCheckbox);
    expect(submitBtn).toBeDisabled();
});

test('Popover responds to hover', () => {
    render(<SummaryForm />);

    // Popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    // Popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();
    // This line above is not necessary since getBy throws an error when there is no match,
    // but it makes the code more readable

    // Popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();
});
