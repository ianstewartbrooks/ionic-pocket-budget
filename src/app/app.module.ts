import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { IonicStorageModule } from "@ionic/storage";
import { AppVersion } from "@ionic-native/app-version";

// Pages
import { TabsPage } from "../pages/tabs/tabs";

import { OverviewPage } from "../pages/overview/overview";
import { OutgoingsPage } from "../pages/outgoings/outgoings";
import { IncomePage } from "../pages/income/income";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { DataProvider } from "../providers/data/data";
import { AboutPage } from "../pages/about/about";

import { DecimalPipe } from "@angular/common";
import { PageHeaderComponent } from "../components/page-header/page-header";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OverviewPage,
    OutgoingsPage,
    IncomePage,
    AboutPage,
    PageHeaderComponent
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
    DataProvider,
    AppVersion,
    DecimalPipe
  ]
})
export class AppModule {}
