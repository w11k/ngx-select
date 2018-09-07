import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxSelect } from '../core/ngx-select.core';
import { NgxSelectModel } from '../core/ngx-select.model';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { NgxSelectMaterialOverlayComponent } from './overlay/ngx-select-material-overlay.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select-material.component.html',
  styleUrls: ['./ngx-select-material.component.scss'],
})
export class NgxSelectMaterialComponent<T> extends NgxSelect<T> implements OnInit, OnDestroy {

  @Input()
  set originalOptions(value: NgxSelectModel<T>[]) {
    super.setOriginalOptions(value);
  }

  overlayRef: OverlayRef;
  subscriptions: Subscription[] = [];

  constructor(private overlay: Overlay, private elementRef: ElementRef) {
    super();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 0,
          offsetY: 10,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  toggleVisibility(): void {
    if (this.visible === true) {
      this.subscriptions.map(sub => sub.unsubscribe());
      this.subscriptions = [];
      this.overlayRef.detach();
    } else {
      const overlayPortal = new ComponentPortal(NgxSelectMaterialOverlayComponent);

      const containerRef = this.overlayRef.attach(overlayPortal);

      const overlayInstance = containerRef.instance;

      overlayInstance.options$ = this.visibleOptions$;
      overlayInstance.filterControl = this.filterControl;
      const toggleSub = overlayInstance.toggleSelected.subscribe(() => {
        this.toggleAllNoneSelected();
      });
      const resetSub = overlayInstance.resetFilter.subscribe(() => {
        this.resetFilter();
      });
      const changeSub = overlayInstance.changeCheckbox.subscribe((item: NgxSelectModel<T>) => {
        this.changeCheckbox(item);
      });
      this.subscriptions = this.subscriptions.concat([toggleSub, resetSub, changeSub]);
    }

    super.toggleVisibility();
  }
}
