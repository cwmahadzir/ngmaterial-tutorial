import { DataSource } from '@angular/cdk/table';
import { Soil, SoilRestResult } from './soil';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SoilService } from './soil.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

export class SoilDataSource implements DataSource<Soil>{
    private soilSubject = new BehaviorSubject<Soil[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private soilService: SoilService) { }

    loadSoil(filter: string, sortColumn: string, sortDirection: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);
        this.soilService.findSoilDT(filter, sortColumn, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((data: SoilRestResult) => {
                this.soilSubject.next(data.results);
                this.countSubject.next(data.count);
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<Soil[]> {
        console.log("Connecting data source");
        return this.soilSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.soilSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }
}