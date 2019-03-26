import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asmb-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private httpService: HttpService<Trip[]>) {}

  ngOnInit() {}
}
