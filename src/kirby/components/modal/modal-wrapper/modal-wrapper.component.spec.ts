import { MockComponent } from 'ng-mocks';
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, NavParams } from '@ionic/angular';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';

import { ButtonComponent } from '@kirbydesign/designsystem';
import { ModalController } from '@kirbydesign/designsystem/modal';

import { IconComponent } from '../../icon/icon.component';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { KirbyAnimation } from '@kirbydesign/designsystem/animation/kirby-animation';
import { Modal } from '../services/modal.model';

describe('ModalWrapperComponent', () => {
  const createComponent = createComponentFactory({
    component: ModalWrapperComponent,
    declarations: [
      ModalWrapperComponent,
      MockComponent(IconComponent),
      MockComponent(ButtonComponent),
      MockComponent(IonHeader),
      MockComponent(IonToolbar),
      MockComponent(IonTitle),
      MockComponent(IonButtons),
      MockComponent(IonContent),
    ],
    entryComponents: [ModalWrapperComponent, ButtonComponent],
    mocks: [ModalController],
    providers: [
      {
        provide: NavParams,
        useValue: mockProvider(NavParams, {
          get: () => {
            return {
              title: 'Test title',
              component: undefined,
              flavor: 'modal',
              modal,
            };
          },
        }),
      },
    ],
  });

  let spectator: Spectator<ModalWrapperComponent>;
  let component: ModalWrapperComponent;
  const modal = {
    close: () => {},
    scrollToTop: () => {},
    scrollToBottom: () => {},
  } as Modal;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('title', () => {
    it('should render', () => {
      expect(component.config.title).toEqual('Test title');
    });

    it('should have css class "drawer" when drawer flavor is used', () => {
      component.config.flavor = 'drawer';
      spectator.detectComponentChanges();
      const rootElement: HTMLElement = spectator.debugElement.nativeElement;
      expect(rootElement.classList).toContain('drawer');
    });

    it('should have font size "m" when drawer flavor is used', () => {
      component.config.flavor = 'drawer';
      spectator.detectComponentChanges();
      const rootElement: HTMLElement = spectator.debugElement.nativeElement;
      const title = rootElement.querySelector('ion-title');
      expect(window.getComputedStyle(title).fontSize).toEqual('18px');
    });
  });

  describe('close button', () => {
    it('should render as a close icon by default', () => {
      const iconComponent = spectator.query(IconComponent);
      expect(iconComponent.name).toBe('close');
    });

    it("should render arrow-down when flavor is set to 'drawer'", () => {
      component.config.flavor = 'drawer';
      spectator.detectComponentChanges();
      const iconComponent = spectator.query(IconComponent);
      expect(iconComponent.name).toBe('arrow-down');
    });
  });

  describe('supplementary button', () => {
    it('should not render if an icon was provided, but the flavor is modal', () => {
      component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      spectator.detectComponentChanges();
      const iconComponents = spectator.queryAll(IconComponent);
      expect(iconComponents.length).toBe(1);
      expect(iconComponents[0].name).toBe('close');
    });

    it('should render as the provided icon when flavor is drawer', () => {
      component.config.flavor = 'drawer';
      component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      spectator.detectComponentChanges();
      const iconComponents = spectator.queryAll(IconComponent);
      expect(iconComponents.length).toBe(2);
      expect(iconComponents[0].name).toBe('arrow-down');
      expect(iconComponents[1].name).toBe('qr');
    });

    it('should invoke the provided callback on select', () => {
      component.config.flavor = 'drawer';
      component.config.drawerSupplementaryAction = {
        iconName: 'qr',
        action: (_: any) => {},
      };
      spyOn(component.config.drawerSupplementaryAction, 'action');

      spectator.detectComponentChanges();
      const iconComponents = spectator.queryAll(IconComponent);
      expect(iconComponents.length).toBe(2);
      expect(iconComponents[1].name).toBe('qr');
      spectator.triggerEventHandler('button:nth-child(2) > kirby-icon', 'click', 'test');
      expect(component.config.drawerSupplementaryAction.action).toHaveBeenCalledWith('test');
    });
  });

  describe('scrollToTop', () => {
    it('should scroll to top with no scroll animation duration', () => {
      const ionContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToTop');

      modal.scrollToTop();

      expect(ionContent.scrollToTop).toHaveBeenCalledWith(0);
    });

    it('should scroll to top with provided scroll animation duration', () => {
      const animationDuration = KirbyAnimation.Duration.LONG;
      const ionContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToTop');

      modal.scrollToTop(animationDuration);

      expect(ionContent.scrollToTop).toHaveBeenCalledWith(animationDuration);
    });
  });

  describe('scrollToBottom', () => {
    it('should scroll to bottom with no scroll animation duration', () => {
      const ionContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToBottom');

      modal.scrollToBottom();

      expect(ionContent.scrollToBottom).toHaveBeenCalledWith(0);
    });

    it('should scroll to bottom with provided scroll animation duration', () => {
      const animationDuration = KirbyAnimation.Duration.LONG;
      const ionContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToBottom');

      modal.scrollToBottom(animationDuration);

      expect(ionContent.scrollToBottom).toHaveBeenCalledWith(animationDuration);
    });
  });
});
