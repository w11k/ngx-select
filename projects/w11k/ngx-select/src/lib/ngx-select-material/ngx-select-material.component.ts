import { Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnDestroy, Output } from '@angular/core';
import { NgxSelect } from '../core/ngx-select.core';
import { NgxSelectModel, NgxSelectToggleState } from '../core/ngx-select.model';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { NgxSelectMaterialOverlayComponent } from './overlay/ngx-select-material-overlay.component';
import { Subscription } from 'rxjs';
import { NGX_SELECT_INTL_SERVICE, NgxSelectIntlService } from '../core/ngx-select-intl.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select-material.component.html',
  styleUrls: ['./ngx-select-material.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxSelectMaterialComponent),
      multi: true,
    },
  ]
})
export class NgxSelectMaterialComponent<T> extends NgxSelect<T> implements OnDestroy {

  @Input()
  set options(value: NgxSelectModel<T>[]) {
    super.setOriginalOptions(value);
  }

  @Input() placeholder: string | undefined;

  @Output() changeToggleState: EventEmitter<NgxSelectToggleState> = new EventEmitter<NgxSelectToggleState>();

  overlayRef: OverlayRef;
  subscriptions: Subscription[] = [];

  constructor(private overlay: Overlay,
              private elementRef: ElementRef,
              @Inject(NGX_SELECT_INTL_SERVICE) intlService: NgxSelectIntlService) {
    super(intlService);
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(elementRef)
      .withPositions([{
        originX: 'start',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'top'
      }])
      .withDefaultOffsetY(20)
      .withPush(true);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'backdrop',
      scrollStrategy,
    });
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  toggleVisibility(): void {
    if (this.visible) {
      this.subscriptions.map(sub => sub.unsubscribe());
      this.subscriptions = [];
      this.overlayRef.detach();
    } else {
      const overlayPortal = new ComponentPortal(NgxSelectMaterialOverlayComponent);

      const containerRef = this.overlayRef.attach(overlayPortal);

      const overlayInstance = containerRef.instance;

      overlayInstance.options$ = this.visibleOptions$;
      overlayInstance.filterControl = this.filterControl;
      overlayInstance.checkboxGroup = this.checkboxGroup;
      overlayInstance.isDisabled = this.isDisabled;
      const toggleSub = overlayInstance.toggleSelected.subscribe(() => {
        this.toggleAllNoneSelected();
      });
      const resetSub = overlayInstance.resetFilter.subscribe(() => {
        this.resetFilter();
      });

      const backDropClick = this.overlayRef.backdropClick().subscribe(() => {
        this.toggleVisibility();
      });

      this.subscriptions = this.subscriptions.concat([toggleSub, resetSub, backDropClick]);
    }

    super.toggleVisibility();
  }
}
