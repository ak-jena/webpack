import { Router } from '@vaadin/router';
import { LitElement, html } from 'lit-element';

class LoginView extends LitElement {

  static get properties() {
    return {
      disabled: { attribute: false },
      username: { attribute: false },
      password: { attribute: false }
    };
  }

  constructor() {
    super();
    this.disabled = true;
  }

  login(event) {
    event.preventDefault();
    console.log(document.getElementById('username'));
    this.username = document.getElementById('username').value;
    this.password = document.getElementById('password').value;

    const data = { username: username, password: password };

    fetch('http://localhost:8091/api/login?email=Amiya.jena@annalect.com&password=abcde', {
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

  validateInput(fieldName) {
    if (!document.getElementById(`${fieldName}`).value) {
      document.getElementById(`${fieldName}`).classList.add('is-danger');
      document.getElementById(`err${fieldName}`).classList.add('is-danger');
      document.getElementById(`err${fieldName}`).innerText = `Enter ${fieldName}`;
    } else {
      document.getElementById(`${fieldName}`).classList.remove('is-danger');
      document.getElementById(`err${fieldName}`).classList.remove('is-danger');
      document.getElementById(`err${fieldName}`).innerText = '';
    }

    if (document.getElementById('username').value && document.getElementById('password').value) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
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
            <input id="username" class="input" type="text" placeholder="Enter email/ username"
            @input=${() => this.validateInput('username')}>
            <label id="errusername" class="help"></label>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input id="password" class="input" type="password" placeholder="********"
            @input=${() => this.validateInput('password')}>
            <label id="errpassword" class="help"></label>
          </div>
        </div>
        <button id="submit" class="button is-link" @click="${e => this.login(e)}"
        ?disabled = ${this.disabled}>Login</button>
        <button class="button is-link is-light">
          <a href="/registration" class="has-text-link">Register a new account</a>
        </button>
      </form>
    </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('login-view', LoginView);
