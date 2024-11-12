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
  public emailErrorMessage: string = '';
  public privacyErrorMessage: string = '';
  public userName: string = '';
  public userEmail: string = '';
  public userMessage: string = '';
  public privacyChecked: boolean = false;

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
        // Modifica lo stato della checkbox quando il modal è aperto
        privacyCheckbox.disabled = false;
        privacyCheckbox.checked = true;
        this.privacyChecked = true;
      });

   
    }
  }

  // Funzione per inviare l'email
  public sendEmail(e: Event) {
    e.preventDefault();
    this.successMessage = '';
    this.errorMessage = '';
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

    // Verifica se il messaggio è vuoto
    if (!this.userMessage.trim()) {
      this.errorMessage = this.translate.instant('ERRORS.EMPTY_MESSAGE');
      return;
    }

    // Invia l'email utilizzando EmailJS
    emailjs.sendForm('service_1wp7g0m', 'template_z7n615r', e.target as HTMLFormElement, {
      publicKey: '1TRsI3cA8eyQap1u7',
    })
      .then(
        () => {
          this.successMessage = this.translate.instant('CONTACT.SUCCESS_MESSAGE');
          this.resetForm();
          
          // Nascondi il messaggio di successo dopo 5 secondi
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        (error) => {
          this.errorMessage = this.translate.instant('ERRORS.SENDING_ERROR', { error: (error as EmailJSResponseStatus).text });
        }
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

  }

  // Funzione di validazione per l'email
  public validateEmail() {
    if (!this.isValidEmail(this.userEmail)) {
      this.emailErrorMessage = this.translate.instant('ERRORS.INVALID_EMAIL');
    } else {
      this.emailErrorMessage = '';
    }
  }
}
