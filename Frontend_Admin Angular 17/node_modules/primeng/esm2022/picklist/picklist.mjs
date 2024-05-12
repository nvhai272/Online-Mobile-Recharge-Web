import { CDK_DRAG_CONFIG, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { AngleDoubleDownIcon } from 'primeng/icons/angledoubledown';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleDoubleUpIcon } from 'primeng/icons/angledoubleup';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { HomeIcon } from 'primeng/icons/home';
import { SearchIcon } from 'primeng/icons/search';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/button";
import * as i4 from "primeng/ripple";
import * as i5 from "@angular/cdk/drag-drop";
/**
 * PickList is used to reorder items between different lists.
 * @group Components
 */
export class PickList {
    document;
    platformId;
    renderer;
    el;
    cd;
    filterService;
    config;
    /**
     * An array of objects for the source list.
     * @group Props
     */
    source;
    /**
     * An array of objects for the target list.
     * @group Props
     */
    target;
    /**
     * Text for the source list caption
     * @group Props
     */
    sourceHeader;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Defines a string that labels the move to right button for accessibility.
     * @group Props
     */
    rightButtonAriaLabel;
    /**
     * Defines a string that labels the move to left button for accessibility.
     * @group Props
     */
    leftButtonAriaLabel;
    /**
     * Defines a string that labels the move to all right button for accessibility.
     * @group Props
     */
    allRightButtonAriaLabel;
    /**
     * Defines a string that labels the move to all left button for accessibility.
     * @group Props
     */
    allLeftButtonAriaLabel;
    /**
     * Defines a string that labels the move to up button for accessibility.
     * @group Props
     */
    upButtonAriaLabel;
    /**
     * Defines a string that labels the move to down button for accessibility.
     * @group Props
     */
    downButtonAriaLabel;
    /**
     * Defines a string that labels the move to top button for accessibility.
     * @group Props
     */
    topButtonAriaLabel;
    /**
     * Defines a string that labels the move to bottom button for accessibility.
     * @group Props
     */
    bottomButtonAriaLabel;
    /**
     * Text for the target list caption
     * @group Props
     */
    targetHeader;
    /**
     * When enabled orderlist adjusts its controls based on screen size.
     * @group Props
     */
    responsive;
    /**
     * When specified displays an input field to filter the items on keyup and decides which field to search (Accepts multiple fields with a comma).
     * @group Props
     */
    filterBy;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. Use sourceTrackBy or targetTrackBy in case different algorithms are needed per list.
     * @group Props
     */
    trackBy = (index, item) => item;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in source list, default algorithm checks for object identity.
     * @group Props
     */
    sourceTrackBy;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in target list, default algorithm checks for object identity.
     * @group Props
     */
    targetTrackBy;
    /**
     * Whether to show filter input for source list when filterBy is enabled.
     * @group Props
     */
    showSourceFilter = true;
    /**
     * Whether to show filter input for target list when filterBy is enabled.
     * @group Props
     */
    showTargetFilter = true;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = false;
    /**
     * Whether to enable dragdrop based reordering.
     * @group Props
     */
    dragdrop = false;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the source list element.
     * @group Props
     */
    sourceStyle;
    /**
     * Inline style of the target list element.
     * @group Props
     */
    targetStyle;
    /**
     * Whether to show buttons of source list.
     * @group Props
     */
    showSourceControls = true;
    /**
     * Whether to show buttons of target list.
     * @group Props
     */
    showTargetControls = true;
    /**
     * Placeholder text on source filter input.
     * @group Props
     */
    sourceFilterPlaceholder;
    /**
     * Placeholder text on target filter input.
     * @group Props
     */
    targetFilterPlaceholder;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = false;
    /**
     * Defines a string that labels the filter input of source list.
     * @group Props
     */
    ariaSourceFilterLabel;
    /**
     * Defines a string that labels the filter input of target list.
     * @group Props
     */
    ariaTargetFilterLabel;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = 'contains';
    /**
     * Whether to displays rows with alternating colors.
     * @group Props
     */
    stripedRows;
    /**
     * Keeps selection on the transfer list.
     * @group Props
     */
    keepSelection = false;
    /**
     * Indicates the width of the screen at which the component should change its behavior.
     * @group Props
     */
    get breakpoint() {
        return this._breakpoint;
    }
    set breakpoint(value) {
        if (value !== this._breakpoint) {
            this._breakpoint = value;
            if (isPlatformBrowser(this.platformId)) {
                this.destroyMedia();
                this.initMedia();
            }
        }
    }
    /**
     * Callback to invoke when items are moved from target to source.
     * @param {PickListMoveToSourceEvent} event - Custom move to source event.
     * @group Emits
     */
    onMoveToSource = new EventEmitter();
    /**
     * Callback to invoke when all items are moved from target to source.
     * @param {PickListMoveAllToSourceEvent} event - Custom move all to source event.
     * @group Emits
     */
    onMoveAllToSource = new EventEmitter();
    /**
     * Callback to invoke when all items are moved from source to target.
     * @param {PickListMoveAllToTargetEvent} event - Custom move all to target event.
     * @group Emits
     */
    onMoveAllToTarget = new EventEmitter();
    /**
     * Callback to invoke when items are moved from source to target.
     * @param {PickListMoveToTargetEvent} event - Custom move to target event.
     * @group Emits
     */
    onMoveToTarget = new EventEmitter();
    /**
     * Callback to invoke when items are reordered within source list.
     * @param {PickListSourceReorderEvent} event - Custom source reorder event.
     * @group Emits
     */
    onSourceReorder = new EventEmitter();
    /**
     * Callback to invoke when items are reordered within target list.
     * @param {PickListTargetReorderEvent} event - Custom target reorder event.
     * @group Emits
     */
    onTargetReorder = new EventEmitter();
    /**
     * Callback to invoke when items are selected within source list.
     * @param {PickListSourceSelectEvent} event - Custom source select event.
     * @group Emits
     */
    onSourceSelect = new EventEmitter();
    /**
     * Callback to invoke when items are selected within target list.
     * @param {PickListTargetSelectEvent} event - Custom target select event.
     * @group Emits
     */
    onTargetSelect = new EventEmitter();
    /**
     * Callback to invoke when the source list is filtered
     * @param {PickListSourceFilterEvent} event - Custom source filter event.
     * @group Emits
     */
    onSourceFilter = new EventEmitter();
    /**
     * Callback to invoke when the target list is filtered
     * @param {PickListTargetFilterEvent} event - Custom target filter event.
     * @group Emits
     */
    onTargetFilter = new EventEmitter();
    /**
     * Callback to invoke when the list is focused
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the list is blurred
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    listViewSourceChild;
    listViewTargetChild;
    sourceFilterViewChild;
    targetFilterViewChild;
    templates;
    get moveUpAriaLabel() {
        return this.upButtonAriaLabel ? this.upButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveUp : undefined;
    }
    get moveTopAriaLabel() {
        return this.topButtonAriaLabel ? this.topButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveTop : undefined;
    }
    get moveDownAriaLabel() {
        return this.downButtonAriaLabel ? this.downButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveDown : undefined;
    }
    get moveBottomAriaLabel() {
        return this.bottomButtonAriaLabel ? this.bottomButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveDown : undefined;
    }
    get moveToTargetAriaLabel() {
        return this.rightButtonAriaLabel ? this.rightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToTarget : undefined;
    }
    get moveAllToTargetAriaLabel() {
        return this.allRightButtonAriaLabel ? this.allRightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToTarget : undefined;
    }
    get moveToSourceAriaLabel() {
        return this.leftButtonAriaLabel ? this.leftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToSource : undefined;
    }
    get moveAllToSourceAriaLabel() {
        return this.allLeftButtonAriaLabel ? this.allLeftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToSource : undefined;
    }
    get idSource() {
        return this.id + '_source';
    }
    get idTarget() {
        return this.id + '_target';
    }
    get focusedOptionId() {
        return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }
    _breakpoint = '960px';
    itemTemplate;
    moveTopIconTemplate;
    moveUpIconTemplate;
    moveDownIconTemplate;
    moveBottomIconTemplate;
    moveToTargetIconTemplate;
    moveAllToTargetIconTemplate;
    moveToSourceIconTemplate;
    moveAllToSourceIconTemplate;
    targetFilterIconTemplate;
    sourceFilterIconTemplate;
    visibleOptionsSource;
    visibleOptionsTarget;
    selectedItemsSource = [];
    selectedItemsTarget = [];
    reorderedListElement;
    movedUp;
    movedDown;
    itemTouched;
    styleElement;
    id = UniqueComponentId();
    filterValueSource;
    filterValueTarget;
    fromListType;
    emptyMessageSourceTemplate;
    emptyFilterMessageSourceTemplate;
    emptyMessageTargetTemplate;
    emptyFilterMessageTargetTemplate;
    sourceHeaderTemplate;
    targetHeaderTemplate;
    sourceFilterTemplate;
    targetFilterTemplate;
    sourceFilterOptions;
    targetFilterOptions;
    SOURCE_LIST = -1;
    TARGET_LIST = 1;
    window;
    media;
    viewChanged;
    focusedOptionIndex = -1;
    focusedOption;
    focused = {
        sourceList: false,
        targetList: false
    };
    mediaChangeListener;
    constructor(document, platformId, renderer, el, cd, filterService, config) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.el = el;
        this.cd = cd;
        this.filterService = filterService;
        this.config = config;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        if (this.responsive) {
            this.createStyle();
            this.initMedia();
        }
        if (this.filterBy) {
            this.sourceFilterOptions = {
                filter: (value) => this.filterSource(value),
                reset: () => this.resetSourceFilter()
            };
            this.targetFilterOptions = {
                filter: (value) => this.filterTarget(value),
                reset: () => this.resetTargetFilter()
            };
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'sourceHeader':
                    this.sourceHeaderTemplate = item.template;
                    break;
                case 'targetHeader':
                    this.targetHeaderTemplate = item.template;
                    break;
                case 'sourceFilter':
                    this.sourceFilterTemplate = item.template;
                    break;
                case 'targetFilter':
                    this.targetFilterTemplate = item.template;
                    break;
                case 'emptymessagesource':
                    this.emptyMessageSourceTemplate = item.template;
                    break;
                case 'emptyfiltermessagesource':
                    this.emptyFilterMessageSourceTemplate = item.template;
                    break;
                case 'emptymessagetarget':
                    this.emptyMessageTargetTemplate = item.template;
                    break;
                case 'emptyfiltermessagetarget':
                    this.emptyFilterMessageTargetTemplate = item.template;
                    break;
                case 'moveupicon':
                    this.moveUpIconTemplate = item.template;
                    break;
                case 'movetopicon':
                    this.moveTopIconTemplate = item.template;
                    break;
                case 'movedownicon':
                    this.moveDownIconTemplate = item.template;
                    break;
                case 'movebottomicon':
                    this.moveBottomIconTemplate = item.template;
                    break;
                case 'movetotargeticon':
                    this.moveToTargetIconTemplate = item.template;
                    break;
                case 'movealltotargeticon':
                    this.moveAllToTargetIconTemplate = item.template;
                    break;
                case 'movetosourceicon':
                    this.moveToSourceIconTemplate = item.template;
                    break;
                case 'movealltosourceicon':
                    this.moveAllToSourceIconTemplate = item.template;
                    break;
                case 'targetfiltericon':
                    this.targetFilterIconTemplate = item.template;
                    break;
                case 'sourcefiltericon':
                    this.sourceFilterIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.reorderedListElement, 'li.p-highlight');
            let listItem;
            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            DomHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    }
    onItemClick(event, item, selectedItems, listType, callback, itemId) {
        if (this.disabled) {
            return;
        }
        let index = this.findIndexInList(item, selectedItems);
        if (itemId)
            this.focusedOptionIndex = itemId;
        let selected = index != -1;
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = event.metaKey || event.ctrlKey || event.shiftKey;
            if (selected && metaKey) {
                selectedItems = selectedItems.filter((_, i) => i !== index);
            }
            else {
                if (!metaKey) {
                    selectedItems = [];
                }
                selectedItems.push(item);
            }
        }
        else {
            if (selected) {
                selectedItems = selectedItems.filter((_, i) => i !== index); // Creating a new array without the selected item
            }
            else {
                selectedItems.push(item);
            }
        }
        this.setSelectionList(listType, selectedItems);
        callback.emit({ originalEvent: event, items: selectedItems });
        this.itemTouched = false;
    }
    onOptionMouseDown(index, listType) {
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = true;
        this.focusedOptionIndex = index;
    }
    onSourceItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveRight();
    }
    onTargetItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveLeft();
    }
    onFilter(event, listType) {
        let query = event.target.value;
        if (listType === this.SOURCE_LIST)
            this.filterSource(query);
        else if (listType === this.TARGET_LIST)
            this.filterTarget(query);
    }
    filterSource(value = '') {
        this.filterValueSource = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(this.source, this.SOURCE_LIST);
    }
    filterTarget(value = '') {
        this.filterValueTarget = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(this.target, this.TARGET_LIST);
    }
    filter(data, listType) {
        let searchFields = this.filterBy.split(',');
        if (listType === this.SOURCE_LIST) {
            this.visibleOptionsSource = this.filterService.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
            this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
        }
        else if (listType === this.TARGET_LIST) {
            this.visibleOptionsTarget = this.filterService.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode, this.filterLocale);
            this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
        }
    }
    isItemVisible(item, listType) {
        if (listType == this.SOURCE_LIST)
            return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
        else
            return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
    }
    isEmpty(listType) {
        if (listType == this.SOURCE_LIST)
            return this.filterValueSource ? !this.visibleOptionsSource || this.visibleOptionsSource.length === 0 : !this.source || this.source.length === 0;
        else
            return this.filterValueTarget ? !this.visibleOptionsTarget || this.visibleOptionsTarget.length === 0 : !this.target || this.target.length === 0;
    }
    isVisibleInList(data, item, filterValue) {
        if (filterValue && filterValue.trim().length) {
            for (let i = 0; i < data.length; i++) {
                if (item == data[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    onItemTouchEnd() {
        if (this.disabled) {
            return;
        }
        this.itemTouched = true;
    }
    sortByIndexInList(items, list) {
        return items.sort((item1, item2) => ObjectUtils.findIndexInList(item1, list) - ObjectUtils.findIndexInList(item2, list));
    }
    moveUp(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveTop(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
        }
    }
    moveDown(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveBottom(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
        }
    }
    moveRight() {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            for (let i = 0; i < this.selectedItemsSource.length; i++) {
                let selectedItem = this.selectedItemsSource[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.target) == -1) {
                    this.target?.push(this.source?.splice(ObjectUtils.findIndexInList(selectedItem, this.source), 1)[0]);
                    if (this.visibleOptionsSource?.includes(selectedItem)) {
                        this.visibleOptionsSource.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsSource), 1);
                    }
                }
            }
            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });
            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
        }
    }
    moveAllRight() {
        if (this.source) {
            let movedItems = [];
            for (let i = 0; i < this.source.length; i++) {
                if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                    let removedItem = this.source.splice(i, 1)[0];
                    this.target?.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToTarget.emit({
                items: movedItems
            });
            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
            this.visibleOptionsSource = [];
        }
    }
    moveLeft() {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            for (let i = 0; i < this.selectedItemsTarget.length; i++) {
                let selectedItem = this.selectedItemsTarget[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.source) == -1) {
                    this.source?.push(this.target?.splice(ObjectUtils.findIndexInList(selectedItem, this.target), 1)[0]);
                    if (this.visibleOptionsTarget?.includes(selectedItem)) {
                        this.visibleOptionsTarget.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsTarget), 1)[0];
                    }
                }
            }
            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });
            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
        }
    }
    moveAllLeft() {
        if (this.target) {
            let movedItems = [];
            for (let i = 0; i < this.target.length; i++) {
                if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                    let removedItem = this.target.splice(i, 1)[0];
                    this.source?.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToSource.emit({
                items: movedItems
            });
            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
            this.visibleOptionsTarget = [];
        }
    }
    isSelected(item, selectedItems) {
        return this.findIndexInList(item, selectedItems) != -1;
    }
    itemClass(item, id, selectedItems) {
        return {
            'p-picklist-item': true,
            'p-highlight': this.isSelected(item, selectedItems),
            'p-focus': id === this.focusedOptionId
        };
    }
    findIndexInList(item, selectedItems) {
        return ObjectUtils.findIndexInList(item, selectedItems);
    }
    onDrop(event, listType) {
        let isTransfer = event.previousContainer !== event.container;
        let dropIndexes = this.getDropIndexes(event.previousIndex, event.currentIndex, listType, isTransfer, event.item.data);
        if (listType === this.SOURCE_LIST) {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsTarget);
                if (selectedItemIndex != -1) {
                    this.selectedItemsTarget.splice(selectedItemIndex, 1);
                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }
                if (this.visibleOptionsTarget)
                    this.visibleOptionsTarget.splice(event.previousIndex, 1);
                this.onMoveToSource.emit({ items: [event.item.data] });
            }
            else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onSourceReorder.emit({ items: [event.item.data] });
            }
            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
        }
        else {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsSource);
                if (selectedItemIndex != -1) {
                    this.selectedItemsSource.splice(selectedItemIndex, 1);
                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }
                if (this.visibleOptionsSource)
                    this.visibleOptionsSource.splice(event.previousIndex, 1);
                this.onMoveToTarget.emit({ items: [event.item.data] });
            }
            else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onTargetReorder.emit({ items: [event.item.data] });
            }
            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
        }
    }
    onListFocus(event, listType) {
        let listElement = this.getListElement(listType);
        const selectedFirstItem = DomHandler.findSingle(listElement, 'li.p-picklist-item.p-highlight') || DomHandler.findSingle(listElement, 'li.p-picklist-item');
        const findIndex = ObjectUtils.findIndexInList(selectedFirstItem, listElement.children);
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = true;
        const index = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : selectedFirstItem ? findIndex : -1;
        this.changeFocusedOptionIndex(index, listType);
        this.onFocus.emit(event);
    }
    onListBlur(event, listType) {
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = false;
        this.focusedOptionIndex = -1;
        this.focusedOption = null;
        this.onBlur.emit(event);
    }
    getListElement(listType) {
        return listType === this.SOURCE_LIST ? this.listViewSourceChild?.nativeElement : this.listViewTargetChild?.nativeElement;
    }
    getListItems(listType) {
        let listElemet = this.getListElement(listType);
        return DomHandler.find(listElemet, 'li.p-picklist-item');
    }
    getLatestSelectedVisibleOptionIndex(visibleList, selectedItems) {
        const latestSelectedItem = [...selectedItems].reverse().find((item) => visibleList.includes(item));
        return latestSelectedItem !== undefined ? visibleList.indexOf(latestSelectedItem) : -1;
    }
    getVisibleList(listType) {
        if (listType === this.SOURCE_LIST) {
            return this.visibleOptionsSource && this.visibleOptionsSource.length > 0 ? this.visibleOptionsSource : this.source && this.source.length > 0 ? this.source : null;
        }
        return this.visibleOptionsTarget && this.visibleOptionsTarget.length > 0 ? this.visibleOptionsTarget : this.target && this.target.length > 0 ? this.target : null;
    }
    setSelectionList(listType, selectedItems) {
        if (listType === this.SOURCE_LIST) {
            this.selectedItemsSource = selectedItems;
        }
        else {
            this.selectedItemsTarget = selectedItems;
        }
    }
    findNextOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }
    findPrevOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }
    onItemKeyDown(event, selectedItems, callback, listType) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event, selectedItems, callback, listType);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event, selectedItems, callback, listType);
                break;
            case 'Home':
                this.onHomeKey(event, selectedItems, callback, listType);
                break;
            case 'End':
                this.onEndKey(event, selectedItems, callback, listType);
                break;
            case 'Enter':
                this.onEnterKey(event, selectedItems, callback, listType);
                break;
            case 'Space':
                this.onSpaceKey(event, selectedItems, callback, listType);
                break;
            case 'KeyA':
                if (event.ctrlKey) {
                    this.setSelectionList(listType, this.getVisibleList(listType));
                    callback.emit({ items: selectedItems });
                    event.preventDefault();
                }
            default:
                break;
        }
    }
    getFocusedOption(index, listType) {
        if (index === -1)
            return null;
        if (listType === this.SOURCE_LIST) {
            return this.visibleOptionsSource && this.visibleOptionsSource.length ? this.visibleOptionsSource[index] : this.source && this.source.length ? this.source[index] : null;
        }
        return this.visibleOptionsTarget && this.visibleOptionsTarget.length ? this.visibleOptionsTarget[index] : this.target && this.target.length ? this.target[index] : null;
    }
    changeFocusedOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        if (items?.length > 0) {
            let order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;
            this.focusedOptionIndex = items[order].getAttribute('id');
            this.focusedOption = this.getFocusedOption(order, listType);
            this.scrollInView(items[order].getAttribute('id'), listType);
        }
    }
    scrollInView(id, listType) {
        const element = DomHandler.findSingle(this.getListElement(listType), `li[id="${id}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }
    onArrowDownKey(event, selectedItems, callback, listType) {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex, listType);
        this.changeFocusedOptionIndex(optionIndex, listType);
        if (event.shiftKey) {
            this.onEnterKey(event, selectedItems, callback, listType);
        }
        event.preventDefault();
    }
    onArrowUpKey(event, selectedItems, callback, listType) {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex, listType);
        this.changeFocusedOptionIndex(optionIndex, listType);
        if (event.shiftKey) {
            this.onEnterKey(event, selectedItems, callback, listType);
        }
        event.preventDefault();
    }
    onEnterKey(event, selectedItems, callback, listType) {
        this.onItemClick(event, this.focusedOption, selectedItems, listType, callback);
        event.preventDefault();
    }
    onSpaceKey(event, selectedItems, callback, listType) {
        event.preventDefault();
        if (event.shiftKey && selectedItems && selectedItems.length > 0) {
            let visibleList = this.getVisibleList(listType);
            let lastSelectedIndex = this.getLatestSelectedVisibleOptionIndex(visibleList, selectedItems);
            if (lastSelectedIndex !== -1) {
                let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
                selectedItems = [...visibleList.slice(Math.min(lastSelectedIndex, focusedIndex), Math.max(lastSelectedIndex, focusedIndex) + 1)];
                this.setSelectionList(listType, selectedItems);
                callback.emit({ items: selectedItems });
                return;
            }
        }
        this.onEnterKey(event, selectedItems, callback, listType);
    }
    onHomeKey(event, selectedItems, callback, listType) {
        if (event.ctrlKey && event.shiftKey) {
            let visibleList = this.getVisibleList(listType);
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
            selectedItems = [...visibleList.slice(0, focusedIndex + 1)];
            this.setSelectionList(listType, selectedItems);
            callback.emit({ items: selectedItems });
        }
        else {
            this.changeFocusedOptionIndex(0, listType);
        }
        event.preventDefault();
    }
    onEndKey(event, selectedItems, callback, listType) {
        let visibleList = this.getVisibleList(listType);
        let lastIndex = visibleList && visibleList.length > 0 ? visibleList.length - 1 : null;
        if (lastIndex === null)
            return;
        if (event.ctrlKey && event.shiftKey) {
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
            selectedItems = [...visibleList.slice(focusedIndex, lastIndex)];
            this.setSelectionList(listType, selectedItems);
            callback.emit({ items: selectedItems });
        }
        else {
            this.changeFocusedOptionIndex(lastIndex, listType);
        }
        event.preventDefault();
    }
    getDropIndexes(fromIndex, toIndex, droppedList, isTransfer, data) {
        let previousIndex, currentIndex;
        if (droppedList === this.SOURCE_LIST) {
            previousIndex = isTransfer ? (this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex) : this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex;
            currentIndex = this.filterValueSource ? this.findFilteredCurrentIndex(this.visibleOptionsSource, toIndex, this.source) : toIndex;
        }
        else {
            previousIndex = isTransfer ? (this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex) : this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex;
            currentIndex = this.filterValueTarget ? this.findFilteredCurrentIndex(this.visibleOptionsTarget, toIndex, this.target) : toIndex;
        }
        return { previousIndex, currentIndex };
    }
    findFilteredCurrentIndex(visibleOptions, index, options) {
        if (visibleOptions.length === index) {
            let toIndex = ObjectUtils.findIndexInList(visibleOptions[index - 1], options);
            return toIndex + 1;
        }
        else {
            return ObjectUtils.findIndexInList(visibleOptions[index], options);
        }
    }
    resetSourceFilter() {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        this.sourceFilterViewChild && (this.sourceFilterViewChild.nativeElement.value = '');
    }
    resetTargetFilter() {
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;
        this.targetFilterViewChild && (this.targetFilterViewChild.nativeElement.value = '');
    }
    resetFilter() {
        this.resetSourceFilter();
        this.resetTargetFilter();
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'p-picklist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'p-picklist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
    initMedia() {
        if (isPlatformBrowser(this.platformId)) {
            this.media = this.window.matchMedia(`(max-width: ${this.breakpoint})`);
            this.viewChanged = this.media.matches;
            this.bindMediaChangeListener();
        }
    }
    destroyMedia() {
        this.unbindMediaChangeListener();
    }
    bindMediaChangeListener() {
        if (this.media && !this.mediaChangeListener) {
            this.mediaChangeListener = this.renderer.listen(this.media, 'change', (event) => {
                this.viewChanged = event.matches;
                this.cd.markForCheck();
            });
        }
    }
    unbindMediaChangeListener() {
        if (this.mediaChangeListener) {
            this.mediaChangeListener();
            this.mediaChangeListener = null;
        }
    }
    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.renderer.setAttribute(this.el.nativeElement.children[0], this.id, '');
                this.styleElement = this.renderer.createElement('style');
                this.renderer.setAttribute(this.styleElement, 'type', 'text/css');
                this.renderer.appendChild(this.document.head, this.styleElement);
                let innerHTML = `
                @media screen and (max-width: ${this.breakpoint}) {
                    .p-picklist[${this.id}] {
                        flex-direction: column;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons {
                        padding: var(--content-padding);
                        flex-direction: row;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button {
                        margin-right: var(--inline-spacing);
                        margin-bottom: 0;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button:last-child {
                        margin-right: 0;
                    }
                }`;
                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
            }
        }
    }
    sourceMoveDisabled() {
        if (this.disabled || !this.selectedItemsSource.length) {
            return true;
        }
    }
    targetMoveDisabled() {
        if (this.disabled || !this.selectedItemsTarget.length) {
            return true;
        }
    }
    moveRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsSource);
    }
    moveLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsTarget);
    }
    moveAllRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.source);
    }
    moveAllLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.target);
    }
    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
            ``;
        }
    }
    ngOnDestroy() {
        this.destroyStyle();
        this.destroyMedia();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PickList, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.FilterService }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "17.3.1", type: PickList, selector: "p-pickList", inputs: { source: "source", target: "target", sourceHeader: "sourceHeader", tabindex: ["tabindex", "tabindex", numberAttribute], rightButtonAriaLabel: "rightButtonAriaLabel", leftButtonAriaLabel: "leftButtonAriaLabel", allRightButtonAriaLabel: "allRightButtonAriaLabel", allLeftButtonAriaLabel: "allLeftButtonAriaLabel", upButtonAriaLabel: "upButtonAriaLabel", downButtonAriaLabel: "downButtonAriaLabel", topButtonAriaLabel: "topButtonAriaLabel", bottomButtonAriaLabel: "bottomButtonAriaLabel", targetHeader: "targetHeader", responsive: ["responsive", "responsive", booleanAttribute], filterBy: "filterBy", filterLocale: "filterLocale", trackBy: "trackBy", sourceTrackBy: "sourceTrackBy", targetTrackBy: "targetTrackBy", showSourceFilter: ["showSourceFilter", "showSourceFilter", booleanAttribute], showTargetFilter: ["showTargetFilter", "showTargetFilter", booleanAttribute], metaKeySelection: ["metaKeySelection", "metaKeySelection", booleanAttribute], dragdrop: ["dragdrop", "dragdrop", booleanAttribute], style: "style", styleClass: "styleClass", sourceStyle: "sourceStyle", targetStyle: "targetStyle", showSourceControls: ["showSourceControls", "showSourceControls", booleanAttribute], showTargetControls: ["showTargetControls", "showTargetControls", booleanAttribute], sourceFilterPlaceholder: "sourceFilterPlaceholder", targetFilterPlaceholder: "targetFilterPlaceholder", disabled: ["disabled", "disabled", booleanAttribute], ariaSourceFilterLabel: "ariaSourceFilterLabel", ariaTargetFilterLabel: "ariaTargetFilterLabel", filterMatchMode: "filterMatchMode", stripedRows: ["stripedRows", "stripedRows", booleanAttribute], keepSelection: ["keepSelection", "keepSelection", booleanAttribute], breakpoint: "breakpoint" }, outputs: { onMoveToSource: "onMoveToSource", onMoveAllToSource: "onMoveAllToSource", onMoveAllToTarget: "onMoveAllToTarget", onMoveToTarget: "onMoveToTarget", onSourceReorder: "onSourceReorder", onTargetReorder: "onTargetReorder", onSourceSelect: "onSourceSelect", onTargetSelect: "onTargetSelect", onSourceFilter: "onSourceFilter", onTargetFilter: "onTargetFilter", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "listViewSourceChild", first: true, predicate: ["sourcelist"], descendants: true }, { propertyName: "listViewTargetChild", first: true, predicate: ["targetlist"], descendants: true }, { propertyName: "sourceFilterViewChild", first: true, predicate: ["sourceFilter"], descendants: true }, { propertyName: "targetFilterViewChild", first: true, predicate: ["targetFilter"], descendants: true }], ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{ 'p-picklist p-component': true, 'p-picklist-striped': stripedRows }" cdkDropListGroup [attr.data-pc-name]="'picklist'" [attr.data-pc-section]="'root'">
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls" [attr.data-pc-section]="'sourceControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveUp(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveTop(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveDown(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveBottom(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper" [attr.data-pc-section]="'sourceWrapper'" [attr.data-pc-group-section]="'listWrapper'">
                <div [id]="idSource + '_header'" class="p-picklist-header" *ngIf="sourceHeader || sourceHeaderTemplate" [attr.data-pc-section]="'sourceHeader'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!sourceHeaderTemplate">{{ sourceHeader }}</div>
                    <ng-container *ngTemplateOutlet="sourceHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false" [attr.data-pc-section]="'sourceFilterContainer'">
                    <ng-container *ngIf="sourceFilterTemplate; else builtInSourceElement">
                        <ng-container *ngTemplateOutlet="sourceFilterTemplate; context: { options: sourceFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInSourceElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'sourceFilter'">
                            <input
                                #sourceFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, SOURCE_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="sourceFilterPlaceholder"
                                [attr.aria-label]="ariaSourceFilterLabel"
                                [attr.data-pc-section]="'sourceFilterInput'"
                            />
                            <SearchIcon *ngIf="!sourceFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'sourcefilterIcon'" />
                            <span class="p-picklist-filter-icon" *ngIf="sourceFilterIconTemplate" [attr.data-pc-section]="'sourcefilterIcon'">
                                <ng-template *ngTemplateOutlet="sourceFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>

                <ul
                    #sourcelist
                    class="p-picklist-list p-picklist-source"
                    [id]="idSource + '_list'"
                    [attr.aria-labelledby]="idSource + '_header'"
                    (keydown)="onItemKeyDown($event, selectedItemsSource, onSourceSelect, SOURCE_LIST)"
                    (focus)="onListFocus($event, SOURCE_LIST)"
                    (blur)="onListBlur($event, SOURCE_LIST)"
                    cdkDropList
                    [cdkDropListData]="source"
                    (cdkDropListDropped)="onDrop($event, SOURCE_LIST)"
                    [ngStyle]="sourceStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['sourceList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="source && source.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'sourceList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsSource), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idSource + '_' + i"
                            [ngClass]="itemClass(item, idSource + '_' + i, selectedItemsSource)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsSource, SOURCE_LIST, onSourceSelect, idSource + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, SOURCE_LIST)"
                            (dblclick)="onSourceItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, SOURCE_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueSource || !emptyFilterMessageSourceTemplate" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueSource" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons" [attr.data-pc-section]="'buttons'" [attr.data-pc-group-section]="'controls'">
                <button type="button" [attr.aria-label]="moveToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveRightDisabled()" (click)="moveRight()" [attr.data-pc-section]="'moveToTargetButton'">
                    <ng-container *ngIf="!moveToTargetIconTemplate">
                        <AngleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                        <AngleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllRightDisabled()" (click)="moveAllRight()" [attr.data-pc-section]="'moveAllToTargetButton'">
                    <ng-container *ngIf="!moveAllToTargetIconTemplate">
                        <AngleDoubleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                        <AngleDoubleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveLeftDisabled()" (click)="moveLeft()" [attr.data-pc-section]="'moveToSourceButton'">
                    <ng-container *ngIf="!moveToSourceIconTemplate">
                        <AngleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                        <AngleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllLeftDisabled()" (click)="moveAllLeft()" [attr.data-pc-section]="'moveAllToSourceButton'">
                    <ng-container *ngIf="!moveAllToSourceIconTemplate">
                        <AngleDoubleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                        <AngleDoubleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper" [attr.data-pc-section]="'targetWrapper'" [attr.data-pc-group-section]="'listwrapper'">
                <div [id]="idTarget + '_header'" class="p-picklist-header" *ngIf="targetHeader || targetHeaderTemplate" [attr.data-pc-section]="'targetHead'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!targetHeaderTemplate">{{ targetHeader }}</div>
                    <ng-container *ngTemplateOutlet="targetHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false" [attr.data-pc-section]="'targetFilterContainer'">
                    <ng-container *ngIf="targetFilterTemplate; else builtInTargetElement">
                        <ng-container *ngTemplateOutlet="targetFilterTemplate; context: { options: targetFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInTargetElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'targetFilter'">
                            <input
                                #targetFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, TARGET_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="targetFilterPlaceholder"
                                [attr.aria-label]="ariaTargetFilterLabel"
                                [attr.data-pc-section]="'targetFilterInput'"
                            />
                            <SearchIcon *ngIf="!targetFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'targetfiltericon'" />
                            <span class="p-picklist-filter-icon" *ngIf="targetFilterIconTemplate" [attr.data-pc-section]="'targetfiltericon'">
                                <ng-template *ngTemplateOutlet="targetFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul
                    #targetlist
                    class="p-picklist-list p-picklist-target"
                    [id]="idTarget + '_list'"
                    [attr.aria-labelledby]="idTarget + '_header'"
                    (keydown)="onItemKeyDown($event, selectedItemsTarget, onTargetSelect, TARGET_LIST)"
                    (focus)="onListFocus($event, TARGET_LIST)"
                    (blur)="onListBlur($event, TARGET_LIST)"
                    cdkDropList
                    [cdkDropListData]="target"
                    (cdkDropListDropped)="onDrop($event, TARGET_LIST)"
                    [ngStyle]="targetStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['targetList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="target && target.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'targetList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsTarget), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idTarget + '_' + i"
                            [ngClass]="itemClass(item, idTarget + '_' + i, selectedItemsTarget)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsTarget, TARGET_LIST, onTargetSelect, idTarget + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, TARGET_LIST)"
                            (dblclick)="onTargetItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, TARGET_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueTarget || !emptyFilterMessageTargetTemplate" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueTarget" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls" [attr.data-pc-section]="'targetControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveUp(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveTop(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveDown(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveBottom(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;padding:0;overflow:auto;min-height:12rem}.p-picklist-item{display:block;cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading", "severity", "raised", "rounded", "text", "outlined", "size", "plain"] }, { kind: "directive", type: i0.forwardRef(() => i4.Ripple), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(() => i5.CdkDropList), selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i0.forwardRef(() => i5.CdkDropListGroup), selector: "[cdkDropListGroup]", inputs: ["cdkDropListGroupDisabled"], exportAs: ["cdkDropListGroup"] }, { kind: "directive", type: i0.forwardRef(() => i5.CdkDrag), selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "component", type: i0.forwardRef(() => AngleDoubleDownIcon), selector: "AngleDoubleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleLeftIcon), selector: "AngleDoubleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleRightIcon), selector: "AngleDoubleRightIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleUpIcon), selector: "AngleDoubleUpIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDownIcon), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleLeftIcon), selector: "AngleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(() => AngleUpIcon), selector: "AngleUpIcon" }, { kind: "component", type: i0.forwardRef(() => SearchIcon), selector: "SearchIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PickList, decorators: [{
            type: Component,
            args: [{ selector: 'p-pickList', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{ 'p-picklist p-component': true, 'p-picklist-striped': stripedRows }" cdkDropListGroup [attr.data-pc-name]="'picklist'" [attr.data-pc-section]="'root'">
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls" [attr.data-pc-section]="'sourceControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveUp(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveTop(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveDown(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveBottom(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper" [attr.data-pc-section]="'sourceWrapper'" [attr.data-pc-group-section]="'listWrapper'">
                <div [id]="idSource + '_header'" class="p-picklist-header" *ngIf="sourceHeader || sourceHeaderTemplate" [attr.data-pc-section]="'sourceHeader'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!sourceHeaderTemplate">{{ sourceHeader }}</div>
                    <ng-container *ngTemplateOutlet="sourceHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false" [attr.data-pc-section]="'sourceFilterContainer'">
                    <ng-container *ngIf="sourceFilterTemplate; else builtInSourceElement">
                        <ng-container *ngTemplateOutlet="sourceFilterTemplate; context: { options: sourceFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInSourceElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'sourceFilter'">
                            <input
                                #sourceFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, SOURCE_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="sourceFilterPlaceholder"
                                [attr.aria-label]="ariaSourceFilterLabel"
                                [attr.data-pc-section]="'sourceFilterInput'"
                            />
                            <SearchIcon *ngIf="!sourceFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'sourcefilterIcon'" />
                            <span class="p-picklist-filter-icon" *ngIf="sourceFilterIconTemplate" [attr.data-pc-section]="'sourcefilterIcon'">
                                <ng-template *ngTemplateOutlet="sourceFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>

                <ul
                    #sourcelist
                    class="p-picklist-list p-picklist-source"
                    [id]="idSource + '_list'"
                    [attr.aria-labelledby]="idSource + '_header'"
                    (keydown)="onItemKeyDown($event, selectedItemsSource, onSourceSelect, SOURCE_LIST)"
                    (focus)="onListFocus($event, SOURCE_LIST)"
                    (blur)="onListBlur($event, SOURCE_LIST)"
                    cdkDropList
                    [cdkDropListData]="source"
                    (cdkDropListDropped)="onDrop($event, SOURCE_LIST)"
                    [ngStyle]="sourceStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['sourceList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="source && source.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'sourceList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsSource), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idSource + '_' + i"
                            [ngClass]="itemClass(item, idSource + '_' + i, selectedItemsSource)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsSource, SOURCE_LIST, onSourceSelect, idSource + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, SOURCE_LIST)"
                            (dblclick)="onSourceItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, SOURCE_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueSource || !emptyFilterMessageSourceTemplate" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueSource" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons" [attr.data-pc-section]="'buttons'" [attr.data-pc-group-section]="'controls'">
                <button type="button" [attr.aria-label]="moveToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveRightDisabled()" (click)="moveRight()" [attr.data-pc-section]="'moveToTargetButton'">
                    <ng-container *ngIf="!moveToTargetIconTemplate">
                        <AngleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                        <AngleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllRightDisabled()" (click)="moveAllRight()" [attr.data-pc-section]="'moveAllToTargetButton'">
                    <ng-container *ngIf="!moveAllToTargetIconTemplate">
                        <AngleDoubleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                        <AngleDoubleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveLeftDisabled()" (click)="moveLeft()" [attr.data-pc-section]="'moveToSourceButton'">
                    <ng-container *ngIf="!moveToSourceIconTemplate">
                        <AngleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                        <AngleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllLeftDisabled()" (click)="moveAllLeft()" [attr.data-pc-section]="'moveAllToSourceButton'">
                    <ng-container *ngIf="!moveAllToSourceIconTemplate">
                        <AngleDoubleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                        <AngleDoubleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper" [attr.data-pc-section]="'targetWrapper'" [attr.data-pc-group-section]="'listwrapper'">
                <div [id]="idTarget + '_header'" class="p-picklist-header" *ngIf="targetHeader || targetHeaderTemplate" [attr.data-pc-section]="'targetHead'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!targetHeaderTemplate">{{ targetHeader }}</div>
                    <ng-container *ngTemplateOutlet="targetHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false" [attr.data-pc-section]="'targetFilterContainer'">
                    <ng-container *ngIf="targetFilterTemplate; else builtInTargetElement">
                        <ng-container *ngTemplateOutlet="targetFilterTemplate; context: { options: targetFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInTargetElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'targetFilter'">
                            <input
                                #targetFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, TARGET_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="targetFilterPlaceholder"
                                [attr.aria-label]="ariaTargetFilterLabel"
                                [attr.data-pc-section]="'targetFilterInput'"
                            />
                            <SearchIcon *ngIf="!targetFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'targetfiltericon'" />
                            <span class="p-picklist-filter-icon" *ngIf="targetFilterIconTemplate" [attr.data-pc-section]="'targetfiltericon'">
                                <ng-template *ngTemplateOutlet="targetFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul
                    #targetlist
                    class="p-picklist-list p-picklist-target"
                    [id]="idTarget + '_list'"
                    [attr.aria-labelledby]="idTarget + '_header'"
                    (keydown)="onItemKeyDown($event, selectedItemsTarget, onTargetSelect, TARGET_LIST)"
                    (focus)="onListFocus($event, TARGET_LIST)"
                    (blur)="onListBlur($event, TARGET_LIST)"
                    cdkDropList
                    [cdkDropListData]="target"
                    (cdkDropListDropped)="onDrop($event, TARGET_LIST)"
                    [ngStyle]="targetStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['targetList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="target && target.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'targetList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            [ngClass]="{ 'p-picklist-item': true, 'p-highlight': isSelected(item, selectedItemsTarget), 'p-disabled': disabled }"
                            pRipple
                            cdkDrag
                            [id]="idTarget + '_' + i"
                            [ngClass]="itemClass(item, idTarget + '_' + i, selectedItemsTarget)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsTarget, TARGET_LIST, onTargetSelect, idTarget + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, TARGET_LIST)"
                            (dblclick)="onTargetItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, TARGET_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueTarget || !emptyFilterMessageTargetTemplate" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueTarget" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls" [attr.data-pc-section]="'targetControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveUp(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveTop(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveDown(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveBottom(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;padding:0;overflow:auto;min-height:12rem}.p-picklist-item{display:block;cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.FilterService }, { type: i1.PrimeNGConfig }], propDecorators: { source: [{
                type: Input
            }], target: [{
                type: Input
            }], sourceHeader: [{
                type: Input
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], rightButtonAriaLabel: [{
                type: Input
            }], leftButtonAriaLabel: [{
                type: Input
            }], allRightButtonAriaLabel: [{
                type: Input
            }], allLeftButtonAriaLabel: [{
                type: Input
            }], upButtonAriaLabel: [{
                type: Input
            }], downButtonAriaLabel: [{
                type: Input
            }], topButtonAriaLabel: [{
                type: Input
            }], bottomButtonAriaLabel: [{
                type: Input
            }], targetHeader: [{
                type: Input
            }], responsive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterBy: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], sourceTrackBy: [{
                type: Input
            }], targetTrackBy: [{
                type: Input
            }], showSourceFilter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showTargetFilter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], metaKeySelection: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dragdrop: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], sourceStyle: [{
                type: Input
            }], targetStyle: [{
                type: Input
            }], showSourceControls: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showTargetControls: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], sourceFilterPlaceholder: [{
                type: Input
            }], targetFilterPlaceholder: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], ariaSourceFilterLabel: [{
                type: Input
            }], ariaTargetFilterLabel: [{
                type: Input
            }], filterMatchMode: [{
                type: Input
            }], stripedRows: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], keepSelection: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], breakpoint: [{
                type: Input
            }], onMoveToSource: [{
                type: Output
            }], onMoveAllToSource: [{
                type: Output
            }], onMoveAllToTarget: [{
                type: Output
            }], onMoveToTarget: [{
                type: Output
            }], onSourceReorder: [{
                type: Output
            }], onTargetReorder: [{
                type: Output
            }], onSourceSelect: [{
                type: Output
            }], onTargetSelect: [{
                type: Output
            }], onSourceFilter: [{
                type: Output
            }], onTargetFilter: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], listViewSourceChild: [{
                type: ViewChild,
                args: ['sourcelist']
            }], listViewTargetChild: [{
                type: ViewChild,
                args: ['targetlist']
            }], sourceFilterViewChild: [{
                type: ViewChild,
                args: ['sourceFilter']
            }], targetFilterViewChild: [{
                type: ViewChild,
                args: ['targetFilter']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
const DragConfig = {
    zIndex: 1200
};
export class PickListModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PickListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.1", ngImport: i0, type: PickListModule, declarations: [PickList], imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon], exports: [PickList, SharedModule, DragDropModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PickListModule, providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }], imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon, SharedModule, DragDropModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.1", ngImport: i0, type: PickListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon],
                    exports: [PickList, SharedModule, DragDropModule],
                    declarations: [PickList],
                    providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2xpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvcGlja2xpc3QvcGlja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBZSxjQUFjLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUgsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBSVgsU0FBUyxFQUNULGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdDLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FB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UUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO2lCQUNsRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENES19EUkFHX0NPTkZJRywgQ2RrRHJhZ0Ryb3AsIERyYWdEcm9wTW9kdWxlLCBtb3ZlSXRlbUluQXJyYXksIHRyYW5zZmVyQXJyYXlJdGVtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgICBudW1iZXJBdHRyaWJ1dGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlLCBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgQW5nbGVEb3VibGVEb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3VibGVkb3duJztcbmltcG9ydCB7IEFuZ2xlRG91YmxlTGVmdEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG91YmxlbGVmdCc7XG5pbXBvcnQgeyBBbmdsZURvdWJsZVJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3VibGVyaWdodCc7XG5pbXBvcnQgeyBBbmdsZURvdWJsZVVwSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3VibGV1cCc7XG5pbXBvcnQgeyBBbmdsZURvd25JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZWRvd24nO1xuaW1wb3J0IHsgQW5nbGVMZWZ0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVsZWZ0JztcbmltcG9ydCB7IEFuZ2xlUmlnaHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZXJpZ2h0JztcbmltcG9ydCB7IEFuZ2xlVXBJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZXVwJztcbmltcG9ydCB7IEhvbWVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9ob21lJztcbmltcG9ydCB7IFNlYXJjaEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NlYXJjaCc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBOdWxsYWJsZSwgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IE9iamVjdFV0aWxzLCBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHtcbiAgICBQaWNrTGlzdEZpbHRlck9wdGlvbnMsXG4gICAgUGlja0xpc3RNb3ZlQWxsVG9Tb3VyY2VFdmVudCxcbiAgICBQaWNrTGlzdE1vdmVBbGxUb1RhcmdldEV2ZW50LFxuICAgIFBpY2tMaXN0TW92ZVRvU291cmNlRXZlbnQsXG4gICAgUGlja0xpc3RNb3ZlVG9UYXJnZXRFdmVudCxcbiAgICBQaWNrTGlzdFNvdXJjZUZpbHRlckV2ZW50LFxuICAgIFBpY2tMaXN0U291cmNlUmVvcmRlckV2ZW50LFxuICAgIFBpY2tMaXN0U291cmNlU2VsZWN0RXZlbnQsXG4gICAgUGlja0xpc3RUYXJnZXRGaWx0ZXJFdmVudCxcbiAgICBQaWNrTGlzdFRhcmdldFJlb3JkZXJFdmVudCxcbiAgICBQaWNrTGlzdFRhcmdldFNlbGVjdEV2ZW50XG59IGZyb20gJy4vcGlja2xpc3QuaW50ZXJmYWNlJztcbi8qKlxuICogUGlja0xpc3QgaXMgdXNlZCB0byByZW9yZGVyIGl0ZW1zIGJldHdlZW4gZGlmZmVyZW50IGxpc3RzLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXBpY2tMaXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCJ7ICdwLXBpY2tsaXN0IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtcGlja2xpc3Qtc3RyaXBlZCc6IHN0cmlwZWRSb3dzIH1cIiBjZGtEcm9wTGlzdEdyb3VwIFthdHRyLmRhdGEtcGMtbmFtZV09XCIncGlja2xpc3QnXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtYnV0dG9ucyBwLXBpY2tsaXN0LXNvdXJjZS1jb250cm9sc1wiICpuZ0lmPVwic2hvd1NvdXJjZUNvbnRyb2xzXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VDb250cm9scydcIiBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2NvbnRyb2xzJ1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZVVwQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInNvdXJjZU1vdmVEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVVcChzb3VyY2VsaXN0LCBzb3VyY2UsIHNlbGVjdGVkSXRlbXNTb3VyY2UsIG9uU291cmNlUmVvcmRlciwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VNb3ZlVXBCdXR0b24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBbmdsZVVwSWNvbiAqbmdJZj1cIiFtb3ZlVXBJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmV1cGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZVVwSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVUb3BBcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwic291cmNlTW92ZURpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvcChzb3VyY2VsaXN0LCBzb3VyY2UsIHNlbGVjdGVkSXRlbXNTb3VyY2UsIG9uU291cmNlUmVvcmRlciwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VNb3ZlVG9wQnV0dG9uJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3VibGVVcEljb24gKm5nSWY9XCIhbW92ZVRvcEljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZXRvcGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZVRvcEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlRG93bkFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJzb3VyY2VNb3ZlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlRG93bihzb3VyY2VsaXN0LCBzb3VyY2UsIHNlbGVjdGVkSXRlbXNTb3VyY2UsIG9uU291cmNlUmVvcmRlciwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VNb3ZlRG93bkJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gKm5nSWY9XCIhbW92ZURvd25JY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVkb3duaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb3ZlRG93bkljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlQm90dG9tQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInNvdXJjZU1vdmVEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVCb3R0b20oc291cmNlbGlzdCwgc291cmNlLCBzZWxlY3RlZEl0ZW1zU291cmNlLCBvblNvdXJjZVJlb3JkZXIsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlTW92ZUJvdHRvbUJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG91YmxlRG93bkljb24gKm5nSWY9XCIhbW92ZUJvdHRvbUljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWJvdHRvbWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZUJvdHRvbUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3Qtd3JhcHBlciBwLXBpY2tsaXN0LXNvdXJjZS13cmFwcGVyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VXcmFwcGVyJ1wiIFthdHRyLmRhdGEtcGMtZ3JvdXAtc2VjdGlvbl09XCInbGlzdFdyYXBwZXInXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBbaWRdPVwiaWRTb3VyY2UgKyAnX2hlYWRlcidcIiBjbGFzcz1cInAtcGlja2xpc3QtaGVhZGVyXCIgKm5nSWY9XCJzb3VyY2VIZWFkZXIgfHwgc291cmNlSGVhZGVyVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZUhlYWRlcidcIiBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2hlYWRlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtdGl0bGVcIiAqbmdJZj1cIiFzb3VyY2VIZWFkZXJUZW1wbGF0ZVwiPnt7IHNvdXJjZUhlYWRlciB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic291cmNlSGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJCeSAmJiBzaG93U291cmNlRmlsdGVyICE9PSBmYWxzZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlRmlsdGVyQ29udGFpbmVyJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic291cmNlRmlsdGVyVGVtcGxhdGU7IGVsc2UgYnVpbHRJblNvdXJjZUVsZW1lbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzb3VyY2VGaWx0ZXJUZW1wbGF0ZTsgY29udGV4dDogeyBvcHRpb25zOiBzb3VyY2VGaWx0ZXJPcHRpb25zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnVpbHRJblNvdXJjZUVsZW1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXJcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZUZpbHRlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI3NvdXJjZUZpbHRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0ZXh0Ym94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uRmlsdGVyKCRldmVudCwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1pbnB1dCBwLWlucHV0dGV4dCBwLWNvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInNvdXJjZUZpbHRlclBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhU291cmNlRmlsdGVyTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZUZpbHRlcklucHV0J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VhcmNoSWNvbiAqbmdJZj1cIiFzb3VyY2VGaWx0ZXJJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1waWNrbGlzdC1maWx0ZXItaWNvbidcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZWZpbHRlckljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWljb25cIiAqbmdJZj1cInNvdXJjZUZpbHRlckljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlZmlsdGVySWNvbidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwic291cmNlRmlsdGVySWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICAgICAgICAjc291cmNlbGlzdFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtcGlja2xpc3QtbGlzdCBwLXBpY2tsaXN0LXNvdXJjZVwiXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCJpZFNvdXJjZSArICdfbGlzdCdcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWRTb3VyY2UgKyAnX2hlYWRlcidcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkl0ZW1LZXlEb3duKCRldmVudCwgc2VsZWN0ZWRJdGVtc1NvdXJjZSwgb25Tb3VyY2VTZWxlY3QsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkxpc3RGb2N1cygkZXZlbnQsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uTGlzdEJsdXIoJGV2ZW50LCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICBjZGtEcm9wTGlzdFxuICAgICAgICAgICAgICAgICAgICBbY2RrRHJvcExpc3REYXRhXT1cInNvdXJjZVwiXG4gICAgICAgICAgICAgICAgICAgIChjZGtEcm9wTGlzdERyb3BwZWQpPVwib25Ecm9wKCRldmVudCwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic291cmNlU3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkWydzb3VyY2VMaXN0J10gPyBmb2N1c2VkT3B0aW9uSWQgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJzb3VyY2UgJiYgc291cmNlLmxlbmd0aCA+IDAgPyB0YWJpbmRleCA6IC0xXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VMaXN0J1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtZ3JvdXAtc2VjdGlvbl09XCInbGlzdCdcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cInNvdXJjZVwiIFtuZ0ZvclRyYWNrQnldPVwic291cmNlVHJhY2tCeSB8fCB0cmFja0J5XCIgbGV0LWk9XCJpbmRleFwiIGxldC1sPVwibGFzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1waWNrbGlzdC1pdGVtJzogdHJ1ZSwgJ3AtaGlnaGxpZ2h0JzogaXNTZWxlY3RlZChpdGVtLCBzZWxlY3RlZEl0ZW1zU291cmNlKSwgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2RrRHJhZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJpZFNvdXJjZSArICdfJyArIGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIml0ZW1DbGFzcyhpdGVtLCBpZFNvdXJjZSArICdfJyArIGksIHNlbGVjdGVkSXRlbXNTb3VyY2UpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2RrRHJhZ0RhdGFdPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Nka0RyYWdEaXNhYmxlZF09XCIhZHJhZ2Ryb3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIGl0ZW0sIHNlbGVjdGVkSXRlbXNTb3VyY2UsIFNPVVJDRV9MSVNULCBvblNvdXJjZVNlbGVjdCwgaWRTb3VyY2UgKyAnXycgKyBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbk9wdGlvbk1vdXNlRG93bihpLCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYmxjbGljayk9XCJvblNvdXJjZUl0ZW1EYmxDbGljaygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG91Y2hlbmQpPVwib25JdGVtVG91Y2hFbmQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKGl0ZW0sIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpdGVtJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKGl0ZW0sIHNlbGVjdGVkSXRlbXNTb3VyY2UpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGkgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzRW1wdHkoU09VUkNFX0xJU1QpICYmIChlbXB0eU1lc3NhZ2VTb3VyY2VUZW1wbGF0ZSB8fCBlbXB0eUZpbHRlck1lc3NhZ2VTb3VyY2VUZW1wbGF0ZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtcGlja2xpc3QtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiIWZpbHRlclZhbHVlU291cmNlIHx8ICFlbXB0eUZpbHRlck1lc3NhZ2VTb3VyY2VUZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlRW1wdHlNZXNzYWdlJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eU1lc3NhZ2VTb3VyY2VUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtcGlja2xpc3QtZW1wdHktbWVzc2FnZVwiICpuZ0lmPVwiZmlsdGVyVmFsdWVTb3VyY2VcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZUVtcHR5TWVzc2FnZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlGaWx0ZXJNZXNzYWdlU291cmNlVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWJ1dHRvbnMgcC1waWNrbGlzdC10cmFuc2Zlci1idXR0b25zXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIididXR0b25zJ1wiIFthdHRyLmRhdGEtcGMtZ3JvdXAtc2VjdGlvbl09XCInY29udHJvbHMnXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlVG9UYXJnZXRBcmlhTGFiZWxcIiBwQnV0dG9uIHBSaXBwbGUgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIiBbZGlzYWJsZWRdPVwibW92ZVJpZ2h0RGlzYWJsZWQoKVwiIChjbGljayk9XCJtb3ZlUmlnaHQoKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZVRvVGFyZ2V0QnV0dG9uJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1vdmVUb1RhcmdldEljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlUmlnaHRJY29uICpuZ0lmPVwiIXZpZXdDaGFuZ2VkXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZldG90YXJnZXRpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3duSWNvbiAqbmdJZj1cInZpZXdDaGFuZ2VkXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZldG90YXJnZXRpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb3ZlVG9UYXJnZXRJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB2aWV3Q2hhbmdlZCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVBbGxUb1RhcmdldEFyaWFMYWJlbFwiIHBCdXR0b24gcFJpcHBsZSBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiIFtkaXNhYmxlZF09XCJtb3ZlQWxsUmlnaHREaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm1vdmVBbGxSaWdodCgpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlQWxsVG9UYXJnZXRCdXR0b24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbW92ZUFsbFRvVGFyZ2V0SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3VibGVSaWdodEljb24gKm5nSWY9XCIhdmlld0NoYW5nZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVhbGx0b3RhcmdldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZURvd25JY29uICpuZ0lmPVwidmlld0NoYW5nZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVhbGx0b3RhcmdldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVBbGxUb1RhcmdldEljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHZpZXdDaGFuZ2VkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZVRvU291cmNlQXJpYUxhYmVsXCIgcEJ1dHRvbiBwUmlwcGxlIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCIgW2Rpc2FibGVkXT1cIm1vdmVMZWZ0RGlzYWJsZWQoKVwiIChjbGljayk9XCJtb3ZlTGVmdCgpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlVG9Tb3VyY2VCdXR0b24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbW92ZVRvU291cmNlSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVMZWZ0SWNvbiAqbmdJZj1cIiF2aWV3Q2hhbmdlZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWRvd25zb3VyY2V0aWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlVXBJY29uICpuZ0lmPVwidmlld0NoYW5nZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVkb3duc291cmNldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVUb1NvdXJjZUljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHZpZXdDaGFuZ2VkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZUFsbFRvU291cmNlQXJpYUxhYmVsXCIgcEJ1dHRvbiBwUmlwcGxlIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCIgW2Rpc2FibGVkXT1cIm1vdmVBbGxMZWZ0RGlzYWJsZWQoKVwiIChjbGljayk9XCJtb3ZlQWxsTGVmdCgpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlQWxsVG9Tb3VyY2VCdXR0b24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbW92ZUFsbFRvU291cmNlSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3VibGVMZWZ0SWNvbiAqbmdJZj1cIiF2aWV3Q2hhbmdlZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWFsbHRvc291cmNldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZVVwSWNvbiAqbmdJZj1cInZpZXdDaGFuZ2VkXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlYWxsdG9zb3VyY2V0aWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZUFsbFRvU291cmNlSWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmlld0NoYW5nZWQgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3Qtd3JhcHBlciBwLXBpY2tsaXN0LXRhcmdldC13cmFwcGVyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRXcmFwcGVyJ1wiIFthdHRyLmRhdGEtcGMtZ3JvdXAtc2VjdGlvbl09XCInbGlzdHdyYXBwZXInXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBbaWRdPVwiaWRUYXJnZXQgKyAnX2hlYWRlcidcIiBjbGFzcz1cInAtcGlja2xpc3QtaGVhZGVyXCIgKm5nSWY9XCJ0YXJnZXRIZWFkZXIgfHwgdGFyZ2V0SGVhZGVyVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldEhlYWQnXCIgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidoZWFkZXInXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LXRpdGxlXCIgKm5nSWY9XCIhdGFyZ2V0SGVhZGVyVGVtcGxhdGVcIj57eyB0YXJnZXRIZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRhcmdldEhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyQnkgJiYgc2hvd1RhcmdldEZpbHRlciAhPT0gZmFsc2VcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldEZpbHRlckNvbnRhaW5lcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRhcmdldEZpbHRlclRlbXBsYXRlOyBlbHNlIGJ1aWx0SW5UYXJnZXRFbGVtZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFyZ2V0RmlsdGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgb3B0aW9uczogdGFyZ2V0RmlsdGVyT3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWx0SW5UYXJnZXRFbGVtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRGaWx0ZXInXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICN0YXJnZXRGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwidGV4dGJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbkZpbHRlcigkZXZlbnQsIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItaW5wdXQgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJ0YXJnZXRGaWx0ZXJQbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVRhcmdldEZpbHRlckxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRGaWx0ZXJJbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlYXJjaEljb24gKm5nSWY9XCIhdGFyZ2V0RmlsdGVySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtcGlja2xpc3QtZmlsdGVyLWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRmaWx0ZXJpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1pY29uXCIgKm5nSWY9XCJ0YXJnZXRGaWx0ZXJJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldGZpbHRlcmljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInRhcmdldEZpbHRlckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgICAgICAgICN0YXJnZXRsaXN0XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1waWNrbGlzdC1saXN0IHAtcGlja2xpc3QtdGFyZ2V0XCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cImlkVGFyZ2V0ICsgJ19saXN0J1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJpZFRhcmdldCArICdfaGVhZGVyJ1wiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSXRlbUtleURvd24oJGV2ZW50LCBzZWxlY3RlZEl0ZW1zVGFyZ2V0LCBvblRhcmdldFNlbGVjdCwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uTGlzdEZvY3VzKCRldmVudCwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25MaXN0Qmx1cigkZXZlbnQsIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIGNka0Ryb3BMaXN0XG4gICAgICAgICAgICAgICAgICAgIFtjZGtEcm9wTGlzdERhdGFdPVwidGFyZ2V0XCJcbiAgICAgICAgICAgICAgICAgICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJvbkRyb3AoJGV2ZW50LCBUQVJHRVRfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ0YXJnZXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XT1cImZvY3VzZWRbJ3RhcmdldExpc3QnXSA/IGZvY3VzZWRPcHRpb25JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhcmdldCAmJiB0YXJnZXQubGVuZ3RoID4gMCA/IHRhYmluZGV4IDogLTFcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldExpc3QnXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidsaXN0J1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwidGFyZ2V0XCIgW25nRm9yVHJhY2tCeV09XCJ0YXJnZXRUcmFja0J5IHx8IHRyYWNrQnlcIiBsZXQtaT1cImluZGV4XCIgbGV0LWw9XCJsYXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXBpY2tsaXN0LWl0ZW0nOiB0cnVlLCAncC1oaWdobGlnaHQnOiBpc1NlbGVjdGVkKGl0ZW0sIHNlbGVjdGVkSXRlbXNUYXJnZXQpLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZGtEcmFnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cImlkVGFyZ2V0ICsgJ18nICsgaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiaXRlbUNsYXNzKGl0ZW0sIGlkVGFyZ2V0ICsgJ18nICsgaSwgc2VsZWN0ZWRJdGVtc1RhcmdldClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjZGtEcmFnRGF0YV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2RrRHJhZ0Rpc2FibGVkXT1cIiFkcmFnZHJvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSwgc2VsZWN0ZWRJdGVtc1RhcmdldCwgVEFSR0VUX0xJU1QsIG9uVGFyZ2V0U2VsZWN0LCBpZFRhcmdldCArICdfJyArIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uT3B0aW9uTW91c2VEb3duKGksIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRibGNsaWNrKT1cIm9uVGFyZ2V0SXRlbURibENsaWNrKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaGVuZCk9XCJvbkl0ZW1Ub3VjaEVuZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbVZpc2libGUoaXRlbSwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2l0ZW0nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWQoaXRlbSwgc2VsZWN0ZWRJdGVtc1RhcmdldClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtLCBpbmRleDogaSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNFbXB0eShUQVJHRVRfTElTVCkgJiYgKGVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlIHx8IGVtcHR5RmlsdGVyTWVzc2FnZVRhcmdldFRlbXBsYXRlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhZmlsdGVyVmFsdWVUYXJnZXQgfHwgIWVtcHR5RmlsdGVyTWVzc2FnZVRhcmdldFRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRFbXB0eU1lc3NhZ2UnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJmaWx0ZXJWYWx1ZVRhcmdldFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndGFyZ2V0RW1wdHlNZXNzYWdlJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eUZpbHRlck1lc3NhZ2VUYXJnZXRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtYnV0dG9ucyBwLXBpY2tsaXN0LXRhcmdldC1jb250cm9sc1wiICpuZ0lmPVwic2hvd1RhcmdldENvbnRyb2xzXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRDb250cm9scydcIiBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2NvbnRyb2xzJ1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZVVwQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInRhcmdldE1vdmVEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVVcCh0YXJnZXRsaXN0LCB0YXJnZXQsIHNlbGVjdGVkSXRlbXNUYXJnZXQsIG9uVGFyZ2V0UmVvcmRlciwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRNb3ZlVXBCdXR0b24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBbmdsZVVwSWNvbiAqbmdJZj1cIiFtb3ZlVXBJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmV1cGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZVVwSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVUb3BBcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwidGFyZ2V0TW92ZURpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvcCh0YXJnZXRsaXN0LCB0YXJnZXQsIHNlbGVjdGVkSXRlbXNUYXJnZXQsIG9uVGFyZ2V0UmVvcmRlciwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRNb3ZlVG9wQnV0dG9uJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3VibGVVcEljb24gKm5nSWY9XCIhbW92ZVRvcEljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZXRvcGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZVRvcEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlRG93bkFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJ0YXJnZXRNb3ZlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlRG93bih0YXJnZXRsaXN0LCB0YXJnZXQsIHNlbGVjdGVkSXRlbXNUYXJnZXQsIG9uVGFyZ2V0UmVvcmRlciwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRNb3ZlRG93bkJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gKm5nSWY9XCIhbW92ZURvd25JY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVkb3duaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb3ZlRG93bkljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlQm90dG9tQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInRhcmdldE1vdmVEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVCb3R0b20odGFyZ2V0bGlzdCwgdGFyZ2V0LCBzZWxlY3RlZEl0ZW1zVGFyZ2V0LCBvblRhcmdldFJlb3JkZXIsIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndGFyZ2V0TW92ZUJvdHRvbUJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG91YmxlRG93bkljb24gKm5nSWY9XCIhbW92ZUJvdHRvbUljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWJvdHRvbWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZUJvdHRvbUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3BpY2tsaXN0LmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQaWNrTGlzdCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIEFmdGVyQ29udGVudEluaXQge1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgZm9yIHRoZSBzb3VyY2UgbGlzdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3VyY2U6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgZm9yIHRoZSB0YXJnZXQgbGlzdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXQ6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRleHQgZm9yIHRoZSBzb3VyY2UgbGlzdCBjYXB0aW9uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc291cmNlSGVhZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSB0YWJpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkID0gMDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBtb3ZlIHRvIHJpZ2h0IGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByaWdodEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gbGVmdCBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbGVmdEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gYWxsIHJpZ2h0IGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhbGxSaWdodEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gYWxsIGxlZnQgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFsbExlZnRCdXR0b25BcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBtb3ZlIHRvIHVwIGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB1cEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gZG93biBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZG93bkJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gdG9wIGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b3BCdXR0b25BcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBtb3ZlIHRvIGJvdHRvbSBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYm90dG9tQnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGV4dCBmb3IgdGhlIHRhcmdldCBsaXN0IGNhcHRpb25cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXRIZWFkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQgb3JkZXJsaXN0IGFkanVzdHMgaXRzIGNvbnRyb2xzIGJhc2VkIG9uIHNjcmVlbiBzaXplLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZXNwb25zaXZlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkIGRpc3BsYXlzIGFuIGlucHV0IGZpZWxkIHRvIGZpbHRlciB0aGUgaXRlbXMgb24ga2V5dXAgYW5kIGRlY2lkZXMgd2hpY2ggZmllbGQgdG8gc2VhcmNoIChBY2NlcHRzIG11bHRpcGxlIGZpZWxkcyB3aXRoIGEgY29tbWEpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlckJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTG9jYWxlIHRvIHVzZSBpbiBmaWx0ZXJpbmcuIFRoZSBkZWZhdWx0IGxvY2FsZSBpcyB0aGUgaG9zdCBlbnZpcm9ubWVudCdzIGN1cnJlbnQgbG9jYWxlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlckxvY2FsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIG9wdGltaXplIHRoZSBkb20gb3BlcmF0aW9ucyBieSBkZWxlZ2F0aW5nIHRvIG5nRm9yVHJhY2tCeSwgZGVmYXVsdCBhbGdvcml0aG0gY2hlY2tzIGZvciBvYmplY3QgaWRlbnRpdHkuIFVzZSBzb3VyY2VUcmFja0J5IG9yIHRhcmdldFRyYWNrQnkgaW4gY2FzZSBkaWZmZXJlbnQgYWxnb3JpdGhtcyBhcmUgbmVlZGVkIHBlciBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBvcHRpbWl6ZSB0aGUgZG9tIG9wZXJhdGlvbnMgYnkgZGVsZWdhdGluZyB0byBuZ0ZvclRyYWNrQnkgaW4gc291cmNlIGxpc3QsIGRlZmF1bHQgYWxnb3JpdGhtIGNoZWNrcyBmb3Igb2JqZWN0IGlkZW50aXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvdXJjZVRyYWNrQnk6IEZ1bmN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIG9wdGltaXplIHRoZSBkb20gb3BlcmF0aW9ucyBieSBkZWxlZ2F0aW5nIHRvIG5nRm9yVHJhY2tCeSBpbiB0YXJnZXQgbGlzdCwgZGVmYXVsdCBhbGdvcml0aG0gY2hlY2tzIGZvciBvYmplY3QgaWRlbnRpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFyZ2V0VHJhY2tCeTogRnVuY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IGZpbHRlciBpbnB1dCBmb3Igc291cmNlIGxpc3Qgd2hlbiBmaWx0ZXJCeSBpcyBlbmFibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93U291cmNlRmlsdGVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgZmlsdGVyIGlucHV0IGZvciB0YXJnZXQgbGlzdCB3aGVuIGZpbHRlckJ5IGlzIGVuYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dUYXJnZXRGaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaG93IG11bHRpcGxlIGl0ZW1zIGNhbiBiZSBzZWxlY3RlZCwgd2hlbiB0cnVlIG1ldGFLZXkgbmVlZHMgdG8gYmUgcHJlc3NlZCB0byBzZWxlY3Qgb3IgdW5zZWxlY3QgYW4gaXRlbSBhbmQgd2hlbiBzZXQgdG8gZmFsc2Ugc2VsZWN0aW9uIG9mIGVhY2ggaXRlbSBjYW4gYmUgdG9nZ2xlZCBpbmRpdmlkdWFsbHkuIE9uIHRvdWNoIGVuYWJsZWQgZGV2aWNlcywgbWV0YUtleVNlbGVjdGlvbiBpcyB0dXJuZWQgb2ZmIGF1dG9tYXRpY2FsbHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIG1ldGFLZXlTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGVuYWJsZSBkcmFnZHJvcCBiYXNlZCByZW9yZGVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBkcmFnZHJvcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgc291cmNlIGxpc3QgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3VyY2VTdHlsZTogYW55O1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgdGFyZ2V0IGxpc3QgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXRTdHlsZTogYW55O1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBidXR0b25zIG9mIHNvdXJjZSBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93U291cmNlQ29udHJvbHM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBidXR0b25zIG9mIHRhcmdldCBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93VGFyZ2V0Q29udHJvbHM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRleHQgb24gc291cmNlIGZpbHRlciBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3VyY2VGaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRleHQgb24gdGFyZ2V0IGZpbHRlciBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXRGaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgZmlsdGVyIGlucHV0IG9mIHNvdXJjZSBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFTb3VyY2VGaWx0ZXJMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIGZpbHRlciBpbnB1dCBvZiB0YXJnZXQgbGlzdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhVGFyZ2V0RmlsdGVyTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGhvdyB0aGUgaXRlbXMgYXJlIGZpbHRlcmVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlck1hdGNoTW9kZTogJ2NvbnRhaW5zJyB8ICdzdGFydHNXaXRoJyB8ICdlbmRzV2l0aCcgfCAnZXF1YWxzJyB8ICdub3RFcXVhbHMnIHwgJ2luJyB8ICdsdCcgfCAnbHRlJyB8ICdndCcgfCAnZ3RlJyA9ICdjb250YWlucyc7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5cyByb3dzIHdpdGggYWx0ZXJuYXRpbmcgY29sb3JzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzdHJpcGVkUm93czogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBLZWVwcyBzZWxlY3Rpb24gb24gdGhlIHRyYW5zZmVyIGxpc3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGtlZXBTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW4gYXQgd2hpY2ggdGhlIGNvbXBvbmVudCBzaG91bGQgY2hhbmdlIGl0cyBiZWhhdmlvci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgYnJlYWtwb2ludCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnJlYWtwb2ludDtcbiAgICB9XG4gICAgc2V0IGJyZWFrcG9pbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2JyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2JyZWFrcG9pbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95TWVkaWEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRNZWRpYSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGl0ZW1zIGFyZSBtb3ZlZCBmcm9tIHRhcmdldCB0byBzb3VyY2UuXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdE1vdmVUb1NvdXJjZUV2ZW50fSBldmVudCAtIEN1c3RvbSBtb3ZlIHRvIHNvdXJjZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Nb3ZlVG9Tb3VyY2U6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdE1vdmVUb1NvdXJjZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlVG9Tb3VyY2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbGwgaXRlbXMgYXJlIG1vdmVkIGZyb20gdGFyZ2V0IHRvIHNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0TW92ZUFsbFRvU291cmNlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIG1vdmUgYWxsIHRvIHNvdXJjZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Nb3ZlQWxsVG9Tb3VyY2U6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdE1vdmVBbGxUb1NvdXJjZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlQWxsVG9Tb3VyY2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbGwgaXRlbXMgYXJlIG1vdmVkIGZyb20gc291cmNlIHRvIHRhcmdldC5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0TW92ZUFsbFRvVGFyZ2V0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIG1vdmUgYWxsIHRvIHRhcmdldCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Nb3ZlQWxsVG9UYXJnZXQ6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdE1vdmVBbGxUb1RhcmdldEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlQWxsVG9UYXJnZXRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBpdGVtcyBhcmUgbW92ZWQgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB7UGlja0xpc3RNb3ZlVG9UYXJnZXRFdmVudH0gZXZlbnQgLSBDdXN0b20gbW92ZSB0byB0YXJnZXQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTW92ZVRvVGFyZ2V0OiBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlVG9UYXJnZXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpY2tMaXN0TW92ZVRvVGFyZ2V0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHJlb3JkZXJlZCB3aXRoaW4gc291cmNlIGxpc3QuXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdFNvdXJjZVJlb3JkZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gc291cmNlIHJlb3JkZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU291cmNlUmVvcmRlcjogRXZlbnRFbWl0dGVyPFBpY2tMaXN0U291cmNlUmVvcmRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RTb3VyY2VSZW9yZGVyRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHJlb3JkZXJlZCB3aXRoaW4gdGFyZ2V0IGxpc3QuXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdFRhcmdldFJlb3JkZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gdGFyZ2V0IHJlb3JkZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0UmVvcmRlcjogRXZlbnRFbWl0dGVyPFBpY2tMaXN0VGFyZ2V0UmVvcmRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RUYXJnZXRSZW9yZGVyRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHNlbGVjdGVkIHdpdGhpbiBzb3VyY2UgbGlzdC5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0U291cmNlU2VsZWN0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNvdXJjZSBzZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU291cmNlU2VsZWN0OiBFdmVudEVtaXR0ZXI8UGlja0xpc3RTb3VyY2VTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpY2tMaXN0U291cmNlU2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHNlbGVjdGVkIHdpdGhpbiB0YXJnZXQgbGlzdC5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0VGFyZ2V0U2VsZWN0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHRhcmdldCBzZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0U2VsZWN0OiBFdmVudEVtaXR0ZXI8UGlja0xpc3RUYXJnZXRTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpY2tMaXN0VGFyZ2V0U2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIHNvdXJjZSBsaXN0IGlzIGZpbHRlcmVkXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdFNvdXJjZUZpbHRlckV2ZW50fSBldmVudCAtIEN1c3RvbSBzb3VyY2UgZmlsdGVyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNvdXJjZUZpbHRlcjogRXZlbnRFbWl0dGVyPFBpY2tMaXN0U291cmNlRmlsdGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQaWNrTGlzdFNvdXJjZUZpbHRlckV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSB0YXJnZXQgbGlzdCBpcyBmaWx0ZXJlZFxuICAgICAqIEBwYXJhbSB7UGlja0xpc3RUYXJnZXRGaWx0ZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gdGFyZ2V0IGZpbHRlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25UYXJnZXRGaWx0ZXI6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdFRhcmdldEZpbHRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RUYXJnZXRGaWx0ZXJFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBsaXN0IGlzIGZvY3VzZWRcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIGxpc3QgaXMgYmx1cnJlZFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZWxpc3QnKSBsaXN0Vmlld1NvdXJjZUNoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhcmdldGxpc3QnKSBsaXN0Vmlld1RhcmdldENoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZUZpbHRlcicpIHNvdXJjZUZpbHRlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCd0YXJnZXRGaWx0ZXInKSB0YXJnZXRGaWx0ZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IE51bGxhYmxlPFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPj47XG5cbiAgICBnZXQgbW92ZVVwQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMudXBCdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlVXAgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IG1vdmVUb3BBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvcEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMudG9wQnV0dG9uQXJpYUxhYmVsIDogdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEubW92ZVRvcCA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZURvd25BcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvd25CdXR0b25BcmlhTGFiZWwgPyB0aGlzLmRvd25CdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlRG93biA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZUJvdHRvbUFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm90dG9tQnV0dG9uQXJpYUxhYmVsID8gdGhpcy5ib3R0b21CdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlRG93biA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZVRvVGFyZ2V0QXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yaWdodEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMucmlnaHRCdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlVG9UYXJnZXQgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IG1vdmVBbGxUb1RhcmdldEFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsUmlnaHRCdXR0b25BcmlhTGFiZWwgPyB0aGlzLmFsbFJpZ2h0QnV0dG9uQXJpYUxhYmVsIDogdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEubW92ZUFsbFRvVGFyZ2V0IDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBtb3ZlVG9Tb3VyY2VBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxlZnRCdXR0b25BcmlhTGFiZWwgPyB0aGlzLmxlZnRCdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlVG9Tb3VyY2UgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IG1vdmVBbGxUb1NvdXJjZUFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsTGVmdEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMuYWxsTGVmdEJ1dHRvbkFyaWFMYWJlbCA6IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLm1vdmVBbGxUb1NvdXJjZSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgaWRTb3VyY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkICsgJ19zb3VyY2UnO1xuICAgIH1cblxuICAgIGdldCBpZFRhcmdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyAnX3RhcmdldCc7XG4gICAgfVxuXG4gICAgZ2V0IGZvY3VzZWRPcHRpb25JZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSA/IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4IDogbnVsbDtcbiAgICB9XG5cbiAgICBfYnJlYWtwb2ludDogc3RyaW5nID0gJzk2MHB4JztcblxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBtb3ZlVG9wSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1vdmVVcEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBtb3ZlRG93bkljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBtb3ZlQm90dG9tSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1vdmVUb1RhcmdldEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBtb3ZlQWxsVG9UYXJnZXRJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbW92ZVRvU291cmNlSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1vdmVBbGxUb1NvdXJjZUljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICB0YXJnZXRGaWx0ZXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgc291cmNlRmlsdGVySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHB1YmxpYyB2aXNpYmxlT3B0aW9uc1NvdXJjZTogYW55W10gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgcHVibGljIHZpc2libGVPcHRpb25zVGFyZ2V0OiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBzZWxlY3RlZEl0ZW1zU291cmNlOiBhbnlbXSA9IFtdO1xuXG4gICAgc2VsZWN0ZWRJdGVtc1RhcmdldDogYW55W10gPSBbXTtcblxuICAgIHJlb3JkZXJlZExpc3RFbGVtZW50OiBhbnk7XG5cbiAgICBtb3ZlZFVwOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIG1vdmVkRG93bjogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBpdGVtVG91Y2hlZDogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBzdHlsZUVsZW1lbnQ6IGFueTtcblxuICAgIGlkOiBzdHJpbmcgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuXG4gICAgZmlsdGVyVmFsdWVTb3VyY2U6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBmaWx0ZXJWYWx1ZVRhcmdldDogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIGZyb21MaXN0VHlwZTogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIGVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGVtcHR5RmlsdGVyTWVzc2FnZVNvdXJjZVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGVtcHR5RmlsdGVyTWVzc2FnZVRhcmdldFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNvdXJjZUhlYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHRhcmdldEhlYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNvdXJjZUZpbHRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHRhcmdldEZpbHRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNvdXJjZUZpbHRlck9wdGlvbnM6IE51bGxhYmxlPFBpY2tMaXN0RmlsdGVyT3B0aW9ucz47XG5cbiAgICB0YXJnZXRGaWx0ZXJPcHRpb25zOiBOdWxsYWJsZTxQaWNrTGlzdEZpbHRlck9wdGlvbnM+O1xuXG4gICAgcmVhZG9ubHkgU09VUkNFX0xJU1Q6IG51bWJlciA9IC0xO1xuXG4gICAgcmVhZG9ubHkgVEFSR0VUX0xJU1Q6IG51bWJlciA9IDE7XG5cbiAgICB3aW5kb3c6IFdpbmRvdztcblxuICAgIG1lZGlhOiBNZWRpYVF1ZXJ5TGlzdCB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgICB2aWV3Q2hhbmdlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGZvY3VzZWRPcHRpb25JbmRleDogYW55ID0gLTE7XG5cbiAgICBmb2N1c2VkT3B0aW9uOiBhbnkgfCB1bmRlZmluZWQ7XG5cbiAgICBmb2N1c2VkOiBhbnkgPSB7XG4gICAgICAgIHNvdXJjZUxpc3Q6IGZhbHNlLFxuICAgICAgICB0YXJnZXRMaXN0OiBmYWxzZVxuICAgIH07XG5cbiAgICBtZWRpYUNoYW5nZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWdcbiAgICApIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdHlsZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0TWVkaWEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlckJ5KSB7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZUZpbHRlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiAodmFsdWUpID0+IHRoaXMuZmlsdGVyU291cmNlKHZhbHVlKSxcbiAgICAgICAgICAgICAgICByZXNldDogKCkgPT4gdGhpcy5yZXNldFNvdXJjZUZpbHRlcigpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnRhcmdldEZpbHRlck9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiAodmFsdWUpID0+IHRoaXMuZmlsdGVyVGFyZ2V0KHZhbHVlKSxcbiAgICAgICAgICAgICAgICByZXNldDogKCkgPT4gdGhpcy5yZXNldFRhcmdldEZpbHRlcigpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAodGhpcy50ZW1wbGF0ZXMgYXMgUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+KS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzb3VyY2VIZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZUhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0YXJnZXRIZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzb3VyY2VGaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZUZpbHRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0YXJnZXRGaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEZpbHRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eW1lc3NhZ2Vzb3VyY2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eWZpbHRlcm1lc3NhZ2Vzb3VyY2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RmlsdGVyTWVzc2FnZVNvdXJjZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eW1lc3NhZ2V0YXJnZXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eWZpbHRlcm1lc3NhZ2V0YXJnZXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RmlsdGVyTWVzc2FnZVRhcmdldFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZldXBpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVXBJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmV0b3BpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9wSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZlZG93bmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVEb3duSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZlYm90dG9taWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUJvdHRvbUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbW92ZXRvdGFyZ2V0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvVGFyZ2V0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZlYWxsdG90YXJnZXRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWxsVG9UYXJnZXRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmV0b3NvdXJjZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1NvdXJjZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbW92ZWFsbHRvc291cmNlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFsbFRvU291cmNlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0YXJnZXRmaWx0ZXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRGaWx0ZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3NvdXJjZWZpbHRlcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZUZpbHRlckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlZFVwIHx8IHRoaXMubW92ZWREb3duKSB7XG4gICAgICAgICAgICBsZXQgbGlzdEl0ZW1zID0gRG9tSGFuZGxlci5maW5kKHRoaXMucmVvcmRlcmVkTGlzdEVsZW1lbnQsICdsaS5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgbGV0IGxpc3RJdGVtO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZlZFVwKSBsaXN0SXRlbSA9IGxpc3RJdGVtc1swXTtcbiAgICAgICAgICAgIGVsc2UgbGlzdEl0ZW0gPSBsaXN0SXRlbXNbbGlzdEl0ZW1zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICBEb21IYW5kbGVyLnNjcm9sbEluVmlldyh0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50LCBsaXN0SXRlbSk7XG4gICAgICAgICAgICB0aGlzLm1vdmVkVXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubW92ZWREb3duID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGV2ZW50OiBFdmVudCB8IGFueSwgaXRlbTogYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgbGlzdFR5cGU6IG51bWJlciwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBpdGVtSWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5MaXN0KGl0ZW0sIHNlbGVjdGVkSXRlbXMpO1xuICAgICAgICBpZiAoaXRlbUlkKSB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCA9IGl0ZW1JZDtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gaW5kZXggIT0gLTE7XG4gICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5pdGVtVG91Y2hlZCA/IGZhbHNlIDogdGhpcy5tZXRhS2V5U2VsZWN0aW9uO1xuXG4gICAgICAgIGlmIChtZXRhU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9ICg8S2V5Ym9hcmRFdmVudD5ldmVudCkubWV0YUtleSB8fCAoPEtleWJvYXJkRXZlbnQ+ZXZlbnQpLmN0cmxLZXkgfHwgKDxLZXlib2FyZEV2ZW50PmV2ZW50KS5zaGlmdEtleTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtcy5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IHNlbGVjdGVkSXRlbXMuZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpbmRleCk7IC8vIENyZWF0aW5nIGEgbmV3IGFycmF5IHdpdGhvdXQgdGhlIHNlbGVjdGVkIGl0ZW1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uTGlzdChsaXN0VHlwZSwgc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgIGNhbGxiYWNrLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaXRlbXM6IHNlbGVjdGVkSXRlbXMgfSk7XG5cbiAgICAgICAgdGhpcy5pdGVtVG91Y2hlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uT3B0aW9uTW91c2VEb3duKGluZGV4LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZFtsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCA/ICdzb3VyY2VMaXN0JyA6ICd0YXJnZXRMaXN0J10gPSB0cnVlO1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCA9IGluZGV4O1xuICAgIH1cblxuICAgIG9uU291cmNlSXRlbURibENsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcbiAgICB9XG5cbiAgICBvblRhcmdldEl0ZW1EYmxDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZUxlZnQoKTtcbiAgICB9XG5cbiAgICBvbkZpbHRlcihldmVudDogS2V5Ym9hcmRFdmVudCwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgcXVlcnkgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS52YWx1ZTtcbiAgICAgICAgaWYgKGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB0aGlzLmZpbHRlclNvdXJjZShxdWVyeSk7XG4gICAgICAgIGVsc2UgaWYgKGxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKSB0aGlzLmZpbHRlclRhcmdldChxdWVyeSk7XG4gICAgfVxuXG4gICAgZmlsdGVyU291cmNlKHZhbHVlOiBhbnkgPSAnJykge1xuICAgICAgICB0aGlzLmZpbHRlclZhbHVlU291cmNlID0gdmFsdWUudHJpbSgpLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMuc291cmNlLCB0aGlzLlNPVVJDRV9MSVNUKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJUYXJnZXQodmFsdWU6IGFueSA9ICcnKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgPSB2YWx1ZS50cmltKCkudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICB0aGlzLmZpbHRlcig8YW55W10+dGhpcy50YXJnZXQsIHRoaXMuVEFSR0VUX0xJU1QpO1xuICAgIH1cblxuICAgIGZpbHRlcihkYXRhOiBhbnlbXSwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgc2VhcmNoRmllbGRzID0gKDxzdHJpbmc+dGhpcy5maWx0ZXJCeSkuc3BsaXQoJywnKTtcblxuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UgPSB0aGlzLmZpbHRlclNlcnZpY2UuZmlsdGVyKGRhdGEsIHNlYXJjaEZpZWxkcywgdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSwgdGhpcy5maWx0ZXJNYXRjaE1vZGUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgICAgIHRoaXMub25Tb3VyY2VGaWx0ZXIuZW1pdCh7IHF1ZXJ5OiB0aGlzLmZpbHRlclZhbHVlU291cmNlLCB2YWx1ZTogdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5UQVJHRVRfTElTVCkge1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXIoZGF0YSwgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlVGFyZ2V0LCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5vblRhcmdldEZpbHRlci5lbWl0KHsgcXVlcnk6IHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQsIHZhbHVlOiB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0IH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNJdGVtVmlzaWJsZShpdGVtOiBhbnksIGxpc3RUeXBlOiBudW1iZXIpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGxpc3RUeXBlID09IHRoaXMuU09VUkNFX0xJU1QpIHJldHVybiB0aGlzLmlzVmlzaWJsZUluTGlzdCg8YW55W10+dGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSwgaXRlbSwgPHN0cmluZz50aGlzLmZpbHRlclZhbHVlU291cmNlKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5pc1Zpc2libGVJbkxpc3QoPGFueVtdPnRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQsIGl0ZW0sIDxzdHJpbmc+dGhpcy5maWx0ZXJWYWx1ZVRhcmdldCk7XG4gICAgfVxuXG4gICAgaXNFbXB0eShsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChsaXN0VHlwZSA9PSB0aGlzLlNPVVJDRV9MSVNUKSByZXR1cm4gdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA/ICF0aGlzLnZpc2libGVPcHRpb25zU291cmNlIHx8IHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UubGVuZ3RoID09PSAwIDogIXRoaXMuc291cmNlIHx8IHRoaXMuc291cmNlLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA/ICF0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0IHx8IHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQubGVuZ3RoID09PSAwIDogIXRoaXMudGFyZ2V0IHx8IHRoaXMudGFyZ2V0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBpc1Zpc2libGVJbkxpc3QoZGF0YTogYW55W10sIGl0ZW06IGFueSwgZmlsdGVyVmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoZmlsdGVyVmFsdWUgJiYgZmlsdGVyVmFsdWUudHJpbSgpLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gPT0gZGF0YVtpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVRvdWNoRW5kKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pdGVtVG91Y2hlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzb3J0QnlJbmRleEluTGlzdChpdGVtczogYW55W10sIGxpc3Q6IGFueSkge1xuICAgICAgICByZXR1cm4gaXRlbXMuc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoaXRlbTEsIGxpc3QpIC0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KGl0ZW0yLCBsaXN0KSk7XG4gICAgfVxuXG4gICAgbW92ZVVwKGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgbGlzdDogYW55W10sIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSBsaXN0W3NlbGVjdGVkSXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBsaXN0W3NlbGVjdGVkSXRlbUluZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXggLSAxXSA9IG1vdmVkSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2Ryb3AgJiYgKCh0aGlzLmZpbHRlclZhbHVlU291cmNlICYmIGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB8fCAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCAmJiBsaXN0VHlwZSA9PT0gdGhpcy5UQVJHRVRfTElTVCkpKSB0aGlzLmZpbHRlcihsaXN0LCBsaXN0VHlwZSk7XG5cbiAgICAgICAgICAgIHRoaXMubW92ZWRVcCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50ID0gbGlzdEVsZW1lbnQ7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHsgaXRlbXM6IHNlbGVjdGVkSXRlbXMgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlVG9wKGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgbGlzdDogYW55W10sIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSBsaXN0LnNwbGljZShzZWxlY3RlZEl0ZW1JbmRleCwgMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIGxpc3QudW5zaGlmdChtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2Ryb3AgJiYgKCh0aGlzLmZpbHRlclZhbHVlU291cmNlICYmIGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB8fCAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCAmJiBsaXN0VHlwZSA9PT0gdGhpcy5UQVJHRVRfTElTVCkpKSB0aGlzLmZpbHRlcihsaXN0LCBsaXN0VHlwZSk7XG5cbiAgICAgICAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHsgaXRlbXM6IHNlbGVjdGVkSXRlbXMgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlRG93bihsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQsIGxpc3Q6IGFueVtdLCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gdGhpcy5zb3J0QnlJbmRleEluTGlzdChzZWxlY3RlZEl0ZW1zLCBsaXN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzZWxlY3RlZEl0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXggKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleCArIDFdID0gbW92ZWRJdGVtO1xuICAgICAgICAgICAgICAgICAgICBsaXN0W3NlbGVjdGVkSXRlbUluZGV4XSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZHJvcCAmJiAoKHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgJiYgbGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHx8ICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0ICYmIGxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKSkpIHRoaXMuZmlsdGVyKGxpc3QsIGxpc3RUeXBlKTtcblxuICAgICAgICAgICAgdGhpcy5tb3ZlZERvd24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZW9yZGVyZWRMaXN0RWxlbWVudCA9IGxpc3RFbGVtZW50O1xuICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7IGl0ZW1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUJvdHRvbShsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQsIGxpc3Q6IGFueVtdLCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gdGhpcy5zb3J0QnlJbmRleEluTGlzdChzZWxlY3RlZEl0ZW1zLCBsaXN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzZWxlY3RlZEl0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IGxpc3Quc3BsaWNlKHNlbGVjdGVkSXRlbUluZGV4LCAxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKG1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZHJvcCAmJiAoKHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgJiYgbGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHx8ICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0ICYmIGxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKSkpIHRoaXMuZmlsdGVyKGxpc3QsIGxpc3RUeXBlKTtcblxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuc2Nyb2xsVG9wID0gbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7IGl0ZW1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVJpZ2h0KCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlICYmIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy50YXJnZXQpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Py5wdXNoKHRoaXMuc291cmNlPy5zcGxpY2UoT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy5zb3VyY2UpLCAxKVswXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2U/LmluY2x1ZGVzKHNlbGVjdGVkSXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2Uuc3BsaWNlKE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vdmVUb1RhcmdldC5lbWl0KHtcbiAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMua2VlcFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCA9IFsuLi50aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQsIC4uLnRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKDxhbnlbXT50aGlzLnRhcmdldCwgdGhpcy5UQVJHRVRfTElTVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQWxsUmlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgICAgICAgbGV0IG1vdmVkSXRlbXMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvdXJjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSXRlbVZpc2libGUodGhpcy5zb3VyY2VbaV0sIHRoaXMuU09VUkNFX0xJU1QpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1vdmVkSXRlbSA9IHRoaXMuc291cmNlLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQ/LnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlZEl0ZW1zLnB1c2gocmVtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW92ZUFsbFRvVGFyZ2V0LmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBtb3ZlZEl0ZW1zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMua2VlcFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCA9IFsuLi50aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQsIC4uLnRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKDxhbnlbXT50aGlzLnRhcmdldCwgdGhpcy5UQVJHRVRfTElTVCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVMZWZ0KCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ICYmIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy5zb3VyY2UpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlPy5wdXNoKHRoaXMudGFyZ2V0Py5zcGxpY2UoT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy50YXJnZXQpLCAxKVswXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQ/LmluY2x1ZGVzKHNlbGVjdGVkSXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQuc3BsaWNlKE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQpLCAxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vdmVUb1NvdXJjZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMua2VlcFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSA9IFsuLi50aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UsIC4uLnRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKDxhbnlbXT50aGlzLnNvdXJjZSwgdGhpcy5TT1VSQ0VfTElTVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQWxsTGVmdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICBsZXQgbW92ZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmlzaWJsZSh0aGlzLnRhcmdldFtpXSwgdGhpcy5UQVJHRVRfTElTVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbW92ZWRJdGVtID0gdGhpcy50YXJnZXQuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZT8ucHVzaChyZW1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVkSXRlbXMucHVzaChyZW1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb3ZlQWxsVG9Tb3VyY2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vdmVkSXRlbXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gWy4uLnRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSwgLi4udGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMuc291cmNlLCB0aGlzLlNPVVJDRV9MSVNUKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChpdGVtOiBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluTGlzdChpdGVtLCBzZWxlY3RlZEl0ZW1zKSAhPSAtMTtcbiAgICB9XG5cbiAgICBpdGVtQ2xhc3MoaXRlbSwgaWQsIHNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLXBpY2tsaXN0LWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgJ3AtaGlnaGxpZ2h0JzogdGhpcy5pc1NlbGVjdGVkKGl0ZW0sIHNlbGVjdGVkSXRlbXMpLFxuICAgICAgICAgICAgJ3AtZm9jdXMnOiBpZCA9PT0gdGhpcy5mb2N1c2VkT3B0aW9uSWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmaW5kSW5kZXhJbkxpc3QoaXRlbTogYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoaXRlbSwgc2VsZWN0ZWRJdGVtcyk7XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50OiBDZGtEcmFnRHJvcDxzdHJpbmdbXT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGlzVHJhbnNmZXIgPSBldmVudC5wcmV2aW91c0NvbnRhaW5lciAhPT0gZXZlbnQuY29udGFpbmVyO1xuICAgICAgICBsZXQgZHJvcEluZGV4ZXMgPSB0aGlzLmdldERyb3BJbmRleGVzKGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCwgbGlzdFR5cGUsIGlzVHJhbnNmZXIsIGV2ZW50Lml0ZW0uZGF0YSk7XG5cbiAgICAgICAgaWYgKGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB7XG4gICAgICAgICAgICBpZiAoaXNUcmFuc2Zlcikge1xuICAgICAgICAgICAgICAgIHRyYW5zZmVyQXJyYXlJdGVtKGV2ZW50LnByZXZpb3VzQ29udGFpbmVyLmRhdGEsIGV2ZW50LmNvbnRhaW5lci5kYXRhLCBkcm9wSW5kZXhlcy5wcmV2aW91c0luZGV4LCBkcm9wSW5kZXhlcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChldmVudC5pdGVtLmRhdGEsIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0LnNwbGljZShzZWxlY3RlZEl0ZW1JbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMua2VlcFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0LnB1c2goZXZlbnQuaXRlbS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0KSB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0LnNwbGljZShldmVudC5wcmV2aW91c0luZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3ZlVG9Tb3VyY2UuZW1pdCh7IGl0ZW1zOiBbZXZlbnQuaXRlbS5kYXRhXSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW92ZUl0ZW1JbkFycmF5KGV2ZW50LmNvbnRhaW5lci5kYXRhLCBkcm9wSW5kZXhlcy5wcmV2aW91c0luZGV4LCBkcm9wSW5kZXhlcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Tb3VyY2VSZW9yZGVyLmVtaXQoeyBpdGVtczogW2V2ZW50Lml0ZW0uZGF0YV0gfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMuc291cmNlLCB0aGlzLlNPVVJDRV9MSVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc1RyYW5zZmVyKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmZXJBcnJheUl0ZW0oZXZlbnQucHJldmlvdXNDb250YWluZXIuZGF0YSwgZXZlbnQuY29udGFpbmVyLmRhdGEsIGRyb3BJbmRleGVzLnByZXZpb3VzSW5kZXgsIGRyb3BJbmRleGVzLmN1cnJlbnRJbmRleCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoZXZlbnQuaXRlbS5kYXRhLCB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZS5zcGxpY2Uoc2VsZWN0ZWRJdGVtSW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtlZXBTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldC5wdXNoKGV2ZW50Lml0ZW0uZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSkgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZS5zcGxpY2UoZXZlbnQucHJldmlvdXNJbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uTW92ZVRvVGFyZ2V0LmVtaXQoeyBpdGVtczogW2V2ZW50Lml0ZW0uZGF0YV0gfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vdmVJdGVtSW5BcnJheShldmVudC5jb250YWluZXIuZGF0YSwgZHJvcEluZGV4ZXMucHJldmlvdXNJbmRleCwgZHJvcEluZGV4ZXMuY3VycmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFyZ2V0UmVvcmRlci5lbWl0KHsgaXRlbXM6IFtldmVudC5pdGVtLmRhdGFdIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZVRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKDxhbnlbXT50aGlzLnRhcmdldCwgdGhpcy5UQVJHRVRfTElTVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxpc3RGb2N1cyhldmVudCwgbGlzdFR5cGUpIHtcbiAgICAgICAgbGV0IGxpc3RFbGVtZW50ID0gdGhpcy5nZXRMaXN0RWxlbWVudChsaXN0VHlwZSk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRmlyc3RJdGVtID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKGxpc3RFbGVtZW50LCAnbGkucC1waWNrbGlzdC1pdGVtLnAtaGlnaGxpZ2h0JykgfHwgRG9tSGFuZGxlci5maW5kU2luZ2xlKGxpc3RFbGVtZW50LCAnbGkucC1waWNrbGlzdC1pdGVtJyk7XG4gICAgICAgIGNvbnN0IGZpbmRJbmRleCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEZpcnN0SXRlbSwgbGlzdEVsZW1lbnQuY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMuZm9jdXNlZFtsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCA/ICdzb3VyY2VMaXN0JyA6ICd0YXJnZXRMaXN0J10gPSB0cnVlO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSA/IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4IDogc2VsZWN0ZWRGaXJzdEl0ZW0gPyBmaW5kSW5kZXggOiAtMTtcblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChpbmRleCwgbGlzdFR5cGUpO1xuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25MaXN0Qmx1cihldmVudCwgbGlzdFR5cGUpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkW2xpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUID8gJ3NvdXJjZUxpc3QnIDogJ3RhcmdldExpc3QnXSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBnZXRMaXN0RWxlbWVudChsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCA/IHRoaXMubGlzdFZpZXdTb3VyY2VDaGlsZD8ubmF0aXZlRWxlbWVudCA6IHRoaXMubGlzdFZpZXdUYXJnZXRDaGlsZD8ubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXRMaXN0SXRlbXMobGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgbGlzdEVsZW1ldCA9IHRoaXMuZ2V0TGlzdEVsZW1lbnQobGlzdFR5cGUpO1xuXG4gICAgICAgIHJldHVybiBEb21IYW5kbGVyLmZpbmQobGlzdEVsZW1ldCwgJ2xpLnAtcGlja2xpc3QtaXRlbScpO1xuICAgIH1cblxuICAgIGdldExhdGVzdFNlbGVjdGVkVmlzaWJsZU9wdGlvbkluZGV4KHZpc2libGVMaXN0OiBhbnlbXSwgc2VsZWN0ZWRJdGVtczogYW55W10pOiBudW1iZXIge1xuICAgICAgICBjb25zdCBsYXRlc3RTZWxlY3RlZEl0ZW0gPSBbLi4uc2VsZWN0ZWRJdGVtc10ucmV2ZXJzZSgpLmZpbmQoKGl0ZW0pID0+IHZpc2libGVMaXN0LmluY2x1ZGVzKGl0ZW0pKTtcbiAgICAgICAgcmV0dXJuIGxhdGVzdFNlbGVjdGVkSXRlbSAhPT0gdW5kZWZpbmVkID8gdmlzaWJsZUxpc3QuaW5kZXhPZihsYXRlc3RTZWxlY3RlZEl0ZW0pIDogLTE7XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJsZUxpc3QobGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpc2libGVPcHRpb25zU291cmNlICYmIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UubGVuZ3RoID4gMCA/IHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UgOiB0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5sZW5ndGggPiAwID8gdGhpcy5zb3VyY2UgOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQgJiYgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldC5sZW5ndGggPiAwID8gdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA6IHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0Lmxlbmd0aCA+IDAgPyB0aGlzLnRhcmdldCA6IG51bGw7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0aW9uTGlzdChsaXN0VHlwZTogbnVtYmVyLCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSkge1xuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSA9IHNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE5leHRPcHRpb25JbmRleChpbmRleDogbnVtYmVyLCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRMaXN0SXRlbXMobGlzdFR5cGUpO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoZWRPcHRpb25JbmRleCA9IFsuLi5pdGVtc10uZmluZEluZGV4KChsaW5rKSA9PiBsaW5rLmlkID09PSBpbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4ICsgMSA6IDA7XG4gICAgfVxuXG4gICAgZmluZFByZXZPcHRpb25JbmRleChpbmRleDogbnVtYmVyLCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRMaXN0SXRlbXMobGlzdFR5cGUpO1xuICAgICAgICBjb25zdCBtYXRjaGVkT3B0aW9uSW5kZXggPSBbLi4uaXRlbXNdLmZpbmRJbmRleCgobGluaykgPT4gbGluay5pZCA9PT0gaW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkT3B0aW9uSW5kZXggPiAtMSA/IG1hdGNoZWRPcHRpb25JbmRleCAtIDEgOiAwO1xuICAgIH1cblxuICAgIG9uSXRlbUtleURvd24oZXZlbnQ6IEV2ZW50IHwgYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duS2V5KGV2ZW50LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaywgbGlzdFR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcEtleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2ssIGxpc3RUeXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWVLZXkoZXZlbnQsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrLCBsaXN0VHlwZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2ssIGxpc3RUeXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2ssIGxpc3RUeXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub25TcGFjZUtleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2ssIGxpc3RUeXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnS2V5QSc6XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25MaXN0KGxpc3RUeXBlLCB0aGlzLmdldFZpc2libGVMaXN0KGxpc3RUeXBlKSk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoeyBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRGb2N1c2VkT3B0aW9uKGluZGV4OiBudW1iZXIsIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSAmJiB0aGlzLnZpc2libGVPcHRpb25zU291cmNlLmxlbmd0aCA/IHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2VbaW5kZXhdIDogdGhpcy5zb3VyY2UgJiYgdGhpcy5zb3VyY2UubGVuZ3RoID8gdGhpcy5zb3VyY2VbaW5kZXhdIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0ICYmIHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQubGVuZ3RoID8gdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldFtpbmRleF0gOiB0aGlzLnRhcmdldCAmJiB0aGlzLnRhcmdldC5sZW5ndGggPyB0aGlzLnRhcmdldFtpbmRleF0gOiBudWxsO1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChpbmRleCwgbGlzdFR5cGUpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldExpc3RJdGVtcyhsaXN0VHlwZSk7XG4gICAgICAgIGlmIChpdGVtcz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG9yZGVyID0gaW5kZXggPj0gaXRlbXMubGVuZ3RoID8gaXRlbXMubGVuZ3RoIC0gMSA6IGluZGV4IDwgMCA/IDAgOiBpbmRleDtcblxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXggPSBpdGVtc1tvcmRlcl0uZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uID0gdGhpcy5nZXRGb2N1c2VkT3B0aW9uKG9yZGVyLCBsaXN0VHlwZSk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEluVmlldyhpdGVtc1tvcmRlcl0uZ2V0QXR0cmlidXRlKCdpZCcpLCBsaXN0VHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxJblZpZXcoaWQsIGxpc3RUeXBlKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5nZXRMaXN0RWxlbWVudChsaXN0VHlwZSksIGBsaVtpZD1cIiR7aWR9XCJdYCk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcgJiYgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ3N0YXJ0JyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50OiBFdmVudCB8IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuZmluZE5leHRPcHRpb25JbmRleCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCwgbGlzdFR5cGUpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KG9wdGlvbkluZGV4LCBsaXN0VHlwZSk7XG5cbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrLCBsaXN0VHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uQXJyb3dVcEtleShldmVudDogRXZlbnQgfCBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLmZpbmRQcmV2T3B0aW9uSW5kZXgodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgsIGxpc3RUeXBlKTtcblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChvcHRpb25JbmRleCwgbGlzdFR5cGUpO1xuXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaywgbGlzdFR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkVudGVyS2V5KGV2ZW50OiBFdmVudCB8IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKGV2ZW50LCB0aGlzLmZvY3VzZWRPcHRpb24sIHNlbGVjdGVkSXRlbXMsIGxpc3RUeXBlLCBjYWxsYmFjayk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25TcGFjZUtleShldmVudDogRXZlbnQgfCBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgc2VsZWN0ZWRJdGVtcyAmJiBzZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCB2aXNpYmxlTGlzdCA9IHRoaXMuZ2V0VmlzaWJsZUxpc3QobGlzdFR5cGUpO1xuICAgICAgICAgICAgbGV0IGxhc3RTZWxlY3RlZEluZGV4ID0gdGhpcy5nZXRMYXRlc3RTZWxlY3RlZFZpc2libGVPcHRpb25JbmRleCh2aXNpYmxlTGlzdCwgc2VsZWN0ZWRJdGVtcyk7XG5cbiAgICAgICAgICAgIGlmIChsYXN0U2VsZWN0ZWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNlZEluZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHRoaXMuZm9jdXNlZE9wdGlvbiwgdmlzaWJsZUxpc3QpO1xuXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IFsuLi52aXNpYmxlTGlzdC5zbGljZShNYXRoLm1pbihsYXN0U2VsZWN0ZWRJbmRleCwgZm9jdXNlZEluZGV4KSwgTWF0aC5tYXgobGFzdFNlbGVjdGVkSW5kZXgsIGZvY3VzZWRJbmRleCkgKyAxKV07XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25MaXN0KGxpc3RUeXBlLCBzZWxlY3RlZEl0ZW1zKTtcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoeyBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrLCBsaXN0VHlwZSk7XG4gICAgfVxuXG4gICAgb25Ib21lS2V5KGV2ZW50OiBFdmVudCB8IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAoZXZlbnQuY3RybEtleSAmJiBldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgbGV0IHZpc2libGVMaXN0ID0gdGhpcy5nZXRWaXNpYmxlTGlzdChsaXN0VHlwZSk7XG4gICAgICAgICAgICBsZXQgZm9jdXNlZEluZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHRoaXMuZm9jdXNlZE9wdGlvbiwgdmlzaWJsZUxpc3QpO1xuXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gWy4uLnZpc2libGVMaXN0LnNsaWNlKDAsIGZvY3VzZWRJbmRleCArIDEpXTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uTGlzdChsaXN0VHlwZSwgc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHsgaXRlbXM6IHNlbGVjdGVkSXRlbXMgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleCgwLCBsaXN0VHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW5kS2V5KGV2ZW50OiBFdmVudCB8IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgdmlzaWJsZUxpc3QgPSB0aGlzLmdldFZpc2libGVMaXN0KGxpc3RUeXBlKTtcbiAgICAgICAgbGV0IGxhc3RJbmRleCA9IHZpc2libGVMaXN0ICYmIHZpc2libGVMaXN0Lmxlbmd0aCA+IDAgPyB2aXNpYmxlTGlzdC5sZW5ndGggLSAxIDogbnVsbDtcbiAgICAgICAgaWYgKGxhc3RJbmRleCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBsZXQgZm9jdXNlZEluZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHRoaXMuZm9jdXNlZE9wdGlvbiwgdmlzaWJsZUxpc3QpO1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IFsuLi52aXNpYmxlTGlzdC5zbGljZShmb2N1c2VkSW5kZXgsIGxhc3RJbmRleCldO1xuXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkxpc3QobGlzdFR5cGUsIHNlbGVjdGVkSXRlbXMpO1xuICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7IGl0ZW1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgobGFzdEluZGV4LCBsaXN0VHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGdldERyb3BJbmRleGVzKGZyb21JbmRleDogbnVtYmVyLCB0b0luZGV4OiBudW1iZXIsIGRyb3BwZWRMaXN0OiBudW1iZXIsIGlzVHJhbnNmZXI6IGJvb2xlYW4sIGRhdGE6IGFueVtdIHwgYW55KSB7XG4gICAgICAgIGxldCBwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXg7XG5cbiAgICAgICAgaWYgKGRyb3BwZWRMaXN0ID09PSB0aGlzLlNPVVJDRV9MSVNUKSB7XG4gICAgICAgICAgICBwcmV2aW91c0luZGV4ID0gaXNUcmFuc2ZlciA/ICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0ID8gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KGRhdGEsIHRoaXMudGFyZ2V0KSA6IGZyb21JbmRleCkgOiB0aGlzLmZpbHRlclZhbHVlU291cmNlID8gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KGRhdGEsIHRoaXMuc291cmNlKSA6IGZyb21JbmRleDtcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgPyB0aGlzLmZpbmRGaWx0ZXJlZEN1cnJlbnRJbmRleCg8YW55W10+dGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSwgdG9JbmRleCwgdGhpcy5zb3VyY2UpIDogdG9JbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZXZpb3VzSW5kZXggPSBpc1RyYW5zZmVyID8gKHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgPyBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoZGF0YSwgdGhpcy5zb3VyY2UpIDogZnJvbUluZGV4KSA6IHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgPyBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoZGF0YSwgdGhpcy50YXJnZXQpIDogZnJvbUluZGV4O1xuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA/IHRoaXMuZmluZEZpbHRlcmVkQ3VycmVudEluZGV4KDxhbnlbXT50aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0LCB0b0luZGV4LCB0aGlzLnRhcmdldCkgOiB0b0luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgcHJldmlvdXNJbmRleCwgY3VycmVudEluZGV4IH07XG4gICAgfVxuXG4gICAgZmluZEZpbHRlcmVkQ3VycmVudEluZGV4KHZpc2libGVPcHRpb25zOiBhbnlbXSwgaW5kZXg6IG51bWJlciwgb3B0aW9uczogYW55KSB7XG4gICAgICAgIGlmICh2aXNpYmxlT3B0aW9ucy5sZW5ndGggPT09IGluZGV4KSB7XG4gICAgICAgICAgICBsZXQgdG9JbmRleCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdCh2aXNpYmxlT3B0aW9uc1tpbmRleCAtIDFdLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRvSW5kZXggKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdCh2aXNpYmxlT3B0aW9uc1tpbmRleF0sIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRTb3VyY2VGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmZpbHRlclZhbHVlU291cmNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zb3VyY2VGaWx0ZXJWaWV3Q2hpbGQgJiYgKCg8SFRNTElucHV0RWxlbWVudD50aGlzLnNvdXJjZUZpbHRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KS52YWx1ZSA9ICcnKTtcbiAgICB9XG5cbiAgICByZXNldFRhcmdldEZpbHRlcigpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLnRhcmdldEZpbHRlclZpZXdDaGlsZCAmJiAoKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMudGFyZ2V0RmlsdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gJycpO1xuICAgIH1cblxuICAgIHJlc2V0RmlsdGVyKCkge1xuICAgICAgICB0aGlzLnJlc2V0U291cmNlRmlsdGVyKCk7XG4gICAgICAgIHRoaXMucmVzZXRUYXJnZXRGaWx0ZXIoKTtcbiAgICB9XG5cbiAgICBmaW5kTmV4dEl0ZW0oaXRlbTogYW55KTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gaXRlbS5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKG5leHRJdGVtKSByZXR1cm4gIURvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dEl0ZW0sICdwLXBpY2tsaXN0LWl0ZW0nKSB8fCBEb21IYW5kbGVyLmlzSGlkZGVuKG5leHRJdGVtKSA/IHRoaXMuZmluZE5leHRJdGVtKG5leHRJdGVtKSA6IG5leHRJdGVtO1xuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShpdGVtOiBhbnkpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgcHJldkl0ZW0gPSBpdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKHByZXZJdGVtKSByZXR1cm4gIURvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICdwLXBpY2tsaXN0LWl0ZW0nKSB8fCBEb21IYW5kbGVyLmlzSGlkZGVuKHByZXZJdGVtKSA/IHRoaXMuZmluZFByZXZJdGVtKHByZXZJdGVtKSA6IHByZXZJdGVtO1xuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGluaXRNZWRpYSgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWEgPSB0aGlzLndpbmRvdy5tYXRjaE1lZGlhKGAobWF4LXdpZHRoOiAke3RoaXMuYnJlYWtwb2ludH0pYCk7XG4gICAgICAgICAgICB0aGlzLnZpZXdDaGFuZ2VkID0gdGhpcy5tZWRpYS5tYXRjaGVzO1xuICAgICAgICAgICAgdGhpcy5iaW5kTWVkaWFDaGFuZ2VMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzdHJveU1lZGlhKCkge1xuICAgICAgICB0aGlzLnVuYmluZE1lZGlhQ2hhbmdlTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBiaW5kTWVkaWFDaGFuZ2VMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWVkaWEgJiYgIXRoaXMubWVkaWFDaGFuZ2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZWRpYUNoYW5nZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5tZWRpYSwgJ2NoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NoYW5nZWQgPSBldmVudC5tYXRjaGVzO1xuICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZE1lZGlhQ2hhbmdlTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhQ2hhbmdlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWFDaGFuZ2VMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5tZWRpYUNoYW5nZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVN0eWxlKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgdGhpcy5pZCwgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuc3R5bGVFbGVtZW50LCAndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLnN0eWxlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7dGhpcy5icmVha3BvaW50fSkge1xuICAgICAgICAgICAgICAgICAgICAucC1waWNrbGlzdFske3RoaXMuaWR9XSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLnAtcGlja2xpc3RbJHt0aGlzLmlkfV0gLnAtcGlja2xpc3QtYnV0dG9ucyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiB2YXIoLS1jb250ZW50LXBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC5wLXBpY2tsaXN0WyR7dGhpcy5pZH1dIC5wLXBpY2tsaXN0LWJ1dHRvbnMgLnAtYnV0dG9uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogdmFyKC0taW5saW5lLXNwYWNpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC5wLXBpY2tsaXN0WyR7dGhpcy5pZH1dIC5wLXBpY2tsaXN0LWJ1dHRvbnMgLnAtYnV0dG9uOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWA7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc3R5bGVFbGVtZW50LCAnaW5uZXJIVE1MJywgaW5uZXJIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNvdXJjZU1vdmVEaXNhYmxlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGFyZ2V0TW92ZURpc2FibGVkKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlUmlnaHREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UpO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0RGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IE9iamVjdFV0aWxzLmlzRW1wdHkodGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0KTtcbiAgICB9XG5cbiAgICBtb3ZlQWxsUmlnaHREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLnNvdXJjZSk7XG4gICAgfVxuXG4gICAgbW92ZUFsbExlZnREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLnRhcmdldCk7XG4gICAgfVxuXG4gICAgZGVzdHJveVN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5zdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLnN0eWxlRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBgYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3lTdHlsZSgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3lNZWRpYSgpO1xuICAgIH1cbn1cblxuY29uc3QgRHJhZ0NvbmZpZyA9IHtcbiAgICB6SW5kZXg6IDEyMDBcbn07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQnV0dG9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFJpcHBsZU1vZHVsZSwgRHJhZ0Ryb3BNb2R1bGUsIEFuZ2xlRG91YmxlRG93bkljb24sIEFuZ2xlRG91YmxlTGVmdEljb24sIEFuZ2xlRG91YmxlUmlnaHRJY29uLCBBbmdsZURvdWJsZVVwSWNvbiwgQW5nbGVEb3duSWNvbiwgQW5nbGVMZWZ0SWNvbiwgQW5nbGVSaWdodEljb24sIEFuZ2xlVXBJY29uLCBTZWFyY2hJY29uLCBIb21lSWNvbl0sXG4gICAgZXhwb3J0czogW1BpY2tMaXN0LCBTaGFyZWRNb2R1bGUsIERyYWdEcm9wTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQaWNrTGlzdF0sXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDREtfRFJBR19DT05GSUcsIHVzZVZhbHVlOiBEcmFnQ29uZmlnIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBpY2tMaXN0TW9kdWxlIHt9XG4iXX0=