import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  ItemSliding,
  AlertController
} from "ionic-angular";
import { DataModel } from "../../providers/data/data.model";
import { DataProvider } from "../../providers/data/data";

// Import Modals
import { ModalAddPage } from "../modals/modal-add/modal-add";
import { ModalEditPage } from "../modals/modal-edit/modal-edit";

@IonicPage()
@Component({
  selector: "page-income",
  templateUrl: "income.html"
})
export class IncomePage {
  income: DataModel[] = [];
  message: string;
  showTotals: boolean = false;
  numOfItems: number = 0;
  totalIncome: number = 0;

  constructor(
    public navCtrl: NavController,
    public data: DataProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
    this.income = [];
    this.getData();
  }

  addIncome() {
    let data = { type: "income" };
    let modalAddPage = this.modalCtrl.create("ModalAddPage", data);
    // GetData when modal closes
    modalAddPage.onDidDismiss(returnData => {
      this.getData();
    });
    modalAddPage.present();
  }

  async getData() {
    this.income = await this.data.getData("income");

    if (this.income == null || this.income.length == 0) {
      this.message =
        "No income added yet, add some by clicking the + icon in the top right corner.";
      this.showTotals = false;
      this.totalIncome = 0;
    } else {
      this.message = "";
      // "Here is all your income. Swipe item left/right to access options.";
      this.showTotals = true;
      this.numOfItems = this.income.length;
      let total = 0;
      for (let index = 0; index < this.income.length; index++) {
        total += Number(this.income[index].amount);
      }
      this.totalIncome = total;
    }
  }

  onEditIncome(id: any, itemName: any, amount: any) {
    let data = { type: "income", id: id, itemName: itemName, amount: amount };
    let modalEditPage = this.modalCtrl.create("ModalEditPage", data);
    // GetData when modal closes
    modalEditPage.onDidDismiss(returnData => {
      this.getData();
    });
    modalEditPage.present();
  }

  async onDeleteIncome(id: any, slidingItem: ItemSliding) {
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
    await this.data.deleteIncomeItem(id);
    this.getData();
  }
}
