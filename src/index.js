import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './responsive.css';
import EventList from './component/event_list/index';
import EventForm from './component/event_form/index';


ReactDOM.render(
  <React.StrictMode>
    <EventList />
    <EventForm />
  </React.StrictMode>,
  document.getElementById('App')
);
