import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ImageService } from '../images/image.service';
import { AdminService } from './admin.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-moderatorportal',
  templateUrl: './moderatorportal.component.html',
  styleUrls: ['./moderatorportal.component.css'],
  providers: [ AdminService ]
})
export class ModeratorportalComponent implements OnInit, AfterViewInit {

  displayedColumns = ['title', 'url', 'delete'];
  elementData = [];
  dataSource = new MatTableDataSource<Element>(this.elementData);

  flaggedData = new BehaviorSubject([]);

  userAccountColumns: string[] = ['userid', 'name', 'email', 'admin', 'remove'];
  userAccountSource = new MatTableDataSource<UserAccountElement>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatoruser: MatPaginator;
  @ViewChild(MatPaginator) paginatorflagged: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('deleteImage') modal: TemplateRef<any>;
  @ViewChild('deleteUser') deleteUserModal: TemplateRef<any>;

  constructor(
    private readonly image: ImageService,
    private readonly dialog: MatDialog,
    private readonly admin: AdminService,
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.userAccountSource.paginator = this.paginator;

    this.admin.getUsers().subscribe(user => console.log(user));

  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.fetchImages();
    this.fetchUsers();
    this.fetchFlaggedImages();
  }

  fetchImages() {
    this.image.getImages().subscribe((images: any[] ) =>
      this.dataSource = new MatTableDataSource<any>(images.map(i => { return { title: i.title, id: i._id, url: i.location }})));
  }

  fetchUsers(): void {
    this.admin.getUsers()
      .subscribe(users => (this.userAccountSource = new MatTableDataSource(users.map(user => ({ userid: user._id, ...user })))));
  }

  fetchFlaggedImages() {

    console.log('fetching')

    this.image.getFlaggedImages().subscribe((a) => {
      this.flaggedData.next(a);
      this.cd.detectChanges();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onDeleteClicked(row) {
    this.dialog.open(this.modal)
      .afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.image.deleteImage(row.id)
            .subscribe((value: any) => {
              if (value.success) {
                this.fetchImages();
              }
            });
        }
      });
  }

  onDeleteUserClicked(id: string): void {
    this.dialog.open(this.deleteUserModal)
      .afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.admin.deleteUser(id)
            .subscribe(() => this.fetchUsers());
        }
      });
  }

}

export interface Element {
  title: string;
  url: string;
}

export interface UserAccountElement {
  userid: number;
  username: string;
  name: string;
  email: string;
  admin: boolean;
}

const ELEMENT_DATA: UserAccountElement[] = [
  {userid: 1, username: 'jringo', name: 'Johnny Ringo', email: 'johnnyringo@gmail.com', admin: false},
  {userid: 1, username: 'bshepp', name: 'Ben Sheppard', email: 'bensheppard@gmail.com', admin: false},
  {userid: 1, username: 'jmoss', name: 'Jen Moss', email: 'jenmoss@gmail.com', admin: false},
];
