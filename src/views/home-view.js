import { LitElement, html } from 'lit-element';

import {bulmaStyles} from '@granite-elements/granite-lit-bulma/granite-lit-bulma.js';

import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';

class HomeView extends LitElement {

  static get properties() {
    return {
      items: {type: Object}
    };
  }

  static get styles() {
    return [bulmaStyles];
  }

  constructor() {
    super();
    this.items = this.getData();
    document.getElementById("logout").style.visibility = "visible";
  }

  render () {
    return html`
      <div class="container">
        <div class="notification is-primary">
          <section class="section">
            <h1 class="title">All Users Data</h1>
            <h2 class="subtitle">
              Details of employees are mentioned below.
            </h2>
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" id="example">
              <thead>
                <tr>
                  <th>Id<paper-tooltip>The unique identity of the user</paper-tooltip></th>
                  <th>Name<paper-tooltip>The name of the user</paper-tooltip></th>
                  <th>Email<paper-tooltip>The email of the user</paper-tooltip></th>
                </tr>
              </thead>
              <tbody>
              ${this.items.map( (person) => {
                return html`
                  <tr id="${person.id}" @click="${this._handleClick}" class="">
                    <td>${person.id}</td>
                    <td>${person.name}</td>
                    <td>${person.email}</td>
                  </tr>
                  `;
              })}
              <tbody>
            </table>
          </section>
        </div>
      </div>
    `;
  }
  _handleClick(e) {
    console.log(this.prop);
    this.view.e.classList.add('is-selected');
  }

  addSelected(elem){
    // var element = document.getElementById("myDIV");
    //alert('a');
    elem.classList.toggle("is-selected");
  }

  getData() {
      fetch ('http://localhost:8091/api/users_list')
      .then(x => x.json())
      .then(y => this.items = y);
  }

}

customElements.define('home-view', HomeView);
