import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO: Replace this with your own data model type
export interface ViewTaxisItem {
  driverCode: string;
  driverName: string;
  driverAge: number;
  driverRating: number;
  carMake: string;
  carDescription: string;
  carImageUrl: string;
  bookedDate: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ViewTaxisItem[] = [
  {
    driverCode: 'DRV-001',
    driverName: 'Santhosh John',
    driverAge: 29,
    driverRating: 4.2,
    carMake: 'Audi',
    carDescription: 'Make yourself feel relaxed in the superior Audi.',
    carImageUrl: './assets/images/pic-1-audi.jpg',
    bookedDate: '11-08-2018'
  },
  {
    driverCode: 'DRV-002',
    driverName: 'Paul Petersen',
    driverAge: 32,
    driverRating: 3.8,
    carMake: 'Mercedes',
    carDescription: 'Make yourself feel relaxed in the superior Mercedes.',
    carImageUrl: './assets/images/pic-2-mercedes.jpg',
    bookedDate: '01-07-2018'
  },
  {
    driverCode: 'DRV-003',
    driverName: 'David Marker',
    driverAge: 40,
    driverRating: 2.6,
    carMake: 'Audi',
    carDescription: 'Make yourself feel relaxed in the superior Audi.',
    carImageUrl: './assets/images/pic-3-audi.jpg',
    bookedDate: '01-06-2017'
  },
  {
    driverCode: 'DRV-004',
    driverName: 'Sunil Kumar',
    driverAge: 23,
    driverRating: 4.9,
    carMake: 'Toyota',
    carDescription: 'Make yourself feel relaxed in the superior Toyota.',
    carImageUrl: './assets/images/pic-4-toyota.jpg',
    bookedDate: '23-11-2013'
  },
  {
    driverCode: 'DRV-005',
    driverName: 'Santhosh Khanna',
    driverAge: 35,
    driverRating: 4.1,
    carMake: 'Mercedes',
    carDescription: 'Make yourself feel relaxed in the superior Mercedes.',
    carImageUrl: './assets/images/pic-5-mercedes.jpg',
    bookedDate: '12-12-2017'
  },
  {
    driverCode: 'DRV-006',
    driverName: 'Mike Taylor',
    driverAge: 48,
    driverRating: 4.6,
    carMake: 'Chevrolet',
    carDescription: 'Make yourself feel relaxed in the superior Chevrolet.',
    carImageUrl: './assets/images/pic-6-chevrolet.jpg',
    bookedDate: '31-07-2015'
  }
];

/**
 * Data source for the ViewTaxis view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ViewTaxisDataSource extends DataSource<ViewTaxisItem> {
  data: ViewTaxisItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ViewTaxisItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ViewTaxisItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ViewTaxisItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.driverName, b.driverName, isAsc);
        case 'code':
          return compare(+a.driverCode, +b.driverCode, isAsc);
        case 'age':
          return compare(+a.driverAge, +b.driverAge, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
