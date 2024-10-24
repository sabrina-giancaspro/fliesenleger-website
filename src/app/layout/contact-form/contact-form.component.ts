import { Component, ViewChild } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactUsComponent {

 constructor(private translate: TranslateService) {
  this.translate.setDefaultLang('de'); 
 }
  public successMessage: string = '';
  public errorMessage: string = '';
  public nameErrorMessage: string = ''; // Messaggio di errore del nome
  public emailErrorMessage: string = ''; // Messaggio di errore dell'email
  public privacyErrorMessage: string = ''; // Messaggio di errore della privacy

  public userName: string = '';
  public userEmail: string = '';
  public userMessage: string = '';
  public privacyChecked: boolean = false;

  // Funzione per inviare l'email
  public sendEmail(e: Event) {
    e.preventDefault();
    this.successMessage = ''; 
    this.errorMessage = ''; 
    this.nameErrorMessage = ''; // Resetta il messaggio di errore del nome
    this.emailErrorMessage = ''; // Resetta il messaggio di errore dell'email
    this.privacyErrorMessage = ''; // Resetta il messaggio di errore della privacy

    // Validazione dell'email
    if (!this.isValidEmail(this.userEmail)) {
      this.emailErrorMessage = this.translate.instant('ERRORS.INVALID_EMAIL'); // Traduci il messaggio di errore
      return; // Ferma l'esecuzione se l'email non è valida
    }

    // Validazione della privacy
    if (!this.privacyChecked) {
      this.privacyErrorMessage = this.translate.instant('ERRORS.PRIVACY_REQUIRED'); // Traduci il messaggio di errore
      return; // Ferma l'esecuzione se la privacy non è accettata
    }

    // Invia l'email se tutte le validazioni sono superate
    emailjs
    .sendForm('service_t6f9ygl', 'template_4t588r9', e.target as HTMLFormElement, {
      publicKey: 'ETQGHKXGPx9JlVTxD',
    })
    .then(
      () => {
        this.successMessage = this.translate.instant('SUCCESS.MESSAGE_SENT'); // Traduci il messaggio di successo
        this.resetForm(); 
      },
      (error) => {
        this.errorMessage = this.translate.instant('ERRORS.SENDING_ERROR', { error: (error as EmailJSResponseStatus).text }); // Traduci l'errore di invio
      },
    );
}

  // Funzione per validare l'email
  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Funzione per resettare il modulo
  private resetForm() {
    this.userName = '';
    this.userEmail = '';
    this.userMessage = '';
    this.privacyChecked = false;
  }

  public validateEmail() {
    if (!this.isValidEmail(this.userEmail)) {
      this.emailErrorMessage = this.translate.instant('ERRORS.INVALID_EMAIL'); // Traduci il messaggio di errore
    } else {
      this.emailErrorMessage = '';
    }
  }

  // Funzione per gestire il cambiamento della privacy
  public validatePrivacy() {
    this.privacyErrorMessage = this.privacyChecked ? '' : this.translate.instant('ERRORS.PRIVACY_REQUIRED'); // Traduci il messaggio di errore
  }
}
