import React, { Component } from "react";
import KeyboardKey from "./KeyboardKey";
export default class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
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
        <input id = "captionInput" value ="Caption"></input>
      </div>
    );
  }
}

