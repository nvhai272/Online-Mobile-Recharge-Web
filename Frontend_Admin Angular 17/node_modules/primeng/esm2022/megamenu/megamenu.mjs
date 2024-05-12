import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, booleanAttribute, effect, forwardRef, numberAttribute, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
import * as i5 from "primeng/api";
export class MegaMenuSub {
    el;
    megaMenu;
    id;
    items;
    itemTemplate;
    menuId;
    ariaLabel;
    ariaLabelledBy;
    level = 0;
    focusedItemId;
    disabled = false;
    orientation;
    activeItem;
    submenu;
    tabindex = 0;
    root = false;
    itemClick = new EventEmitter();
    itemMouseEnter = new EventEmitter();
    menuFocus = new EventEmitter();
    menuBlur = new EventEmitter();
    menuKeydown = new EventEmitter();
    menubarViewChild;
    constructor(el, megaMenu) {
        this.el = el;
        this.megaMenu = megaMenu;
    }
    onItemClick(event, processedItem) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }
    getItemProp(processedItem, name, params = null) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }
    getItemId(processedItem) {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId}_${processedItem.key}`;
    }
    getSubListId(processedItem) {
        return `${this.getItemId(processedItem)}_list`;
    }
    getItemClass(processedItem) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menuitem': true,
            'p-menuitem-active p-highlight': this.isItemActive(processedItem),
            'p-focus': this.isItemFocused(processedItem),
            'p-disabled': this.isItemDisabled(processedItem)
        };
    }
    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    getSeparatorItemClass(processedItem) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menuitem-separator': true
        };
    }
    getColumnClass(processedItem) {
        let length = this.isItemGroup(processedItem) ? processedItem.items.length : 0;
        let columnClass;
        switch (length) {
            case 2:
                columnClass = 'p-megamenu-col-6';
                break;
            case 3:
                columnClass = 'p-megamenu-col-4';
                break;
            case 4:
                columnClass = 'p-megamenu-col-3';
                break;
            case 6:
                columnClass = 'p-megamenu-col-2';
                break;
            default:
                columnClass = 'p-megamenu-col-12';
                break;
        }
        return columnClass;
    }
    getSubmenuHeaderClass(processedItem) {
        return {
            'p-megamenu-submenu-header p-submenu-header': true,
            'p-disabled': this.isItemDisabled(processedItem),
            ...this.getItemProp(processedItem, 'class')
        };
    }
    isSubmenuVisible(submenu) {
        if (this.submenu && !this.root) {
            return this.isItemVisible(submenu);
        }
        else {
            return true;
        }
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemActive(processedItem) {
        return ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem.key === processedItem.key : false;
    }
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    isItemFocused(processedItem) {
        return this.focusedItemId === this.getItemId(processedItem);
    }
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }
    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }
    getAriaPosInset(index) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }
    onItemMouseEnter(param) {
        const { event, processedItem } = param;
        this.itemMouseEnter.emit({ originalEvent: event, processedItem });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MegaMenuSub, deps: [{ token: i0.ElementRef }, { token: forwardRef(() => MegaMenu) }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: MegaMenuSub, selector: "p-megaMenuSub", inputs: { id: "id", items: "items", itemTemplate: "itemTemplate", menuId: "menuId", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", level: ["level", "level", numberAttribute], focusedItemId: "focusedItemId", disabled: ["disabled", "disabled", booleanAttribute], orientation: "orientation", activeItem: "activeItem", submenu: "submenu", tabindex: ["tabindex", "tabindex", numberAttribute], root: ["root", "root", booleanAttribute] }, outputs: { itemClick: "itemClick", itemMouseEnter: "itemMouseEnter", menuFocus: "menuFocus", menuBlur: "menuBlur", menuKeydown: "menuKeydown" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "menubarViewChild", first: true, predicate: ["menubar"], descendants: true, static: true }], ngImport: i0, template: `
        <ul
            *ngIf="isSubmenuVisible(submenu)"
            #menubar
            [ngClass]="{ 'p-megamenu-root-list': root, 'p-submenu-list p-megamenu-submenu': !root }"
            [attr.role]="root ? 'menubar' : 'menu'"
            [attr.id]="id"
            [attr.aria-orientation]="orientation"
            [tabindex]="tabindex"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="root ? 'root' : 'submenu'"
            (keydown)="menuKeydown.emit($event)"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
        >
            <li *ngIf="submenu" [ngClass]="getSubmenuHeaderClass(submenu)" [style]="getItemProp(submenu, 'style')" role="presentation">{{ getItemLabel(submenu) }}</li>
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [attr.id]="getItemId(processedItem)"
                    [style]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.data-pc-section]="'menuitem'"
                    [attr.data-p-highlight]="isItemActive(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.aria-label]="getItemLabel(processedItem)"
                    [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                    [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" [attr.data-pc-section]="'content'" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({$event, processedItem})">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                [attr.aria-hidden]="true"
                                [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                [attr.data-pc-section]="'action'"
                                [target]="getItemProp(processedItem, 'target')"
                                [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [attr.tabindex]="-1"
                                pRipple
                            >
                                <span
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    class="p-menuitem-icon"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.aria-hidden]="true"
                                    [attr.tabindex]="-1"
                                >
                                </span>
                                <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                    {{ getItemLabel(processedItem) }}
                                </span>
                                <ng-template #htmlLabel>
                                    <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                                </ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                                </ng-container>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                [attr.tabindex]="-1"
                                [attr.aria-hidden]="true"
                                [attr.data-pc-section]="'action'"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(processedItem, 'target')"
                                [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                pRipple
                            >
                                <span
                                    class="p-menuitem-icon"
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.aria-hidden]="true"
                                    [attr.tabindex]="-1"
                                ></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape'); else htmlRouteLabel">{{ getItemLabel(processedItem) }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                                </ng-container>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)" class="p-megamenu-panel" [attr.data-pc-section]="'panel'">
                        <div class="p-megamenu-grid" [attr.data-pc-section]="'grid'">
                            <div *ngFor="let col of processedItem.items" [ngClass]="getColumnClass(processedItem)">
                                <p-megaMenuSub
                                    *ngFor="let submenu of col"
                                    [id]="getSubListId(submenu)"
                                    [submenu]="submenu"
                                    [items]="submenu.items"
                                    [itemTemplate]="itemTemplate"
                                    [menuId]="menuId"
                                    [focusedItemId]="focusedItemId"
                                    [level]="level + 1"
                                    [root]="false"
                                    (itemClick)="itemClick.emit($event)"
                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                >
                                </p-megaMenuSub>
                            </div>
                        </div>
                    </div>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(() => i4.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => AngleDownIcon), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(() => MegaMenuSub), selector: "p-megaMenuSub", inputs: ["id", "items", "itemTemplate", "menuId", "ariaLabel", "ariaLabelledBy", "level", "focusedItemId", "disabled", "orientation", "activeItem", "submenu", "tabindex", "root"], outputs: ["itemClick", "itemMouseEnter", "menuFocus", "menuBlur", "menuKeydown"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MegaMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-megaMenuSub',
                    template: `
        <ul
            *ngIf="isSubmenuVisible(submenu)"
            #menubar
            [ngClass]="{ 'p-megamenu-root-list': root, 'p-submenu-list p-megamenu-submenu': !root }"
            [attr.role]="root ? 'menubar' : 'menu'"
            [attr.id]="id"
            [attr.aria-orientation]="orientation"
            [tabindex]="tabindex"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="root ? 'root' : 'submenu'"
            (keydown)="menuKeydown.emit($event)"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
        >
            <li *ngIf="submenu" [ngClass]="getSubmenuHeaderClass(submenu)" [style]="getItemProp(submenu, 'style')" role="presentation">{{ getItemLabel(submenu) }}</li>
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [attr.id]="getItemId(processedItem)"
                    [style]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.data-pc-section]="'menuitem'"
                    [attr.data-p-highlight]="isItemActive(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.aria-label]="getItemLabel(processedItem)"
                    [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                    [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" [attr.data-pc-section]="'content'" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({$event, processedItem})">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                [attr.aria-hidden]="true"
                                [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                [attr.data-pc-section]="'action'"
                                [target]="getItemProp(processedItem, 'target')"
                                [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [attr.tabindex]="-1"
                                pRipple
                            >
                                <span
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    class="p-menuitem-icon"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.aria-hidden]="true"
                                    [attr.tabindex]="-1"
                                >
                                </span>
                                <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                    {{ getItemLabel(processedItem) }}
                                </span>
                                <ng-template #htmlLabel>
                                    <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                                </ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                                </ng-container>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                [attr.tabindex]="-1"
                                [attr.aria-hidden]="true"
                                [attr.data-pc-section]="'action'"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(processedItem, 'target')"
                                [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                pRipple
                            >
                                <span
                                    class="p-menuitem-icon"
                                    *ngIf="getItemProp(processedItem, 'icon')"
                                    [ngClass]="getItemProp(processedItem, 'icon')"
                                    [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                    [attr.data-pc-section]="'icon'"
                                    [attr.aria-hidden]="true"
                                    [attr.tabindex]="-1"
                                ></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape'); else htmlRouteLabel">{{ getItemLabel(processedItem) }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                                </ng-container>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)" class="p-megamenu-panel" [attr.data-pc-section]="'panel'">
                        <div class="p-megamenu-grid" [attr.data-pc-section]="'grid'">
                            <div *ngFor="let col of processedItem.items" [ngClass]="getColumnClass(processedItem)">
                                <p-megaMenuSub
                                    *ngFor="let submenu of col"
                                    [id]="getSubListId(submenu)"
                                    [submenu]="submenu"
                                    [items]="submenu.items"
                                    [itemTemplate]="itemTemplate"
                                    [menuId]="menuId"
                                    [focusedItemId]="focusedItemId"
                                    [level]="level + 1"
                                    [root]="false"
                                    (itemClick)="itemClick.emit($event)"
                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                >
                                </p-megaMenuSub>
                            </div>
                        </div>
                    </div>
                </li>
            </ng-template>
        </ul>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: MegaMenu, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MegaMenu)]
                }] }], propDecorators: { id: [{
                type: Input
            }], items: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], menuId: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], level: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], focusedItemId: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], orientation: [{
                type: Input
            }], activeItem: [{
                type: Input
            }], submenu: [{
                type: Input
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], root: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], itemClick: [{
                type: Output
            }], itemMouseEnter: [{
                type: Output
            }], menuFocus: [{
                type: Output
            }], menuBlur: [{
                type: Output
            }], menuKeydown: [{
                type: Output
            }], menubarViewChild: [{
                type: ViewChild,
                args: ['menubar', { static: true }]
            }] } });
/**
 * MegaMenu is navigation component that displays submenus together.
 * @group Components
 */
export class MegaMenu {
    document;
    platformId;
    el;
    renderer;
    config;
    cd;
    /**
     * An array of menuitems.
     * @group Props
     */
    set model(value) {
        this._model = value;
        this._processedItems = this.createProcessedItems(this._model || []);
    }
    get model() {
        return this._model;
    }
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
     * Defines the orientation.
     * @group Props
     */
    orientation = 'horizontal';
    /**
     * Current id state as a string.
     * @group Props
     */
    id;
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    ariaLabel;
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = false;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    templates;
    menubutton;
    rootmenu;
    startTemplate;
    endTemplate;
    menuIconTemplate;
    submenuIconTemplate;
    itemTemplate;
    outsideClickListener;
    resizeListener;
    dirty = false;
    focused = false;
    activeItem = signal(null);
    focusedItemInfo = signal({ index: -1, level: 0, parentKey: '', item: null });
    searchValue = '';
    searchTimeout;
    _processedItems;
    _model;
    get visibleItems() {
        const processedItem = ObjectUtils.isNotEmpty(this.activeItem()) ? this.activeItem() : null;
        return processedItem && processedItem.key === this.focusedItemInfo().parentKey
            ? processedItem.items.reduce((items, col) => {
                col.forEach((submenu) => {
                    submenu.items.forEach((a) => {
                        items.push(a);
                    });
                });
                return items;
            }, [])
            : this.processedItems;
    }
    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model || []);
        }
        return this._processedItems;
    }
    get focusedItemId() {
        const focusedItem = this.focusedItemInfo();
        return focusedItem?.item && focusedItem.item?.id ? focusedItem.item.id : ObjectUtils.isNotEmpty(focusedItem.key) ? `${this.id}_${focusedItem.key}` : null;
    }
    constructor(document, platformId, el, renderer, config, cd) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.config = config;
        this.cd = cd;
        effect(() => {
            const activeItem = this.activeItem();
            if (ObjectUtils.isNotEmpty(activeItem)) {
                this.bindOutsideClickListener();
                this.bindResizeListener();
            }
            else {
                this.unbindOutsideClickListener();
                this.unbindResizeListener();
            }
        });
    }
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'start':
                    this.startTemplate = item.template;
                    break;
                case 'end':
                    this.endTemplate = item.template;
                    break;
                case 'menuicon':
                    this.menuIconTemplate = item.template;
                    break;
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    createProcessedItems(items, level = 0, parent = {}, parentKey = '', columnIndex) {
        const processedItems = [];
        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + (columnIndex !== undefined ? columnIndex + '_' : '') + index;
                const newItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey,
                    columnIndex: columnIndex !== undefined ? columnIndex : parent.columnIndex !== undefined ? parent.columnIndex : index
                };
                newItem['items'] =
                    level === 0 && item.items && item.items.length > 0 ? item.items.map((_items, _index) => this.createProcessedItems(_items, level + 1, newItem, key, _index)) : this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }
    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }
    onItemClick(event) {
        const { originalEvent, processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const root = ObjectUtils.isEmpty(processedItem.parent);
        const selected = this.isSelected(processedItem);
        if (selected) {
            const { index, key, parentKey, item } = processedItem;
            this.activeItem.set(null);
            this.focusedItemInfo.set({ index, key, parentKey, item });
            this.dirty = !root;
            DomHandler.focus(this.rootmenu?.menubarViewChild?.nativeElement);
        }
        else {
            if (grouped) {
                this.onItemChange(event);
            }
            else {
                const rootProcessedItem = root ? processedItem : this.activeItem();
                this.hide(originalEvent);
                this.changeFocusedItemInfo(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);
                DomHandler.focus(this.rootmenu?.menubarViewChild?.nativeElement);
            }
        }
    }
    onItemMouseEnter(event) {
        if (!DomHandler.isTouchDevice()) {
            this.onItemChange(event);
        }
    }
    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
        const element = DomHandler.findSingle(this.rootmenu?.el.nativeElement, `li[id="${id}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
    onItemChange(event) {
        const { processedItem, isFocus } = event;
        if (ObjectUtils.isEmpty(processedItem))
            return;
        const { index, key, parentKey, items, item } = processedItem;
        const grouped = ObjectUtils.isNotEmpty(items);
        if (grouped) {
            this.activeItem.set(processedItem);
        }
        this.focusedItemInfo.set({ index, key, parentKey, item });
        grouped && (this.dirty = true);
        isFocus && DomHandler.focus(this.rootmenu?.menubarViewChild?.nativeElement);
    }
    hide(event, isFocus) {
        this.activeItem.set(null);
        this.focusedItemInfo.set({ index: -1, key: '', parentKey: '', item: null });
        isFocus && DomHandler.focus(this.rootmenu?.menubarViewChild?.nativeElement);
        this.dirty = false;
    }
    onMenuFocus(event) {
        this.focused = true;
        if (this.focusedItemInfo().index === -1) {
            const index = this.findFirstFocusedItemIndex();
            const processedItem = this.findVisibleItem(index);
            this.focusedItemInfo.set({ index, key: processedItem.key, parentKey: processedItem.parentKey, item: processedItem.item });
        }
    }
    onMenuBlur(event) {
        this.focused = false;
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        this.searchValue = '';
        this.dirty = false;
    }
    onKeyDown(event) {
        const metaKey = event.metaKey || event.ctrlKey;
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;
            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;
            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            case 'Space':
                this.onSpaceKey(event);
                break;
            case 'Enter':
                this.onEnterKey(event);
                break;
            case 'Escape':
                this.onEscapeKey(event);
                break;
            case 'Tab':
                this.onTabKey(event);
                break;
            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;
            default:
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }
                break;
        }
    }
    findFirstFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
    }
    findFirstItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidItem(processedItem));
    }
    findSelectedItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidSelectedItem(processedItem));
    }
    isProcessedItemGroup(processedItem) {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }
    isSelected(processedItem) {
        return ObjectUtils.isNotEmpty(this.activeItem()) ? this.activeItem().key === processedItem.key : false;
    }
    isValidSelectedItem(processedItem) {
        return this.isValidItem(processedItem) && this.isSelected(processedItem);
    }
    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
    }
    isItemDisabled(item) {
        return this.getItemProp(item, 'disabled');
    }
    isItemSeparator(item) {
        return this.getItemProp(item, 'separator');
    }
    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }
    isProccessedItemGroup(processedItem) {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }
    searchItems(event, char) {
        this.searchValue = (this.searchValue || '') + char;
        let itemIndex = -1;
        let matched = false;
        if (this.focusedItemInfo().index !== -1) {
            itemIndex = this.visibleItems.slice(this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem));
            itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem)) : itemIndex + this.focusedItemInfo().index;
        }
        else {
            itemIndex = this.visibleItems.findIndex((processedItem) => this.isItemMatched(processedItem));
        }
        if (itemIndex !== -1) {
            matched = true;
        }
        if (itemIndex === -1 && this.focusedItemInfo().index === -1) {
            itemIndex = this.findFirstFocusedItemIndex();
        }
        if (itemIndex !== -1) {
            this.changeFocusedItemInfo(event, itemIndex);
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);
        return matched;
    }
    getProccessedItemLabel(processedItem) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }
    getItemLabel(item) {
        return this.getItemProp(item, 'label');
    }
    changeFocusedItemInfo(event, index) {
        const processedItem = this.findVisibleItem(index);
        if (ObjectUtils.isNotEmpty(processedItem)) {
            const { key, parentKey, item } = processedItem;
            this.focusedItemInfo.set({ index, key: key ? key : '', parentKey, item });
        }
        this.scrollInView();
    }
    onArrowDownKey(event) {
        if (this.orientation === 'horizontal') {
            if (ObjectUtils.isNotEmpty(this.activeItem()) && this.activeItem().key === this.focusedItemInfo().key) {
                const { key, item } = this.activeItem();
                this.focusedItemInfo.set({ index: -1, key: '', parentKey: key, item });
            }
            else {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);
                if (grouped) {
                    const { parentKey, key, item } = processedItem;
                    this.onItemChange({ originalEvent: event, processedItem });
                    this.focusedItemInfo.set({ index: -1, key: key, parentKey: parentKey, item: item });
                    this.searchValue = '';
                }
            }
        }
        const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
        this.changeFocusedItemInfo(event, itemIndex);
        event.preventDefault();
    }
    onArrowRightKey(event) {
        const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);
        if (grouped) {
            if (this.orientation === 'vertical') {
                if (ObjectUtils.isNotEmpty(this.activeItem()) && this.activeItem().key === processedItem.key) {
                    this.focusedItemInfo.set({ index: -1, key: '', parentKey: this.activeItem().key, item: processedItem.item });
                }
                else {
                    const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                    const grouped = this.isProccessedItemGroup(processedItem);
                    if (grouped) {
                        this.onItemChange({ originalEvent: event, processedItem });
                        this.focusedItemInfo.set({ index: -1, key: processedItem.key, parentKey: processedItem.parentKey, item: processedItem.item });
                        this.searchValue = '';
                    }
                }
            }
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
            this.changeFocusedItemInfo(event, itemIndex);
        }
        else {
            const columnIndex = processedItem.columnIndex + 1;
            const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);
            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }
        event.preventDefault();
    }
    onArrowUpKey(event) {
        if (event.altKey && this.orientation === 'horizontal') {
            if (this.focusedItemInfo().index !== -1) {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);
                if (!grouped && ObjectUtils.isNotEmpty(this.activeItem)) {
                    if (this.focusedItemInfo().index === 0) {
                        this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, parentKey: this.activeItem().parentKey, item: processedItem.item });
                        this.activeItem.set(null);
                    }
                    else {
                        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
                    }
                }
            }
            event.preventDefault();
        }
        else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
            this.changeFocusedItemInfo(event, itemIndex);
            event.preventDefault();
        }
    }
    onArrowLeftKey(event) {
        const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);
        if (grouped) {
            if (this.orientation === 'horizontal') {
                const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
                this.changeFocusedItemInfo(event, itemIndex);
            }
        }
        else {
            if (this.orientation === 'vertical' && ObjectUtils.isNotEmpty(this.activeItem())) {
                if (processedItem.columnIndex === 0) {
                    this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, parentKey: this.activeItem().parentKey, item: processedItem.item });
                    this.activeItem.set(null);
                }
            }
            const columnIndex = processedItem.columnIndex - 1;
            const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);
            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }
        event.preventDefault();
    }
    onHomeKey(event) {
        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
        event.preventDefault();
    }
    onEndKey(event) {
        this.changeFocusedItemInfo(event, this.findLastItemIndex());
        event.preventDefault();
    }
    onSpaceKey(event) {
        this.onEnterKey(event);
    }
    onEscapeKey(event) {
        if (ObjectUtils.isNotEmpty(this.activeItem())) {
            this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, item: this.activeItem().item });
            this.activeItem.set(null);
        }
        event.preventDefault();
    }
    onTabKey(event) {
        if (this.focusedItemInfo().index !== -1) {
            const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
            const grouped = this.isProccessedItemGroup(processedItem);
            !grouped && this.onItemChange({ originalEvent: event, processedItem });
        }
        this.hide();
    }
    onEnterKey(event) {
        if (this.focusedItemInfo().index !== -1) {
            const element = DomHandler.findSingle(this.rootmenu?.el?.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');
            anchorElement ? anchorElement.click() : element && element.click();
            const processedItem = this.visibleItems[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);
            !grouped && this.changeFocusedItemInfo(event, this.findFirstFocusedItemIndex());
        }
        event.preventDefault();
    }
    findVisibleItem(index) {
        return ObjectUtils.isNotEmpty(this.visibleItems) ? this.visibleItems[index] : null;
    }
    findLastFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
    }
    findLastItemIndex() {
        return ObjectUtils.findLastIndex(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
    }
    findPrevItemIndex(index) {
        const matchedItemIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;
        return matchedItemIndex > -1 ? matchedItemIndex : index;
    }
    findNextItemIndex(index) {
        const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;
        return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    }
    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    this.hide(event, true);
                });
            }
        }
    }
    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const isOutsideContainer = this.rootmenu?.el.nativeElement !== event.target && !this.rootmenu?.el.nativeElement.contains(event.target);
                    if (isOutsideContainer) {
                        this.hide();
                    }
                });
            }
        }
    }
    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
            this.outsideClickListener = null;
        }
    }
    unbindResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }
    }
    ngOnDestroy() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MegaMenu, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i5.PrimeNGConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: MegaMenu, selector: "p-megaMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", orientation: "orientation", id: "id", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", disabled: ["disabled", "disabled", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute] }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "menubutton", first: true, predicate: ["menubutton"], descendants: true }, { propertyName: "rootmenu", first: true, predicate: ["rootmenu"], descendants: true }], ngImport: i0, template: `
        <div
            [ngClass]="{ 'p-megamenu p-component': true, 'p-megamenu-horizontal': orientation == 'horizontal', 'p-megamenu-vertical': orientation == 'vertical' }"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'megamenu'"
            [attr.id]="id"
        >
            <div class="p-megamenu-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <p-megaMenuSub
                #rootmenu
                [itemTemplate]="itemTemplate"
                [items]="processedItems"
                [attr.id]="id + '_list'"
                [menuId]="id"
                [root]="true"
                [orientation]="orientation"
                [ariaLabel]="ariaLabel"
                [disabled]="disabled"
                [tabindex]="!disabled ? tabindex : -1"
                [activeItem]="activeItem()"
                [level]="0"
                [ariaLabelledBy]="ariaLabelledBy"
                [focusedItemId]="focused ? focusedItemId : undefined"
                (itemClick)="onItemClick($event)"
                (menuFocus)="onMenuFocus($event)"
                (menuBlur)="onMenuBlur($event)"
                (menuKeydown)="onKeyDown($event)"
                (itemMouseEnter)="onItemMouseEnter($event)"
            ></p-megaMenuSub>
            <div class="p-megamenu-end" *ngIf="endTemplate; else legacy">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
            <ng-template #legacy>
                <div class="p-megamenu-end">
                    <ng-content></ng-content>
                </div>
            </ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-megamenu-root-list{margin:0;padding:0;list-style:none}.p-megamenu-root-list>.p-menuitem{position:relative}.p-megamenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-megamenu .p-menuitem-text{line-height:1}.p-megamenu-panel{display:none;position:absolute;width:auto;z-index:1}.p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{display:block}.p-megamenu-submenu{margin:0;padding:0;list-style:none}.p-megamenu-horizontal{align-items:center}.p-megamenu-horizontal .p-megamenu-root-list{display:flex;align-items:center;flex-wrap:wrap}.p-megamenu-horizontal .p-megamenu-end{margin-left:auto;align-self:center}.p-megamenu-vertical .p-megamenu-root-list{flex-direction:column}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{left:100%;top:0}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-submenu-icon:not(svg){margin-left:auto}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-icon-wrapper{margin-left:auto}.p-megamenu-grid{display:flex}.p-megamenu-col-2,.p-megamenu-col-3,.p-megamenu-col-4,.p-megamenu-col-6,.p-megamenu-col-12{flex:0 0 auto;padding:.5rem}.p-megamenu-col-2{width:16.6667%}.p-megamenu-col-3{width:25%}.p-megamenu-col-4{width:33.3333%}.p-megamenu-col-6{width:50%}.p-megamenu-col-12{width:100%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: MegaMenuSub, selector: "p-megaMenuSub", inputs: ["id", "items", "itemTemplate", "menuId", "ariaLabel", "ariaLabelledBy", "level", "focusedItemId", "disabled", "orientation", "activeItem", "submenu", "tabindex", "root"], outputs: ["itemClick", "itemMouseEnter", "menuFocus", "menuBlur", "menuKeydown"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MegaMenu, decorators: [{
            type: Component,
            args: [{ selector: 'p-megaMenu', template: `
        <div
            [ngClass]="{ 'p-megamenu p-component': true, 'p-megamenu-horizontal': orientation == 'horizontal', 'p-megamenu-vertical': orientation == 'vertical' }"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'megamenu'"
            [attr.id]="id"
        >
            <div class="p-megamenu-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <p-megaMenuSub
                #rootmenu
                [itemTemplate]="itemTemplate"
                [items]="processedItems"
                [attr.id]="id + '_list'"
                [menuId]="id"
                [root]="true"
                [orientation]="orientation"
                [ariaLabel]="ariaLabel"
                [disabled]="disabled"
                [tabindex]="!disabled ? tabindex : -1"
                [activeItem]="activeItem()"
                [level]="0"
                [ariaLabelledBy]="ariaLabelledBy"
                [focusedItemId]="focused ? focusedItemId : undefined"
                (itemClick)="onItemClick($event)"
                (menuFocus)="onMenuFocus($event)"
                (menuBlur)="onMenuBlur($event)"
                (menuKeydown)="onKeyDown($event)"
                (itemMouseEnter)="onItemMouseEnter($event)"
            ></p-megaMenuSub>
            <div class="p-megamenu-end" *ngIf="endTemplate; else legacy">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
            <ng-template #legacy>
                <div class="p-megamenu-end">
                    <ng-content></ng-content>
                </div>
            </ng-template>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-megamenu-root-list{margin:0;padding:0;list-style:none}.p-megamenu-root-list>.p-menuitem{position:relative}.p-megamenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-megamenu .p-menuitem-text{line-height:1}.p-megamenu-panel{display:none;position:absolute;width:auto;z-index:1}.p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{display:block}.p-megamenu-submenu{margin:0;padding:0;list-style:none}.p-megamenu-horizontal{align-items:center}.p-megamenu-horizontal .p-megamenu-root-list{display:flex;align-items:center;flex-wrap:wrap}.p-megamenu-horizontal .p-megamenu-end{margin-left:auto;align-self:center}.p-megamenu-vertical .p-megamenu-root-list{flex-direction:column}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{left:100%;top:0}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-submenu-icon:not(svg){margin-left:auto}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-icon-wrapper{margin-left:auto}.p-megamenu-grid{display:flex}.p-megamenu-col-2,.p-megamenu-col-3,.p-megamenu-col-4,.p-megamenu-col-6,.p-megamenu-col-12{flex:0 0 auto;padding:.5rem}.p-megamenu-col-2{width:16.6667%}.p-megamenu-col-3{width:25%}.p-megamenu-col-4{width:33.3333%}.p-megamenu-col-6{width:50%}.p-megamenu-col-12{width:100%}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i5.PrimeNGConfig }, { type: i0.ChangeDetectorRef }], propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], orientation: [{
                type: Input
            }], id: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], menubutton: [{
                type: ViewChild,
                args: ['menubutton']
            }], rootmenu: [{
                type: ViewChild,
                args: ['rootmenu']
            }] } });
export class MegaMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MegaMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: MegaMenuModule, declarations: [MegaMenu, MegaMenuSub], imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon], exports: [MegaMenu, RouterModule, TooltipModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MegaMenuModule, imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, RouterModule, TooltipModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: MegaMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon],
                    exports: [MegaMenu, RouterModule, TooltipModule, SharedModule],
                    declarations: [MegaMenu, MegaMenuSub]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYW1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvbWVnYW1lbnUvbWVnYW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBRUgsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUdSLE1BQU0sRUFDTixXQUFXLEVBSVgsU0FBUyxFQUNULGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLFVBQVUsRUFDVixlQUFlLEVBQ2YsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQStCLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQW9LL0QsTUFBTSxPQUFPLFdBQVc7SUF5Q0Q7SUFBMkQ7SUF4Q3JFLEVBQUUsQ0FBcUI7SUFFdkIsS0FBSyxDQUFvQjtJQUV6QixZQUFZLENBQTBCO0lBRXRDLE1BQU0sQ0FBcUI7SUFFM0IsU0FBUyxDQUFxQjtJQUU5QixjQUFjLENB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QUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQzFGLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWTs7MkZBR3BELGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDO29CQUMvRyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUM7b0JBQzlELFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUM7aUJBQ3hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgZWZmZWN0LFxuICAgIGZvcndhcmRSZWYsXG4gICAgbnVtYmVyQXR0cmlidXRlLFxuICAgIHNpZ25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNZWdhTWVudUl0ZW0sIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBBbmdsZURvd25JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZWRvd24nO1xuaW1wb3J0IHsgQW5nbGVSaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlcmlnaHQnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5pbXBvcnQgeyBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tZWdhTWVudVN1YicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHVsXG4gICAgICAgICAgICAqbmdJZj1cImlzU3VibWVudVZpc2libGUoc3VibWVudSlcIlxuICAgICAgICAgICAgI21lbnViYXJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtbWVnYW1lbnUtcm9vdC1saXN0Jzogcm9vdCwgJ3Atc3VibWVudS1saXN0IHAtbWVnYW1lbnUtc3VibWVudSc6ICFyb290IH1cIlxuICAgICAgICAgICAgW2F0dHIucm9sZV09XCJyb290ID8gJ21lbnViYXInIDogJ21lbnUnXCJcbiAgICAgICAgICAgIFthdHRyLmlkXT1cImlkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtb3JpZW50YXRpb25dPVwib3JpZW50YXRpb25cIlxuICAgICAgICAgICAgW3RhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkSXRlbUlkXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCJyb290ID8gJ3Jvb3QnIDogJ3N1Ym1lbnUnXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm1lbnVLZXlkb3duLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZm9jdXMpPVwibWVudUZvY3VzLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoYmx1cik9XCJtZW51Qmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJzdWJtZW51XCIgW25nQ2xhc3NdPVwiZ2V0U3VibWVudUhlYWRlckNsYXNzKHN1Ym1lbnUpXCIgW3N0eWxlXT1cImdldEl0ZW1Qcm9wKHN1Ym1lbnUsICdzdHlsZScpXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPnt7IGdldEl0ZW1MYWJlbChzdWJtZW51KSB9fTwvbGk+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXByb2Nlc3NlZEl0ZW0gW25nRm9yT2ZdPVwiaXRlbXNcIiBsZXQtaW5kZXg9XCJpbmRleFwiPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3NlcGFyYXRvcicpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzdHlsZScpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0U2VwYXJhdG9ySXRlbUNsYXNzKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cInNlcGFyYXRvclwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc2VwYXJhdG9yJ1wiXG4gICAgICAgICAgICAgICAgPjwvbGk+XG4gICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICNsaXN0SXRlbVxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgIWdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzZXBhcmF0b3InKVwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbWVudWl0ZW0nXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZ2hsaWdodF09XCJpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtZm9jdXNlZF09XCJpc0l0ZW1Gb2N1c2VkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWRpc2FibGVkXT1cImlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pIHx8IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGFzcG9wdXBdPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSkgJiYgIWdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0bycpID8gJ21lbnUnIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKSA/IGlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGV2ZWxdPVwibGV2ZWwgKyAxXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZXRzaXplXT1cImdldEFyaWFTZXRTaXplKClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXBvc2luc2V0XT1cImdldEFyaWFQb3NJbnNldChpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldEl0ZW1DbGFzcyhwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc3R5bGVDbGFzcycpXCJcbiAgICAgICAgICAgICAgICAgICAgcFRvb2x0aXBcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBPcHRpb25zXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0b29sdGlwT3B0aW9ucycpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1lbnVpdGVtLWNvbnRlbnRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NvbnRlbnQnXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgcHJvY2Vzc2VkSXRlbSlcIiAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKHskZXZlbnQsIHByb2Nlc3NlZEl0ZW19KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncm91dGVyTGluaycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaHJlZl09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uaWRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2F1dG9tYXRpb25JZCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidhY3Rpb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndGFyZ2V0JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLW1lbnVpdGVtLWxpbmsnOiB0cnVlLCAncC1kaXNhYmxlZCc6IGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb24nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvblN0eWxlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpY29uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIi0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2VzY2FwZScpOyBlbHNlIGh0bWxMYWJlbFwiIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbGFiZWwnXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdiYWRnZScpXCIgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlU3R5bGVDbGFzcycpXCI+e3sgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlJykgfX08L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1lZ2FNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3duSWNvbiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdWJtZW51aWNvbidcIiAqbmdJZj1cIm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVSaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgKm5nSWY9XCJvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtZWdhTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdWJtZW51aWNvbidcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLWF1dG9tYXRpb25pZF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYXV0b21hdGlvbklkJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2FjdGlvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3F1ZXJ5UGFyYW1zJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmtBY3RpdmVPcHRpb25zJykgfHwgeyBleGFjdDogZmFsc2UgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3RhcmdldCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1tZW51aXRlbS1saW5rJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZGlzYWJsZWQnKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdmcmFnbWVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3F1ZXJ5UGFyYW1zSGFuZGxpbmcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdwcmVzZXJ2ZUZyYWdtZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdza2lwTG9jYXRpb25DaGFuZ2UnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyZXBsYWNlVXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0YXRlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb25TdHlsZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgKm5nSWY9XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZXNjYXBlJyk7IGVsc2UgaHRtbFJvdXRlTGFiZWxcIj57eyBnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSkgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbFJvdXRlTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbGFiZWwnXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1iYWRnZVwiICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlJylcIiBbbmdDbGFzc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2VTdHlsZUNsYXNzJylcIj57eyBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2UnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1lZ2FNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3duSWNvbiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdWJtZW51aWNvbidcIiAqbmdJZj1cIm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVSaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgKm5nSWY9XCJvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtZWdhTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdWJtZW51aWNvbidcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXRlbVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogcHJvY2Vzc2VkSXRlbS5pdGVtIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNJdGVtVmlzaWJsZShwcm9jZXNzZWRJdGVtKSAmJiBpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKVwiIGNsYXNzPVwicC1tZWdhbWVudS1wYW5lbFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncGFuZWwnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZWdhbWVudS1ncmlkXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidncmlkJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNvbCBvZiBwcm9jZXNzZWRJdGVtLml0ZW1zXCIgW25nQ2xhc3NdPVwiZ2V0Q29sdW1uQ2xhc3MocHJvY2Vzc2VkSXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtbWVnYU1lbnVTdWJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBzdWJtZW51IG9mIGNvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwiZ2V0U3ViTGlzdElkKHN1Ym1lbnUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWJtZW51XT1cInN1Ym1lbnVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1zXT1cInN1Ym1lbnUuaXRlbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1UZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21lbnVJZF09XCJtZW51SWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZvY3VzZWRJdGVtSWRdPVwiZm9jdXNlZEl0ZW1JZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGV2ZWxdPVwibGV2ZWwgKyAxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb290XT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpdGVtQ2xpY2spPVwiaXRlbUNsaWNrLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaXRlbU1vdXNlRW50ZXIpPVwib25JdGVtTW91c2VFbnRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3AtbWVnYU1lbnVTdWI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvdWw+XG4gICAgYCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZWdhTWVudVN1YiB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGl0ZW1zOiBhbnlbXSB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBtZW51SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGxldmVsOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgZm9jdXNlZEl0ZW1JZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgYWN0aXZlSXRlbTogYW55O1xuXG4gICAgQElucHV0KCkgc3VibWVudTogYW55O1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcm9vdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIGl0ZW1DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgaXRlbU1vdXNlRW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG1lbnVGb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgbWVudUJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG1lbnVLZXlkb3duOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ21lbnViYXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBtZW51YmFyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWVnYU1lbnUpKSBwdWJsaWMgbWVnYU1lbnU6IE1lZ2FNZW51KSB7fVxuXG4gICAgb25JdGVtQ2xpY2soZXZlbnQ6IGFueSwgcHJvY2Vzc2VkSXRlbTogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2NvbW1hbmQnLCB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpdGVtOiBwcm9jZXNzZWRJdGVtLml0ZW0gfSk7XG4gICAgICAgIHRoaXMuaXRlbUNsaWNrLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbSwgaXNGb2N1czogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtOiBhbnksIG5hbWU6IHN0cmluZywgcGFyYW1zOiBhbnkgfCBudWxsID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSAmJiBwcm9jZXNzZWRJdGVtLml0ZW0gPyBPYmplY3RVdGlscy5nZXRJdGVtVmFsdWUocHJvY2Vzc2VkSXRlbS5pdGVtW25hbWVdLCBwYXJhbXMpIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldEl0ZW1JZChwcm9jZXNzZWRJdGVtOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbS5pdGVtICYmIHByb2Nlc3NlZEl0ZW0uaXRlbT8uaWQgPyBwcm9jZXNzZWRJdGVtLml0ZW0uaWQgOiBgJHt0aGlzLm1lbnVJZH1fJHtwcm9jZXNzZWRJdGVtLmtleX1gO1xuICAgIH1cblxuICAgIGdldFN1Ykxpc3RJZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKX1fbGlzdGA7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUNsYXNzKHByb2Nlc3NlZEl0ZW06IGFueSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnY2xhc3MnKSxcbiAgICAgICAgICAgICdwLW1lbnVpdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLW1lbnVpdGVtLWFjdGl2ZSBwLWhpZ2hsaWdodCc6IHRoaXMuaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pLFxuICAgICAgICAgICAgJ3AtZm9jdXMnOiB0aGlzLmlzSXRlbUZvY3VzZWQocHJvY2Vzc2VkSXRlbSksXG4gICAgICAgICAgICAncC1kaXNhYmxlZCc6IHRoaXMuaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2xhYmVsJyk7XG4gICAgfVxuXG4gICAgZ2V0U2VwYXJhdG9ySXRlbUNsYXNzKHByb2Nlc3NlZEl0ZW06IGFueSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnY2xhc3MnKSxcbiAgICAgICAgICAgICdwLW1lbnVpdGVtLXNlcGFyYXRvcic6IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRDb2x1bW5DbGFzcyhwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pID8gcHJvY2Vzc2VkSXRlbS5pdGVtcy5sZW5ndGggOiAwO1xuICAgICAgICBsZXQgY29sdW1uQ2xhc3M7XG5cbiAgICAgICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcyA9ICdwLW1lZ2FtZW51LWNvbC02JztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzID0gJ3AtbWVnYW1lbnUtY29sLTQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgY29sdW1uQ2xhc3MgPSAncC1tZWdhbWVudS1jb2wtMyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcyA9ICdwLW1lZ2FtZW51LWNvbC0yJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcyA9ICdwLW1lZ2FtZW51LWNvbC0xMic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sdW1uQ2xhc3M7XG4gICAgfVxuXG4gICAgZ2V0U3VibWVudUhlYWRlckNsYXNzKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLW1lZ2FtZW51LXN1Ym1lbnUtaGVhZGVyIHAtc3VibWVudS1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pLFxuICAgICAgICAgICAgLi4udGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnY2xhc3MnKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlzU3VibWVudVZpc2libGUoc3VibWVudTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnN1Ym1lbnUgJiYgIXRoaXMucm9vdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNJdGVtVmlzaWJsZShzdWJtZW51KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNJdGVtVmlzaWJsZShwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3Zpc2libGUnKSAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKSA/IHRoaXMuYWN0aXZlSXRlbS5rZXkgPT09IHByb2Nlc3NlZEl0ZW0ua2V5IDogZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlzSXRlbUZvY3VzZWQocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWRJdGVtSWQgPT09IHRoaXMuZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pO1xuICAgIH1cblxuICAgIGlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtLml0ZW1zKTtcbiAgICB9XG5cbiAgICBnZXRBcmlhU2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgIXRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3NlcGFyYXRvcicpKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0QXJpYVBvc0luc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4IC0gdGhpcy5pdGVtcy5zbGljZSgwLCBpbmRleCkuZmlsdGVyKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSkgJiYgdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2VwYXJhdG9yJykpLmxlbmd0aCArIDE7XG4gICAgfVxuXG4gICAgb25JdGVtTW91c2VFbnRlcihwYXJhbTogYW55KSB7XG4gICAgICAgIGNvbnN0IHsgZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSA9IHBhcmFtO1xuICAgICAgICB0aGlzLml0ZW1Nb3VzZUVudGVyLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbSB9KTtcbiAgICB9XG59XG4vKipcbiAqIE1lZ2FNZW51IGlzIG5hdmlnYXRpb24gY29tcG9uZW50IHRoYXQgZGlzcGxheXMgc3VibWVudXMgdG9nZXRoZXIuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVnYU1lbnUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtbWVnYW1lbnUgcC1jb21wb25lbnQnOiB0cnVlLCAncC1tZWdhbWVudS1ob3Jpem9udGFsJzogb3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnLCAncC1tZWdhbWVudS12ZXJ0aWNhbCc6IG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcgfVwiXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtbmFtZV09XCInbWVnYW1lbnUnXCJcbiAgICAgICAgICAgIFthdHRyLmlkXT1cImlkXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbWVnYW1lbnUtc3RhcnRcIiAqbmdJZj1cInN0YXJ0VGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic3RhcnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1tZWdhTWVudVN1YlxuICAgICAgICAgICAgICAgICNyb290bWVudVxuICAgICAgICAgICAgICAgIFtpdGVtVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbaXRlbXNdPVwicHJvY2Vzc2VkSXRlbXNcIlxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImlkICsgJ19saXN0J1wiXG4gICAgICAgICAgICAgICAgW21lbnVJZF09XCJpZFwiXG4gICAgICAgICAgICAgICAgW3Jvb3RdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgW29yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCJcbiAgICAgICAgICAgICAgICBbYXJpYUxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiIWRpc2FibGVkID8gdGFiaW5kZXggOiAtMVwiXG4gICAgICAgICAgICAgICAgW2FjdGl2ZUl0ZW1dPVwiYWN0aXZlSXRlbSgpXCJcbiAgICAgICAgICAgICAgICBbbGV2ZWxdPVwiMFwiXG4gICAgICAgICAgICAgICAgW2FyaWFMYWJlbGxlZEJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICBbZm9jdXNlZEl0ZW1JZF09XCJmb2N1c2VkID8gZm9jdXNlZEl0ZW1JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgKGl0ZW1DbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAobWVudUZvY3VzKT1cIm9uTWVudUZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChtZW51Qmx1cik9XCJvbk1lbnVCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChtZW51S2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGl0ZW1Nb3VzZUVudGVyKT1cIm9uSXRlbU1vdXNlRW50ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC9wLW1lZ2FNZW51U3ViPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbWVnYW1lbnUtZW5kXCIgKm5nSWY9XCJlbmRUZW1wbGF0ZTsgZWxzZSBsZWdhY3lcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW5kVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNsZWdhY3k+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbWVnYW1lbnUtZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9tZWdhbWVudS5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgbWVudWl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNldCBtb2RlbCh2YWx1ZTogTWVnYU1lbnVJdGVtW10gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fbW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc2VkSXRlbXMgPSB0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKHRoaXMuX21vZGVsIHx8IFtdKTtcbiAgICB9XG4gICAgZ2V0IG1vZGVsKCk6IE1lZ2FNZW51SXRlbVtdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIG9yaWVudGF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHwgc3RyaW5nID0gJ2hvcml6b250YWwnO1xuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgaWQgc3RhdGUgYXMgYSBzdHJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHZhbHVlIHRoYXQgbGFiZWxzIGFuIGludGVyYWN0aXZlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBvZiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ21lbnVidXR0b24nKSBtZW51YnV0dG9uOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgncm9vdG1lbnUnKSByb290bWVudTogTWVnYU1lbnVTdWIgfCB1bmRlZmluZWQ7XG5cbiAgICBzdGFydFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgZW5kVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBtZW51SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgc3VibWVudUljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIG91dHNpZGVDbGlja0xpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICByZXNpemVMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFjdGl2ZUl0ZW0gPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIGZvY3VzZWRJdGVtSW5mbyA9IHNpZ25hbDxhbnk+KHsgaW5kZXg6IC0xLCBsZXZlbDogMCwgcGFyZW50S2V5OiAnJywgaXRlbTogbnVsbCB9KTtcblxuICAgIHNlYXJjaFZhbHVlOiBzdHJpbmcgPSAnJztcblxuICAgIHNlYXJjaFRpbWVvdXQ6IGFueTtcblxuICAgIF9wcm9jZXNzZWRJdGVtczogYW55W107XG5cbiAgICBfbW9kZWw6IE1lZ2FNZW51SXRlbVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgZ2V0IHZpc2libGVJdGVtcygpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKCkpID8gdGhpcy5hY3RpdmVJdGVtKCkgOiBudWxsO1xuXG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtICYmIHByb2Nlc3NlZEl0ZW0ua2V5ID09PSB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLnBhcmVudEtleVxuICAgICAgICAgICAgPyBwcm9jZXNzZWRJdGVtLml0ZW1zLnJlZHVjZSgoaXRlbXMsIGNvbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29sLmZvckVhY2goKHN1Ym1lbnUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBzdWJtZW51Lml0ZW1zLmZvckVhY2goKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChhKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICAgICAgICAgIH0sIFtdKVxuICAgICAgICAgICAgOiB0aGlzLnByb2Nlc3NlZEl0ZW1zO1xuICAgIH1cblxuICAgIGdldCBwcm9jZXNzZWRJdGVtcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wcm9jZXNzZWRJdGVtcyB8fCAhdGhpcy5fcHJvY2Vzc2VkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzZWRJdGVtcyA9IHRoaXMuY3JlYXRlUHJvY2Vzc2VkSXRlbXModGhpcy5tb2RlbCB8fCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NlZEl0ZW1zO1xuICAgIH1cblxuICAgIGdldCBmb2N1c2VkSXRlbUlkKCkge1xuICAgICAgICBjb25zdCBmb2N1c2VkSXRlbSA9IHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCk7XG4gICAgICAgIHJldHVybiBmb2N1c2VkSXRlbT8uaXRlbSAmJiBmb2N1c2VkSXRlbS5pdGVtPy5pZCA/IGZvY3VzZWRJdGVtLml0ZW0uaWQgOiBPYmplY3RVdGlscy5pc05vdEVtcHR5KGZvY3VzZWRJdGVtLmtleSkgPyBgJHt0aGlzLmlkfV8ke2ZvY3VzZWRJdGVtLmtleX1gIDogbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLmFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KGFjdGl2ZUl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21lbnVpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzdWJtZW51aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWVudUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9jZXNzZWRJdGVtcyhpdGVtcywgbGV2ZWwgPSAwLCBwYXJlbnQgPSB7fSwgcGFyZW50S2V5ID0gJycsIGNvbHVtbkluZGV4Pykge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgIGl0ZW1zICYmXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IChwYXJlbnRLZXkgIT09ICcnID8gcGFyZW50S2V5ICsgJ18nIDogJycpICsgKGNvbHVtbkluZGV4ICE9PSB1bmRlZmluZWQgPyBjb2x1bW5JbmRleCArICdfJyA6ICcnKSArIGluZGV4O1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICBsZXZlbCxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEtleSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4ICE9PSB1bmRlZmluZWQgPyBjb2x1bW5JbmRleCA6ICg8YW55PnBhcmVudCkuY29sdW1uSW5kZXggIT09IHVuZGVmaW5lZCA/ICg8YW55PnBhcmVudCkuY29sdW1uSW5kZXggOiBpbmRleFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBuZXdJdGVtWydpdGVtcyddID1cbiAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPT09IDAgJiYgaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA+IDAgPyBpdGVtLml0ZW1zLm1hcCgoX2l0ZW1zLCBfaW5kZXgpID0+IHRoaXMuY3JlYXRlUHJvY2Vzc2VkSXRlbXMoX2l0ZW1zLCBsZXZlbCArIDEsIG5ld0l0ZW0sIGtleSwgX2luZGV4KSkgOiB0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKGl0ZW0uaXRlbXMsIGxldmVsICsgMSwgbmV3SXRlbSwga2V5KTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRJdGVtcy5wdXNoKG5ld0l0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtcztcbiAgICB9XG5cbiAgICBnZXRJdGVtUHJvcChpdGVtOiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gaXRlbSA/IE9iamVjdFV0aWxzLmdldEl0ZW1WYWx1ZShpdGVtW25hbWVdKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IHsgb3JpZ2luYWxFdmVudCwgcHJvY2Vzc2VkSXRlbSB9ID0gZXZlbnQ7XG4gICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzUHJvY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pO1xuICAgICAgICBjb25zdCByb290ID0gT2JqZWN0VXRpbHMuaXNFbXB0eShwcm9jZXNzZWRJdGVtLnBhcmVudCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKHByb2Nlc3NlZEl0ZW0pO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgeyBpbmRleCwga2V5LCBwYXJlbnRLZXksIGl0ZW0gfSA9IHByb2Nlc3NlZEl0ZW07XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS5zZXQobnVsbCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleCwga2V5LCBwYXJlbnRLZXksIGl0ZW0gfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSAhcm9vdDtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5yb290bWVudT8ubWVudWJhclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdFByb2Nlc3NlZEl0ZW0gPSByb290ID8gcHJvY2Vzc2VkSXRlbSA6IHRoaXMuYWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZShvcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhvcmlnaW5hbEV2ZW50LCByb290UHJvY2Vzc2VkSXRlbSA/IHJvb3RQcm9jZXNzZWRJdGVtLmluZGV4IDogLTEpO1xuXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51Py5tZW51YmFyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbU1vdXNlRW50ZXIoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoIURvbUhhbmRsZXIuaXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgICAgICB0aGlzLm9uSXRlbUNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxJblZpZXcoaW5kZXg6IG51bWJlciA9IC0xKSB7XG4gICAgICAgIGNvbnN0IGlkID0gaW5kZXggIT09IC0xID8gYCR7dGhpcy5pZH1fJHtpbmRleH1gIDogdGhpcy5mb2N1c2VkSXRlbUlkO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMucm9vdG1lbnU/LmVsLm5hdGl2ZUVsZW1lbnQsIGBsaVtpZD1cIiR7aWR9XCJdYCk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcgJiYgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ25lYXJlc3QnIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgeyBwcm9jZXNzZWRJdGVtLCBpc0ZvY3VzIH0gPSBldmVudDtcblxuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNFbXB0eShwcm9jZXNzZWRJdGVtKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHsgaW5kZXgsIGtleSwgcGFyZW50S2V5LCBpdGVtcywgaXRlbSB9ID0gcHJvY2Vzc2VkSXRlbTtcbiAgICAgICAgY29uc3QgZ3JvdXBlZCA9IE9iamVjdFV0aWxzLmlzTm90RW1wdHkoaXRlbXMpO1xuXG4gICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uc2V0KHByb2Nlc3NlZEl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4LCBrZXksIHBhcmVudEtleSwgaXRlbSB9KTtcblxuICAgICAgICBncm91cGVkICYmICh0aGlzLmRpcnR5ID0gdHJ1ZSk7XG4gICAgICAgIGlzRm9jdXMgJiYgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51Py5tZW51YmFyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBoaWRlKGV2ZW50PywgaXNGb2N1cz86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChudWxsKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IC0xLCBrZXk6ICcnLCBwYXJlbnRLZXk6ICcnLCBpdGVtOiBudWxsIH0pO1xuXG4gICAgICAgIGlzRm9jdXMgJiYgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51Py5tZW51YmFyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uTWVudUZvY3VzKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEZpcnN0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHRoaXMuZmluZFZpc2libGVJdGVtKGluZGV4KTtcblxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXgsIGtleTogcHJvY2Vzc2VkSXRlbS5rZXksIHBhcmVudEtleTogcHJvY2Vzc2VkSXRlbS5wYXJlbnRLZXksIGl0ZW06IHByb2Nlc3NlZEl0ZW0uaXRlbSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTWVudUJsdXIoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IC0xLCBsZXZlbDogMCwgcGFyZW50S2V5OiAnJywgaXRlbTogbnVsbCB9KTtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1ldGFLZXkgPSBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXk7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1JpZ2h0S2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblNwYWNlS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVzY2FwZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICBjYXNlICdCYWNrc3BhY2UnOlxuICAgICAgICAgICAgY2FzZSAnU2hpZnRMZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ1NoaWZ0UmlnaHQnOlxuICAgICAgICAgICAgICAgIC8vTk9PUFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICghbWV0YUtleSAmJiBPYmplY3RVdGlscy5pc1ByaW50YWJsZUNoYXJhY3RlcihldmVudC5rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSXRlbXMoZXZlbnQsIGV2ZW50LmtleSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5maW5kU2VsZWN0ZWRJdGVtSW5kZXgoKTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJbmRleCA8IDAgPyB0aGlzLmZpbmRGaXJzdEl0ZW1JbmRleCgpIDogc2VsZWN0ZWRJbmRleDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RJdGVtSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVJdGVtcy5maW5kSW5kZXgoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkpO1xuICAgIH1cblxuICAgIGZpbmRTZWxlY3RlZEl0ZW1JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZUl0ZW1zLmZpbmRJbmRleCgocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkU2VsZWN0ZWRJdGVtKHByb2Nlc3NlZEl0ZW0pKTtcbiAgICB9XG5cbiAgICBpc1Byb2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0gJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtLml0ZW1zKTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmFjdGl2ZUl0ZW0oKSkgPyB0aGlzLmFjdGl2ZUl0ZW0oKS5rZXkgPT09IHByb2Nlc3NlZEl0ZW0ua2V5IDogZmFsc2U7XG4gICAgfVxuXG4gICAgaXNWYWxpZFNlbGVjdGVkSXRlbShwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkgJiYgdGhpcy5pc1NlbGVjdGVkKHByb2Nlc3NlZEl0ZW0pO1xuICAgIH1cblxuICAgIGlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFwcm9jZXNzZWRJdGVtICYmICF0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0uaXRlbSkgJiYgIXRoaXMuaXNJdGVtU2VwYXJhdG9yKHByb2Nlc3NlZEl0ZW0uaXRlbSk7XG4gICAgfVxuXG4gICAgaXNJdGVtRGlzYWJsZWQoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKGl0ZW0sICdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlzSXRlbVNlcGFyYXRvcihpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AoaXRlbSwgJ3NlcGFyYXRvcicpO1xuICAgIH1cblxuICAgIGlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pICYmIHRoaXMuZ2V0UHJvY2Nlc3NlZEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKS50b0xvY2FsZUxvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgodGhpcy5zZWFyY2hWYWx1ZS50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICBpc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtICYmIE9iamVjdFV0aWxzLmlzTm90RW1wdHkocHJvY2Vzc2VkSXRlbS5pdGVtcyk7XG4gICAgfVxuXG4gICAgc2VhcmNoSXRlbXMoZXZlbnQ6IGFueSwgY2hhcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAodGhpcy5zZWFyY2hWYWx1ZSB8fCAnJykgKyBjaGFyO1xuXG4gICAgICAgIGxldCBpdGVtSW5kZXggPSAtMTtcbiAgICAgICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGl0ZW1JbmRleCA9IHRoaXMudmlzaWJsZUl0ZW1zLnNsaWNlKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpLmZpbmRJbmRleCgocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc0l0ZW1NYXRjaGVkKHByb2Nlc3NlZEl0ZW0pKTtcbiAgICAgICAgICAgIGl0ZW1JbmRleCA9IGl0ZW1JbmRleCA9PT0gLTEgPyB0aGlzLnZpc2libGVJdGVtcy5zbGljZSgwLCB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KS5maW5kSW5kZXgoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtKSkgOiBpdGVtSW5kZXggKyB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbUluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMuZmluZEluZGV4KChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1JbmRleCA9PT0gLTEgJiYgdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGl0ZW1JbmRleCA9IHRoaXMuZmluZEZpcnN0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VhcmNoVGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IG51bGw7XG4gICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfVxuXG4gICAgZ2V0UHJvY2Nlc3NlZEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0gPyB0aGlzLmdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtLml0ZW0pIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldEl0ZW1MYWJlbChpdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJyk7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpbmRleCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0oaW5kZXgpO1xuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtKSkge1xuICAgICAgICAgICAgY29uc3QgeyBrZXksIHBhcmVudEtleSwgaXRlbSB9ID0gcHJvY2Vzc2VkSXRlbTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4LCBrZXk6IGtleSA/IGtleSA6ICcnLCBwYXJlbnRLZXksIGl0ZW0gfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEluVmlldygpO1xuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuYWN0aXZlSXRlbSgpKSAmJiB0aGlzLmFjdGl2ZUl0ZW0oKS5rZXkgPT09IHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkua2V5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBrZXksIGl0ZW0gfSA9IHRoaXMuYWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4OiAtMSwga2V5OiAnJywgcGFyZW50S2V5OiBrZXksIGl0ZW0gfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSB0aGlzLmZpbmRWaXNpYmxlSXRlbSh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmVudEtleSwga2V5LCBpdGVtIH0gPSBwcm9jZXNzZWRJdGVtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNoYW5nZSh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogLTEsIGtleToga2V5LCBwYXJlbnRLZXk6IHBhcmVudEtleSwgaXRlbTogaXRlbSB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xID8gdGhpcy5maW5kTmV4dEl0ZW1JbmRleCh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KSA6IHRoaXMuZmluZEZpcnN0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgaXRlbUluZGV4KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkFycm93UmlnaHRLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHRoaXMuZmluZFZpc2libGVJdGVtKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpO1xuICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgaWYgKGdyb3VwZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKCkpICYmIHRoaXMuYWN0aXZlSXRlbSgpLmtleSA9PT0gcHJvY2Vzc2VkSXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IC0xLCBrZXk6ICcnLCBwYXJlbnRLZXk6IHRoaXMuYWN0aXZlSXRlbSgpLmtleSwgaXRlbTogcHJvY2Vzc2VkSXRlbS5pdGVtIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSB0aGlzLmZpbmRWaXNpYmxlSXRlbSh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBlZCA9IHRoaXMuaXNQcm9jY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNoYW5nZSh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IC0xLCBrZXk6IHByb2Nlc3NlZEl0ZW0ua2V5LCBwYXJlbnRLZXk6IHByb2Nlc3NlZEl0ZW0ucGFyZW50S2V5LCBpdGVtOiBwcm9jZXNzZWRJdGVtLml0ZW0gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xID8gdGhpcy5maW5kTmV4dEl0ZW1JbmRleCh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KSA6IHRoaXMuZmluZEZpcnN0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgaXRlbUluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gcHJvY2Vzc2VkSXRlbS5jb2x1bW5JbmRleCArIDE7XG4gICAgICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLnZpc2libGVJdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uY29sdW1uSW5kZXggPT09IGNvbHVtbkluZGV4KTtcblxuICAgICAgICAgICAgaXRlbUluZGV4ICE9PSAtMSAmJiB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgaXRlbUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd1VwS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5hbHRLZXkgJiYgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0odGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBlZCA9IHRoaXMuaXNQcm9jY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFncm91cGVkICYmIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IHRoaXMuYWN0aXZlSXRlbSgpLmluZGV4LCBrZXk6IHRoaXMuYWN0aXZlSXRlbSgpLmtleSwgcGFyZW50S2V5OiB0aGlzLmFjdGl2ZUl0ZW0oKS5wYXJlbnRLZXksIGl0ZW06IHByb2Nlc3NlZEl0ZW0uaXRlbSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS5zZXQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgdGhpcy5maW5kRmlyc3RJdGVtSW5kZXgoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ICE9PSAtMSA/IHRoaXMuZmluZFByZXZJdGVtSW5kZXgodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCkgOiB0aGlzLmZpbmRMYXN0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgaXRlbUluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFycm93TGVmdEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0odGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCk7XG4gICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzUHJvY2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKTtcblxuICAgICAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xID8gdGhpcy5maW5kUHJldkl0ZW1JbmRleCh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KSA6IHRoaXMuZmluZExhc3RGb2N1c2VkSXRlbUluZGV4KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgaXRlbUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnICYmIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKCkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NlZEl0ZW0uY29sdW1uSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IHRoaXMuYWN0aXZlSXRlbSgpLmluZGV4LCBrZXk6IHRoaXMuYWN0aXZlSXRlbSgpLmtleSwgcGFyZW50S2V5OiB0aGlzLmFjdGl2ZUl0ZW0oKS5wYXJlbnRLZXksIGl0ZW06IHByb2Nlc3NlZEl0ZW0uaXRlbSB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gcHJvY2Vzc2VkSXRlbS5jb2x1bW5JbmRleCAtIDE7XG4gICAgICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLnZpc2libGVJdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uY29sdW1uSW5kZXggPT09IGNvbHVtbkluZGV4KTtcblxuICAgICAgICAgICAgaXRlbUluZGV4ICE9PSAtMSAmJiB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgaXRlbUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Ib21lS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCB0aGlzLmZpbmRGaXJzdEl0ZW1JbmRleCgpKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkVuZEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgdGhpcy5maW5kTGFzdEl0ZW1JbmRleCgpKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblNwYWNlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgfVxuXG4gICAgb25Fc2NhcGVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogdGhpcy5hY3RpdmVJdGVtKCkuaW5kZXgsIGtleTogdGhpcy5hY3RpdmVJdGVtKCkua2V5LCBpdGVtOiB0aGlzLmFjdGl2ZUl0ZW0oKS5pdGVtIH0pO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0odGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCk7XG4gICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgICAgICFncm91cGVkICYmIHRoaXMub25JdGVtQ2hhbmdlKHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBvbkVudGVyS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnJvb3RtZW51Py5lbD8ubmF0aXZlRWxlbWVudCwgYGxpW2lkPVwiJHtgJHt0aGlzLmZvY3VzZWRJdGVtSWR9YH1cIl1gKTtcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvckVsZW1lbnQgPSBlbGVtZW50ICYmIERvbUhhbmRsZXIuZmluZFNpbmdsZShlbGVtZW50LCAnYVtkYXRhLXBjLXNlY3Rpb249XCJhY3Rpb25cIl0nKTtcblxuICAgICAgICAgICAgYW5jaG9yRWxlbWVudCA/IGFuY2hvckVsZW1lbnQuY2xpY2soKSA6IGVsZW1lbnQgJiYgZWxlbWVudC5jbGljaygpO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy52aXNpYmxlSXRlbXNbdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleF07XG4gICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgICAgICFncm91cGVkICYmIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCB0aGlzLmZpbmRGaXJzdEZvY3VzZWRJdGVtSW5kZXgoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGZpbmRWaXNpYmxlSXRlbShpbmRleCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLnZpc2libGVJdGVtcykgPyB0aGlzLnZpc2libGVJdGVtc1tpbmRleF0gOiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRMYXN0Rm9jdXNlZEl0ZW1JbmRleCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZmluZFNlbGVjdGVkSXRlbUluZGV4KCk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZEluZGV4IDwgMCA/IHRoaXMuZmluZExhc3RJdGVtSW5kZXgoKSA6IHNlbGVjdGVkSW5kZXg7XG4gICAgfVxuXG4gICAgZmluZExhc3RJdGVtSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5maW5kTGFzdEluZGV4KHRoaXMudmlzaWJsZUl0ZW1zLCAocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSk7XG4gICAgfVxuXG4gICAgZmluZFByZXZJdGVtSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBtYXRjaGVkSXRlbUluZGV4ID0gaW5kZXggPiAwID8gT2JqZWN0VXRpbHMuZmluZExhc3RJbmRleCh0aGlzLnZpc2libGVJdGVtcy5zbGljZSgwLCBpbmRleCksIChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pKSA6IC0xO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkSXRlbUluZGV4ID4gLTEgPyBtYXRjaGVkSXRlbUluZGV4IDogaW5kZXg7XG4gICAgfVxuXG4gICAgZmluZE5leHRJdGVtSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBtYXRjaGVkSXRlbUluZGV4ID0gaW5kZXggPCB0aGlzLnZpc2libGVJdGVtcy5sZW5ndGggLSAxID8gdGhpcy52aXNpYmxlSXRlbXMuc2xpY2UoaW5kZXggKyAxKS5maW5kSW5kZXgoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkpIDogLTE7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRJdGVtSW5kZXggPiAtMSA/IG1hdGNoZWRJdGVtSW5kZXggKyBpbmRleCArIDEgOiBpbmRleDtcbiAgICB9XG5cbiAgICBiaW5kUmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldywgJ3Jlc2l6ZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc091dHNpZGVDb250YWluZXIgPSB0aGlzLnJvb3RtZW51Py5lbC5uYXRpdmVFbGVtZW50ICE9PSBldmVudC50YXJnZXQgJiYgIXRoaXMucm9vdG1lbnU/LmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPdXRzaWRlQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm91dHNpZGVDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5yZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZSwgUmlwcGxlTW9kdWxlLCBUb29sdGlwTW9kdWxlLCBTaGFyZWRNb2R1bGUsIEFuZ2xlRG93bkljb24sIEFuZ2xlUmlnaHRJY29uXSxcbiAgICBleHBvcnRzOiBbTWVnYU1lbnUsIFJvdXRlck1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNZWdhTWVudSwgTWVnYU1lbnVTdWJdXG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51TW9kdWxlIHt9XG4iXX0=