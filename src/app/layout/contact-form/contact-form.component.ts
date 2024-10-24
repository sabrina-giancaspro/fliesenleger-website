import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactUsComponent implements AfterViewInit {
  public successMessage: string = '';
  public errorMessage: string = '';
  public nameErrorMessage: string = '';
  public emailErrorMessage: string = '';
  public privacyErrorMessage: string = '';
  public userName: string = '';
  public userEmail: string = '';
  public userMessage: string = '';
  public privacyChecked: boolean = false;
  public privacyOpened: boolean = false;


  @ViewChild('privacyPolicyModal') privacyPolicyModal!: ElementRef;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('de');
  }


  ngAfterViewInit() {
    const privacyModalElement = document.getElementById('privacyPolicyModal');
    const privacyCheckbox = document.getElementById('privacy-checkbox') as HTMLInputElement;

    if (privacyModalElement) {
      // Event listener per quando il modal viene aperto
      privacyModalElement.addEventListener('shown.bs.modal', () => {
        this.privacyOpened = true; // Traccia che il modal è stato aperto
      });

      // Event listener per quando il modal viene chiuso
      privacyModalElement.addEventListener('hidden.bs.modal', () => {
        if (this.privacyOpened) {
          // Abilita la checkbox e selezionala automaticamente
          privacyCheckbox.disabled = false;
          privacyCheckbox.checked = true;
          this.privacyChecked = true;
        }
      });
    }
  }
  // Funzione per inviare l'email
  public sendEmail(e: Event) {
    e.preventDefault();
    this.successMessage = '';
    this.errorMessage = '';
    this.nameErrorMessage = '';
    this.emailErrorMessage = '';
    this.privacyErrorMessage = '';

    if (!this.isValidEmail(this.userEmail)) {
      this.emailErrorMessage = this.translate.instant('ERRORS.INVALID_EMAIL');
      return;
    }

    if (!this.privacyChecked) {
      this.privacyErrorMessage = this.translate.instant('ERRORS.PRIVACY_REQUIRED');
      return;
    }

    // Controlla se il campo del messaggio è vuoto
    if (!this.userMessage.trim()) {
      this.errorMessage = this.translate.instant('ERRORS.EMPTY_MESSAGE');
      return; // Termina qui se il messaggio è vuoto
    }

    emailjs.sendForm('service_t6f9ygl', 'template_4t588r9', e.target as HTMLFormElement, {
      publicKey: 'ETQGHKXGPx9JlVTxD',
    })
      .then(
        () => {
          this.successMessage = this.translate.instant('SUCCESS.MESSAGE_SENT');
          this.resetForm();

          // Nascondi il messaggio di successo dopo 5 secondi
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        (error) => {
          this.errorMessage = this.translate.instant('ERRORS.SENDING_ERROR', { error: (error as EmailJSResponseStatus).text });
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

  public validatePrivacy() {
    this.privacyErrorMessage = this.privacyChecked ? '' : this.translate.instant('ERRORS.PRIVACY_REQUIRED');
  }
}