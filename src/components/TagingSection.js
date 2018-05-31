import React, { Component } from 'react'
import BoundingBox from './BoundingBox'
import Image from 'react-graceful-image'
import { connect } from 'react-redux'
import { moveBox, resizeBox, createBox, deleteBox, changeImage, toggleShowAll, selectCurrBox } from '../actions/actions'

class TaggingSection extends Component {
  constructor() {
    super();
    this.handleKey = this.handleKey.bind(this);
  }
  handleKey(e) {
    e.preventDefault();
    var bbox = this.props.boundingBox;
    switch (e.code) {
      case 'KeyY':
        var id = bbox.byId.length +1;
        console.log("Pressed Y, creating box "+id);
         this.props.createBox(id.toString(), 0, 0, 100, 100, 50, 50, 500, 500,"NewLabel");
        break;
      case 'KeyS':
        this.props.toggleShowAll();
        break;
      case 'KeyD':
        this.props.changeImage(require('../room.jpg'));
        break;
      case 'KeyN':
        this.props.deleteBox('1'); break;
      default: console.log('KeyEvent ' + e.code);
    }
  }
  handelLabelClick(id){
    console.log("clicked "+id);

  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }
  onDragStart = (x, y, id) => {
    if (this.props.boundingBox.showAll) {
      this.props.selectCurrBox(id);
    }
    this.props.changePostion(id, x, y);
  }

  render() {
    var bbox = this.props.boundingBox;
    var currId = bbox.currId;
    return (
      <div className="TaggingSection" onMouseMove={this.onMouseOver}>
        {(!bbox.showAllBbox) && (bbox.byId.length > 0) &&
          <BoundingBox
            data={bbox.byHash[currId]}
            labelClick = {()=>this.handelLabelClick(currId)}
            showDeleteBox={!bbox.showAll}
            onBoxPositionChange={(x, y) => this.props.changePostion(currId, x, y)}
            onBoxResize={(w, h, position) => this.props.resizeBox(currId, w, h, position.x, position.y)}
            deleteBox ={()=>this.props.deleteBoundingBox(currId)}
            />
        }
        {bbox.showAll &&
          bbox.byId.map(id => {
            if (id !== currId)
              return (
                <BoundingBox key={id}
                  showDeleteBox={!bbox.showAll}
                  data={bbox.byHash[id]}
                  labelClick = {()=>this.handelLabelClick(id)}
                  onBoxPositionChange={(x, y) => this.props.changePostion(id, x, y)}
                  onBoxResize={(w, h, position) => this.props.resizeBox(id, w, h, position.x, position.y)} 
                  deleteBox ={()=>this.props.deleteBox(id)}
                  />
              )
            else return null;
          }
          )
        }
        <Image src={this.props.imageData.src} alt="" className="imageHolder" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    boundingBox: state.boxReducer,
    imageData: state.imageReducer
  };
}
function mapDispatchToProps(dispatch) {
  return ({
    changePostion: (currId, x, y) => { dispatch(moveBox(currId, x, y)) },
    resizeBox: (currId, w, h, x, y) => { dispatch(resizeBox(currId, w, h, x, y)) },
    createBox: (currId, x, y, w, h, minW, minH, maxW, maxH ,label) => 
    { dispatch(createBox(currId, x, y, w, h, minW, minH, maxW, maxH,label)) },
    deleteBox: (id) => { dispatch(deleteBox(id)) },
    changeImage: (url) => { dispatch(changeImage(url)) },
    toggleShowAll: () => { dispatch(toggleShowAll()) },
    selectCurrBox: (id) => { dispatch(selectCurrBox(id)) },
    deleteBoundingBox : (id)=>{dispatch(deleteBox(id))}
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaggingSection);
