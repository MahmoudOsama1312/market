import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private _httpClient: HttpClient) { }

  sendToBackend(model:any) {
    return this._httpClient.post( Constants.SEND_CART_TO_BACKEND_API_URL , model)
  }
}
