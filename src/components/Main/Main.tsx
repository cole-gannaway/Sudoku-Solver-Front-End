import React, { Component, ChangeEvent } from 'react';
import SudokuBoard from '../SudokuBoard/SudokuBoard';
import SudokuOptions from '../SudokuOptions/SudokuOptions';
import { ISudokuSolveRequest } from '../../interfaces/ISudokuSolveRequest';
import { ISudokuSolveResponse } from '../../interfaces/ISudokuSolveResponse';

import ExampleJson from '../test/9by9.json'


type MainProps = {
  //
};

class Main extends Component<MainProps, { rows: Array<Array<string>>, boardWidth: number, possibleValues: Array<string>, numberOfThreads: number, timeOut: number, status: string }> {

  constructor(props: MainProps) {
    super(props);
    const defaultWidth = 3;
    const emptyBoard = ExampleJson.rows;
    const defaultPossibleValues = this.createPossibleValues(defaultWidth * defaultWidth)
    this.state = {
      rows: emptyBoard,
      boardWidth: defaultWidth,
      possibleValues: defaultPossibleValues,
      numberOfThreads: 1,
      timeOut: 10,
      status: ''
    }
    // setters
    this.setBoard = this.setBoard.bind(this);
    this.setBoardWidth = this.setBoardWidth.bind(this);
    this.setPossibleValues = this.setPossibleValues.bind(this);

    // generators
    this.createEmptyBoard = this.createEmptyBoard.bind(this);
    this.createPossibleValues = this.createPossibleValues.bind(this);

    // clone
    this.cloneRows = this.cloneRows.bind(this);
    this.clonePossibleValues = this.clonePossibleValues.bind(this);

    // handlers
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handlePossibleValueChange = this.handlePossibleValueChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleTimeoutChange = this.handleTimeoutChange.bind(this);
    this.handleNumberOfThreadsChange = this.handleNumberOfThreadsChange.bind(this);
    this.handleSolve = this.handleSolve.bind(this);

    // utils
    this.sendSolveBoard = this.sendSolveBoard.bind(this);

    // debug
    this.debug = this.debug.bind(this);


  }
  public render() {

    return <div className="center">
      <div >
        <h2>Board Information</h2>
        <div>
          Board Width <input type="number" pattern="[0-9]*" value={this.state.boardWidth} onChange={this.handleWidthChange}></input>
        </div>
      </div>

      <div>
        <SudokuBoard rows={this.state.rows} boardWidth={this.state.boardWidth} handleChange={this.handleDataChange}></SudokuBoard>
      </div>
      <div>
        <h2>Solver Configuration</h2>
        <div>Number of Threads <input type="number" pattern="[0-9]*" value={this.state.numberOfThreads} onChange={this.handleNumberOfThreadsChange}></input></div>
        <div>Timeout Seconds <input type="number" pattern="[0-9]*" value={this.state.timeOut} onChange={this.handleTimeoutChange}></input></div>
        <SudokuOptions possbileValues={this.state.possibleValues} handlePossbileValueChange={this.handlePossibleValueChange}></SudokuOptions>
      </div>
      <div>
        <button onClick={this.handleClear}>Clear</button>
        <button onClick={this.handleSolve}>Solve</button>
        <div>Status: {this.state.status}</div>
      </div>
      {/* <button onClick={this.debug}>Debug</button> */}
    </div>;
  }
  public handleWidthChange(event: ChangeEvent<HTMLInputElement>) {
    const newWidth = parseInt(event.target.value)
    this.setBoardWidth(newWidth);
    const emptyBoard = this.createEmptyBoard(newWidth * newWidth);
    this.setBoard(emptyBoard);
    const defaultPossibleValues = this.createPossibleValues(newWidth * newWidth);
    this.setPossibleValues(defaultPossibleValues);
  }



  public handleClear() {
    const emptyBoard = this.createEmptyBoard(this.state.boardWidth * this.state.boardWidth);
    this.setBoard(emptyBoard);
  }

  public setBoard(newRows: Array<Array<string>>) {
    this.setState({ rows: newRows });
  }

  public setBoardWidth(newWidth: number) {
    this.setState({ boardWidth: newWidth });
  }

  public setPossibleValues(newPossibleValues: Array<string>) {
    this.setState({ possibleValues: newPossibleValues });
  }

  public setStatus(newStatus: string) {
    this.setState({ status: newStatus })
  }

  public createEmptyBoard(n: number) {
    const rows = [];
    for (var i = 0; i < n; i++) {
      const row = [];
      for (var j = 0; j < n; j++) {
        row.push('');
      }
      rows.push(row);
    }
    return rows;
  }

  public createPossibleValues(n: number) {
    const possibleValues = [];
    for (var i = 1; i <= n; i++) {
      possibleValues.push(i.toString());
    }
    return possibleValues;
  }
  public handleDataChange(i: number, j: number, val: string) {
    const cloned = this.cloneRows();
    cloned[i][j] = val.repeat(1);
    console.log('changed <' + i + ',' + j + '> to ' + val);
    this.setBoard(cloned);
  }

  public handlePossibleValueChange(i: number, val: string) {
    const cloned = this.clonePossibleValues();
    cloned[i] = val.repeat(1);
    console.log('changed ' + i + ' to ' + val);
    this.setPossibleValues(cloned);
  }
  public handleTimeoutChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVal = parseInt(event.target.value);
    this.setState({
      timeOut: newVal
    })
  }
  public handleNumberOfThreadsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVal = parseInt(event.target.value);
    this.setState({
      numberOfThreads: newVal
    })
  }

  public handleSolve() {
    const requestObj: ISudokuSolveRequest = {
      board: {
        rows: this.state.rows,
        possibleValues: this.state.possibleValues
      },
      config: {
        numberOfThreads: this.state.numberOfThreads,
        timeoutSeconds: this.state.timeOut
      }
    };
    this.sendSolveBoard(requestObj);
  }

  public clonePossibleValues() {
    const origPossibleValues = this.state.possibleValues;
    const clonedPossibleValues = [];
    for (var i = 0; i < origPossibleValues.length; i++) {
      clonedPossibleValues.push(origPossibleValues[i].repeat(1));
    }
    return clonedPossibleValues;
  }
  public cloneRows() {
    const origRows = this.state.rows;
    const rows = [];
    for (var i = 0; i < origRows.length; i++) {
      const row = [];
      for (var j = 0; j < origRows.length; j++) {
        row.push(origRows[i][j].repeat(1));
      }
      rows.push(row);
    }
    return rows;
  }
  public debug() {
    console.log('debugging');

    console.log(this.state);
  }

  async sendSolveBoard(requestObj: ISudokuSolveRequest) {
    console.log('sending solve request with the following data');
    console.log(requestObj);

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://ohq0hxesze.execute-api.us-east-2.amazonaws.com/default/Sudoku-Solver"; // site that doesn’t send Access-Control-*

    const response = await fetch(proxyurl + url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestObj),
    }).then(response => response.json())
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    if (response.errorMessage) {
      this.setStatus(response.errorMessage);
      console.log(response.errorMessage);
    } else {
      const solution: ISudokuSolveResponse = JSON.parse(response);
      this.setBoard(solution.rows);
      this.setStatus('Succesfully Solved!');
    }
  }
}

export default Main;
