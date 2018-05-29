import React, { Component } from 'react'
import { connect } from 'react-redux'
import RowBoxDetails from './RowBoxDetails'
import { selectCurrBox } from '../actions/actions'


class ListBoxDetails extends Component {
    constructor(){
        super();
        this.handleBoxSelect = this.boxSelected.bind(this);
    }
    componentDidMount(){
        // console.log(this.props.boundingBox.byHash['1'])
        this.props.boundingBox.byId.map(id=>{
            console.log(this.props.boundingBox.byHash[id]);
        })
    }
    
    boxSelected=(id)=>{
        this.props.selectBox(id);
    }

  render() {
      var bbox= this.props.boundingBox;
    return (
      <ul>
          {bbox.byId.map(id=>
            <RowBoxDetails 
            handleBoxSelect={(id)=>this.boxSelected(id)}
            id={id} 
            x={bbox.byHash[id].x}
            y={bbox.byHash[id].y}
            width={bbox.byHash[id].width}
            height={bbox.byHash[id].height}/>
          )
        }
      </ul>
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
        selectBox : (id)=>{dispatch(selectCurrBox(id))} 
    })
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListBoxDetails);