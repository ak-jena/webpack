
      <vaadin-form-layout>
        <vaadin-text-field id="first-name" label="First Name" ></vaadin-text-field>
        <vaadin-text-field id="last-name" label="Last Name" ></vaadin-text-field>
        <vaadin-text-field id="email" label="Email"></vaadin-text-field>
        <vaadin-date-picker id="birthday" label="Birthday"></vaadin-date-picker>
        <vaadin-text-area label="Bio" id="bio" colspan="2"></vaadin-text-area>
      </vaadin-form-layout>
      <vaadin-button theme="primary" @click="${this.validateAttributes}">
        Submit
      </vaadin-button>



import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-text-field/vaadin-password-field.js';
import '@vaadin/vaadin-text-field/vaadin-email-field.js';
import '@vaadin/vaadin-text-field/vaadin-number-field.js';

import '@vaadin/vaadin-button';


import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';


import '@vaadin/vaadin-text-field/vaadin-text-field.js';


import '@vaadin/vaadin-form-layout/vaadin-form-layout.js';


import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-text-field/vaadin-password-field.js';
import '@vaadin/vaadin-text-field/vaadin-email-field.js';
import '@vaadin/vaadin-text-field/vaadin-number-field.js';


getPage(num){
    switch(num){
        default:
        case 'registration':
            return html`
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
        case 'login':
            return html`
              <vaadin-login-form></vaadin-login-form>
            `;
    }
  }


      <style>
        todo-view {
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }

        todo-view .input-layout {
          width: 100%;
          display: flex;
        }

        todo-view .input-layout vaadin-text-field {
          flex: 1;
          margin-right: var(--spacing);
        }

        todo-view .todos-list {
          margin-top: var(--spacing);
        }

        todo-view .visibility-filters {
          margin-top: calc(4 * var(--spacing));
        }
      </style>

      <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Task"
          value="${this.task}"
          @change="${this.updateTask}"
        ></vaadin-text-field>
        <vaadin-button theme="primary" @click="${this.addTodo}">
          Add Todo
        </vaadin-button>
      </div>

      <div class="todos-list">
        ${
          this.applyFilter(this.todos).map(
            todo => html`
              <div class="todo-item">
                <vaadin-checkbox
                  ?checked="${todo.complete}"
                  @change="${
                    e => this.updateTodoStatus(todo, e.target.checked)
                  }"
                >
                  ${todo.task}
                </vaadin-checkbox>
              </div>
            `
          )
        }
      </div>

      <vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"
      >
        ${
          Object.values(VisibilityFilters).map(
            filter => html`
              <vaadin-radio-button value="${filter}"
                >${filter}</vaadin-radio-button
              >
            `
          )
        }
      </vaadin-radio-group>
      <vaadin-button @click="${this.clearCompleted}">
        Clear Completed
      </vaadin-button>
      <div></div><br>

      <vaadin-form-layout>
        <vaadin-text-field label="First Name" value="Jane"></vaadin-text-field>
        <vaadin-text-field label="Last Name" value="Doe"></vaadin-text-field>
        <vaadin-text-field label="Email" value="jane.doe@example.com"></vaadin-text-field>
        <vaadin-date-picker label="Birthday" value="1993-06-23"></vaadin-date-picker>
        <wired-textarea  label="Bio" colspan="2" value="Test"></wired-textarea>
      </vaadin-form-layout>