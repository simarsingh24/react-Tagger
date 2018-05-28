import React, { Component } from 'react';
import './App.css';
import TaggingSection from './components/TagingSection'
import Header from './components/Header'
import InfoPanel from './components/InfoPanel'


class App extends Component {

  render() {
    return (
      <div className="App">
        <InfoPanel />
        <Header/>
        <TaggingSection />
      </div>
    );
  }
}

export default App;
