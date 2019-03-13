import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModalExampleComponent } from './ionic-modal.page';

@Component({
  selector: 'kirby-ionic-modal',
  templateUrl: './ionic-modal.component.html',
  styleUrls: ['./ionic-modal.component.scss']
})
export class IonicModalComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: IonicModalExampleComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
