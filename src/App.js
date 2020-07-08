import React from 'react';
import { render } from "react-dom";
import './App.css';
import EventList from './component/event_list/index';
import EventForm from './component/event_form/index';
import store from './redux/store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <EventList />
          <EventForm />
      </div>
    </Provider>
  );
}

export default App;
