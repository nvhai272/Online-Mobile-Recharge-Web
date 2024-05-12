import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, inject, Injectable } from '@angular/core';
import { DomPortalHost } from '../portal/dom-portal-host';
import { OverlayContainer } from './overlay-container';
import { OverlayRef } from './overlay-ref';
import * as i0 from "@angular/core";
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
export class Overlay {
    _overlayContainer = inject(OverlayContainer);
    _componentFactoryResolver = inject(ComponentFactoryResolver);
    _appRef = inject(ApplicationRef);
    _document = inject(DOCUMENT);
    // Namespace panes by overlay container
    _paneElements = new Map();
    /**
     * Creates an overlay.
     * @returns A reference to the created overlay.
     */
    create(positionClass, overlayContainer) {
        // get existing pane if possible
        return this._createOverlayRef(this.getPaneElement(positionClass, overlayContainer));
    }
    getPaneElement(positionClass = '', overlayContainer) {
        if (!this._paneElements.get(overlayContainer)) {
            this._paneElements.set(overlayContainer, {});
        }
        if (!this._paneElements.get(overlayContainer)[positionClass]) {
            this._paneElements.get(overlayContainer)[positionClass] = this._createPaneElement(positionClass, overlayContainer);
        }
        return this._paneElements.get(overlayContainer)[positionClass];
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    _createPaneElement(positionClass, overlayContainer) {
        const pane = this._document.createElement('div');
        pane.id = 'toast-container';
        pane.classList.add(positionClass);
        pane.classList.add('toast-container');
        if (!overlayContainer) {
            this._overlayContainer.getContainerElement().appendChild(pane);
        }
        else {
            overlayContainer.getContainerElement().appendChild(pane);
        }
        return pane;
    }
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef);
    }
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     */
    _createOverlayRef(pane) {
        return new OverlayRef(this._createPortalHost(pane));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: Overlay, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: Overlay, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.3", ngImport: i0, type: Overlay, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvb3ZlcmxheS9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDOzs7Ozs7O0dBT0c7QUFFSCxNQUFNLE9BQU8sT0FBTztJQUNWLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzdELE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyQyx1Q0FBdUM7SUFDL0IsYUFBYSxHQUE4RCxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBRTdGOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxhQUFzQixFQUFFLGdCQUEwQztRQUN2RSxnQ0FBZ0M7UUFDaEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxjQUFjLENBQ1osZ0JBQXdCLEVBQUUsRUFDMUIsZ0JBQTBDO1FBRTFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxnQkFBMkMsQ0FBQyxFQUFFO1lBQ3hFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGdCQUEyQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGdCQUEyQyxDQUFFLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDeEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQTJDLENBQUUsQ0FDbEUsYUFBYSxDQUNkLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxnQkFBMkMsQ0FBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRDs7O09BR0c7SUFDSyxrQkFBa0IsQ0FDeEIsYUFBcUIsRUFDckIsZ0JBQTBDO1FBRTFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hFO2FBQU07WUFDTCxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxpQkFBaUIsQ0FBQyxJQUFpQjtRQUN6QyxPQUFPLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7O09BR0c7SUFDSyxpQkFBaUIsQ0FBQyxJQUFpQjtRQUN6QyxPQUFPLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7dUdBekVVLE9BQU87MkdBQVAsT0FBTyxjQURNLE1BQU07OzJGQUNuQixPQUFPO2tCQURuQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEb21Qb3J0YWxIb3N0IH0gZnJvbSAnLi4vcG9ydGFsL2RvbS1wb3J0YWwtaG9zdCc7XG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4uL3RvYXN0ci90b2FzdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3ZlcmxheUNvbnRhaW5lciB9IGZyb20gJy4vb3ZlcmxheS1jb250YWluZXInO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJy4vb3ZlcmxheS1yZWYnO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gY3JlYXRlIE92ZXJsYXlzLiBPdmVybGF5cyBhcmUgZHluYW1pY2FsbHkgYWRkZWQgcGllY2VzIG9mIGZsb2F0aW5nIFVJLCBtZWFudCB0byBiZVxuICogdXNlZCBhcyBhIGxvdy1sZXZlbCBidWlsZGluZyBidWlsZGluZyBibG9jayBmb3Igb3RoZXIgY29tcG9uZW50cy4gRGlhbG9ncywgdG9vbHRpcHMsIG1lbnVzLFxuICogc2VsZWN0cywgZXRjLiBjYW4gYWxsIGJlIGJ1aWx0IHVzaW5nIG92ZXJsYXlzLiBUaGUgc2VydmljZSBzaG91bGQgcHJpbWFyaWx5IGJlIHVzZWQgYnkgYXV0aG9yc1xuICogb2YgcmUtdXNhYmxlIGNvbXBvbmVudHMgcmF0aGVyIHRoYW4gZGV2ZWxvcGVycyBidWlsZGluZyBlbmQtdXNlciBhcHBsaWNhdGlvbnMuXG4gKlxuICogQW4gb3ZlcmxheSAqaXMqIGEgUG9ydGFsSG9zdCwgc28gYW55IGtpbmQgb2YgUG9ydGFsIGNhbiBiZSBsb2FkZWQgaW50byBvbmUuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT3ZlcmxheSB7XG4gIHByaXZhdGUgX292ZXJsYXlDb250YWluZXIgPSBpbmplY3QoT3ZlcmxheUNvbnRhaW5lcik7XG4gIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlciA9IGluamVjdChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpO1xuICBwcml2YXRlIF9hcHBSZWYgPSBpbmplY3QoQXBwbGljYXRpb25SZWYpO1xuICBwcml2YXRlIF9kb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG5cbiAgLy8gTmFtZXNwYWNlIHBhbmVzIGJ5IG92ZXJsYXkgY29udGFpbmVyXG4gIHByaXZhdGUgX3BhbmVFbGVtZW50czogTWFwPFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlLCBSZWNvcmQ8c3RyaW5nLCBIVE1MRWxlbWVudD4+ID0gbmV3IE1hcCgpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG92ZXJsYXkuXG4gICAqIEByZXR1cm5zIEEgcmVmZXJlbmNlIHRvIHRoZSBjcmVhdGVkIG92ZXJsYXkuXG4gICAqL1xuICBjcmVhdGUocG9zaXRpb25DbGFzcz86IHN0cmluZywgb3ZlcmxheUNvbnRhaW5lcj86IFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlKTogT3ZlcmxheVJlZiB7XG4gICAgLy8gZ2V0IGV4aXN0aW5nIHBhbmUgaWYgcG9zc2libGVcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlT3ZlcmxheVJlZih0aGlzLmdldFBhbmVFbGVtZW50KHBvc2l0aW9uQ2xhc3MsIG92ZXJsYXlDb250YWluZXIpKTtcbiAgfVxuXG4gIGdldFBhbmVFbGVtZW50KFxuICAgIHBvc2l0aW9uQ2xhc3M6IHN0cmluZyA9ICcnLFxuICAgIG92ZXJsYXlDb250YWluZXI/OiBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSxcbiAgKTogSFRNTEVsZW1lbnQge1xuICAgIGlmICghdGhpcy5fcGFuZUVsZW1lbnRzLmdldChvdmVybGF5Q29udGFpbmVyIGFzIFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlKSkge1xuICAgICAgdGhpcy5fcGFuZUVsZW1lbnRzLnNldChvdmVybGF5Q29udGFpbmVyIGFzIFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlLCB7fSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9wYW5lRWxlbWVudHMuZ2V0KG92ZXJsYXlDb250YWluZXIgYXMgVG9hc3RDb250YWluZXJEaXJlY3RpdmUpIVtwb3NpdGlvbkNsYXNzXSkge1xuICAgICAgdGhpcy5fcGFuZUVsZW1lbnRzLmdldChvdmVybGF5Q29udGFpbmVyIGFzIFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlKSFbXG4gICAgICAgIHBvc2l0aW9uQ2xhc3NcbiAgICAgIF0gPSB0aGlzLl9jcmVhdGVQYW5lRWxlbWVudChwb3NpdGlvbkNsYXNzLCBvdmVybGF5Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcGFuZUVsZW1lbnRzLmdldChvdmVybGF5Q29udGFpbmVyIGFzIFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlKSFbcG9zaXRpb25DbGFzc107XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgRE9NIGVsZW1lbnQgZm9yIGFuIG92ZXJsYXkgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIG92ZXJsYXkgY29udGFpbmVyLlxuICAgKiBAcmV0dXJucyBOZXdseS1jcmVhdGVkIHBhbmUgZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlUGFuZUVsZW1lbnQoXG4gICAgcG9zaXRpb25DbGFzczogc3RyaW5nLFxuICAgIG92ZXJsYXlDb250YWluZXI/OiBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSxcbiAgKTogSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0IHBhbmUgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHBhbmUuaWQgPSAndG9hc3QtY29udGFpbmVyJztcbiAgICBwYW5lLmNsYXNzTGlzdC5hZGQocG9zaXRpb25DbGFzcyk7XG4gICAgcGFuZS5jbGFzc0xpc3QuYWRkKCd0b2FzdC1jb250YWluZXInKTtcblxuICAgIGlmICghb3ZlcmxheUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5fb3ZlcmxheUNvbnRhaW5lci5nZXRDb250YWluZXJFbGVtZW50KCkuYXBwZW5kQ2hpbGQocGFuZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG92ZXJsYXlDb250YWluZXIuZ2V0Q29udGFpbmVyRWxlbWVudCgpLmFwcGVuZENoaWxkKHBhbmUpO1xuICAgIH1cblxuICAgIHJldHVybiBwYW5lO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIERvbVBvcnRhbEhvc3QgaW50byB3aGljaCB0aGUgb3ZlcmxheSBjb250ZW50IGNhbiBiZSBsb2FkZWQuXG4gICAqIEBwYXJhbSBwYW5lIFRoZSBET00gZWxlbWVudCB0byB0dXJuIGludG8gYSBwb3J0YWwgaG9zdC5cbiAgICogQHJldHVybnMgQSBwb3J0YWwgaG9zdCBmb3IgdGhlIGdpdmVuIERPTSBlbGVtZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlUG9ydGFsSG9zdChwYW5lOiBIVE1MRWxlbWVudCk6IERvbVBvcnRhbEhvc3Qge1xuICAgIHJldHVybiBuZXcgRG9tUG9ydGFsSG9zdChwYW5lLCB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHRoaXMuX2FwcFJlZik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBPdmVybGF5UmVmIGZvciBhbiBvdmVybGF5IGluIHRoZSBnaXZlbiBET00gZWxlbWVudC5cbiAgICogQHBhcmFtIHBhbmUgRE9NIGVsZW1lbnQgZm9yIHRoZSBvdmVybGF5XG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5UmVmKHBhbmU6IEhUTUxFbGVtZW50KTogT3ZlcmxheVJlZiB7XG4gICAgcmV0dXJuIG5ldyBPdmVybGF5UmVmKHRoaXMuX2NyZWF0ZVBvcnRhbEhvc3QocGFuZSkpO1xuICB9XG59XG4iXX0=