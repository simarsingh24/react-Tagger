import React, { Component } from 'react'
import BoundingBox from './BoundingBox'
import Image from 'react-graceful-image'
import { connect } from 'react-redux'
import { moveBox, resizeBox, createBox, deleteBox, changeImage, toggleShowAll, selectCurrBox, changeLabel } from '../actions/actions'
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

class TaggingSection extends Component {
  constructor() {
    super();
    this.handleKey = this.handleKey.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
    this.stateLabelChange = this.stateLabelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      modalIsOpen: false,
      label: "",

    }
  }
  handleKey(e) {
    e.preventDefault();
    var bbox = this.props.boundingBox;
    switch (e.code) {
      case 'KeyY':
        var id = bbox.byId.length + 1;
        console.log("Pressed Y, creating box " + id);
        this.props.createBox(id.toString(), 0, 0, 100, 100, 50, 50, 500, 500, "NewLabel");
        break;
      case 'KeyS':
        this.props.toggleShowAll();
        break;
      case 'KeyD':
        this.props.changeImage(require('../room.jpg'));
        break;
      case 'KeyN':
        this.props.deleteBox('1'); break;
      default:
        console.log('KeyEvent ' + e.code);
    }
  }
  handelLabelClick(id) {
    this.setState({
      modalIsOpen: true
    })
    console.log("modal state " + this.state.modalIsOpen)
  }
  afterOpenModal() {
    document.removeEventListener('keydown', this.handleKey);
  }
  closeModal() {
    this.setState({
      modalIsOpen: false
    })
    document.addEventListener('keydown', this.handleKey);
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
  onLabelChange(value) {
    // this.props.changeLabel(currId, value)
    this.setState({
      label: value
    })
  }
  handleSubmit(event,id) {
    event.preventDefault();
    this.props.changeLabel(id, this.state.label)
    this.closeModal()
  }
  stateLabelChange(value) {
    this.setState({
      label: value
    })
  }

  render() {
    var bbox = this.props.boundingBox;
    var currId = bbox.currId;
    return (
      <div className="TaggingSection" onMouseMove={this.onMouseOver}>
        {(!bbox.showAllBbox) && (bbox.byId.length > 0) && (this.state.modalIsOpen == false) &&
          <BoundingBox
            data={bbox.byHash[currId]}
            labelClick={() => this.handelLabelClick(currId)}
            showDeleteBox={!bbox.showAll}
            onBoxPositionChange={(x, y) => this.props.changePostion(currId, x, y)}
            onBoxResize={(w, h, position) => this.props.resizeBox(currId, w, h, position.x, position.y)}
            deleteBox={() => this.props.deleteBoundingBox(currId)}
          />
        }
        {(bbox.byId.length > 0) &&
          <Modal
            isOpen={this.state.modalIsOpen}
            shouldCloseOnEsc={true}
            onAfterOpen={this.afterOpenModal}
            ariaHideApp={false}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Change Label"
          >
            <div>Please provide appropriate label</div>
            <form onSubmit={(e)=>this.handleSubmit(e,currId)}>
              <input type="text" value={this.state.label} onChange={(e)=>this.stateLabelChange(e.target.value)} />
              <input type="submit" value="Okay" />
            </form>
          </Modal>
        }


        {bbox.showAll &&
          bbox.byId.map(id => {
            if (id !== currId)
              return (
                <BoundingBox key={id}
                  showDeleteBox={!bbox.showAll}
                  data={bbox.byHash[id]}
                  labelClick={() => this.handelLabelClick(id)}
                  onBoxPositionChange={(x, y) => this.props.changePostion(id, x, y)}
                  onBoxResize={(w, h, position) => this.props.resizeBox(id, w, h, position.x, position.y)}
                  deleteBox={() => this.props.deleteBox(id)}
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
    createBox: (currId, x, y, w, h, minW, minH, maxW, maxH, label) => { dispatch(createBox(currId, x, y, w, h, minW, minH, maxW, maxH, label)) },
    deleteBox: (id) => { dispatch(deleteBox(id)) },
    changeImage: (url) => { dispatch(changeImage(url)) },
    toggleShowAll: () => { dispatch(toggleShowAll()) },
    selectCurrBox: (id) => { dispatch(selectCurrBox(id)) },
    deleteBoundingBox: (id) => { dispatch(deleteBox(id)) },
    changeLabel: (id, label) => { dispatch(changeLabel(id, label)) }
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaggingSection);
