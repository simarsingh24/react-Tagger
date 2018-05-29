import React, { Component } from 'react'
import BoundingBox from './BoundingBox'
import Image from 'react-graceful-image'
import { connect } from 'react-redux'
import { moveBox, resizeBox, createBox , deleteBox } from '../actions/actions'

class TaggingSection extends Component {
  constructor(){
    super();
    this.handleKey = this.handleKey.bind(this);
  }
  handleKey(e) {
    e.preventDefault();
    switch(e.code){
      case 'KeyY' : 
         console.log("Pressed Y, creating box ");
        this.props.createBox('2',0,0,100,100,50,50,500,500); break;
      case 'KeyN':
        this.props.deleteBox('1');break;
      default : console.log('KeyEvent '+e.code);
    }
  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }
  render() {
    var currId = this.props.boundingBox.currId;
    return (
      <div className="TaggingSection" onMouseMove= {this.onMouseOver}>
         <BoundingBox 
           data={this.props.boundingBox.byHash[currId]} 
           onBoxPositionChange={(x,y)=>this.props.changePostion(currId,x,y)} 
           onBoxResize={(w,h,position)=>this.props.resizeBox(currId,w,h,position.x,position.y)}/>
         <Image src ={require('../room.jpg')} alt="" className="imageHolder" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    boundingBox: state.boxReducer
  };
}
function mapDispatchToProps(dispatch) {
  return({
      changePostion: (currId,x,y) => {dispatch(moveBox(currId,x,y))},
      resizeBox : (currId,w,h,x,y)=>{dispatch(resizeBox(currId,w,h,x,y))},
      createBox : (currId,x,y,w,h,minW,minH,maxW,maxH)=>{dispatch(createBox(currId,x,y,w,h,minW,minH,maxW,maxH))},
      deleteBox : (id)=>{dispatch(deleteBox(id))}
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaggingSection);
