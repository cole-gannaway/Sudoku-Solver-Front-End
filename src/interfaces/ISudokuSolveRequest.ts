export interface ISudokuSolveRequest {
  board: {
    rows: Array<Array<string>>;
    possibleValues: Array<string>;
  };
  config: {
    numberOfThreads: number;
    timeoutSeconds: number;
  };
}
