import * as React from 'react';
import { shallow } from 'enzyme';
import SudokuPossbileValue from './SudokuPossbileValue';

describe('SudokuPossbileValue', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<SudokuPossbileValue />);
    expect(wrapper).toMatchSnapshot();
  });
});
