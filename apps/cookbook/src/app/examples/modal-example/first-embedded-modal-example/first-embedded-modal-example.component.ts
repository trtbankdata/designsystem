import { Component, Inject, Input, OnInit, Optional, SkipSelf } from '@angular/core';

import {
  AlertConfig,
  ActionSheetConfig,
  Modal,
  ModalController,
  COMPONENT_PROPS,
} from '@kirbydesign/designsystem';
import { ModalConfig } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { KirbyAnimation } from '@kirbydesign/designsystem';

import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';

@Component({
  selector: 'cookbook-first-embedded-modal-example',
  templateUrl: './first-embedded-modal-example.component.html',
  styleUrls: ['./first-embedded-modal-example.component.scss'],
})
export class FirstEmbeddedModalExampleComponent implements OnInit {
  title: string;
  subtitle: string;

  exampleProperties: {
    stringProperty: string;
    numberProperty: number;
    booleanProperty: boolean;
  };

  showNestedOptions: boolean;
  showDummyKeyboard: boolean;
  showFooter: boolean;
  showDummyContent: boolean;
  showNestedFooter: boolean = false;
  showNestedDummyContent: boolean = true;
  delayLoadDummyContent: boolean;
  loadAdditionalContent: boolean;
  disableScroll: boolean = false;
  openFullHeight: boolean;

  isLoading = false;
  isLoadingAdditionalContent = false;
  snapFooterToKeyboard = false;

  constructor(
    @Inject(COMPONENT_PROPS) componentProps,
    private modalController: ModalController,
    private toastController: ToastController,
    @Optional() @SkipSelf() private modal: Modal
  ) {
    Object.assign(this, componentProps);
  }

  ngOnInit() {
    if (this.showDummyContent) {
      if (this.delayLoadDummyContent) {
        this.isLoading = true;
        setTimeout(() => (this.isLoading = false), 1000);
      }
      if (this.loadAdditionalContent) {
        this.isLoadingAdditionalContent = true;
        setTimeout(() => (this.isLoadingAdditionalContent = false), 2000);
      }
    }
  }

  private showNestedOverlay(flavor: 'modal' | 'drawer') {
    const title = flavor === 'modal' ? 'Nested Modal Title' : 'Nested Drawer Title';
    const config: ModalConfig = {
      flavor,
      drawerSupplementaryAction: {
        iconName: 'edit',
        action: this.onSupplementaryActionSelect.bind(this),
      },
      component: FirstEmbeddedModalExampleComponent,
      size: this.openFullHeight ? 'full-height' : null,
      componentProps: {
        title,
        subtitle: 'Hello from second embedded example component!',
        showDummyKeyboard: this.showDummyKeyboard,
        showFooter: this.showNestedFooter,
        showDummyContent: this.showNestedDummyContent,
        delayLoadDummyContent: this.delayLoadDummyContent,
        loadAdditionalContent: this.loadAdditionalContent,
      },
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config);
  }

  showNestedModal() {
    this.showNestedOverlay('modal');
  }

  showNestedDrawer() {
    this.showNestedOverlay('drawer');
  }

  showNestedAlert() {
    const config: AlertConfig = {
      title: 'Embedded Alert',
      message: 'The default alert is just a title, a message, an OK and (optional) cancel button',
      okBtn: 'I agree',
      cancelBtn: 'Take me back',
    };
    this.modalController.showAlert(config, this.onAlertClose);
  }

  showNestedActionSheet() {
    const config: ActionSheetConfig = {
      header: 'Nested action sheet',
      subheader: 'Action sheet subheader',
      items: [
        { id: '1', text: 'Option 1' },
        { id: '2', text: 'Option 2' },
        { id: '3', text: 'Option 3' },
      ],
      cancelButtonText: 'Custom cancel',
    };
    this.modalController.showActionSheet(config);
  }

  scrollToBottom() {
    this.modal.scrollToBottom(KirbyAnimation.Duration.EXTRA_LONG);
  }

  scrollToTop() {
    this.modal.scrollToTop(KirbyAnimation.Duration.SHORT);
  }

  toggleDisableScroll(disabled: boolean) {
    this.modal.scrollDisabled = disabled;
  }

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  close() {
    let someTestData: number = Math.PI;
    this.modal.close(someTestData);
  }

  onSupplementaryActionSelect(args: any) {
    const config: ToastConfig = {
      message: `Supplementary action selected`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  onSnapFooterToKeyboardCheckbox(checked: boolean) {
    this.snapFooterToKeyboard = checked;
  }

  onAlertClose(result?: boolean): void {
    console.log(`Alert closed: ${result}`);
  }
}
