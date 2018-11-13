import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { ViewTaxisDataSource, ViewTaxisItem } from './view-taxis-datasource';

@Component({
  selector: 'app-view-taxis',
  templateUrl: './view-taxis.component.html',
  styleUrls: ['./view-taxis.component.css']
})
export class ViewTaxisComponent implements OnInit {
  private dataSource: ViewTaxisDataSource;
  filteredData: ViewTaxisItem[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['code', 'name', 'age', 'make', 'description', 'rating'];

  private _filterTaxis: string;
  public get filterTaxis(): string {
    return this._filterTaxis;
  }
  public set filterTaxis(value: string) {
    this._filterTaxis = value;
    this.filteredData = this.filterTaxis
      ? this.performFilter(this.filterTaxis)
      : this.dataSource.data;
  }

  performFilter(filterBy: string): ViewTaxisItem[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.dataSource.data.filter(
      (taxi: ViewTaxisItem) =>
        taxi.driverName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnInit() {
    this.dataSource = new ViewTaxisDataSource(this.paginator, this.sort);
  }
}
