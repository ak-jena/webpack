import { LitElement, html, css } from 'lit-element';
class RegistrationView extends LitElement {

  static get properties() {
    return {
      username: { type: String },
      email: { type: String },
      password: { type: String },
      confirmPassword: { type: String },
      disabled: { type: Boolean }
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
    this.disabled = true;
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

    if (document.getElementById('username').value && document.getElementById('password').value &&
      document.getElementById('confirmPassword').value && document.getElementById('email').value) {
      if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) {
        this.disabled = true;
        document.getElementById('errconfirmPassword').classList.add('is-danger');
        document.getElementById(`errconfirmPassword`).innerText = 'Password and Confirm Password do not match';
      } else {
        document.getElementById('errconfirmPassword').classList.remove('is-danger');
      }
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
        <label class="label">Register here</label>
        </div>
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input id="username" class="input" type="text" placeholder="Enter username"
            @input=${() => this.validateInput('username')}>
            <label id="errusername" class="help"></label>
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input id="email" class="input" type="email" placeholder="e.g. alex@example.com"
            @input=${() => this.validateInput('email')}>
            <label id="erremail" class="help"></label>
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

        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control">
            <input id="confirmPassword" class="input" type="password" placeholder="********"
            @input=${() => this.validateInput('confirmPassword')}>
            <label id="errconfirmPassword" class="help"></label>
          </div>
        </div>
        <button class="button is-link" @click="${this.validateAttributes}"
        ?disabled = ${this.disabled}>Register</button>
        <button class="button is-link is-light">
          <a href="/" class="has-text-link">Cancel</a>
        </button>
      </form>
    </div>
    `;
  }


  validateAttributes() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(password);  
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

  createRenderRoot() {
    return this;
  }
}

customElements.define('registration-view', RegistrationView);
