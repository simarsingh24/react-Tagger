import React, { Component } from "react";
import KeyboardKey from "./KeyboardKey";
export default class InfoPanel extends Component {
  render() {
    return (
      <div id="InfoPanel" className = "SidePanel">
        <table>
          <tbody>
            <tr>
              <td><KeyboardKey symbol={"Y"} /></td>
              <td>More Box</td> 
            </tr>
            <tr>
              <td><KeyboardKey symbol={"N"} /></td>
              <td>Skip</td> 
            </tr>
            <tr>
              <td><KeyboardKey symbol={"S"} /></td>
              <td>Save or View</td> 
            </tr>
          </tbody>
        </table>
       </div>
    );
  }
}

