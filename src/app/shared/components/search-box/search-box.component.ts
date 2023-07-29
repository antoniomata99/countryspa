import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string> //Tipo especial de Observable
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  // @Output()
  // public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300)
      )
    .subscribe(value => {
      this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  // emitValue(txtSearch:string):void{
  //   this.onValue.emit(txtSearch);
  // }

  onKeyPress(searchTerm: string){
    this.debouncer.next( searchTerm );
  }
}
