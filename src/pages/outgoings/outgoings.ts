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
  showTotals: boolean = false;
  numOfItems: number = 0;
  totalOutGoings: number = 0;
  sortBy: string = "name";
  showSort: boolean = false;
  sortAsc: boolean = true;

  constructor(
    public navCtrl: NavController,
    public data: DataProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
    this.outGoings = [];
    this.getData();
  }

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
        "No out goings added yet, add some by clicking the + icon in the top right corner.";
      this.showTotals = false;
      this.totalOutGoings = 0;
    } else {
      this.message = "";
      this.showTotals = true;
      this.numOfItems = this.outGoings.length;
      let total = 0;
      for (let index = 0; index < this.outGoings.length; index++) {
        total += Number(this.outGoings[index].amount);
      }
      // See if we have enough items for sorting
      this.showSort = false;
      this.totalOutGoings = total;
      if (this.outGoings.length > 1) {
        this.showSort = true;
        if (this.sortBy == "name") {
          this.onSortByName();
        } else {
          this.onSortByAmount();
        }
      }
    }
  }
  sortOrder() {
    console.log("onSortOrder fired!");
    console.log("Sort Asc: ", this.sortAsc);
    console.log("By : ", this.sortBy);
    if (this.sortBy == "name") {
      console.log("In by name if statement");
      this.onSortByName();
    }

    if (this.sortBy == "amount") {
      this.onSortByAmount();
    }

    if (this.sortBy == "date") {
      this.onSortByDate();
    }
  }

  onSortByName() {
    if (this.sortAsc) {
      let sorted = this.outGoings.sort((a, b) => a.name.localeCompare(b.name));
      this.outGoings = sorted;
      return;
    } else {
      let sorted = this.outGoings.sort((a, b) => b.name.localeCompare(a.name));
      this.outGoings = sorted;
      return;
    }
  }

  onSortByDate() {
    if (this.sortAsc) {
      this.outGoings = this.outGoings.sort((obj1, obj2) => {
        return obj1.date - obj2.date;
      });
    } else {
      this.outGoings = this.outGoings.sort((obj1, obj2) => {
        return obj2.date - obj1.date;
      });
    }
  }

  onSortByAmount() {
    if (this.sortAsc) {
      this.outGoings = this.outGoings.sort((obj1, obj2) => {
        return obj1.amount - obj2.amount;
      });
    } else {
      this.outGoings = this.outGoings.sort((obj1, obj2) => {
        return obj2.amount - obj1.amount;
      });
    }
  }

  onEditOutGoing(id: any, itemName: any, amount: any) {
    let data = { type: "outGoing", id: id, itemName: itemName, amount: amount };
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
