import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { IonicStorageModule } from "@ionic/storage";

// Pages
import { TabsPage } from "../pages/tabs/tabs";

import { OverviewPage } from "../pages/overview/overview";
import { OutgoingsPage } from "../pages/outgoings/outgoings";
import { IncomePage } from "../pages/income/income";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { DataProvider } from "../providers/data/data";
import { AboutPage } from "../pages/about/about";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OverviewPage,
    OutgoingsPage,
    IncomePage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OverviewPage,
    OutgoingsPage,
    IncomePage,
    TabsPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider
  ]
})
export class AppModule {}
