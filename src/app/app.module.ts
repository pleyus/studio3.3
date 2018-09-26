import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CompactComponent } from './compact/compact.component';
import { PlayerComponent } from './player/player.component';
import { CommentsComponent } from './comments/comments.component';
import { GuideComponent } from './guide/guide.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    CompactComponent,
    PlayerComponent,
	CommentsComponent,
	GuideComponent,
	FooterComponent,
	AlertComponent
  ],
  imports: [
	BrowserModule,
	HttpModule,
	HttpClientModule, 
	FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
