import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

// Pages
import { TabsPage } from "../pages/tabs/tabs";
import { ModalPage } from "../pages/modal/modal";
import { OverviewPage } from "../pages/overview/overview";
import { OutgoingsPage } from "../pages/outgoings/outgoings";
import { IncomePage } from "../pages/income/income";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { DataProvider } from "../providers/data/data";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ModalPage,
    OverviewPage,
    OutgoingsPage,
    IncomePage
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalPage,
    OverviewPage,
    OutgoingsPage,
    IncomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider
  ]
})
export class AppModule {}
