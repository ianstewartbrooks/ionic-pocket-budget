import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AppVersion } from "@ionic-native/app-version";

@IonicPage()
@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class AboutPage {
  version: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appVersion: AppVersion
  ) {
    this.getAppVersion();
  }

  async getAppVersion() {
    this.version = await this.appVersion.getVersionNumber();
  }
}
