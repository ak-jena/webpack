import { UpdatingElement, TemplateResult } from '@spectrum-web-components/base';
declare type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
declare type RenderAnchorOptions = {
    id: string;
    className?: string;
    ariaHidden?: boolean;
    anchorContent?: TemplateResult | TemplateResult[];
};
export interface LikeAnchorInterface {
    download?: string;
    label?: string;
    href?: string;
    rel?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    renderAnchor(options: RenderAnchorOptions): TemplateResult;
}
export declare function LikeAnchor<T extends Constructor<UpdatingElement>>(constructor: T): T & Constructor<LikeAnchorInterface>;
export {};
