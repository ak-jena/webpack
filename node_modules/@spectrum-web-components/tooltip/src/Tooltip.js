/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { __decorate } from "tslib";
import { html, SpectrumElement, property, query, } from '@spectrum-web-components/base';
import tooltipStyles from './tooltip.css.js';
/**
 * @slot icon - The icon that appears on the left of the label
 * @slot - The label
 */
export class Tooltip extends SpectrumElement {
    constructor() {
        super();
        this._tooltipId = `sp-tooltip-describedby-helper-${Tooltip.instanceCount++}`;
        this.open = false;
        /**
         * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
         * @attr
         */
        this.placement = 'top';
        /* Ensure that a '' value for `variant` removes the attribute instead of a blank value */
        this._variant = '';
        this.addEventListener('sp-overlay-query', this.onOverlayQuery);
    }
    static get styles() {
        return [tooltipStyles];
    }
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        if (variant === this.variant) {
            return;
        }
        if (['info', 'positive', 'negative'].includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
            return;
        }
        this.removeAttribute('variant');
        this._variant = '';
    }
    onOverlayQuery(event) {
        /* c8 ignore next */
        if (!event.target)
            return;
        const target = event.target;
        /* c8 ignore next */
        if (target !== this)
            return;
        event.detail.overlayContentTipElement = this.tipElement;
    }
    render() {
        return html `
            <slot name="icon"></slot>
            <span id="label"><slot></slot></span>
            <span id="tip"></span>
        `;
    }
    overlayWillOpenCallback({ trigger, }) {
        this.setAttribute('aria-hidden', 'true');
        if (!this._proxy) {
            this._proxy = document.createElement('span');
            this._proxy.textContent = this.textContent;
            this._proxy.id = this._tooltipId;
            this._proxy.hidden = true;
            this._proxy.setAttribute('role', 'tooltip');
        }
        trigger.setAttribute('aria-describedby', this._tooltipId);
        trigger.insertAdjacentElement('beforebegin', this._proxy);
    }
    overlayOpenCancelledCallback({ trigger, }) {
        this.overlayCloseCallback({ trigger });
    }
    overlayCloseCallback({ trigger }) {
        trigger.removeAttribute('aria-describedby');
        this.removeAttribute('aria-hidden');
        this.removeProxy();
    }
    removeProxy() {
        if (this._proxy) {
            this._proxy.remove();
            this._proxy = undefined;
        }
    }
}
/**
 * @private
 */
Tooltip.instanceCount = 0;
__decorate([
    property({ type: Boolean, reflect: true })
], Tooltip.prototype, "open", void 0);
__decorate([
    property({ reflect: true })
], Tooltip.prototype, "placement", void 0);
__decorate([
    query('#tip')
], Tooltip.prototype, "tipElement", void 0);
__decorate([
    property({ type: String })
], Tooltip.prototype, "variant", null);
//# sourceMappingURL=Tooltip.js.map