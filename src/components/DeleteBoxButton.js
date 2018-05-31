import React, { Component } from "react";

export default class DeleteBoxButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
     this.props.deleteBox();
  }

  render() {
    return (
      <div className="DeleteBoxButton" onClick={this.clickHandler} >
        X
      </div>
    );
  }
}