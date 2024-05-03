import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from '../Home-Interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  products: IProduct[] = [];
  headers: any;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set(
      'Ocp-Apim-Subscription-Key',
      '####'
    );
  }

  //Getting the Products from backend API
  getProducts(): Observable<IProduct[]> {
    let url = 'https://qkbackend.azurewebsites.net'
    let tempVar = this.http.get<IProduct[]>(
      url + '/api/home/getproducts',
      { headers: this.headers }
    );
    console.log(tempVar);
    return tempVar;
  }

  MakePayment(
    CardNumber1: string,
    cvv1: string,
    ex: string,
    pid: number,
    cost: number,
    custEmail: string
  ): Observable<boolean> {
    var pay: Payment;
    pay = {
      cardNumber: CardNumber1,
      CVV: cvv1,
      Expiry: ex,
      ProdCost: cost,
      ProdID: pid,
      CustEmail: custEmail,
    };
    console.log(pay);
    let url = 'https://localhost:7072'
    let tempVar = this.http.post<boolean>(
      url + '/api/PaymentService',
      pay,
      { headers: this.headers }
    );
    return tempVar;
  }

  PostNewSubscriber(emailID: string): Observable<boolean> {
    console.log(emailID);
    let url = 'https://localhost:5001'
    let tempVar = this.http.get<boolean>(
      url + '/api/SubscribeFunction'
    );
    console.log(tempVar);
    return tempVar;
  }

  ValidateUser(
    userEmailID: string,
    userPassword: string,
    type: string
  ): Observable<number> {
    var user: User;
    user = { emailID: userEmailID, password: userPassword, usertype: type };
    console.log(user);
    let url = 'https://localhost:7071'
    let result = this.http.post<number>(
      url + '/api/LoginFunction',
      user,
      { headers: this.headers }
    );
    console.log(result);
    return result;
  }

  public uploadImage(file: File, product: any): Observable<Response> {
    const formData = new FormData();

    formData.append('image', file);
    formData.append('productName', product.Name);
    formData.append('productPrice', product.Price);
    formData.append('productQuantity', product.Quantity);
    console.log(formData);
    let url = 'https://localhost:5001'
    let result = this.http
      .post<Response>(
        url += '/api/admin/upload',
        formData,
        { headers: this.headers }
      )
      .pipe(catchError(this.errorHandler));
    console.log(result);
    return result;
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || 'server error');
  }
}

export class User {
  emailID: string = '';
  password: string = '';
  usertype: string = '';
}

export class Payment {
  cardNumber: string = '';
  CVV: string = '';
  Expiry: string = '';
  ProdCost: number = 0;
  ProdID: number = 0;
  CustEmail: string = '';
}
