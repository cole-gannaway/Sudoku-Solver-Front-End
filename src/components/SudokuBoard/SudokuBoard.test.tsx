import * as React from 'react';
import { shallow } from 'enzyme';
import SudokuBoard from './SudokuBoard';

describe('SudokuBoard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<SudokuBoard />);
    expect(wrapper).toMatchSnapshot();
  });
});
