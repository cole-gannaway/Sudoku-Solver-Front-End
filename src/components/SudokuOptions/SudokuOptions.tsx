import React, { Component } from 'react';
import SudokuPossbileValue from '../SudokuPossbileValue/SudokuPossbileValue';

type SudokuOptionsProps = {
  //
  possbileValues: Array<string>,
  handlePossbileValueChange(i: number, value: string): void
};

class SudokuOptions extends Component<SudokuOptionsProps, any> {
  public render() {
    const possibleValues = this.props.possbileValues.map((possibleValue, i) => {
      return <SudokuPossbileValue key={'possbileVal' + i} value={possibleValue} index={i} handlePossbileValueChange={this.props.handlePossbileValueChange}></SudokuPossbileValue>
    })
    return <div>
      <p>Possbile Cell Values</p>
      {possibleValues}
    </div>;
  }



}

export default SudokuOptions;
