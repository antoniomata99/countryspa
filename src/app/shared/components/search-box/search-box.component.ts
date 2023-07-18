import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @Output() onValue = new EventEmitter<string>();

  emitValue(txtSearch:string):void{
    this.onValue.emit(txtSearch);
  }
}