import { Component, OnInit } from '@angular/core';
import { QueryTag } from '../../common/services/models/tag.model';
import { Store } from '../../common/store.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;

  bMarker: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', bMarker: false},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', bMarker: false},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', bMarker: false},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', bMarker: false},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', bMarker: false},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', bMarker: false},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', bMarker: false},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', bMarker: false},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', bMarker: false},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', bMarker: false},
];

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  public whereClause: string;

  constructor(private store:Store) { }

  ngOnInit(): void {
  }

  searchBy() {
    console.log('searchBy');
    console.log(this.whereClause);
    console.log(this.clickedRows);
    let array = [...this.clickedRows];

    console.log(array);
    let list = array.map(it => {
      //it.symbol
      return (it.symbol);
    })

    console.log( list.toString());
    const whereClause = this.whereClause || '';

    let queryNormalized = '"' + whereClause + '"' + ' Tags('+ list.toString() + ')';
    let query: QueryTag = {
      whereClause: queryNormalized,
      //whereClause: queryNormalized,
      tags: array
    };
    //
    this.store.setQuery(query);
  }

  clickedRows22(row: PeriodicElement) {

    console.log('clickedRows22');
    console.log(row);
    console.log(this.clickedRows);


    if (this.clickedRows.has(row)) {
      //row.position -= 111;
      row.bMarker = false;
      this.clickedRows.delete(row);
    }
    else {
      row.bMarker = true;
      //row.position += 111;
      this.clickedRows.add(row);
    }

    console.log(this.clickedRows);
  }

}
