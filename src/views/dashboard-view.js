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
    this.openNav;
    document.getElementById("nav-top-bar").style.visibility = "visible";
  }

  createRenderRoot(){
    return this;
  }

  render () {
    return html`
      <div id="main">
        <div id="mySidenav" class="sidenav">
          <a href="#">
            <span><i class="fa fa-user-o" aria-hidden="true"></i></span>
            <span class="link-class">About</span>
          </a>
          <a href="#">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
            <span class="link-class">Services</span>
          </a>
          <a href="#">
            <span><i class="fa fa-users" aria-hidden="true"></i></span>
            <span class="link-class">Clients</span>
          </a>
          <a href="#">
            <span><i class="fa fa-address-card-o" aria-hidden="true"></i></span>
            <span class="link-class">Contact</span>
          </a>
          <a href="javascript:void(0)">
            <span><i class="fa fa-angle-right" aria-hidden="true" id="right-arrow" style="visibility: hidden;" @click="${this.openNav}"></i></span>
            <span><i class="fa fa-angle-down" @click="${this.closeNav}" id="down-arrow" aria-hidden="true"></i><span>
          </a>
        </div>
        <div class="main container column is-8">
          <div class="section">
            <div class="card">
              <div class="card-header"><p class="card-header-title">Header</p></div>
              <div class="card-content"><div class="content">Content</div></div>
            </div>
            <br />
            <div class="card is-hidden1">
              <div class="card-header"><p class="card-header-title">Header</p></div>
              <div class="card-content"><div class="content">Content</div></div>
            </div>
            <br />
          </div>
        </div>
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

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("down-arrow").style.visibility = "visible";
    document.getElementById("right-arrow").style.visibility = "hidden";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    //document.getElementsByClassName('')[0].style.visibility = '';
    [].forEach.call(document.getElementsByClassName('link-class'), function (el) {
      el.style.visibility = 'visible';
    });
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "100px";
    document.getElementById("main").style.marginLeft= "100px";
    document.body.style.backgroundColor = "white";
    document.getElementById("down-arrow").style.visibility = "hidden";
    document.getElementById("right-arrow").style.visibility = "visible";
    [].forEach.call(document.getElementsByClassName('link-class'), function (el) {
      el.style.visibility = 'hidden';
    });
  }

  getUserData(userid) {
    const user_id = localStorage.getItem("user_id");
      fetch ('http://localhost:8091/api/user/'+userid)
      .then(x => x.json())
      .then(y => this.items = y);
  }
}

customElements.define('dashboard-view', DashboardView);
