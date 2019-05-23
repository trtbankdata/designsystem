import { ViewContainerRef } from '@angular/core';

export class ModalVcRef {
  private static vcRef: ViewContainerRef;

  public static setVcRef(vcRef: ViewContainerRef): void {
    ModalVcRef.vcRef = vcRef;
  }

  public static getVcRef(): ViewContainerRef {
    if (!ModalVcRef.vcRef) {
      throw new Error('No ViewContainerRef is currently registered');
    }
    return ModalVcRef.vcRef;
  }
}
