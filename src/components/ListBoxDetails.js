import React, { Component } from 'react'
import { connect } from 'react-redux'
import RowBoxDetails from './RowBoxDetails'
import { selectCurrBox } from '../actions/actions'


class ListBoxDetails extends Component {
    constructor(){
        super();
        this.handleBoxSelect = this.boxSelected.bind(this);
    }    
    boxSelected=(id)=>{
        this.props.selectBox(id);
    }

  render() {
      var bbox= this.props.boundingBox;
    return (
        <div className="BboxList">
      <ul>
          {bbox.byId.map(id=>
            <RowBoxDetails key={id}
            handleBoxSelect={(id)=>this.boxSelected(id)}
            id={id} 
            label ={bbox.byHash[id].label}
            x={bbox.byHash[id].x}
            y={bbox.byHash[id].y}
            width={bbox.byHash[id].width}
            height={bbox.byHash[id].height}/>
          )
        }
      </ul>
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
        selectBox : (id)=>{dispatch(selectCurrBox(id))} 
    })
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListBoxDetails);