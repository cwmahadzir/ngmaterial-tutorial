import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SoilDataSource } from './soil-datasource';
import { ActivatedRoute } from '@angular/router';
import { SoilService } from './soil.service';
import { Soil } from './soil';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BorangComponent } from '../borang/borang.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-jadual',
  templateUrl: './jadual.component.html',
  styleUrls: ['./jadual.component.css']
})
export class JadualComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Soil>;
  @ViewChild('input') input: ElementRef;
  dataSource: SoilDataSource;
  soil: Soil;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'description', 'symbol', 'category', 'action'];

  constructor(private route: ActivatedRoute, private soilService: SoilService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.dataSource = new SoilDataSource(this.soilService);
    //this.soil = this.route.snapshot.data['soil'];
    this.dataSource.loadSoil('', 'id', 'asc', 0, 10);
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadSoilPage();
        })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadSoilPage())
      )
      .subscribe();


    // this.dataSource.sort = this.sort;
    //  this.dataSource.paginator = this.paginator;
    //  this.table.dataSource = this.dataSource;
  }

  loadSoilPage() {
    this.dataSource.loadSoil(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }


  editSoil(soil?: Soil) {
    const dialogRef = this.dialog.open(BorangComponent, {
      // width: '250px',
      data: soil != null ? soil : { id: null, description: '', symbol: '', category: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.soilService.save(result)
        .subscribe((data: Soil) => {
          console.log(data);
          this.loadSoilPage();
        });
    });
  }

  deleteSoil(id: number, msg: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      // width: '250px',
      data: { id: id, message: msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.soilService.delete(id).subscribe(
          () => {
            this.loadSoilPage();
          }
        );
    });
  }
}
