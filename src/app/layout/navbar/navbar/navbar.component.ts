import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { TypewriterService } from '../../../typewriter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private typewriterService = inject(TypewriterService);
  titles = ['Giuseppe Giancaspro Ihr Fliesenleger in Berlin und Brandenburg', 'Giuseppe Giancaspro Il tuo piastrellista a Berlino e Brandeburgo', 'Giuseppe Giancaspro your tiler in Berlin and Brandenburg'];
  typedText$: Observable<string>;

  cards = [
    { title: 'CARD_TITLES.FLIESEN' },
    { title: 'CARD_TITLES.BAD' },
    { title: 'CARD_TITLES.MALER' },
    { title: 'CARD_TITLES.BODEN' },
    { title: 'CARD_TITLES.HAUSMEISTER' }
  ];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('de');
    this.typedText$ = this.typewriterService
    .getTypewriterEffect(this.titles);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  logDropdownEvent() {
    console.log("Dropdown clicked");
  }
}
