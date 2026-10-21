import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseWord} from "../model/responseWord.model";
import {GuessWord} from "../model/guessWord.model";

const API_URL = "https://cemantix-function.rayanmlk.deno.net";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private httpClient = inject(HttpClient);

  public getSimilarity(guess: GuessWord): Observable<ResponseWord>{
    return this.httpClient.get<ResponseWord>(API_URL, {
      params: {word: guess.value}
    })
  }
}
