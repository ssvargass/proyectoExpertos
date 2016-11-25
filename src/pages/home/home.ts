import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FieldService } from '../fields/field.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  fields: any[];
  conditions: any[];
  response: any;

  constructor(
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              private fieldService: FieldService) {
    this.conditions = [];
    this.getFields();
  }

  getFields(): void{
    console.log('Update Fields');
    this.fieldService.getFields().subscribe(response => this.fields = response);
  }

  getConditionField(index): void{
    let field = this.fields[index];
    this.fieldService.getConditionField(field.id).subscribe(response => {
      this.fields[index].conditions = response;
      this.satisfyCondition()
    }); 
  }

  satisfyCondition(): void{
    this.conditions = [];

    for(let field of this.fields){
      if(field.conditions){
        for(let condition of field.conditions){
          if(field.type.name != 'Date'){
            if(eval("'"+field.value+"'"+condition.name)){
              this.conditions.push(condition);
            }
          } else {
            if(eval(condition.name)){
              this.conditions.push(condition);
            }
          }
        }
      }
    }
    
  }

  analize(): void {
    let conditionsId = [];
    for(let condition of this.conditions){
      conditionsId.push(condition.id);
    }
    let conditonString = conditionsId.toString();
    if(conditonString != ""){
      this.fieldService.getResult(conditonString).subscribe(responses => {
        if(responses.length > 0){
          let match = false; 
          for(let response of responses){
            if(response.conditions.length == conditionsId.length){
              match = true;
              this.response = response;
              this.showAlert();
            }
          }
          if(!match){
            this.failMessage();
          } 
        } else {
          this.failMessage();
        }
         
      });
    } else {
      this.failMessage();
    }
  }

  failMessage(): any{
    this.response = {
      name: 'No se encuentran resultados',
      razon: 'Complete todos los campos'
    }

    this.showAlert();
  }

  showAlert(): void{
    let alert = this.alertCtrl.create({
      title: this.response.name,
      subTitle: this.response.razon,
      buttons: ['OK']
    });
    alert.present();
  }

  downDate(field, dateVal): boolean{
    let today = new Date();
    today.setFullYear(today.getFullYear() - dateVal);
    let userDate = new Date(field.value);
    console.log(today);
    return (userDate > today);
  }

  upDate(field, dateVal): boolean{
    let today = new Date();
    today.setFullYear(today.getFullYear() - dateVal);
    let userDate = new Date(field.value);
    console.log(today);
    return (userDate < today);
  }

}
