import * as React from 'react';
import { shallow } from 'enzyme';
import SudokuOptions from './SudokuOptions';

describe('SudokuOptions', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<SudokuOptions />);
    expect(wrapper).toMatchSnapshot();
  });
});
