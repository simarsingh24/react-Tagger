import React, { Component } from 'react';
import './App.css';
import TaggingSection from './components/TagingSection';
import Header from './components/Header';
import InfoPanel from './components/InfoPanel';
import ListBoxDetails from './components/ListBoxDetails';
import { Provider } from 'react-redux';
import store from './store/store';


class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div className="App">
            <InfoPanel />
            <Header/>
            <TaggingSection />
            <ListBoxDetails />
        </div>
     </Provider>
    );
  }
}

export default App;
