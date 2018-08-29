import { Injectable } from "@angular/core";
import { DataModel } from "./data.model";
import { Storage } from "@ionic/storage";
import { v4 as uuid } from "uuid";

@Injectable()
export class DataProvider {
  totalIncome: number = 0;
  totalOutGoings: number = 0;
  totalAvailable: number = 0;

  income: DataModel[] = [];
  outGoings: DataModel[] = [];
  record: DataModel = {};

  constructor(private storage: Storage) {
    this.income = [];
    this.outGoings = [];
  }

  getTotalIncome() {
    return this.totalIncome;
  }

  getTotalOutGoings() {
    return this.totalOutGoings;
  }

  getTotalAvailable() {
    return this.totalAvailable;
  }

  clearData() {
    this.storage.clear();
  }

  // INCOME

  async storeIncome(itemName: string, amount: number) {
    if (this.income == null) {
      this.income = [];
      console.log("Income is null");
    }

    // Build a record and an ID
    this.record.id = uuid();
    this.record.name = itemName;
    this.record.amount = amount;
    console.log("income ", this.income);
    this.income.push(this.record);
    let result = await this.storage.set("income", this.income);
  }

  async editIncome(id: any, itemName: any, amount: any) {
    let returnIndex = this.income.findIndex(element => {
      return element.id == id;
    });

    this.income[returnIndex].name = itemName;
    this.income[returnIndex].amount = Number(amount);
    let storeResult = await this.storage.set("income", this.income);
  }

  async deleteIncomeItem(id: any) {
    let returnIndex = this.income.findIndex(element => {
      return element.id == id;
    });
    this.income.splice(returnIndex, 1);
    let storeResult = await this.storage.set("income", this.income);
  }

  // OUTGOINGS

  async storeOutGoing(itemName: string, amount: number) {
    if (this.outGoings == null) {
      this.outGoings = [];
    }

    // Build a record and an ID
    this.record.id = uuid();
    this.record.name = itemName;
    this.record.amount = amount;
    this.outGoings.push(this.record);
    let result = await this.storage.set("outGoings", this.outGoings);
  }

  async editOutGoing(id: any, itemName: any, amount: any) {
    let returnIndex = this.outGoings.findIndex(element => {
      return element.id == id;
    });
    this.outGoings[returnIndex].name = itemName;
    this.outGoings[returnIndex].amount = amount;
    let storeResult = await this.storage.set("outGoings", this.outGoings);
  }

  async deleteOutGoingItem(id: any) {
    let returnIndex = this.outGoings.findIndex(element => {
      return element.id == id;
    });
    this.outGoings.splice(returnIndex, 1);
    let storeResult = await this.storage.set("outGoings", this.outGoings);
  }

  async OverviewGetData() {
    let temp: any[] = [];
    let total = 0;
    console.log("Test GetData");

    // Income
    temp = await this.getData("income");
    if (temp == null) {
      temp = [];
    }

    total = 0;
    for (let index = 0; index < temp.length; index++) {
      total += Number(temp[index].amount);
    }
    this.totalIncome = total;

    // Out Goings
    temp = await this.getData("outGoings");
    if (temp == null) {
      temp = [];
    }

    total = 0;
    for (let index = 0; index < temp.length; index++) {
      total += Number(temp[index].amount);
    }

    this.totalOutGoings = total;

    // Total Available
    this.totalAvailable = this.totalIncome - this.totalOutGoings;
  }

  async getData(type: string): Promise<any> {
    console.log("Get Data");
    if (type == "income") {
      this.income = await this.storage.get("income");
      return this.income;
    } else {
      this.outGoings = await this.storage.get("outGoings");
      return this.outGoings;
    }
  }
}
