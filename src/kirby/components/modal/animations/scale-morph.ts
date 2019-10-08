import { Animation } from '@ionic/core';

export function scaleMorphAnimation(
  fromBounds: DOMRect,
  AnimationC: Animation,
  baseEl: HTMLElement
): Promise<Animation> {
  const baseAnimation = new AnimationC();

  // Backdrop Animation
  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
  backdropAnimation.fromTo('opacity', 0.01, 0.4);

  // Modal Wrapper animation
  const wrapperAnimation = new AnimationC();
  // TODO - Add tests for these queries!
  const modalElm = <HTMLElement>baseEl.querySelector('.modal-wrapper');
  modalElm.style.transformOrigin = 'left top';
  const modalRect = <DOMRect>modalElm.getBoundingClientRect();
  wrapperAnimation.addElement(modalElm);

  const moveX = fromBounds.x - modalRect.x;
  const moveY = fromBounds.y - modalRect.y;
  const clipWidth = modalRect.width - fromBounds.width;
  const clipHeight = modalRect.height - fromBounds.height;

  wrapperAnimation
    .beforeStyles({ opacity: 1 })
    .fromTo('transform', `translate(${moveX}px, ${moveY}px)`, 'translate(0, 0)')
    .fromTo(
      'clip-path',
      `inset(0px ${clipWidth}px ${clipHeight}px 0px round 16px)`,
      'inset(0px 0px 0px 0px round 16px)'
    );
  console.log(`clip-path: inset(0px ${clipWidth}px ${clipHeight}px 0px round 16px)`);
  console.log(`transform: translate(${moveX}px, ${moveY}px)`);
  // 'clip-path',
  // `inset(${scaleX}% ${scaleY}% round 16px)`,
  // 'inset(0%)'

  // Modal Content animation
  const contentAnimation = new AnimationC();
  const modalwrapper = <HTMLElement>modalElm.querySelector('.modal-wrapper');
  const counterMoveX = clipWidth / 2;

  contentAnimation.addElement(modalwrapper);
  contentAnimation.fromTo('transform', `translateX(-${counterMoveX}px)`, 'translateX(0)');

  return Promise.resolve(
    baseAnimation
      .addElement(baseEl)
      .duration(4000)
      .beforeAddClass('show-modal')
      .add(wrapperAnimation)
      .add(contentAnimation)
      .add(backdropAnimation)
  );
}
