import { LitElement, html } from 'lit-element';

class DashboardView extends LitElement {

  static get properties() {
    return {}
  }

  constructor() {
    super();
  }

  render() {
    return html`
    <div class="box">
        <div class="field">
            <label class="label">Dashboard</label>
        </div>
    </div>
    `;
  }

}

customElements.define('dashboard-view', DashboardView);
