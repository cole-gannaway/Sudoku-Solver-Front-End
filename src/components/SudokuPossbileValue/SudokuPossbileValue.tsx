import React, { Component } from 'react';

type SudokuPossbileValueProps = {
  //
  value: string,
  index: number
  handlePossbileValueChange(i: number, value: string): void
};

class SudokuPossbileValue extends Component<SudokuPossbileValueProps, any> {
  constructor(props: SudokuPossbileValueProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  public render() {

    return <div>
      <input type="text" value={this.props.value} onChange={this.handleChange} ></input>
    </div>;
  }
  public handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVal = event.target.value;
    this.props.handlePossbileValueChange(this.props.index, newVal);
  }
}

export default SudokuPossbileValue;
