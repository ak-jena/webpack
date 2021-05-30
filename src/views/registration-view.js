import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
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

  createRenderRoot(){
    return this;
  }

  constructor() {
    super();
    this.disabled = true;
    document.getElementById("nav-top-bar").style.visibility = "hidden";
    //document.getElementById("navbarExampleTransparentExample").style.visibility = "hidden";
  }

  validateInput(fieldName) {
    var dataDisable = true;
    if (!document.getElementById(`${fieldName}`).value) {
      document.getElementById(`${fieldName}`).classList.add('is-danger');
      document.getElementById(`err${fieldName}`).classList.add('is-danger');
      document.getElementById(`err${fieldName}`).innerText = `Enter ${fieldName}`;
    } else {
      document.getElementById(`${fieldName}`).classList.remove('is-danger');
      document.getElementById(`err${fieldName}`).classList.remove('is-danger');
      document.getElementById(`err${fieldName}`).innerText = '';
    }

    if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) {
       // this.disabled = true;
        document.getElementById('errconfirmPassword').classList.add('is-danger');
        document.getElementById(`errconfirmPassword`).innerText = 'Password and Confirm Password do not match';
      } else {
        document.getElementById('errconfirmPassword').classList.remove('is-danger');
      }

    if (document.getElementById('username').value && document.getElementById('password').value &&
      document.getElementById('bio').value && document.getElementById('confirmPassword').value 
      && document.getElementById('email').value && document.getElementById('password').value === document.getElementById('confirmPassword').value) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  render() {
    return html`
      <div class="container">
        <div id="reg-form" class="box login-container" style="width:50%; margin: 0 auto;">        
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
                  <label class="label">Full Name</label>
                </p>
              </div>
              <div class="column">
                <p class="bd-notification">
                  <input id="username" class="input" type="text" placeholder="Enter username"
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
                  <label class="label">Email/ Username</label>
                </p>
              </div>
              <div class="column">
                <p class="bd-notification">
                  <input id="email" class="input" type="email" placeholder="e.g. alex@example.com"
                    @input=${() => this.validateInput('email')}>
                </p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column is-4"></div>
              <div class="column">
                <p><label id="erremail" class="help"></label></p>
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
              <div class="column is-4">
                <p class="bd-notification">
                  <label class="label">Confirm Password</label>
                </p>
              </div>
              <div class="column">
                <p class="bd-notification">
                  <input id="confirmPassword" class="input" type="password" placeholder="********"
                    @input=${() => this.validateInput('confirmPassword')}>
                </p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column is-4"></div>
              <div class="column">
                <p><label id="errconfirmPassword" class="help"></label></p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column is-4">
                <p class="bd-notification">
                  <label class="label">Bio</label>
                </p>
              </div>
              <div class="column">
                <p class="bd-notification">
                  <textarea id="bio" class="textarea" placeholder="Tell us more about you"
                    @input=${() => this.validateInput('bio')}></textarea>
                </p>
              </div>
            </div>
            <div class="field columns is-vcentered">
              <div class="column is-4"></div>
              <div class="column">
                <p><label id="errbio" class="help"></label></p>
              </div>
            </div>

        <!--    <div class="field">
              <label class="label">Photo</label>
              <div class="control">
                <div class="file">
                  <label class="file-label">
                    <input class="file-input" id="photo" type="file" name="photo" 
                    @input=${() => this.validateInput('photo')}>
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                  </label>
                </div>
                <label id="errphoto" class="help"></label>
              </div>
            </div>  -->
            <div class="field columns is-vcentered">
              <div class="column " style="text-align: center;">
                <button class="button is-primary transition-raise-hover login-button" id="submit" 
                  type="submit" @click="${this.validateAttributes}" ?disabled = ${this.disabled}
                  style="background-color: rgb(0, 161, 210); color: rgb(255, 255, 255); border-radius: 8px;border: 1px solid rgb(241, 245, 250);transition: background-color 0.25s ease 0s, border-color 0.25s ease 0s, color 0.25s ease 0s;line-height: 1;font-weight: 600;letter-spacing: 0.014em;height: 2.21em;padding: 0px 1.4em;box-shadow: none !important;">
                  Register
                </button>
                <a href="/" class="button is-link is-light has-text-link">Cancel</a>
              </div>
            </div>
          </form>
          <progress id="progress-bar" style="display:none" class="progress is-small is-primary" max="100">15%</progress>
      </div>
    </div>
    `;
  }


  validateAttributes() {
    var content = document.getElementById("content-box");
    //if (x.style.display === "none") {
    //  x.style.display = "block";
    // } else {
      content.style.display = "none";
    // }
    var progressBar = document.getElementById("progress-bar");
    progressBar.style.display = "block";
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var bio = document.getElementById("bio").value;
    var password = document.getElementById("password").value;
    console.log(password);  
    const data = { username: username, email: email, bio: bio, password: password };

    fetch('http://localhost:8091/api/register', {
      method: 'POST', // or 'PUT'
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      //alert("success");
      Router.go('/');
      console.log('Success:', data);
    })
    .catch((error) => {
      content.style.display = "block";
      progressBar.style.display = "none";
      console.error('Error:', error);
    });

/*
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert('no data');
      }
    };
    xhttp.open("POST", "http://localhost:8091/api/register", true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email=" + email + "&password=" + password);
    */
    // alert('success');
    return false;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('registration-view', RegistrationView);
