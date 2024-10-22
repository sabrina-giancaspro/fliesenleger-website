import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


import { AppComponent } from './app.component';
import { FliesenComponent } from './layout/fliesen/fliesen/fliesen.component';
import { BadComponent } from './layout/bad/bad/bad.component';
import { MalerComponent } from './layout/maler/maler/maler.component';
import { BodenComponent } from './layout/boden/boden/boden.component';
import { FotoGalleryComponent } from './layout/foto-gallery/foto-gallery/foto-gallery.component';
import { FooterComponent } from './layout/footer/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FliesenComponent,
    BadComponent,
    MalerComponent,
    BodenComponent,
    FotoGalleryComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}
