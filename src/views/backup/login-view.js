import { LitElement, html } from 'lit-element';
import { WiredTextarea } from "wired-textarea";


import '@vaadin/vaadin-login/vaadin-login-overlay.js';


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
    <vaadin-login-form></vaadin-login-form>
      <vaadin-form-layout>
        <vaadin-text-field label="First Name" value="Jane"></vaadin-text-field>
        <vaadin-text-field label="Last Name" value="Doe"></vaadin-text-field>
        <vaadin-text-field label="Email" value="jane.doe@example.com"></vaadin-text-field>
        <vaadin-date-picker label="Birthday" value="1993-06-23"></vaadin-date-picker>
        <vaadin-text-area label="Bio" colspan="2" value="My name is Jane."></vaadin-text-area>
      </vaadin-form-layout>
      <vaadin-button theme="primary" @click="${this.addTodo}">
        Submit
      </vaadin-button>
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
