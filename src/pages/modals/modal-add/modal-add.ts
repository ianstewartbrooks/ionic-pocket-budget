import { Component } from "@angular/core";
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
  type: string;
  itemName: string;
  amount: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private data: DataProvider
  ) {
    this.type = this.navParams.get("type");
  }

  // Functions

  closeModal() {
    this.viewCtrl.dismiss();
  }

  onOk() {
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
