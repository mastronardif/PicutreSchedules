import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryTag, TagElement } from '../../common/services/models/tag.model';
import { Store } from '../../common/store.service';
interface TagRow {
  tag: TagElement;

  bMarker: boolean;
}

const TAG_DATA: TagRow[] = [
  { tag: {name: 'Hydrogen'}, bMarker: false},
  { tag: {name: 'Helium'}, bMarker: false},
  { tag: {name: 'Hygiene'}, bMarker: false},
  { tag: {name: 'Safety'}, bMarker: false},
  { tag: {name: 'Bathroom'}, bMarker: false},
  { tag: {name: 'House Chores'}, bMarker: false},
  { tag: {name: 'Social'}, bMarker: false},
  { tag: {name: 'Other'}, bMarker: false},
  { tag: {name: 'Objects'}, bMarker: false},
  { tag: {name: 'Mine'}, bMarker: false},
  { tag: {name: 'Theres'}, bMarker: false},
  { tag: {name: 'Pics Of'}, bMarker: false},
  { tag: {name: 'Academic'}, bMarker: false},
];

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name']; //['position', 'name', 'weight', 'symbol'];
  dataSource = TAG_DATA;
  clickedRows = new Set<TagRow>();
  public whereClause: string;

  constructor(private store:Store, private router: Router) { }

  ngOnInit(): void {
  }

  searchBy() {
    console.log('searchBy');
    console.log(this.whereClause);
    console.log(this.clickedRows);
    let array = [...this.clickedRows];

    console.log(array);
    let list: TagElement[] = array.map(it => {
      //it.symbol
      return ({name: it.tag.name});
    })

    console.log( list.toString());
    const whereClause = this.whereClause || '';

    let queryNormalized = '"' + whereClause + '"' + ' Tags('+ list.toString() + ')';
    let query: QueryTag = {
      whereClause: whereClause, //queryNormalized,
      tags: array.map(it => {
        //it.symbol
        return ({name: it.tag.name});
      })
    };

    this.store.setQuery(query);
    this.router.navigate(['/listquills']);
  }

  clickedRows22(row: TagRow) {

    console.log('clickedRows22');
    console.log(row);
    console.log(this.clickedRows);


    if (this.clickedRows.has(row)) {
      row.bMarker = false;
      this.clickedRows.delete(row);
    }
    else {
      row.bMarker = true;
      this.clickedRows.add(row);
    }

    console.log(this.clickedRows);
  }

}
