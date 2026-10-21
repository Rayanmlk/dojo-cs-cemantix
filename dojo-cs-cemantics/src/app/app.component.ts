import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {ApiClientService} from "./service/api-client.service";
import {HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {ProgressBarModule} from "primeng/progressbar";
import {catchError, EMPTY} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, InputTextModule, Button, ProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ApiClientService]
})
export class AppComponent {
  private apiClient = inject(ApiClientService);

  myGuess: string = "";
  hasError = false;
  myResultDistance = 0

  sendMyGuess() {
    this.apiClient.getSimilarity({
      value: this.myGuess
    }).pipe(
      catchError(err => {
        this.myResultDistance = 0
        this.hasError = true;
        return EMPTY
      })
    ).subscribe(result=> {
      this.hasError = false;
      // similarity goes from -1 to 1, the progress bar from 0 to 100
      this.myResultDistance = Math.max(0, Math.round(result.result * 100))
    });
  }
}
