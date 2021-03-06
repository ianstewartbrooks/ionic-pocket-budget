import { Component, Input, ViewChild } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { DataProvider } from "../../../providers/data/data";

@IonicPage()
@Component({
  selector: "page-modal-edit",
  templateUrl: "modal-edit.html"
})
export class ModalEditPage {
  @ViewChild("inputName")
  inputName;
  @ViewChild("inputAmount")
  inputAmount;

  type: string;
  itemName: any;
  amount: any;
  id: any;
  pageColor: string;
  message: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private data: DataProvider,
    private decimalPipe: DecimalPipe
  ) {
    // Get passed Params
    this.type = this.navParams.get("type");
    if (this.type == "income") {
      this.pageColor = "darkGreen";
    } else {
      this.pageColor = "darkRed";
    }

    this.id = this.navParams.get("id");
    this.itemName = this.navParams.get("itemName");
    this.amount = this.twoDecimalAmount(this.navParams.get("amount"));

    // Remove all commas from the amount
    this.amount = this.amount.toString().replace(/,/g, "");
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.inputName.setFocus();
    }, 500); //SET A LONG TIME IF YOUR ARE IN A MODAL/ALERT
  }

  twoDecimalAmount(amount) {
    return this.decimalPipe.transform(amount, "1.2");
  }

  focusAmount() {
    this.inputAmount.setFocus();
  }

  setfocusAmount() {
    this.inputAmount.setFocus();
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
      this.amount = Number(this.amount);
      if (this.type == "income") {
        this.data.editIncome(this.id, this.itemName, this.amount);
      } else {
        this.data.editOutGoing(this.id, this.itemName, this.amount);
      }
      this.closeModal();
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
