import React, { Component } from 'react'
import Rnd from 'react-rnd';

export default class BoundingBox extends Component {
    onDragStopChange(e,d){
      this.props.onBoxPositionChange(d.x,d.y);
    }
    onResizeChange(e,direction,ref,delta,position){
      this.props.onBoxResize(ref.offsetWidth,ref.offsetHeight,position);
    }
  
  render() {
    var style = {
        left: this.props.left,
      };
      var data=this.props.data;

    return (
        <Rnd className="BoundingBox"
        style={style}
        size={{ width: data.width, height: data.height }}
        maxHeight ={data.maxHeight}
        maxWidth = {data.maxWidth}
        minHeight ={data.minHeight}
        minWidth = {data.minWidth}
        bounds ='parent'
        position={{ x: data.x, y: data.y }}
        onDragStop={(e, d) => { this.onDragStopChange(e,d) }}
        onResize={(e, direction, ref, delta, position) => {this.onResizeChange(e, direction, ref,delta,position)}}>
      </Rnd>
    )
  }
}
