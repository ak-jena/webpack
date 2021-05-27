import { LitElement, html } from 'lit-element';

import {bulmaStyles} from '@granite-elements/granite-lit-bulma/granite-lit-bulma.js';

import "@polymer/paper-tooltip/paper-tooltip.js";

class DashboardView extends LitElement {

  static get properties() {
    return {
      items: {type: Object},
      userid: {type: String},
      disabled: { type: Boolean }
    };
  }

  static get styles() {
    return [bulmaStyles];
  }

  constructor() {
    super();
    //this.userid = localStorage.getItem("user_id");
    this.items = this.getUserData(localStorage.getItem("user_id"));
    //alert();
    document.getElementById("logout").style.visibility = "visible";
    document.getElementById("navbarExampleTransparentExample").style.visibility = "visible";
  }

  createRenderRoot(){
    return this;
  }

  render () {
    return html`
      <div class="tile is-ancestor">
      ${this.items.map( (person) => {
        return html`
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-primary">
                <p class="title">Fillerama</p>
                <p class="subtitle">
                  Fillerama is a bit different than Loren Ipsum. It offers formatted content of different themes 
                  like Star Wars, The Simpsons, and many more.
                </p>
              </article>
              <article class="tile is-child notification is-warning">
                <p class="title">Placebear</p>
                <p class="subtitle">Placebear offers you custom-size image placeholders with a bear image. The page contains two URL’s – one with regular background and one with a gray background.</p>
                
                <img src="#" alt="Uploaded Image" style="display:none;">
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-info">
                <p class="title">Image</p>
                <p class="subtitle">With an image</p>
                <figure class="image is-4by3">
                  <img class="is-rounded" id="uploadedImage" src="https://html.sammy-codes.com/images/small-profile.jpeg">
                </figure>
                <p class="title"></p>
                <div class="file is-primary column">
                  <label class="file-label">
                    <input type="file" class="file-input" accept="image/png, image/jpeg" id="photo" name="resume"
                      @change="${this._handleUploadOnClick}" />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Primary file…
                      </span>
                    </span>
                  </label>
                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-danger">
              <p class="title">Placekitten</p>
              <p class="subtitle">If you want image placeholders with cute kitten images, the Placekitten tool is right for you. The page offers you two URLs. </p>
              <div class="content">
                <!-- Content -->
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <div class="content">
              <p class="title">User Details</p>
              <p class="subtitle">With even more content</p>
              <div class="content">
                <p>Name: ${person.name}</p>
                <p>Email: ${person.email}</p>
                <p>Bio</p>
                <p>${person.bio}</p>
                <!-- Content -->
              </div>
            </div>
          </article>
        </div>
        `;
        })}
      </div>
    `;
  }

  _handleUploadOnClick(e) {
    console.log(this.prop);
    const photo = document.getElementById("photo");
    // the file is the first element in the files property
    const file = photo.files[0];
    console.log(file);
    if (file) {
      var picture = new FileReader();
      picture.readAsDataURL(file);
      picture.addEventListener('load', function(event) {
        document.getElementById('uploadedImage').setAttribute('src', event.target.result);
        document.getElementById('uploadedImage').style.display = 'block';
      });

      const data = { photo: file};
      fetch('http://localhost:8091/api/file_upload/29', {
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
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      //alert('The file has been uploaded successfully.');
    }
    return false;
  }


  getUserData(userid) {
    const user_id = localStorage.getItem("user_id");
      fetch ('http://localhost:8091/api/user/'+userid)
      .then(x => x.json())
      .then(y => this.items = y);
  }
}

customElements.define('dashboard-view', DashboardView);
