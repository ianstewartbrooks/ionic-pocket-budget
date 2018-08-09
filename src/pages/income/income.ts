import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
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

  constructor(
    public navCtrl: NavController,
    public data: DataProvider,
    public modalCtrl: ModalController
  ) {
    this.income = [];
    this.getData();
  }

  onClick(id: number) {}

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
        "No income added yet. Add some by clicking the + icon the top right.";
    } else {
      this.message = "Here is all your income";
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

  async onDeleteIncome(id: any) {
    console.log("id: ", id);
    await this.data.deleteIncomeItem(id);
    console.log("Income after deletion", this.income);

    this.getData();
  }
}
