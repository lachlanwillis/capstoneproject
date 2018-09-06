import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from '../messages/messages.service';
import { AuthService } from '../auth/auth.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { UserData } from '../message-hub/message';


@Component({
  selector: 'app-message-moderator',
  templateUrl: './message-moderator.component.html',
  styleUrls: ['./message-moderator.component.scss']
})
export class MessageModeratorComponent implements OnInit {
  displayedColumns = ['id', 'name', 'email', 'message'];
  elementData = [];
  dataSource = new MatTableDataSource<UserData>(this.elementData);

  selectedUser? : UserData;
  sentMessage? : string;

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('messageUser') modal: TemplateRef<any>;

  constructor(
    private readonly router: Router,
    private readonly snack: MatSnackBar,
    private readonly auth: AuthService,
    private readonly http: HttpClient,
    private readonly messages: MessagesService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchUsers();
  }

  fetchUsers() {
    this.auth.getUsers().subscribe((users: any[] ) =>
      this.dataSource = new MatTableDataSource<any>(users.map(i => { return { id: i._id, name: i.name, email: i.email }})));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  showMessagePopUp(user: UserData) {
    this.selectedUser = Object.assign({}, user);
    this.sentMessage = "";
    this.dialog.open(this.modal)
      .afterClosed()
      .subscribe(result => {
        if (result === true) {
          console.log("Message: " + this.sentMessage);
          this.messageUser(this.selectedUser, this.sentMessage);
        }
      });
  }

  messageUser(user : UserData, message : string) {
    this.messages.messageUser(user.id, message)
      .subscribe((value: any) => {
        this.snack.open('Message sent to user: ' + user.name, "Sweet!", { duration: 3000 });
        this.selectedUser = undefined;
      });
  }
}
