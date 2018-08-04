import { Component } from "@angular/core";

import { OverviewPage } from "../overview/overview";
import { IncomePage } from "../income/income";
import { OutgoingsPage } from "../outgoings/outgoings";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = OverviewPage;
  tab2Root = IncomePage;
  tab3Root = OutgoingsPage;

  constructor() {}
}
