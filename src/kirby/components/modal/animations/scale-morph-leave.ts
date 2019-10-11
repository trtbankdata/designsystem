import { Animation } from '@ionic/core';

export function scaleMorphLeaveAnimation(
  fromBounds: DOMRect,
  AnimationC: Animation,
  baseEl: HTMLElement
): Promise<Animation> {
  const baseAnimation = new AnimationC();

  // Backdrop Animation
  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
  backdropAnimation.fromTo('opacity', 0.4, 0.01);

  // Modal Wrapper animation
  const wrapperAnimation = new AnimationC();
  // TODO - Add tests for these queries!
  const modalElm = <HTMLElement>baseEl.querySelector('.modal-wrapper');
  modalElm.style.transformOrigin = 'left top';
  const modalRect = <DOMRect>modalElm.getBoundingClientRect();
  wrapperAnimation.addElement(modalElm);

  const moveX = fromBounds.x - modalRect.x;
  const moveY = fromBounds.y - modalRect.y;
  const scaleX = fromBounds.width / modalRect.width;
  const scaleY = fromBounds.height / modalRect.height;

  wrapperAnimation
    .beforeStyles({ opacity: 1 })
    .fromTo(
      'transform',
      'translate(0, 0)',
      `translate(${moveX}px, ${moveY}px) scale(${scaleX}, ${scaleY})`
    )
    .fromTo('opacity', 1, 0.3);

  return Promise.resolve(
    baseAnimation
      .addElement(baseEl)
      .duration(250)
      .beforeAddClass('show-modal')
      .add(wrapperAnimation)
      .add(backdropAnimation)
  );
}
