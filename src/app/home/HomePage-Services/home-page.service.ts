import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from '../Home-Interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {


  products: IProduct[]=[];
  constructor(private http: HttpClient) 
  {
   
  }

  //Getting the Products from backend API
  getProducts():Observable<IProduct[]>{
    let tempVar = this.http.get<IProduct[]>('https://localhost:5001/api/home/getproducts')
    console.log(tempVar)
    return tempVar
  }

  MakePayment(CardNumber1:string,cvv1:string,ex:string,pid:number,cost:number):Observable<boolean>{

    var pay:Payment
    pay={cardNumber:CardNumber1,CVV:cvv1,Expiry:ex,ProdCost:cost,ProdID:pid}
    console.log(pay)

    let tempVar = this.http.post<boolean>('http://localhost:7181/api/PaymentFunction',pay)
    return tempVar
  }

  PostNewSubscriber(emailID:string):Observable<boolean>{
  
    console.log(emailID)

    let tempVar = this.http.get<boolean>('https://quickcart-microservice.azurewebsites.net/api/SubscribeFunction?code=pIOIb80woJnaC8N77yQl1nSLxlDAvSa5mw9rli414zaoAzFuF3cBhA==&emailID='+emailID)
    console.log(tempVar)
    return tempVar
  }

  
  ValidateUser(userEmailID:string, userPassword:string, type:string):Observable<number>
  {
    var user:User
    user={emailID:userEmailID, password:userPassword,usertype:type};
    console.log(user)

    let result=this.http.post<number>('http://localhost:7071/api/LoginFunction',user)
    console.log(result)
    return result

  }

  public uploadImage(file: File, product: any): Observable<Response>{
    const formData = new FormData();
   
    formData.append('image', file)
    formData.append('productName', product.Name)
    formData.append('productPrice', product.Price)
    formData.append('productQuantity', product.Quantity)
    console.log(formData)
    let result=this.http.post<Response>('https://localhost:5001/api/admin/upload',formData).pipe(catchError(this.errorHandler))
    console.log(result)
    return result
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message|| "server error")
  }
}

export class User{

  emailID:string='';
  password:string='';
  usertype:string='';


}

export class Payment{

  cardNumber:string='';
  CVV:string='';
  Expiry:string='';
  ProdCost:number=0;
  ProdID:number=0;

}
