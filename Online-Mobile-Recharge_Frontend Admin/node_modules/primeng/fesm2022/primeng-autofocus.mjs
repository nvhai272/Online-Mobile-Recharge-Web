import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { booleanAttribute, Directive, Input, NgModule } from '@angular/core';
import { DomHandler } from 'primeng/dom';

/**
 * AutoFocus manages focus on focusable element on load.
 * @group Components
 */
class AutoFocus {
    host;
    constructor(host) {
        this.host = host;
    }
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = false;
    focused = false;
    ngAfterContentChecked() {
        // This sets the `attr.autofocus` which is different than the Input `autofocus` attribute.
        if (this.autofocus === false) {
            this.host.nativeElement.removeAttribute('autofocus');
        }
        else {
            this.host.nativeElement.setAttribute('autofocus', true);
        }
        if (!this.focused) {
            if (this.autofocus) {
                setTimeout(() => {
                    const focusableElements = DomHandler.getFocusableElements(this.host.nativeElement);
                    if (focusableElements.length === 0) {
                        this.host.nativeElement.focus();
                    }
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                    this.focused = true;
                });
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AutoFocus, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: AutoFocus, selector: "[pAutoFocus]", inputs: { autofocus: ["autofocus", "autofocus", booleanAttribute] }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AutoFocus, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pAutoFocus]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
class AutoFocusModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AutoFocusModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: AutoFocusModule, declarations: [AutoFocus], imports: [CommonModule], exports: [AutoFocus] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AutoFocusModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: AutoFocusModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [AutoFocus],
                    declarations: [AutoFocus]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AutoFocus, AutoFocusModule };
//# sourceMappingURL=primeng-autofocus.mjs.map
