import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PriceList } from '../models/price-list';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceListComponent implements OnInit {

  @Input() priceList: PriceList[];
  public errorMessage: string = '';
  public item: Observable<PriceList[]>;  
  public displayedColumns: string[] = ['priceListName', 'extErpPriceListID'];
  public dataSource: PriceList[];

  constructor(private ref: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    if (this.priceList.length === 0) { 
      this.errorMessage = 'No Results Found';
    }
  }
  
  editItem(item) {
    this.ref.markForCheck();
     this.priceList.map((newitem:PriceList) =>{
      if (item.priceListID === newitem.priceListID) {
          newitem.priceListName = item.priceListName;
          newitem.extErpPriceListID = item.extErpPriceListID;
        }
      })
  }

  selectItem(item) {
    console.log(item);
    this.item = item;
  }
}
