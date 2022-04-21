import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  inputGroup: FormGroup = new FormGroup({
    powerConsumption: new FormControl("", Validators.required),
    hoursOfUse: new FormControl("", Validators.required),
    calculateBy: new FormControl("", Validators.required),
    kiloWattCost: new FormControl("", Validators.required),
    currency: new FormControl("", Validators.required)
  });

  costPerDay: number = 0;
  costPerMonth: number = 0;
  costperYear: number = 0;

  currency_symbol: string = "$";

  ngOnInit(): void {
  }

  reset() {
    this.inputGroup.reset();
  }

  calculateElectricity() {
    var watt = this.inputGroup.controls["powerConsumption"].value;
    var timeUsed = this.inputGroup.controls["hoursOfUse"].value;
    var cost = this.inputGroup.controls["kiloWattCost"].value;
    var currency = this.inputGroup.controls["currency"].value;
    if (this.inputGroup.controls["calculateBy"].value == "Kilowatts") {
      watt *= 1000;
    }
    if (currency == "PHP") {
      var e = watt * timeUsed / 1000;
      var totalCost = e * timeUsed * 2;
      this.costPerDay = totalCost;
      this.costPerMonth = totalCost * 30.4375;
      this.costperYear = (totalCost * 30.4375) * 12;
    } else {
      var e = watt * timeUsed / 1000;
      var totalCost = e * cost / 100;
      this.costPerDay = totalCost;
      this.costPerMonth = totalCost * 30.4375;
      this.costperYear = (totalCost * 30.4375) * 12;
    }
  }

  setCurrency(evt: any) {
    if (evt.target.value == "PHP") {
      this.currency_symbol = "₱";
    } else {
      this.currency_symbol = "$";
    }
  }

}
