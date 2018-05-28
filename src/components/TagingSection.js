import React, { Component } from 'react'
import BoundingBox from './BoundingBox'
import Image from 'react-graceful-image'

export default class componentName extends Component {
  constructor(){
    super();
    this.handleKey = this.handleKey.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.state = {
      boundingBox : { 
        topLeftX:20,
        topLeyY:200,
        bottomRightX:0,
        bottomRightY:0
      },
      image: {
        offsetX:0,
        offsetY:0
      }
    }
  }
  handleKey(e) {
    e.preventDefault();
    console.log(e.code);
  }

  componentDidMount(){
    console.log("Mount");
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
    //  console.log("X "+e.pageX + " Y "+e.pageY);
  }
  render() {
    return (
      <div className="TaggingSection" onMouseMove= {this.onMouseOver}>
         <BoundingBox/>
         <Image src ={require('../room.jpg')} alt="" className="imageHolder" />
      </div>
    )
  }
}
