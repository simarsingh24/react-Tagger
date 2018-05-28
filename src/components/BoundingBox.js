import React, { Component } from 'react'
import Rnd from 'react-rnd';

export default class BoundingBox extends Component {
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            width: 200,
            height: 200,
            x: 0,
            y: 0,
            maxWidth : 400,
            maxHeight : 400,
            minHeight : 100,
            minWidth : 100
          }
    }
  render() {
    var style = {
        left: this.props.left,
      };

    return (
        <Rnd className="BoundingBox"
        style={style}
        size={{ width: this.state.width, height: this.state.height }}
        maxHeight ={this.state.maxHeight}
        maxWidth = {this.state.maxWidth}
        minHeight ={this.state.minHeight}
        minWidth = {this.state.minWidth}
        bounds ='parent'
        position={{ x: this.state.x, y: this.state.y }}
        onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...position,
          });
        }}>
      </Rnd>
    )
  }
}
