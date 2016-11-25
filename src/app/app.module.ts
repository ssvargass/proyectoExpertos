import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { FieldPage } from '../pages/fields/field';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FieldService } from '../pages/fields/field.service'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    FieldPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    FieldPage,
    HomePage,
    TabsPage
  ],
  providers: [
    FieldService
  ]
})
export class AppModule {}
