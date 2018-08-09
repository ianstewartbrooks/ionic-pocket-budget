import { Component } from "@angular/core";

import { OverviewPage } from "../overview/overview";
import { IncomePage } from "../income/income";
import { OutgoingsPage } from "../outgoings/outgoings";
import { AboutPage } from "../about/about";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = OverviewPage;
  tab2Root = IncomePage;
  tab3Root = OutgoingsPage;
  tab4Root = AboutPage;

  constructor() {}
}
