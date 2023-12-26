import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
}

  @Input()  title: string = '';
  @Input()  data: any[] = [];             // this data is filled from parent in all-Products HTML
  @Output() selectedEventValue = new EventEmitter();   // sending event to the parent

  detectChanges(event: any) {
    this.selectedEventValue.emit(event)       // i send the event that comes from the change
  }

}
