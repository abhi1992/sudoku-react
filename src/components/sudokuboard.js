import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import c from '../constants';

export const styles = () => ({
  button: {
    color: 'primary',
  },
});

/**
 * SudokuBoard
 * @param {Object} props React props
 * @returns {ReactComponent} menu button component
 */
export class SudokuBoard extends React.Component {
  /**
   * Constructor
   * @param {Object} props props
   */
  constructor(props) {
    super(props);
    this.state = {
      x: 0, y: 0, offX: 0, offY: 0, data: {},
    };
  }

  /**
   * ComponentDidMount
   * @returns {void} null
   */
  componentDidMount() {
    const { data } = this.props;
    this.setState({
      data,
    });
    this.drawBoard();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * onMouseMove
   * @param {Event} e event
   * @returns {void} null
   */
  onMouseMove(e) {
    this.setState({ offX: e.nativeEvent.offsetX, offY: e.nativeEvent.offsetY });
    // this.drawPointerOnMove();
  }

  handleKeyDown = (event) => {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case c.ONE:
        this.fillValue(1);
        break;
      case c.TWO:
        this.fillValue(2);
        break;
      case c.THREE:
        this.fillValue(3);
        break;
      case c.FOUR:
        this.fillValue(4);
        break;
      case c.FIVE:
        this.fillValue(5);
        break;
      case c.SIX:
        this.fillValue(6);
        break;
      case c.SEVEN:
        this.fillValue(7);
        break;
      case c.EIGHT:
        this.fillValue(8);
        break;
      case c.NINE:
        this.fillValue(9);
        break;
      case c.ZERO:
        this.eraseValue();
        break;
      default:
        break;
    }
  };

  eraseValue = () => {
    this.fillValue(0, false);
  }

  fillValue = (value, filled = true) => {
    const { data, x, y } = this.state;
    const idx = this.convertXYtoIndex(x, y);
    if (idx > -1 && idx < 81 && !data[idx].fixed) {
      data[idx].value = value;
      data[idx].filled = filled;
      this.drawBoard(this.state.offX, this.state.offY);
    }
  }

  convertXYtoIndex = (x, y) => y * 9 + x;

  onSvgClick = (e) => {
    this.setSelectedSquare(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    // this.setSelectedSquare(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    // console.log('aa - ', e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    this.drawBoard(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }

  setSelectedSquare = (x1, y1) => {
    const { x, y } = this.getCubeIdForLocation(x1, y1);
    this.setState({
      x,
      y,
      offX: x1,
      offY: y1,
    });
  }

  clearBoard = () => {
    d3.select('svg')
      .selectAll('*')
      .remove();
  }

  drawPointerOnMove = () => {
    const { x, y } = this.state;
    this.drawBoard(x, y);
  }

  drawLine = (x1, y1, x2, y2, strokeWidth = 1) => {
    d3.select('svg')
      .append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .style('stroke', 'rgb(0,0,0)')
      .style('stroke-width', strokeWidth);
  }

  inBounds = (x, y) => {
    if (x > 540 || x < 0 || y > 540 || y < 0) {
      return false;
    }
    return true;
  }

  selectCubeById = (x, y, color = 'rgb(0,0,0,0.1)') => {
    this.drawRect(x * 60, y * 60, 60, 60, color);
  }

  drawRect = (x, y, width, height, color = 'rgb(0,0,0,0.5)') => {
    if (x > -1 && x < 600 && y > -1 && y < 600) {
      d3.select('svg')
        .append('rect')
        .attr('x', x)
        .attr('y', y)
        .style('stroke', color)
        .style('fill', color)
        .attr('width', width)
        .attr('height', height);
    }
  }

  getCubeIdForLocation = (x, y) => {
    const x1 = x / 60;
    const y1 = y / 60;
    return {
      x: Math.floor(x1),
      y: Math.floor(y1),
    };
  }

  getCoordinatesFromIndex = (idx) => {
    const padding = 20;
    const x = Math.floor(idx % 9);
    const y = Math.floor(idx / 9);
    // console.log(x, y);
    return {
      x,
      y,
      padding,
    };
  }

  insertSudokuNumbers = () => {
    const { data } = this.props;
    data.forEach((elem) => {
      const coord = this.getCoordinatesFromIndex(elem.index);
      if (elem.fixed) {
        // Do Something
        this.selectCubeById(coord.x, coord.y, 'rgb(100,100,100, 0.1)');
      }
      if (elem.filled || elem.fixed) {
        // Do Something
        this.drawText(coord.x * 60 + coord.padding, coord.y * 60 + 2 * coord.padding, elem.value);
      }
    });
  }

  drawText = (x, y, text, fontSize = '32px', fill = 'rgb(0, 0, 0)') => {
    d3.select('svg')
      .append('text')
      .text(text)
      .attr('x', x)
      .attr('y', y)
      .attr('font-size', fontSize)
      .attr('fill', fill);
  }

  drawBoard = (x, y) => {
    this.clearBoard();
    const padding = 0;
    this.drawRect(0, 0, 540, 540, 'rgb(255, 255, 255)');
    for (let i = 0; i < 5; i += 1) {
      this.drawLine(padding + i * 180, padding, padding + i * 180, 540 + padding, 3);
      this.drawLine(padding, padding + i * 180, 540 + padding, padding + i * 180, 3);
    }

    for (let i = 0; i < 8; i += 1) {
      this.drawLine(padding + (i + 1) * 60, padding, padding + (i + 1) * 60, 540 + padding, 1);
      this.drawLine(padding, padding + (i + 1) * 60, 540 + padding, padding + (i + 1) * 60, 1);
    }

    if (this.inBounds(x, y)) {
      const coord = this.getCubeIdForLocation(this.state.offX, this.state.offY);
      this.selectCubeById(coord.x, coord.y, 'rgb(100,100,255, 0.3)');
    }
    const coord = this.getCubeIdForLocation(x, y);
    this.drawSelectedSquare(coord.x, coord.y);
    this.insertSudokuNumbers();
    this.validateSudoku();
  }

  validateSudoku = () => {
    const { data } = this.state;
    if (data.length > 1) {
      this.validateBoxes(data);
      this.validateRows(data);
      this.validateColumns(data);
    }
  }

  validateBoxes = (data) => {
    for (let i = 1; i < 10; i += 1) {
      this.validateBox(this.mapBox(i), data);
    }
  }

  validateRows = (data) => {
    if (data) {
      for (let i = 0; i < 9; i += 1) {
        const invalid = this.countInRow(i, data);
        // console.log('i - ', invalid);
        if (invalid && invalid.length > 0) {
          invalid.forEach((num) => {
            this.showErrorInRowCell(i, num, data);
          });
        }
      }
    }
  }

  validateColumns = (data) => {
    if (data) {
      for (let i = 0; i < 9; i += 1) {
        const invalid = this.countInColumn(i, data);
        // console.log('i - ', invalid);
        if (invalid && invalid.length > 0) {
          invalid.forEach((num) => {
            this.showErrorInColumnCell(i, num, data);
          });
        }
      }
    }
  }

  countInColumn = (colStart, data) => {
    const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const invalidArr = [];
    for (let i = 0; i < 9; i += 1) {
      const idx = (i) * 9 + colStart;
      // console.log('zz - ', idx, data[idx].value);
      const num = data[idx].value;
      arr[num] += 1;
    }
    arr.forEach((e, idx) => {
      if (e > 1 && idx > 0) {
        // console.log('idx - ', idx);
        invalidArr.push(idx);
      }
    });
    return invalidArr;
  }

  countInRow = (rowStart, data) => {
    const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const invalidArr = [];
    for (let i = 0; i < 9; i += 1) {
      const idx = (rowStart) * 9 + i;
      // console.log('zz - ', idx, data[idx].value);
      const num = data[idx].value;
      arr[num] += 1;
    }
    arr.forEach((e, idx) => {
      if (e > 1 && idx > 0) {
        // console.log('idx - ', idx);
        invalidArr.push(idx);
      }
    });
    return invalidArr;
  }

  showErrorInColumnCell = (colStart, num, data) => {
    for (let i = 0; i < 9; i += 1) {
      const idx = (i) * 9 + colStart;
      // console.log('zz - ', idx);
      if (data[idx].value === num && data[idx].filled) {
        const coord = this.getCoordinatesFromIndex(idx);
        this.selectCubeById(coord.x, coord.y, 'rgb(200,0,0, 0.3)');
      }
    }
  }

  showErrorInRowCell = (rowStart, num, data) => {
    for (let i = 0; i < 9; i += 1) {
      const idx = (rowStart) * 9 + i;
      // console.log('zz - ', idx);
      if (data[idx].value === num && data[idx].filled) {
        const coord = this.getCoordinatesFromIndex(idx);
        this.selectCubeById(coord.x, coord.y, 'rgb(200,0,0, 0.3)');
      }
    }
  }

  validateBox = (mat, data) => {
    for (let i = 1; i < 10; i += 1) {
      if (this.countInBox(mat.row, mat.col, data, i) > 1) {
        this.showErrorInBoxCell(i, mat.row, mat.col, data);
      }
    }
  }

  showErrorInBoxCell = (num, rowStart, colStart, data) => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const idx = (rowStart + i) * 9 + colStart + j;
        if (data[idx].value === num && data[idx].filled) {
          const coord = this.getCoordinatesFromIndex(idx);
          this.selectCubeById(coord.x, coord.y, 'rgb(200,0,0, 0.3)');
        }
      }
    }
  }

  mapBox = (num) => {
    switch (num) {
      case 1:
        return {
          row: 0,
          col: 0,
        };
      case 2:
        return {
          row: 0,
          col: 3,
        };
      case 3:
        return {
          row: 0,
          col: 6,
        };
      case 4:
        return {
          row: 3,
          col: 0,
        };
      case 5:
        return {
          row: 3,
          col: 3,
        };
      case 6:
        return {
          row: 3,
          col: 6,
        };
      case 7:
        return {
          row: 6,
          col: 0,
        };
      case 8:
        return {
          row: 6,
          col: 3,
        };
      case 9:
        return {
          row: 6,
          col: 6,
        };
      default:
        break;
    }
    return {};
  }

  countInBox = (rowStart, colStart, data, num) => {
    let count = 0;
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        // console.log((rowStart + i) * 9 + colStart + j);
        if (data[(rowStart + i) * 9 + colStart + j].value === num) {
          count += 1;
        }
      }
    }
    return count;
  }

  /**
   * drawSelectedSquare
   * @param {*} x x
   * @param {*} y y
   * @returns {void} null
   */
  drawSelectedSquare = (x, y) => {
    this.selectCubeById(x, y, 'rgb(0, 0, 255, 0.3)');
  }

  /**
   * render
   * @returns {ReactComponent} comp
   */
  render() {
    const { x, y } = this.state;
    return (
      <div className="svg-container">
        <svg
          width="600"
          height="600"
          onMouseMove={this.onMouseMove.bind(this)}
          onClick={this.onSvgClick.bind(this)}
          focusable="true"
        />
        <h1>
          { x }
          { y }
        </h1>
        <br />
      </div>
    );
  }
}

SudokuBoard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
