import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: "page-overview",
  templateUrl: "overview.html"
})
export class OverviewPage {
  totalIncome: number = 0;
  totalOutGoings: number = 0;
  totalAvailable: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private data: DataProvider
  ) {}

  async GetTotals() {
    console.log("getTotals begin...");
    await this.data.testGetData();
    this.totalAvailable = this.data.getTotalAvailable();
    this.totalIncome = this.data.getTotalIncome();
    this.totalOutGoings = this.data.getTotalOutGoings();
    console.log("getTotals end...");
  }

  ionViewDidEnter() {
    this.GetTotals();
  }

  switchTab(index) {
    this.navCtrl.parent.select(index);
  }
}
