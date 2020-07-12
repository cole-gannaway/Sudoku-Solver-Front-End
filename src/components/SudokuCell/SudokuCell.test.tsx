import * as React from 'react';
import { shallow } from 'enzyme';
import SudokuCell from './SudokuCell';

describe('SudokuCell', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<SudokuCell />);
    expect(wrapper).toMatchSnapshot();
  });
});
