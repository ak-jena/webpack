import { LitElement, html } from 'lit-element';
import { WiredTextarea } from "wired-textarea";

import '@vaadin/vaadin-form-layout/vaadin-form-layout.js';

import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-text-field/vaadin-password-field.js';
import '@vaadin/vaadin-text-field/vaadin-email-field.js';
import '@vaadin/vaadin-text-field/vaadin-number-field.js';

import '@vaadin/vaadin-button';

const VisibilityFilters = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

class RegistrationView extends LitElement {

  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String }
    };
  }

  constructor() {
    super();
    this.todos = [];
    this.filter = VisibilityFilters.SHOW_ALL;
    this.task = '';
  }

  render() {
    return html`
      <vaadin-form-layout columns="1, 30em 2 labels-on-top, 40em 2, 50em 3 labels-on-top">
        <vaadin-form-item>
          <label slot="label">Name</label>
          <input class="full-width" id="name" value="">
        </vaadin-form-item>
        <vaadin-form-item>
          <label slot="label">Email</label>
          <input class="full-width" id="email" value="">
        </vaadin-form-item>
        <vaadin-form-item>
          <label slot="label">Password</label>
          <input class="full-width" id="password"  value="">
        </vaadin-form-item>
        <vaadin-form-item>
          <vaadin-button theme="primary" @click="${this.validateAttributes}">
            Submit
          </vaadin-button>
        </vaadin-form-item>
      </vaadin-form-layout>
      
    `;
  }


  validateAttributes() {
    var name = this.shadowRoot.getElementById("name").value;
    var email = this.shadowRoot.getElementById("email").value;
    var password = this.shadowRoot.getElementById("password").value;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert('no data');
      }
    };
    xhttp.open("POST", "http://localhost:8091/api/register", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email=" + email + "&password=" + password);
    alert('success');
    return false;
  }

  addTodo() {
    if (this.task) {
      this.todos = [
        ...this.todos,
        {
          task: this.task,
          complete: false
        }
      ];
      this.task = '';
    }
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  updateTodoStatus(updatedTodo, complete) {
    this.todos = this.todos.map(todo =>
      updatedTodo === todo ? { ...updatedTodo, complete } : todo
    );
  }

  filterChanged(e) {
    this.filter = e.target.value;
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.complete);
  }

  applyFilter(todos) {
    switch (this.filter) {
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.complete);
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.complete);
      default:
        return todos;
    }
  }
}

customElements.define('registration-view', RegistrationView);
