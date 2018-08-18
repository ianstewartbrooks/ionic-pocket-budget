import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { DataModel } from "../../providers/data/data.model";

/**
 * Generated class for the OutgoingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-outgoings",
  templateUrl: "outgoings.html"
})
export class OutgoingsPage {
  outGoings: DataModel[] = [];
  message: string;

  constructor(
    public navCtrl: NavController,
    public data: DataProvider,
    public modalCtrl: ModalController
  ) {
    this.outGoings = [];
    this.getData();
  }

  onClick(id: number) {}

  addOutGoing() {
    let data = { type: "outGoing" };
    let modalAddPage = this.modalCtrl.create("ModalAddPage", data);
    // GetData when modal closes
    modalAddPage.onDidDismiss(returnData => {
      this.getData();
    });
    modalAddPage.present();
  }

  async getData() {
    this.outGoings = await this.data.getData("outGoings");

    if (this.outGoings == null || this.outGoings.length == 0) {
      this.message =
        "No expenditure added yet. Add some by clicking the + icon in the top right corner.";
    } else {
      this.message =
        "Here is your expenditure. Swipe item  left/right to access options.";
    }
  }

  onEditOutGoing(id: any, itemName: any, amount: any) {
    let data = { type: "Income", id: id, itemName: itemName, amount: amount };
    let modalEditPage = this.modalCtrl.create("ModalEditPage", data);
    // GetData when modal closes
    modalEditPage.onDidDismiss(returnData => {
      this.getData();
    });
    modalEditPage.present();
  }

  async onDeleteOutGoing(id: any) {
    console.log("id: ", id);
    this.data.deleteOutGoingItem(id);
    console.log("Outgoings after deletion", this.outGoings);

    this.getData();
  }
}
