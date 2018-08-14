import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

@Component({
  selector: 'app-message-hub',
  templateUrl: './message-hub.component.html',
  styleUrls: ['./message-hub.component.scss']
})
export class MessageHubComponent implements OnInit {

  displayedColumns: string[] = ['message', 'datestamp', 'clear'];
  dataSource = new MatTableDataSource<MessageElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface MessageElement {
  id: number;
  message: string;
  datestamp: string;
}

const ELEMENT_DATA: MessageElement[] = [
  {id: 1, message: 'You have successfully uploaded a rubbish image.', datestamp: "12:32:02 12-05-2018"},
  {id: 2, message: 'Your image titled "test-image" was flagged as the CNN found no trace or rubbish.', datestamp: "12:32:02 12-05-2018"},
  {id: 3, message: 'Your image titled "test-image" was liked by "johnny boi".', datestamp: "12:32:02 12-05-2018"},
];