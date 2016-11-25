import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FieldService } from './field.service';

@Component({
  selector: 'page-field',
  templateUrl: 'field.html'
})
export class FieldPage implements OnInit {
  fields: any[];

  constructor(
      public navCtrl: NavController,
      private fieldService: FieldService) {

  }

  ngOnInit(){
    this.getFields();
  }

  getFields(): void{
    this.fieldService.getFields().subscribe(response => this.fields = response);
  }

}
