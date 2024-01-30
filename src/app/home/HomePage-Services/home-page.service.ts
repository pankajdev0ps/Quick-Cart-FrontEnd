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
      '805c07a66137404e9a11df67bac3887e'
    );
  }

  //Getting the Products from backend API
  getProducts(): Observable<IProduct[]> {
    let tempVar = this.http.get<IProduct[]>(
      'https://qkapim34x.azure-api.net/product/api/home/getproducts',
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

    let tempVar = this.http.post<boolean>(
      'https://qkapim34x.azure-api.net/api/PaymentService',
      pay,
      { headers: this.headers }
    );
    return tempVar;
  }

  PostNewSubscriber(emailID: string): Observable<boolean> {
    console.log(emailID);

    let tempVar = this.http.get<boolean>(
      'https://quickcart-microservice.azurewebsites.net/api/SubscribeFunction?code=pIOIb80woJnaC8N77yQl1nSLxlDAvSa5mw9rli414zaoAzFuF3cBhA==&emailID=' +
        emailID
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
    const httpHeaders = new HttpHeaders().set(
      'Ocp-Apim-Subscription-Key',
      '805c07a66137404e9a11df67bac3887e'
    );
    let result = this.http.post<number>(
      'https://qkapim34x.azure-api.net/api/LoginFunction',
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
    let result = this.http
      .post<Response>(
        'https://qkapim34x.azure-api.net/product/api/admin/upload',
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
