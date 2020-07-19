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
      return <td className="td" key={'possbileVal' + i}><SudokuPossbileValue value={possibleValue} index={i} handlePossbileValueChange={this.props.handlePossbileValueChange}></SudokuPossbileValue></td>
    })
    return <div >
      <p>Possbile Cell Values</p>
      <table className="table">
        <tbody>
          <tr >
            {possibleValues}
          </tr>
        </tbody>
      </table>
    </div>;
  }



}

export default SudokuOptions;
