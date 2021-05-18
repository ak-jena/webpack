import { LitElement, html } from 'lit-element';

import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';

class DashboardView extends LitElement {

  static get properties() {
    return {}
  }

  constructor() {
    super();
    this.getData();
  }

  render () {
    return html`
        <vaadin-grid>
          <vaadin-grid-column path="id" header="#"></vaadin-grid-column>
          <vaadin-grid-column path="name" header="Name"></vaadin-grid-column>
          <vaadin-grid-column path="email" header="Email" text-align="end" width="120px" flex-grow="0"></vaadin-grid-column>
        </vaadin-grid>
    `;
  }

  getData() {
              // Customize the "Address" column's renderer
    // Populate the grid with data
    // const grid = document.querySelector('vaadin-grid');
    fetch('http://localhost:8091/api/users_list', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        customElements.whenDefined('vaadin-grid').then(function() {
          // Assign an array of user objects as the grid's items
          document.querySelector('vaadin-grid').items = data.message;
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    /*
    console.log(document.getElementById('username'));
    this.username = document.getElementById('username').value;
    this.password = document.getElementById('password').value;

    const data = { username: username, password: password };

    fetch('http://localhost:8091/api/users_list', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      Router.go('/home');
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
   /* if (this.username && this.password) {
      Router.go('/home');
    }*/
  }

}

customElements.define('dashboard-view', DashboardView);
