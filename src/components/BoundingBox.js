import React, { Component } from 'react'
import Rnd from 'react-rnd';
import DeleteBoxButton from './DeleteBoxButton'

export default class BoundingBox extends Component {
  constructor() {
    super();
    this.state = {
      mouseOver: false
    }
  }
  onDragStopChange(e, d) {
    this.props.onBoxPositionChange(d.x, d.y);
  }
  onResizeChange(e, direction, ref, delta, position) {
    this.props.onBoxResize(ref.offsetWidth, ref.offsetHeight, position);
  }
  mouseOverHandler = () => {
    this.setState({
      mouseOver: true
    }
    )
  }
  onClickhandler = () => {
    this.props.labelClick();
  }
  mouseLeaveHandler = () => {
    this.setState({
      mouseOver: false
    }
    )
  }

  render() {
    var style = {
      left: this.props.left,
    };
    var data = this.props.data;

    return (
      <div
        onMouseOver={this.mouseOverHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        <div onClick={this.onClickhandler}>
          <Rnd className="Label"
            position={{ x: data.x, y: data.y }}
            enableResizing={false}
            disableDragging={true}
          >
            {data.label}
          </Rnd>
        </div>
        <Rnd className="BoundingBox"
          // style={style}
          size={{ width: data.width, height: data.height }}
          maxHeight={data.maxHeight}
          maxWidth={data.maxWidth}
          minHeight={data.minHeight}
          minWidth={data.minWidth}
          bounds='.imageHolder'
          position={{ x: data.x, y: data.y }}
          onDrag={(e, d) => { this.onDragStopChange(e, d) }}
          onResize={(e, direction, ref, delta, position) => { this.onResizeChange(e, direction, ref, delta, position) }}>
          {this.state.mouseOver && this.props.showDeleteBox && (<DeleteBoxButton deleteBox={() => this.props.deleteBox()} />)}
        </Rnd>

      </div>
    )
  }
}
