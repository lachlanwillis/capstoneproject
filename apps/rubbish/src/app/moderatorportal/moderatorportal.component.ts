import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../images/image.service';

@Component({
  selector: 'app-moderatorportal',
  templateUrl: './moderatorportal.component.html',
  styleUrls: ['./moderatorportal.component.css']
})
export class ModeratorportalComponent implements OnInit {

  displayedColumns = ['title', 'url', 'delete'];
  elementData = [];
  dataSource = new MatTableDataSource<Element>(this.elementData);

  flaggedColumns = ['title', 'url', 'delete', 'accept'];
  flaggedData = [];
  flaggedSource = new MatTableDataSource<Element>(this.flaggedData);

  userAccountColumns: string[] = ['userid', 'username', 'name', 'email', 'admin', 'resetpass', 'remove'];
  userAccountSource = new MatTableDataSource<UserAccountElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatoruser: MatPaginator;
  @ViewChild(MatPaginator) paginatorflagged: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('deleteImage') modal: TemplateRef<any>;

  constructor(
    private readonly image: ImageService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userAccountSource.paginator = this.paginator;
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.fetchImages();
    this.fetchFlaggedImages();
  }

  fetchImages() {
    this.image.getImages().subscribe((images: any[] ) =>
      this.dataSource = new MatTableDataSource<any>(images.map(i => { return { title: i.title, id: i._id, url: i.location }})));
  }

  fetchFlaggedImages() {
    this.image.getFlaggedImages().subscribe((images: any[]) =>
      this.flaggedSource = new MatTableDataSource<any>(images.map(i => { return { title: i.title, id: i._id, url: i.location } })));
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
      })
  }

  onFlaggedDeleteClicked(row) {
    this.image.deleteImage(row.id)
      .subscribe((value: any) => {
        if (value.success) {
          this.fetchFlaggedImages();
        }
      });
  }

  onFlaggedAcceptClicked(row) {
    this.image.acceptFlaggedImages(row.id)
      .subscribe((value: any) => {
        if (value.success) {
          this.fetchFlaggedImages();
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
