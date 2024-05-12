import { DomHandler } from 'primeng/dom';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, NgModule, inject, booleanAttribute } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Focus Trap keeps focus within a certain DOM element while tabbing.
 * @group Components
 */
export class FocusTrap {
    /**
     * When set as true, focus wouldn't be managed.
     * @group Props
     */
    pFocusTrapDisabled = false;
    host = inject(ElementRef);
    onkeydown(e) {
        if (this.pFocusTrapDisabled !== true) {
            e.preventDefault();
            const focusableElement = DomHandler.getNextFocusableElement(this.host.nativeElement, e.shiftKey);
            if (focusableElement) {
                focusableElement.focus();
                focusableElement.select?.();
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FocusTrap, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.3.1", type: FocusTrap, selector: "[pFocusTrap]", inputs: { pFocusTrapDisabled: ["pFocusTrapDisabled", "pFocusTrapDisabled", booleanAttribute] }, host: { listeners: { "keydown.tab": "onkeydown($event)", "keydown.shift.tab": "onkeydown($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FocusTrap, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pFocusTrap]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], propDecorators: { pFocusTrapDisabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onkeydown: [{
                type: HostListener,
                args: ['keydown.tab', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.shift.tab', ['$event']]
            }] } });
export class FocusTrapModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FocusTrapModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: FocusTrapModule, declarations: [FocusTrap], imports: [CommonModule], exports: [FocusTrap] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FocusTrapModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: FocusTrapModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [FocusTrap],
                    declarations: [FocusTrap]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2ZvY3VzdHJhcC9mb2N1c3RyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUMvRzs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sU0FBUztJQUNsQjs7O09BR0c7SUFDcUMsa0JBQWtCLEdBQVksS0FBSyxDQUFDO0lBRTVFLElBQUksR0FBZSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFJdEMsU0FBUyxDQUFDLENBQWdCO1FBQ3RCLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtZQUNsQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsTUFBTSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pHLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ2xCLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN6QixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2FBQy9CO1NBQ0o7SUFDTCxDQUFDO3VHQXBCUSxTQUFTOzJGQUFULFNBQVMsdUdBS0UsZ0JBQWdCOzsyRkFMM0IsU0FBUztrQkFOckIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxXQUFXO3FCQUNyQjtpQkFDSjs4QkFNMkMsa0JBQWtCO3NCQUF6RCxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQU10QyxTQUFTO3NCQUZSLFlBQVk7dUJBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDOztzQkFDdEMsWUFBWTt1QkFBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7QUFrQmpELE1BQU0sT0FBTyxlQUFlO3VHQUFmLGVBQWU7d0dBQWYsZUFBZSxpQkE1QmYsU0FBUyxhQXdCUixZQUFZLGFBeEJiLFNBQVM7d0dBNEJULGVBQWUsWUFKZCxZQUFZOzsyRkFJYixlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgTmdNb2R1bGUsIGluamVjdCwgYm9vbGVhbkF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyoqXG4gKiBGb2N1cyBUcmFwIGtlZXBzIGZvY3VzIHdpdGhpbiBhIGNlcnRhaW4gRE9NIGVsZW1lbnQgd2hpbGUgdGFiYmluZy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BGb2N1c1RyYXBdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRm9jdXNUcmFwIHtcbiAgICAvKipcbiAgICAgKiBXaGVuIHNldCBhcyB0cnVlLCBmb2N1cyB3b3VsZG4ndCBiZSBtYW5hZ2VkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBwRm9jdXNUcmFwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGhvc3Q6IEVsZW1lbnRSZWYgPSBpbmplY3QoRWxlbWVudFJlZik7XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnRhYicsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5zaGlmdC50YWInLCBbJyRldmVudCddKVxuICAgIG9ua2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnBGb2N1c1RyYXBEaXNhYmxlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZm9jdXNhYmxlRWxlbWVudCA9IERvbUhhbmRsZXIuZ2V0TmV4dEZvY3VzYWJsZUVsZW1lbnQodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIGUuc2hpZnRLZXkpO1xuICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudC5zZWxlY3Q/LigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtGb2N1c1RyYXBdLFxuICAgIGRlY2xhcmF0aW9uczogW0ZvY3VzVHJhcF1cbn0pXG5leHBvcnQgY2xhc3MgRm9jdXNUcmFwTW9kdWxlIHt9XG4iXX0=