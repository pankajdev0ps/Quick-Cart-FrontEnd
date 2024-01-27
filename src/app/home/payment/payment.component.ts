import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../Home-Interfaces/IProduct';
import { timer } from 'rxjs';
import { HomePageService } from '../HomePage-Services/home-page.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  timeLeft: number = 60;
  productName?: string;
  productCost: number = 0;
  interval: any;
  id: number = 0;
  price: number = 0;
  name: string = '';
  email: string = '';
  private readonly notifier: NotifierService;

  backgroundImg: string = 'assets/backgroundImage.jpg';
  product: IProduct | undefined;

  constructor(
    private active_route: ActivatedRoute,
    private router: Router,
    private service: HomePageService,
    notifierService: NotifierService
  ) {
    this.id = active_route.snapshot.params['id'];
    this.price = active_route.snapshot.params['price'];
    this.name = active_route.snapshot.params['name'];
    this.email = this.GetLoggedInUser() ?? '';
    this.notifier = notifierService;

    console.log(this.name);
    console.log(this.id);
    console.log(this.price);
    console.log(this.GetLoggedInUser());
  }

  GetLoggedInUser() {
    if (sessionStorage.getItem('userEmailID') != null)
      return sessionStorage.getItem('userEmailID');
    else 
      return null;
  }

  ngOnInit(): void {
    this.startTimer();
  }

  Buy(f: NgForm) {
    if (this.GetLoggedInUser() != null) {
      console.log(
        f.value.cardNumber,
        f.value.cvv,
        f.value.expiry,
        this.id,
        this.price,
        this.GetLoggedInUser()
      );
      this.service
        .MakePayment(
          f.value.cardNumber,
          f.value.cvv,
          f.value.expiry,
          this.id,
          this.price,
          this.email
        )
        .subscribe(
          (res) => {
            console.log(res);
            if (res == true) {
              this.showNotification('success', 'Payment Success!');
            } else this.showNotification('error', 'Payment Failed');
          },
          (err) => {
            console.log('error occured', err);
          }
        );
    } else {
      this.showNotification('error', 'User not LoggedIn');
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
