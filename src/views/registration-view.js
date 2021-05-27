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
    document.getElementById("logout").style.visibility = "hidden";
    document.getElementById("navbarExampleTransparentExample").style.visibility = "hidden";
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
      document.getElementById('bio').value && document.getElementById('confirmPassword').value 
      && document.getElementById('email').value) {
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
      <div class="container">
      <div class="notification is-primary">
        <section class="section">
          <h1 class="title">Register here</h1>
          <div class="box" id="content-box">
            <div class="field">
              <label class="label">Full Name</label>
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

            <div class="field">
              <label class="label">Bio</label>
              <div class="control">
                <textarea id="bio" class="textarea" placeholder="Tell us more about you"
                @input=${() => this.validateInput('bio')}></textarea>
                <label id="errbio" class="help"></label>
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
            
            <button class="button is-link" @click="${this.validateAttributes}"
            ?disabled = ${this.disabled}>Register</button>
            <button class="button is-link is-light">
              <a href="/" class="has-text-link">Cancel</a>
            </button>
          </div>
          <progress id="progress-bar" style="display:none" class="progress is-small is-primary" max="100">15%</progress>
        </section>
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
