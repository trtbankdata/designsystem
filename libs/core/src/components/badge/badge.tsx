import { Component, ComponentInterface, Host, h } from '@stencil/core';
@Component({
  tag: 'kirby-badge',
  styleUrl: 'badge.scss',
  shadow: true,
})
export class Badge implements ComponentInterface {
  render() {
    return (
      <Host>
        <ion-badge>
          <slot />
        </ion-badge>
      </Host>
    );
  }
}
