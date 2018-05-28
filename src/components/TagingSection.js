import React, { Component } from 'react'
import BoundingBox from './BoundingBox'
import Image from 'react-graceful-image'

export default class componentName extends Component {
  constructor(){
    super();
    this.handleKey = this.handleKey.bind(this);
    this.handleBoxResizeChange = this.handleBoxResizeChange.bind(this);
    this.handleBoxPositionChange = this.handleBoxPositionChange.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.state = {
      boundingBox : { 
        width: 200,
        height: 200,
        x: 0,
        y: 0,
        maxWidth : 400,
        maxHeight : 400,
        minHeight : 50,
        minWidth : 50
      },
      image: {
        src : '../room.jpg',
        offsetX:0,
        offsetY:0
      }
    }
  }

  handleKey(e) {
    //e.preventDefault();

     console.log(e.code);
  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleKey);
    var temp=document.getElementsByClassName("imageHolder")[0].getBoundingClientRect();
    this.setState({
      image : {
        offsetX : temp.x,
        offsetY : temp.y
      }
    });
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  onMouseOver(e){
    // this.setState({
    //   boundingBox:{
    //     x:e.pageX,
    //     y:e.pageY
    //   }
    // })
    // console.log("X "+this.state.boundingBox.x + " Y "+this.state.boundingBox.y);
  }
  handleBoxPositionChange(coordinateX,coordinateY){
    this.setState({
      boundingBox : {
        x : coordinateX,
        y : coordinateY,
        width: this.state.boundingBox.width,
        height: this.state.boundingBox.height,
        maxWidth : this.state.boundingBox.maxWidth,
        maxHeight : this.state.boundingBox.maxHeight,
        minHeight : this.state.boundingBox.minHeight,
        minWidth : this.state.boundingBox.minWidth
      }
    });
  }
  handleBoxResizeChange(w,h,position){
    this.setState({
      boundingBox : {
        width : w,
        height : h,
        x : position.x,
        y : position.y,
        maxWidth : this.state.boundingBox.maxWidth,
        maxHeight : this.state.boundingBox.maxHeight,
        minHeight : this.state.boundingBox.minHeight,
        minWidth : this.state.boundingBox.minWidth
      }
    });

  }
  render() {
    return (
      <div className="TaggingSection" onMouseMove= {this.onMouseOver}>
         <BoundingBox 
         data={this.state.boundingBox} 
         onBoxPositionChange={this.handleBoxPositionChange} 
         onBoxResize={this.handleBoxResizeChange}/>
         <Image src ={require('../room.jpg')} alt="" className="imageHolder" />
      </div>
    )
  }
}
