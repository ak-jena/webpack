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
    <div class="container is-flex is-justify-content-center">
      <div class="box">
        <label class="label">Login</label>
        <vaadin-form-layout>
        <vaadin-text-field label="Email/ Username" value="" placeholder="Enter username" class="control"></vaadin-text-field>
        <vaadin-text-field label="Password" value="" placeholder="Enter password" class="control"></vaadin-text-field>
        <vaadin-button class="button is-link" @click="${this.validateAttributes}">
          Submit
        </vaadin-button>
        <div class="field">
          <div class="control">
            <label class="is-link">
              <a href="/registration" class="has-text-link">Register a new account</a>
            </label>
          </div>
        </div>
        </vaadin-form-layout>
      </div>
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
