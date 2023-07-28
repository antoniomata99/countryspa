import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit{

  private debouncer: Subject<string> = new Subject<string> //Tipo especial de Observable

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit( value );
    });
  }

  emitValue(txtSearch:string):void{
    this.onValue.emit(txtSearch);
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next( searchTerm );
  }
}
