import React, { Component } from 'react';

type SudokuCellProps = {
  value: string,
  x: number,
  y: number,
  handleChange: (i: number, j: number, val: string) => void
};

class SudokuCell extends Component<SudokuCellProps, any> {
  constructor(props: SudokuCellProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    return <div><input type="text" pattern="[0-9]*" value={this.props.value} onChange={this.handleChange}></input></div>;
  }
  public handleChange(event: any) {
    this.props.handleChange(this.props.x, this.props.y, event.target.value);
  }
}

export default SudokuCell;
