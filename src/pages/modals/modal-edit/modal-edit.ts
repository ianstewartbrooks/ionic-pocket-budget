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
  selector: "page-modal-edit",
  templateUrl: "modal-edit.html"
})
export class ModalEditPage {
  type: string;
  itemName: any;
  amount: any;
  id: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private data: DataProvider
  ) {
    // Get passed Params
    this.type = this.navParams.get("type");
    this.id = this.navParams.get("id");
    this.itemName = this.navParams.get("itemName");
    this.amount = this.navParams.get("amount");
  }

  onOk() {
    if (this.itemName && this.amount) {
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
