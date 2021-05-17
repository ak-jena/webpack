import { LitElement, html, css } from 'lit-element';
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

  static get styles() {
    return [
      css`
      .w-50 {
        width: 50% !important;
      }
    `
    ];
  }

  constructor() {
    super();
    this.todos = [];
    this.filter = VisibilityFilters.SHOW_ALL;
    this.task = '';
  }

  render() {
    return html`
    <div class="container-fluid is-flex is-justify-content-center is-flex-wrap-wrap">
      <form class="box" style="width: 50%">
        <div class="field">
        <label class="label">Register here</label>
        </div>
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter username">
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="e.g. alex@example.com">
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="********">
          </div>
        </div>

        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="********">
          </div>
        </div>
        <button class="button is-link" @click="${this.validateAttributes}">Register</button>
        <button class="button is-link is-light">
          <a href="/" class="has-text-link">Cancel</a>
        </button>
      </form>
    </div>
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

  createRenderRoot() {
    return this;
  }
}

customElements.define('registration-view', RegistrationView);
