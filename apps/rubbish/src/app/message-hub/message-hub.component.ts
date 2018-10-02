import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { MessagesService } from '../messages/messages.service';
import { MessageElement } from './message';

@Component({
  selector: 'app-message-hub',
  templateUrl: './message-hub.component.html',
  styleUrls: ['./message-hub.component.scss']
})
export class MessageHubComponent implements OnInit {

  displayedColumns: string[] = ['message', 'datestamp', 'clear'];

  elementData = [];
  dataSource = new MatTableDataSource<MessageElement>(this.elementData);

  @Input() mine: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  messages: MessageElement[] = [];

  constructor(
    private readonly message: MessagesService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.fetchMyMessages();
  }

  fetchMyMessages() {
    this.message.getMyMessages().subscribe((messages: any[] ) =>
      this.dataSource = new MatTableDataSource<any>(messages.map(i => { return { id: i._id, message: i.message, datestamp: i.datestamp }})));
  }

  onClearClicked(row) {
    this.message.clearMessage(row.id)
      .subscribe((value: any) => {
        if (value.success) {
          this.fetchMyMessages();
        }
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}