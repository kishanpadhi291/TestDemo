import React from 'react';
import { render } from '@testing-library/react';
import HobbiesDropdown from './HobbiesDropdown';

describe('HobbiesDropdown', () => {
    it('Renders HobbiesDropdown without crashing', () => {
        const { container } = render(<HobbiesDropdown />);
        expect(container).toBeTruthy()
    });

    it('Sets default values correctly in HobbiesDropdown', () => {
        const defaultValue = ['Reading'];
        const { getByLabelText } = render(<HobbiesDropdown defaultValue={defaultValue} />);

        const selectedChips = getByLabelText('Hobbies').querySelectorAll('.MuiChip-label');
        expect(selectedChips).toHaveLength(defaultValue.length);
        selectedChips.forEach((chip, index) => {
            expect(chip.textContent).toBe(defaultValue[index]);
        });
    });

})

