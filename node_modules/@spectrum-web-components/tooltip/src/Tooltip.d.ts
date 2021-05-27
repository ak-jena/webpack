import { CSSResultArray, TemplateResult, SpectrumElement } from '@spectrum-web-components/base';
import { OverlayDisplayQueryDetail, Placement } from '@spectrum-web-components/overlay';
/**
 * @slot icon - The icon that appears on the left of the label
 * @slot - The label
 */
export declare class Tooltip extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * @private
     */
    static instanceCount: number;
    private _tooltipId;
    open: boolean;
    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */
    placement: Placement;
    private tipElement;
    private _variant;
    get variant(): string;
    set variant(variant: string);
    constructor();
    onOverlayQuery(event: CustomEvent<OverlayDisplayQueryDetail>): void;
    render(): TemplateResult;
    private _proxy?;
    overlayWillOpenCallback({ trigger, }: {
        trigger: HTMLElement;
    }): void;
    overlayOpenCancelledCallback({ trigger, }: {
        trigger: HTMLElement;
    }): void;
    overlayCloseCallback({ trigger }: {
        trigger: HTMLElement;
    }): void;
    private removeProxy;
}
