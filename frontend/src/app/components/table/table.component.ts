import { Component, Input, OnInit } from '@angular/core';
import { ICsvHistory } from '../../../interfaces/table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() csvHistory: ICsvHistory[] = [];
  constructor() {}

  ngOnInit() {}

  download(csv: string) {
    let csvContent = 'data:text/csv;charset=utf-8,' + csv;
    const encodedUri = encodeURI(csvContent!);
    window.open(encodedUri);
  }
}
