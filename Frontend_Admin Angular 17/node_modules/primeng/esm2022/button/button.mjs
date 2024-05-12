import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, Inject, Input, NgModule, Output, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils } from 'primeng/utils';
import { AutoFocusModule } from 'primeng/autofocus';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
import * as i3 from "primeng/autofocus";
const INTERNAL_BUTTON_CLASSES = {
    button: 'p-button',
    component: 'p-component',
    iconOnly: 'p-button-icon-only',
    disabled: 'p-disabled',
    loading: 'p-button-loading',
    labelOnly: 'p-button-loading-label-only'
};
/**
 * Button directive is an extension to button component.
 * @group Components
 */
export class ButtonDirective {
    el;
    document;
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'left';
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     * @group Props
     */
    loadingIcon;
    /**
     * Text of the button.
     * @group Props
     */
    get label() {
        return this._label;
    }
    set label(val) {
        this._label = val;
        if (this.initialized) {
            this.updateLabel();
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Name of the icon.
     * @group Props
     */
    get icon() {
        return this._icon;
    }
    set icon(val) {
        this._icon = val;
        if (this.initialized) {
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Whether the button is in loading state.
     * @group Props
     */
    get loading() {
        return this._loading;
    }
    set loading(val) {
        this._loading = val;
        if (this.initialized) {
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Defines the style of the button.
     * @group Props
     */
    severity;
    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    raised = false;
    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    rounded = false;
    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    text = false;
    /**
     * Add a border class without a background initially.
     * @group Props
     */
    outlined = false;
    /**
     * Defines the size of the button.
     * @group Props
     */
    size = null;
    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    plain = false;
    _label;
    _icon;
    _loading = false;
    initialized;
    get htmlElement() {
        return this.el.nativeElement;
    }
    _internalClasses = Object.values(INTERNAL_BUTTON_CLASSES);
    spinnerIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;
    constructor(el, document) {
        this.el = el;
        this.document = document;
    }
    ngAfterViewInit() {
        DomHandler.addMultipleClasses(this.htmlElement, this.getStyleClass().join(' '));
        this.createIcon();
        this.createLabel();
        this.initialized = true;
    }
    getStyleClass() {
        const styleClass = [INTERNAL_BUTTON_CLASSES.button, INTERNAL_BUTTON_CLASSES.component];
        if (this.icon && !this.label && ObjectUtils.isEmpty(this.htmlElement.textContent)) {
            styleClass.push(INTERNAL_BUTTON_CLASSES.iconOnly);
        }
        if (this.loading) {
            styleClass.push(INTERNAL_BUTTON_CLASSES.disabled, INTERNAL_BUTTON_CLASSES.loading);
            if (!this.icon && this.label) {
                styleClass.push(INTERNAL_BUTTON_CLASSES.labelOnly);
            }
            if (this.icon && !this.label && !ObjectUtils.isEmpty(this.htmlElement.textContent)) {
                styleClass.push(INTERNAL_BUTTON_CLASSES.iconOnly);
            }
        }
        if (this.text) {
            styleClass.push('p-button-text');
        }
        if (this.severity) {
            styleClass.push(`p-button-${this.severity}`);
        }
        if (this.plain) {
            styleClass.push('p-button-plain');
        }
        if (this.raised) {
            styleClass.push('p-button-raised');
        }
        if (this.size) {
            styleClass.push(`p-button-${this.size}`);
        }
        if (this.outlined) {
            styleClass.push('p-button-outlined');
        }
        if (this.rounded) {
            styleClass.push('p-button-rounded');
        }
        if (this.size === 'small') {
            styleClass.push('p-button-sm');
        }
        if (this.size === 'large') {
            styleClass.push('p-button-lg');
        }
        return styleClass;
    }
    setStyleClass() {
        const styleClass = this.getStyleClass();
        this.htmlElement.classList.remove(...this._internalClasses);
        this.htmlElement.classList.add(...styleClass);
    }
    createLabel() {
        const created = DomHandler.findSingle(this.htmlElement, '.p-button-label');
        if (!created && this.label) {
            let labelElement = this.document.createElement('span');
            if (this.icon && !this.label) {
                labelElement.setAttribute('aria-hidden', 'true');
            }
            labelElement.className = 'p-button-label';
            labelElement.appendChild(this.document.createTextNode(this.label));
            this.htmlElement.appendChild(labelElement);
        }
    }
    createIcon() {
        const created = DomHandler.findSingle(this.htmlElement, '.p-button-icon');
        if (!created && (this.icon || this.loading)) {
            let iconElement = this.document.createElement('span');
            iconElement.className = 'p-button-icon';
            iconElement.setAttribute('aria-hidden', 'true');
            let iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;
            if (iconPosClass) {
                DomHandler.addClass(iconElement, iconPosClass);
            }
            let iconClass = this.getIconClass();
            if (iconClass) {
                DomHandler.addMultipleClasses(iconElement, iconClass);
            }
            if (!this.loadingIcon && this.loading) {
                iconElement.innerHTML = this.spinnerIcon;
            }
            this.htmlElement.insertBefore(iconElement, this.htmlElement.firstChild);
        }
    }
    updateLabel() {
        let labelElement = DomHandler.findSingle(this.htmlElement, '.p-button-label');
        if (!this.label) {
            labelElement && this.htmlElement.removeChild(labelElement);
            return;
        }
        labelElement ? (labelElement.textContent = this.label) : this.createLabel();
    }
    updateIcon() {
        let iconElement = DomHandler.findSingle(this.htmlElement, '.p-button-icon');
        let labelElement = DomHandler.findSingle(this.htmlElement, '.p-button-label');
        if (this.loading && !this.loadingIcon && iconElement) {
            iconElement.innerHTML = this.spinnerIcon;
        }
        else if (iconElement?.innerHTML) {
            iconElement.innerHTML = '';
        }
        if (iconElement) {
            if (this.iconPos) {
                iconElement.className = 'p-button-icon ' + (labelElement ? 'p-button-icon-' + this.iconPos : '') + ' ' + this.getIconClass();
            }
            else {
                iconElement.className = 'p-button-icon ' + this.getIconClass();
            }
        }
        else {
            this.createIcon();
        }
    }
    getIconClass() {
        return this.loading ? 'p-button-loading-icon ' + (this.loadingIcon ? this.loadingIcon : 'p-icon') : this.icon || 'p-hidden';
    }
    ngOnDestroy() {
        this.initialized = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonDirective, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: ButtonDirective, selector: "[pButton]", inputs: { iconPos: "iconPos", loadingIcon: "loadingIcon", label: "label", icon: "icon", loading: "loading", severity: "severity", raised: ["raised", "raised", booleanAttribute], rounded: ["rounded", "rounded", booleanAttribute], text: ["text", "text", booleanAttribute], outlined: ["outlined", "outlined", booleanAttribute], size: "size", plain: ["plain", "plain", booleanAttribute] }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pButton]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }], propDecorators: { iconPos: [{
                type: Input
            }], loadingIcon: [{
                type: Input
            }], label: [{
                type: Input
            }], icon: [{
                type: Input
            }], loading: [{
                type: Input
            }], severity: [{
                type: Input
            }], raised: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], rounded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], text: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], outlined: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], size: [{
                type: Input
            }], plain: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
/**
 * Button is an extension to standard button element with icons and theming.
 * @group Components
 */
export class Button {
    el;
    /**
     * Type of the button.
     * @group Props
     */
    type = 'button';
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'left';
    /**
     * Name of the icon.
     * @group Props
     */
    icon;
    /**
     * Value of the badge.
     * @group Props
     */
    badge;
    /**
     * Uses to pass attributes to the label's DOM element.
     * @group Props
     */
    label;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Whether the button is in loading state.
     * @group Props
     */
    loading = false;
    /**
     * Icon to display in loading state.
     * @group Props
     */
    loadingIcon;
    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    raised = false;
    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    rounded = false;
    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    text = false;
    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    plain = false;
    /**
     * Defines the style of the button.
     * @group Props
     */
    severity;
    /**
     * Add a border class without a background initially.
     * @group Props
     */
    outlined = false;
    /**
     * Add a link style to the button.
     * @group Props
     */
    link = false;
    /**
     * Add a tabindex to the button.
     * @group Props
     */
    tabindex;
    /**
     * Defines the size of the button.
     * @group Props
     */
    size;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the badge.
     * @group Props
     */
    badgeClass;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    ariaLabel;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * Callback to execute when button is clicked.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (click).
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick = new EventEmitter();
    /**
     * Callback to execute when button is focused.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (focus).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to execute when button loses focus.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (blur).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    contentTemplate;
    loadingIconTemplate;
    iconTemplate;
    templates;
    constructor(el) {
        this.el = el;
    }
    spinnerIconClass() {
        return Object.entries(this.iconClass())
            .filter(([, value]) => !!value)
            .reduce((acc, [key]) => acc + ` ${key}`, 'p-button-loading-icon');
    }
    iconClass() {
        return {
            'p-button-icon': true,
            'p-button-icon-left': this.iconPos === 'left' && this.label,
            'p-button-icon-right': this.iconPos === 'right' && this.label,
            'p-button-icon-top': this.iconPos === 'top' && this.label,
            'p-button-icon-bottom': this.iconPos === 'bottom' && this.label
        };
    }
    get buttonClass() {
        return {
            'p-button p-component': true,
            'p-button-icon-only': (this.icon || this.iconTemplate || this.loadingIcon || this.loadingIconTemplate) && !this.label,
            'p-button-vertical': (this.iconPos === 'top' || this.iconPos === 'bottom') && this.label,
            'p-disabled': this.disabled || this.loading,
            'p-button-loading': this.loading,
            'p-button-loading-label-only': this.loading && !this.icon && this.label && !this.loadingIcon && this.iconPos === 'left',
            'p-button-link': this.link,
            [`p-button-${this.severity}`]: this.severity,
            'p-button-raised': this.raised,
            'p-button-rounded': this.rounded,
            'p-button-text': this.text,
            'p-button-outlined': this.outlined,
            'p-button-sm': this.size === 'small',
            'p-button-lg': this.size === 'large',
            'p-button-plain': this.plain,
            [`${this.styleClass}`]: this.styleClass
        };
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    badgeStyleClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.badge && String(this.badge).length === 1
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Button, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: Button, selector: "p-button", inputs: { type: "type", iconPos: "iconPos", icon: "icon", badge: "badge", label: "label", disabled: ["disabled", "disabled", booleanAttribute], loading: ["loading", "loading", booleanAttribute], loadingIcon: "loadingIcon", raised: ["raised", "raised", booleanAttribute], rounded: ["rounded", "rounded", booleanAttribute], text: ["text", "text", booleanAttribute], plain: ["plain", "plain", booleanAttribute], severity: "severity", outlined: ["outlined", "outlined", booleanAttribute], link: ["link", "link", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], size: "size", style: "style", styleClass: "styleClass", badgeClass: "badgeClass", ariaLabel: "ariaLabel", autofocus: ["autofocus", "autofocus", booleanAttribute] }, outputs: { onClick: "onClick", onFocus: "onFocus", onBlur: "onBlur" }, host: { properties: { "class.p-disabled": "disabled" }, classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <button
            [attr.type]="type"
            [attr.aria-label]="ariaLabel"
            [ngStyle]="style"
            [disabled]="disabled || loading"
            [ngClass]="buttonClass"
            (click)="onClick.emit($event)"
            (focus)="onFocus.emit($event)"
            (blur)="onBlur.emit($event)"
            pRipple
            [attr.data-pc-name]="'button'"
            [attr.data-pc-section]="'root'"
            [attr.tabindex]="tabindex"
            pAutoFocus
            [autofocus]="autofocus"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <ng-container *ngIf="loading">
                <ng-container *ngIf="!loadingIconTemplate">
                    <span *ngIf="loadingIcon" [class]="'p-button-loading-icon pi-spin ' + loadingIcon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'"></span>
                    <SpinnerIcon *ngIf="!loadingIcon" [styleClass]="spinnerIconClass()" [spin]="true" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'" />
                </ng-container>
                <span *ngIf="loadingIconTemplate" class="p-button-loading-icon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <ng-container *ngIf="!loading">
                <span *ngIf="icon && !iconTemplate" [class]="icon" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'"></span>
                <span *ngIf="!icon && iconTemplate" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'">
                    <ng-template [ngIf]="!icon" *ngTemplateOutlet="iconTemplate"></ng-template>
                </span>
            </ng-container>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate && label" [attr.data-pc-section]="'label'">{{ label }}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge" [attr.data-pc-section]="'badge'">{{ badge }}</span>
        </button>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.Ripple), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(() => i3.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: Button, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-button',
                    template: `
        <button
            [attr.type]="type"
            [attr.aria-label]="ariaLabel"
            [ngStyle]="style"
            [disabled]="disabled || loading"
            [ngClass]="buttonClass"
            (click)="onClick.emit($event)"
            (focus)="onFocus.emit($event)"
            (blur)="onBlur.emit($event)"
            pRipple
            [attr.data-pc-name]="'button'"
            [attr.data-pc-section]="'root'"
            [attr.tabindex]="tabindex"
            pAutoFocus
            [autofocus]="autofocus"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <ng-container *ngIf="loading">
                <ng-container *ngIf="!loadingIconTemplate">
                    <span *ngIf="loadingIcon" [class]="'p-button-loading-icon pi-spin ' + loadingIcon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'"></span>
                    <SpinnerIcon *ngIf="!loadingIcon" [styleClass]="spinnerIconClass()" [spin]="true" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'" />
                </ng-container>
                <span *ngIf="loadingIconTemplate" class="p-button-loading-icon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <ng-container *ngIf="!loading">
                <span *ngIf="icon && !iconTemplate" [class]="icon" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'"></span>
                <span *ngIf="!icon && iconTemplate" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'">
                    <ng-template [ngIf]="!icon" *ngTemplateOutlet="iconTemplate"></ng-template>
                </span>
            </ng-container>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate && label" [attr.data-pc-section]="'label'">{{ label }}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge" [attr.data-pc-section]="'badge'">{{ badge }}</span>
        </button>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element',
                        '[class.p-disabled]': 'disabled' || 'loading'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { type: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], icon: [{
                type: Input
            }], badge: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loadingIcon: [{
                type: Input
            }], raised: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], rounded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], text: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], plain: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], severity: [{
                type: Input
            }], outlined: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], link: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], size: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], badgeClass: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onClick: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: ButtonModule, declarations: [ButtonDirective, Button], imports: [CommonModule, RippleModule, SharedModule, AutoFocusModule, SpinnerIcon], exports: [ButtonDirective, Button, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonModule, imports: [CommonModule, RippleModule, SharedModule, AutoFocusModule, SpinnerIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: ButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, SharedModule, AutoFocusModule, SpinnerIcon],
                    exports: [ButtonDirective, Button, SharedModule],
                    declarations: [ButtonDirective, Button]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2J1dHRvbi9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFFUixNQUFNLEVBR04saUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFJcEQsTUFBTSx1QkFBdUIsR0FBRztJQUM1QixNQUFNLEVBQUUsVUFBVTtJQUNsQixTQUFTLEVBQUUsYUFBYTtJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLE9BQU8sRUFBRSxrQkFBa0I7SUFDM0IsU0FBUyxFQUFFLDZCQUE2QjtDQUNsQyxDQUFDO0FBQ1g7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGVBQWU7SUF5SEw7SUFBMEM7SUF4SDdEOzs7T0FHRztJQUNNLE9BQU8sR0FBdUIsTUFBTSxDQUFDO0lBQzlDOzs7T0FHRztJQUNNLFdBQVcsQ0FBcUI7SUFDekM7OztPQUdH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O2dCQUtHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUtrQyxTQUFTO3NCQUFoRCxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQU81QixPQUFPO3NCQUFoQixNQUFNO2dCQU9HLE9BQU87c0JBQWhCLE1BQU07Z0JBT0csTUFBTTtzQkFBZixNQUFNO2dCQVF5QixTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7O0FBNEVsQyxNQUFNLE9BQU8sWUFBWTt1R0FBWixZQUFZO3dHQUFaLFlBQVksaUJBL2hCWixlQUFlLEVBd1VmLE1BQU0sYUFtTkwsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLFdBQVcsYUEzaEJ2RSxlQUFlLEVBd1VmLE1BQU0sRUFvTm9CLFlBQVk7d0dBR3RDLFlBQVksWUFKWCxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUM3QyxZQUFZOzsyRkFHdEMsWUFBWTtrQkFMeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDO29CQUNqRixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQztvQkFDaEQsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQztpQkFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBib29sZWFuQXR0cmlidXRlLFxuICAgIG51bWJlckF0dHJpYnV0ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBTcGlubmVySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc3Bpbm5lcic7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgQXV0b0ZvY3VzTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hdXRvZm9jdXMnO1xuXG50eXBlIEJ1dHRvbkljb25Qb3NpdGlvbiA9ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wJyB8ICdib3R0b20nO1xuXG5jb25zdCBJTlRFUk5BTF9CVVRUT05fQ0xBU1NFUyA9IHtcbiAgICBidXR0b246ICdwLWJ1dHRvbicsXG4gICAgY29tcG9uZW50OiAncC1jb21wb25lbnQnLFxuICAgIGljb25Pbmx5OiAncC1idXR0b24taWNvbi1vbmx5JyxcbiAgICBkaXNhYmxlZDogJ3AtZGlzYWJsZWQnLFxuICAgIGxvYWRpbmc6ICdwLWJ1dHRvbi1sb2FkaW5nJyxcbiAgICBsYWJlbE9ubHk6ICdwLWJ1dHRvbi1sb2FkaW5nLWxhYmVsLW9ubHknXG59IGFzIGNvbnN0O1xuLyoqXG4gKiBCdXR0b24gZGlyZWN0aXZlIGlzIGFuIGV4dGVuc2lvbiB0byBidXR0b24gY29tcG9uZW50LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcEJ1dHRvbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25Qb3M6IEJ1dHRvbkljb25Qb3NpdGlvbiA9ICdsZWZ0JztcbiAgICAvKipcbiAgICAgKiBVc2VzIHRvIHBhc3MgYXR0cmlidXRlcyB0byB0aGUgbG9hZGluZyBpY29uJ3MgRE9NIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbG9hZGluZ0ljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUZXh0IG9mIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYWJlbCBhcyBzdHJpbmc7XG4gICAgfVxuICAgIHNldCBsYWJlbCh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9sYWJlbCA9IHZhbDtcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJY29uKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBpY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pY29uIGFzIHN0cmluZztcbiAgICB9XG4gICAgc2V0IGljb24odmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWNvbiA9IHZhbDtcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJY29uKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBidXR0b24gaXMgaW4gbG9hZGluZyBzdGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbG9hZGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gICAgfVxuICAgIHNldCBsb2FkaW5nKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9sb2FkaW5nID0gdmFsO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUljb24oKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVDbGFzcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHN0eWxlIG9mIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6ICdzdWNjZXNzJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgJ2hlbHAnIHwgJ3ByaW1hcnknIHwgJ3NlY29uZGFyeScgfCAnY29udHJhc3QnIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBzaGFkb3cgdG8gaW5kaWNhdGUgZWxldmF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByYWlzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBjaXJjdWxhciBib3JkZXIgcmFkaXVzIHRvIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJvdW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBBZGQgYSB0ZXh0dWFsIGNsYXNzIHRvIHRoZSBidXR0b24gd2l0aG91dCBhIGJhY2tncm91bmQgaW5pdGlhbGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB0ZXh0OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQWRkIGEgYm9yZGVyIGNsYXNzIHdpdGhvdXQgYSBiYWNrZ3JvdW5kIGluaXRpYWxseS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgb3V0bGluZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBzaXplIG9mIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2l6ZTogJ3NtYWxsJyB8ICdsYXJnZScgfCB1bmRlZmluZWQgfCBudWxsID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBwbGFpbiB0ZXh0dWFsIGNsYXNzIHRvIHRoZSBidXR0b24gd2l0aG91dCBhIGJhY2tncm91bmQgaW5pdGlhbGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBwbGFpbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIF9sYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIF9pY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgX2xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBpbml0aWFsaXplZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgZ2V0IGh0bWxFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbnRlcm5hbENsYXNzZXM6IHN0cmluZ1tdID0gT2JqZWN0LnZhbHVlcyhJTlRFUk5BTF9CVVRUT05fQ0xBU1NFUyk7XG5cbiAgICBzcGlubmVySWNvbiA9IGA8c3ZnIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIHZpZXdCb3g9XCIwIDAgMTQgMTRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cInAtaWNvbi1zcGluXCI+XG4gICAgICAgIDxnIGNsaXAtcGF0aD1cInVybCgjY2xpcDBfNDE3XzIxNDA4KVwiPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICBkPVwiTTYuOTk3MDEgMTRDNS44NTQ0MSAxMy45OTkgNC43MjkzOSAxMy43MTg2IDMuNzIwMTIgMTMuMTgzMkMyLjcxMDg0IDEyLjY0NzggMS44NDc5NSAxMS44NzM3IDEuMjA2NzMgMTAuOTI4NEMwLjU2NTUwNCA5Ljk4MzA1IDAuMTY1NDI0IDguODk1MjYgMC4wNDEzODcgNy43NTk4OUMtMC4wODI2NDk2IDYuNjI0NTMgMC4wNzMxMjUgNS40NzYwNyAwLjQ5NTEyMiA0LjQxNDdDMC45MTcxMTkgMy4zNTMzMyAxLjU5MjUyIDIuNDExMyAyLjQ2MjQxIDEuNjcwNzdDMy4zMzIyOSAwLjkzMDI0NyA0LjM3MDI0IDAuNDEzNzI5IDUuNDg1NyAwLjE2NjI3NUM2LjYwMTE3IC0wLjA4MTE3OTYgNy43NjAyNiAtMC4wNTIwNTM1IDguODYxODggMC4yNTExMTJDOS45NjM1IDAuNTU0Mjc4IDEwLjk3NDIgMS4xMjIyNyAxMS44MDU3IDEuOTA1NTVDMTEuOTE1IDIuMDE0OTMgMTEuOTc2NCAyLjE2MzE5IDExLjk3NjQgMi4zMTc3OEMxMS45NzY0IDIuNDcyMzYgMTEuOTE1IDIuNjIwNjIgMTEuODA1NyAyLjczQzExLjc1MjEgMi43ODUwMyAxMS42ODggMi44Mjg3NyAxMS42MTcxIDIuODU4NjRDMTEuNTQ2MyAyLjg4ODUgMTEuNDcwMiAyLjkwMzg5IDExLjM5MzMgMi45MDM4OUMxMS4zMTY1IDIuOTAzODkgMTEuMjQwNCAyLjg4ODUgMTEuMTY5NSAyLjg1ODY0QzExLjA5ODcgMi44Mjg3NyAxMS4wMzQ2IDIuNzg1MDMgMTAuOTgwOSAyLjczQzkuOTk5OCAxLjgxMjczIDguNzMyNDYgMS4yNjEzOCA3LjM5MjI2IDEuMTY4NzZDNi4wNTIwNiAxLjA3NjE1IDQuNzIwODYgMS40NDc5NCAzLjYyMjc5IDIuMjIxNTJDMi41MjQ3MSAyLjk5NTExIDEuNzI2ODMgNC4xMjMyNSAxLjM2MzQ1IDUuNDE2MDJDMS4wMDAwOCA2LjcwODc5IDEuMDkzNDIgOC4wODcyMyAxLjYyNzc1IDkuMzE5MjZDMi4xNjIwOSAxMC41NTEzIDMuMTA0NzggMTEuNTYxNyA0LjI5NzEzIDEyLjE4MDNDNS40ODk0NyAxMi43OTg5IDYuODU4NjUgMTIuOTg4IDguMTc0MTQgMTIuNzE1N0M5LjQ4OTYzIDEyLjQ0MzUgMTAuNjcxMSAxMS43MjY0IDExLjUxOTYgMTAuNjg1NEMxMi4zNjgxIDkuNjQ0MzIgMTIuODMxOSA4LjM0MjgyIDEyLjgzMjggN0MxMi44MzI4IDYuODQ1MjkgMTIuODk0MyA2LjY5NjkyIDEzLjAwMzggNi41ODc1MkMxMy4xMTMyIDYuNDc4MTIgMTMuMjYxNiA2LjQxNjY3IDEzLjQxNjQgNi40MTY2N0MxMy41NzEyIDYuNDE2NjcgMTMuNzE5NiA2LjQ3ODEyIDEzLjgyOTEgNi41ODc1MkMxMy45Mzg1IDYuNjk2OTIgMTQgNi44NDUyOSAxNCA3QzE0IDguODU2NTEgMTMuMjYyMiAxMC42MzcgMTEuOTQ4OSAxMS45NDk3QzEwLjYzNTYgMTMuMjYyNSA4Ljg1NDMyIDE0IDYuOTk3MDEgMTRaXCJcbiAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZz5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwMF80MTdfMjE0MDhcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiBmaWxsPVwid2hpdGVcIiAvPlxuICAgICAgICAgICAgPC9jbGlwUGF0aD5cbiAgICAgICAgPC9kZWZzPlxuICAgIDwvc3ZnPmA7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50KSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBEb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3Nlcyh0aGlzLmh0bWxFbGVtZW50LCB0aGlzLmdldFN0eWxlQ2xhc3MoKS5qb2luKCcgJykpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlSWNvbigpO1xuICAgICAgICB0aGlzLmNyZWF0ZUxhYmVsKCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0U3R5bGVDbGFzcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHN0eWxlQ2xhc3M6IHN0cmluZ1tdID0gW0lOVEVSTkFMX0JVVFRPTl9DTEFTU0VTLmJ1dHRvbiwgSU5URVJOQUxfQlVUVE9OX0NMQVNTRVMuY29tcG9uZW50XTtcblxuICAgICAgICBpZiAodGhpcy5pY29uICYmICF0aGlzLmxhYmVsICYmIE9iamVjdFV0aWxzLmlzRW1wdHkodGhpcy5odG1sRWxlbWVudC50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgICAgIHN0eWxlQ2xhc3MucHVzaChJTlRFUk5BTF9CVVRUT05fQ0xBU1NFUy5pY29uT25seSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzLnB1c2goSU5URVJOQUxfQlVUVE9OX0NMQVNTRVMuZGlzYWJsZWQsIElOVEVSTkFMX0JVVFRPTl9DTEFTU0VTLmxvYWRpbmcpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaWNvbiAmJiB0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVDbGFzcy5wdXNoKElOVEVSTkFMX0JVVFRPTl9DTEFTU0VTLmxhYmVsT25seSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmljb24gJiYgIXRoaXMubGFiZWwgJiYgIU9iamVjdFV0aWxzLmlzRW1wdHkodGhpcy5odG1sRWxlbWVudC50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgICAgICAgICBzdHlsZUNsYXNzLnB1c2goSU5URVJOQUxfQlVUVE9OX0NMQVNTRVMuaWNvbk9ubHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGV4dCkge1xuICAgICAgICAgICAgc3R5bGVDbGFzcy5wdXNoKCdwLWJ1dHRvbi10ZXh0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZXZlcml0eSkge1xuICAgICAgICAgICAgc3R5bGVDbGFzcy5wdXNoKGBwLWJ1dHRvbi0ke3RoaXMuc2V2ZXJpdHl9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wbGFpbikge1xuICAgICAgICAgICAgc3R5bGVDbGFzcy5wdXNoKCdwLWJ1dHRvbi1wbGFpbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmFpc2VkKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzLnB1c2goJ3AtYnV0dG9uLXJhaXNlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgc3R5bGVDbGFzcy5wdXNoKGBwLWJ1dHRvbi0ke3RoaXMuc2l6ZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm91dGxpbmVkKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzLnB1c2goJ3AtYnV0dG9uLW91dGxpbmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb3VuZGVkKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzLnB1c2goJ3AtYnV0dG9uLXJvdW5kZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNpemUgPT09ICdzbWFsbCcpIHtcbiAgICAgICAgICAgIHN0eWxlQ2xhc3MucHVzaCgncC1idXR0b24tc20nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNpemUgPT09ICdsYXJnZScpIHtcbiAgICAgICAgICAgIHN0eWxlQ2xhc3MucHVzaCgncC1idXR0b24tbGcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHlsZUNsYXNzO1xuICAgIH1cblxuICAgIHNldFN0eWxlQ2xhc3MoKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlQ2xhc3MgPSB0aGlzLmdldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX2ludGVybmFsQ2xhc3Nlcyk7XG4gICAgICAgIHRoaXMuaHRtbEVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5zdHlsZUNsYXNzKTtcbiAgICB9XG5cbiAgICBjcmVhdGVMYWJlbCgpIHtcbiAgICAgICAgY29uc3QgY3JlYXRlZCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmh0bWxFbGVtZW50LCAnLnAtYnV0dG9uLWxhYmVsJyk7XG4gICAgICAgIGlmICghY3JlYXRlZCAmJiB0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWxFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5pY29uICYmICF0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYWJlbEVsZW1lbnQuY2xhc3NOYW1lID0gJ3AtYnV0dG9uLWxhYmVsJztcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMubGFiZWwpKTtcblxuICAgICAgICAgICAgdGhpcy5odG1sRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlSWNvbigpIHtcbiAgICAgICAgY29uc3QgY3JlYXRlZCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmh0bWxFbGVtZW50LCAnLnAtYnV0dG9uLWljb24nKTtcbiAgICAgICAgaWYgKCFjcmVhdGVkICYmICh0aGlzLmljb24gfHwgdGhpcy5sb2FkaW5nKSkge1xuICAgICAgICAgICAgbGV0IGljb25FbGVtZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSAncC1idXR0b24taWNvbic7XG4gICAgICAgICAgICBpY29uRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgIGxldCBpY29uUG9zQ2xhc3MgPSB0aGlzLmxhYmVsID8gJ3AtYnV0dG9uLWljb24tJyArIHRoaXMuaWNvblBvcyA6IG51bGw7XG5cbiAgICAgICAgICAgIGlmIChpY29uUG9zQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGljb25FbGVtZW50LCBpY29uUG9zQ2xhc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaWNvbkNsYXNzID0gdGhpcy5nZXRJY29uQ2xhc3MoKTtcblxuICAgICAgICAgICAgaWYgKGljb25DbGFzcykge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKGljb25FbGVtZW50LCBpY29uQ2xhc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMubG9hZGluZ0ljb24gJiYgdGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5zcGlubmVySWNvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5odG1sRWxlbWVudC5pbnNlcnRCZWZvcmUoaWNvbkVsZW1lbnQsIHRoaXMuaHRtbEVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVMYWJlbCgpIHtcbiAgICAgICAgbGV0IGxhYmVsRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmh0bWxFbGVtZW50LCAnLnAtYnV0dG9uLWxhYmVsJyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICBsYWJlbEVsZW1lbnQgJiYgdGhpcy5odG1sRWxlbWVudC5yZW1vdmVDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGFiZWxFbGVtZW50ID8gKGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMubGFiZWwpIDogdGhpcy5jcmVhdGVMYWJlbCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUljb24oKSB7XG4gICAgICAgIGxldCBpY29uRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmh0bWxFbGVtZW50LCAnLnAtYnV0dG9uLWljb24nKTtcbiAgICAgICAgbGV0IGxhYmVsRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmh0bWxFbGVtZW50LCAnLnAtYnV0dG9uLWxhYmVsJyk7XG5cbiAgICAgICAgaWYgKHRoaXMubG9hZGluZyAmJiAhdGhpcy5sb2FkaW5nSWNvbiAmJiBpY29uRWxlbWVudCkge1xuICAgICAgICAgICAgaWNvbkVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5zcGlubmVySWNvbjtcbiAgICAgICAgfSBlbHNlIGlmIChpY29uRWxlbWVudD8uaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICBpY29uRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpY29uRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWNvblBvcykge1xuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZSA9ICdwLWJ1dHRvbi1pY29uICcgKyAobGFiZWxFbGVtZW50ID8gJ3AtYnV0dG9uLWljb24tJyArIHRoaXMuaWNvblBvcyA6ICcnKSArICcgJyArIHRoaXMuZ2V0SWNvbkNsYXNzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZSA9ICdwLWJ1dHRvbi1pY29uICcgKyB0aGlzLmdldEljb25DbGFzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJY29uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJY29uQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmcgPyAncC1idXR0b24tbG9hZGluZy1pY29uICcgKyAodGhpcy5sb2FkaW5nSWNvbiA/IHRoaXMubG9hZGluZ0ljb24gOiAncC1pY29uJykgOiB0aGlzLmljb24gfHwgJ3AtaGlkZGVuJztcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cbn1cbi8qKlxuICogQnV0dG9uIGlzIGFuIGV4dGVuc2lvbiB0byBzdGFuZGFyZCBidXR0b24gZWxlbWVudCB3aXRoIGljb25zIGFuZCB0aGVtaW5nLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgW2F0dHIudHlwZV09XCJ0eXBlXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBsb2FkaW5nXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImJ1dHRvbkNsYXNzXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cy5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKGJsdXIpPVwib25CbHVyLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2J1dHRvbidcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiXG4gICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICBwQXV0b0ZvY3VzXG4gICAgICAgICAgICBbYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFsb2FkaW5nSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibG9hZGluZ0ljb25cIiBbY2xhc3NdPVwiJ3AtYnV0dG9uLWxvYWRpbmctaWNvbiBwaS1zcGluICcgKyBsb2FkaW5nSWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzcygpXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbG9hZGluZ2ljb24nXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8U3Bpbm5lckljb24gKm5nSWY9XCIhbG9hZGluZ0ljb25cIiBbc3R5bGVDbGFzc109XCJzcGlubmVySWNvbkNsYXNzKClcIiBbc3Bpbl09XCJ0cnVlXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbG9hZGluZ2ljb24nXCIgLz5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImxvYWRpbmdJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtYnV0dG9uLWxvYWRpbmctaWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzcygpXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbG9hZGluZ2ljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImxvYWRpbmdJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFsb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpY29uICYmICFpY29uVGVtcGxhdGVcIiBbY2xhc3NdPVwiaWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzcygpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpY29uJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpY29uICYmIGljb25UZW1wbGF0ZVwiIFtuZ0NsYXNzXT1cImljb25DbGFzcygpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWljb25cIiAqbmdUZW1wbGF0ZU91dGxldD1cImljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtYnV0dG9uLWxhYmVsXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiaWNvbiAmJiAhbGFiZWxcIiAqbmdJZj1cIiFjb250ZW50VGVtcGxhdGUgJiYgbGFiZWxcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xhYmVsJ1wiPnt7IGxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwiYmFkZ2VTdHlsZUNsYXNzKClcIiBbY2xhc3NdPVwiYmFkZ2VDbGFzc1wiICpuZ0lmPVwiIWNvbnRlbnRUZW1wbGF0ZSAmJiBiYWRnZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInYmFkZ2UnXCI+e3sgYmFkZ2UgfX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50JyxcbiAgICAgICAgJ1tjbGFzcy5wLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcgfHwgJ2xvYWRpbmcnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b24gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nID0gJ2J1dHRvbic7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gb2YgdGhlIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvblBvczogQnV0dG9uSWNvblBvc2l0aW9uID0gJ2xlZnQnO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFZhbHVlIG9mIHRoZSBiYWRnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBiYWRnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZXMgdG8gcGFzcyBhdHRyaWJ1dGVzIHRvIHRoZSBsYWJlbCdzIERPTSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYnV0dG9uIGlzIGluIGxvYWRpbmcgc3RhdGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJY29uIHRvIGRpc3BsYXkgaW4gbG9hZGluZyBzdGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsb2FkaW5nSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFkZCBhIHNoYWRvdyB0byBpbmRpY2F0ZSBlbGV2YXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJhaXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEFkZCBhIGNpcmN1bGFyIGJvcmRlciByYWRpdXMgdG8gdGhlIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcm91bmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEFkZCBhIHRleHR1YWwgY2xhc3MgdG8gdGhlIGJ1dHRvbiB3aXRob3V0IGEgYmFja2dyb3VuZCBpbml0aWFsbHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHRleHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBwbGFpbiB0ZXh0dWFsIGNsYXNzIHRvIHRoZSBidXR0b24gd2l0aG91dCBhIGJhY2tncm91bmQgaW5pdGlhbGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBwbGFpbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHN0eWxlIG9mIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6ICdzZWNvbmRhcnknIHwgJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2hlbHAnIHwgJ2RhbmdlcicgfCAnY29udHJhc3QnIHwgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFkZCBhIGJvcmRlciBjbGFzcyB3aXRob3V0IGEgYmFja2dyb3VuZCBpbml0aWFsbHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIG91dGxpbmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQWRkIGEgbGluayBzdHlsZSB0byB0aGUgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBsaW5rOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQWRkIGEgdGFiaW5kZXggdG8gdGhlIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSB0YWJpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHNpemUgb2YgdGhlIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaXplOiAnc21hbGwnIHwgJ2xhcmdlJyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBiYWRnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBiYWRnZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZWZpbmUgYSBzdHJpbmcgdGhhdCBhdXRvY29tcGxldGUgYXR0cmlidXRlIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IHNob3VsZCBhdXRvbWF0aWNhbGx5IGdldCBmb2N1cyBvbiBsb2FkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhdXRvZm9jdXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqIFRoaXMgZXZlbnQgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCB3aXRoIHRoZSA8cC1idXR0b24+IGNvbXBvbmVudC4gVXNpbmcgYSByZWd1bGFyIDxidXR0b24+IGVsZW1lbnQsIHVzZSAoY2xpY2spLlxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgLSBNb3VzZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiBidXR0b24gaXMgZm9jdXNlZC5cbiAgICAgKiBUaGlzIGV2ZW50IGlzIGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aCB0aGUgPHAtYnV0dG9uPiBjb21wb25lbnQuIFVzaW5nIGEgcmVndWxhciA8YnV0dG9uPiBlbGVtZW50LCB1c2UgKGZvY3VzKS5cbiAgICAgKiBAcGFyYW0ge0ZvY3VzRXZlbnR9IGV2ZW50IC0gRm9jdXMgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBleGVjdXRlIHdoZW4gYnV0dG9uIGxvc2VzIGZvY3VzLlxuICAgICAqIFRoaXMgZXZlbnQgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCB3aXRoIHRoZSA8cC1idXR0b24+IGNvbXBvbmVudC4gVXNpbmcgYSByZWd1bGFyIDxidXR0b24+IGVsZW1lbnQsIHVzZSAoYmx1cikuXG4gICAgICogQHBhcmFtIHtGb2N1c0V2ZW50fSBldmVudCAtIEZvY3VzIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGxvYWRpbmdJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBpY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgc3Bpbm5lckljb25DbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy5pY29uQ2xhc3MoKSlcbiAgICAgICAgICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gISF2YWx1ZSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgW2tleV0pID0+IGFjYyArIGAgJHtrZXl9YCwgJ3AtYnV0dG9uLWxvYWRpbmctaWNvbicpO1xuICAgIH1cblxuICAgIGljb25DbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWJ1dHRvbi1pY29uJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWJ1dHRvbi1pY29uLWxlZnQnOiB0aGlzLmljb25Qb3MgPT09ICdsZWZ0JyAmJiB0aGlzLmxhYmVsLFxuICAgICAgICAgICAgJ3AtYnV0dG9uLWljb24tcmlnaHQnOiB0aGlzLmljb25Qb3MgPT09ICdyaWdodCcgJiYgdGhpcy5sYWJlbCxcbiAgICAgICAgICAgICdwLWJ1dHRvbi1pY29uLXRvcCc6IHRoaXMuaWNvblBvcyA9PT0gJ3RvcCcgJiYgdGhpcy5sYWJlbCxcbiAgICAgICAgICAgICdwLWJ1dHRvbi1pY29uLWJvdHRvbSc6IHRoaXMuaWNvblBvcyA9PT0gJ2JvdHRvbScgJiYgdGhpcy5sYWJlbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldCBidXR0b25DbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWJ1dHRvbiBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1idXR0b24taWNvbi1vbmx5JzogKHRoaXMuaWNvbiB8fCB0aGlzLmljb25UZW1wbGF0ZSB8fCB0aGlzLmxvYWRpbmdJY29uIHx8IHRoaXMubG9hZGluZ0ljb25UZW1wbGF0ZSkgJiYgIXRoaXMubGFiZWwsXG4gICAgICAgICAgICAncC1idXR0b24tdmVydGljYWwnOiAodGhpcy5pY29uUG9zID09PSAndG9wJyB8fCB0aGlzLmljb25Qb3MgPT09ICdib3R0b20nKSAmJiB0aGlzLmxhYmVsLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMubG9hZGluZyxcbiAgICAgICAgICAgICdwLWJ1dHRvbi1sb2FkaW5nJzogdGhpcy5sb2FkaW5nLFxuICAgICAgICAgICAgJ3AtYnV0dG9uLWxvYWRpbmctbGFiZWwtb25seSc6IHRoaXMubG9hZGluZyAmJiAhdGhpcy5pY29uICYmIHRoaXMubGFiZWwgJiYgIXRoaXMubG9hZGluZ0ljb24gJiYgdGhpcy5pY29uUG9zID09PSAnbGVmdCcsXG4gICAgICAgICAgICAncC1idXR0b24tbGluayc6IHRoaXMubGluayxcbiAgICAgICAgICAgIFtgcC1idXR0b24tJHt0aGlzLnNldmVyaXR5fWBdOiB0aGlzLnNldmVyaXR5LFxuICAgICAgICAgICAgJ3AtYnV0dG9uLXJhaXNlZCc6IHRoaXMucmFpc2VkLFxuICAgICAgICAgICAgJ3AtYnV0dG9uLXJvdW5kZWQnOiB0aGlzLnJvdW5kZWQsXG4gICAgICAgICAgICAncC1idXR0b24tdGV4dCc6IHRoaXMudGV4dCxcbiAgICAgICAgICAgICdwLWJ1dHRvbi1vdXRsaW5lZCc6IHRoaXMub3V0bGluZWQsXG4gICAgICAgICAgICAncC1idXR0b24tc20nOiB0aGlzLnNpemUgPT09ICdzbWFsbCcsXG4gICAgICAgICAgICAncC1idXR0b24tbGcnOiB0aGlzLnNpemUgPT09ICdsYXJnZScsXG4gICAgICAgICAgICAncC1idXR0b24tcGxhaW4nOiB0aGlzLnBsYWluLFxuICAgICAgICAgICAgW2Ake3RoaXMuc3R5bGVDbGFzc31gXTogdGhpcy5zdHlsZUNsYXNzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkaW5naWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmFkZ2VTdHlsZUNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtYmFkZ2UgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgJ3AtYmFkZ2Utbm8tZ3V0dGVyJzogdGhpcy5iYWRnZSAmJiBTdHJpbmcodGhpcy5iYWRnZSkubGVuZ3RoID09PSAxXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJpcHBsZU1vZHVsZSwgU2hhcmVkTW9kdWxlLCBBdXRvRm9jdXNNb2R1bGUsIFNwaW5uZXJJY29uXSxcbiAgICBleHBvcnRzOiBbQnV0dG9uRGlyZWN0aXZlLCBCdXR0b24sIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQnV0dG9uRGlyZWN0aXZlLCBCdXR0b25dXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbk1vZHVsZSB7fVxuIl19