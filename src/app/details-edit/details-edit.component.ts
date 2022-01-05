import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../index.reducer';
import { PriceList } from '../models/price-list';
import * as fromACtionPricelist from '../store/price-list.actions';

@Component({
  selector: 'app-details-edit',
  templateUrl: './details-edit.component.html',
  styleUrls: ['./details-edit.component.scss'],
})
export class DetailsEditComponent implements OnInit, OnDestroy {

  @Input() item: PriceList;
  @Output() edit = new EventEmitter<any>();
  public form: FormGroup;
  public errorMessage: string = '';
  public sub: Subscription;
  public globalItemCheckValue: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  editForm(form: NgForm) {
    const newObj = {
      priceListID: this.item.priceListID,
      priceListName: form.value.priceListName,
      extErpPriceListID: form.value.extErpPriceListID
    }

    this.item = newObj
    console.log(this.item, newObj);
    this.edit.emit(this.item)
    this.store.dispatch((fromACtionPricelist.updatePricelistSuccess({ item: this.item })));
  }

  checkValue(val) {
    this.sub = this.store.select(store => store.pricelist.priceLists)
      .subscribe(items => {
        items.map(itemPricelist => {
          this.globalItemCheckValue = itemPricelist;
          if (val.value.extErpPriceListID === this.globalItemCheckValue.priceListID) {
            this.errorMessage = 'extErpPriceListID cannot be the same as the PriceListID that exists in the PriceList list.';
            val.valid = true;
          }
        })
      })
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
