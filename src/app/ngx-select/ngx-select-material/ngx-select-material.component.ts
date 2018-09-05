import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgxSelect } from '../core/ngx-select.core';
import { NgxSelectModel } from '../core/ngx-select.model';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { NgxSelectMaterialOverlayComponent } from './overlay/ngx-select-material-overlay.component';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select-material.component.html',
  styleUrls: ['./ngx-select-material.component.scss'],
})
export class NgxSelectMaterialComponent<T> extends NgxSelect<T> implements OnInit {

  @Input()
  set originalOptions(value: NgxSelectModel<T>[]) {
    super.setOriginalOptions(value);
  }

  overlayRef: OverlayRef;

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

  toggleVisibility(): void {
    if (this.visible === true) {
      console.log('close the overlay');
      this.overlayRef.detach();
    } else {
      const overlayPortal = new ComponentPortal(NgxSelectMaterialOverlayComponent);

      const containerRef = this.overlayRef.attach(overlayPortal);

      const overlayInstance = containerRef.instance;

      overlayInstance.options$ = this.visibleOptions$;
      overlayInstance.filterControl = this.filterControl;
      overlayInstance.toggleSelected.subscribe(() => {
        this.toggleAllNoneSelected();
      });
      overlayInstance.resetFilter.subscribe(() => {
        this.resetFilter();
      });
      overlayInstance.changeCheckbox.subscribe((item: NgxSelectModel<T>) => {
        this.changeCheckbox(item);
      });
    }

    super.toggleVisibility();
  }
}
