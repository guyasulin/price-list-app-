import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsEditComponent } from './details-edit/details-edit.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceListService } from './services/price-list.service';
import { PriceListComponent } from './price-list/price-list.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { PriceListEffects } from './store/price-list.effects';
import { AppReducer } from './index.reducer';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SearchPageComponent } from './search-page/search-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import { InputValidatorDirective } from './directive/input-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    PriceListComponent,
    DetailsEditComponent,
    SearchPageComponent,
    InputValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,MatTableModule,
    MatInputModule,MatFormFieldModule,
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([PriceListEffects]),
  ],
  providers: [PriceListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
