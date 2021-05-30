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
    document.getElementById("nav-top-bar").style.visibility = "hidden";
    // document.getElementById("logout").style.visibility = "hidden";
    // document.getElementById("navbarExampleTransparentExample").style.visibility = "hidden";
  }

  login(event) {
    event.preventDefault();
   // console.log(document.getElementById('username'));
    this.username = document.getElementById('username').value;
    this.password = document.getElementById('password').value;
    var progressBar = document.getElementById("loader-div");
    progressBar.style.display = "block";

    const data = { username: username, password: password };

    fetch('http://localhost:8091/api/login?email='+ this.username +'&password='+this.password, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if(data.status == "success"){
        localStorage.setItem("login_api", data.api_key);
        localStorage.setItem("user_id", data.user_id);
        setTimeout(Router.go('/dashboard'), 600);
      } else {
        progressBar.style.display = "none";
        document.getElementById(`errpassword`).classList.add('is-danger');
        document.getElementById(`errpassword`).innerText = `Invalid credentials`;
      }
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
   /* if (this.username && this.password) {
      Router.go('/home');
    }*/
    progressBar.style.display = "none";
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
    var checkBox = document.getElementById("remember");
    if (`${fieldName}` == "remember" && checkBox.checked == false){
      document.getElementById("remember").classList.add('is-danger');
      document.getElementById("errremember").classList.add('is-danger');
      document.getElementById("errremember").innerText = `Enter remember me`;
    } else {
      document.getElementById("remember").classList.remove('is-danger');
      document.getElementById("errremember").classList.remove('is-danger');
      document.getElementById("errremember").innerText = '';
    }
    if (document.getElementById('username').value && document.getElementById('password').value
        && checkBox.checked == true) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="box login-container" style="width:50%; margin: 0 auto;">        
          <form style="">
            <div class="columns is-mobile is-centered">
              <div class="column is-half" style="text-align: center;">
                <p class="bd-notification ">
                  <img id="logo" src="https://stgthefuture.annalect.com/static/i/omni-logo-stacked.svg" alt="Omni logo">
                </p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column is-4">
                <p class="bd-notification">
                  <label class="label">Email/ Username</label>
                </p>
              </div>
              <div class="column">
                <p class="bd-notification">
                  <input id="username" class="input" type="text" placeholder="Enter email/ username"
                    @input=${() => this.validateInput('username')}>
                </p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column is-4"></div>
              <div class="column">
                <p><label id="errusername" class="help"></label></p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column is-4">
                <p class="bd-notification">
                  <label class="label">Password</label>
                </p>
              </div>
              <div class="column">
                <p class="bd-notification">
                  <input id="password" class="input" type="password" placeholder="********"
                    @input=${() => this.validateInput('password')}>
                </p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column is-4"></div>
              <div class="column">
                <p><label id="errpassword" class="help"></label></p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column ">
                <p class="bd-notification">
                  <label class="checkbox">
                    <input id="remember" type="checkbox" @input=${() => this.validateInput('remember')}>
                    I agree to the <a href="#">terms and conditions</a>
                  </label>
                </p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column is-4"></div>
              <div class="column">
                <p><label id="errremember" class="help"></label></p>
              </div>
            </div>
            <div class="field columns is-vcentered" id="loader-div" style="width:50%; margin: 0 auto;display: none;">
              <div class="column" style="text-align: center;">
                <div class="loader" style="margin: 0 auto;"></div>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column" style="text-align: center;">
                <button class="button is-primary transition-raise-hover login-button" id="submit" 
                  type="submit" @click="${e => this.login(e)}" ?disabled = ${this.disabled}
                  style="background-color: rgb(0, 161, 210); color: rgb(255, 255, 255); border-radius: 8px;border: 1px solid rgb(241, 245, 250);transition: background-color 0.25s ease 0s, border-color 0.25s ease 0s, color 0.25s ease 0s;line-height: 1;font-weight: 600;letter-spacing: 0.014em;height: 2.21em;padding: 0px 1.4em;box-shadow: none !important;">
                  Sign In
                </button>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column">
                <button class="button is-link is-light">
                  <a href="/registration" class="has-text-link">Register a new account</a>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('login-view', LoginView);
