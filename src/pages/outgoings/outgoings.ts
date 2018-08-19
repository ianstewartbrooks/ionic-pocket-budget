import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  AlertController
} from "ionic-angular";
import { ItemSliding } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { DataModel } from "../../providers/data/data.model";

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
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
    this.outGoings = [];
    this.getData();
  }

  onDeleteItem() {}

  // onClick(id: number) {}

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
        "Here is your expenditure. Swipe item left/right to access options.";
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

  async onDeleteOutGoing(id: any, slidingItem: ItemSliding) {
    let alert = this.alertCtrl.create({
      // title: "Confirm Deletion",
      message: "Do you want to delete this item?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: "Delete",
          handler: () => {
            this.deleteItem(id);
          }
        }
      ]
    });
    alert.present();
  }

  async deleteItem(id: any) {
    await this.data.deleteOutGoingItem(id);
    this.getData();
  }
}