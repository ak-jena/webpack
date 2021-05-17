import { LitElement, html } from 'lit-element';
import { WiredTextarea } from "wired-textarea";


import '@vaadin/vaadin-form-layout/vaadin-form-layout.js';

import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-text-field/vaadin-password-field.js';
import '@vaadin/vaadin-text-field/vaadin-email-field.js';

import '@vaadin/vaadin-button';


const VisibilityFilters = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

class LoginView extends LitElement {

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
    <div class="container-fluid is-flex is-justify-content-center is-flex-wrap-wrap">
      <form class="box" style="width: 50%">
        <div class="field">
        <label class="label">Login</label>
        </div>
  
        <div class="field">
          <label class="label">Email/ Username</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter email/ username">
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="********">
          </div>
        </div>
        <button class="button is-link" @click="${this.validateAttributes}">Login</button>
        <button class="button is-link is-light">
          <a href="/register" class="has-text-link">Register a new account</a>
        </button>
      </form>
    </div>
    `;
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

customElements.define('login-view', LoginView);
