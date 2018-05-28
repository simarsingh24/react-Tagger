import React, { Component } from "react";
import KeyboardKey from "./KeyboardKey";
export default class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.props = props;
    this.state = { caption: 'Caption' }
  }
  onInputChange(caption) {
    this.setState({caption});
    console.log(caption);
}

  render() {
    return (
      <div id="InfoPanel" className = "SidePanel">
        <table>
          <tbody>
            <tr>
              <td><KeyboardKey symbol={"Y"} /></td>
              <td>Yes</td> 
            </tr>
            <tr>
              <td><KeyboardKey symbol={"N"} /></td>
              <td>No</td> 
            </tr>
            <tr>
              <td><KeyboardKey symbol={"M"} /></td>
              <td>More</td> 
            </tr>
          </tbody>
        </table>
        <input id = "captionInput" value={this.state.caption}></input>
      </div>
    );
  }
}

