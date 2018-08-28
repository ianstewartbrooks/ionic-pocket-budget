import { Component, Input, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { DataProvider } from "../../../providers/data/data";

@IonicPage()
@Component({
  selector: "page-modal-add",
  templateUrl: "modal-add.html"
})
export class ModalAddPage {
  @ViewChild("inputName")
  inputName;
  @ViewChild("inputAmount")
  inputAmount;

  type: string;
  itemName: string;
  amount: number;
  pageColor: string;
  message: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private data: DataProvider
  ) {
    this.type = this.navParams.get("type");
    if (this.type == "income") {
      this.pageColor = "darkGreen";
    } else {
      this.pageColor = "darkRed";
    }
  }

  // Functions

  closeModal() {
    this.viewCtrl.dismiss();
  }

  onOk() {
    if (!this.itemName) {
      this.message = "Give your item a name";
      this.inputName.setFocus();
    }
    if (!this.amount) {
      this.message = "Enter an amount";
      this.inputAmount.setFocus();
    }

    if (this.itemName && this.amount) {
      if (this.type == "income") {
        this.data.storeIncome(this.itemName, this.amount);
      } else {
        this.data.storeOutGoing(this.itemName, this.amount);
      }
      this.closeModal();
    }
  }
}
