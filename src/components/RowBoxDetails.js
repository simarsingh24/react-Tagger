import React, { Component } from 'react'

export default class RowBoxDetails extends Component {
  handleOnClick=(id)=>{
    this.props.handleBoxSelect(id);
  }
  render() {
    return (
      <div className="RowBoxDetails"  onClick={this.handleOnClick.bind(this,this.props.id)}>
        <span>Id-{this.props.id} {this.props.label}</span>
      </div>
    )
  }
}
