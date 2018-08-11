import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private image: ImageService, private flaggedImage: ImageService) { }

  ngOnInit() {
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
    this.flaggedImage.getFlaggedImages().subscribe((images: any[]) =>
      this.flaggedSource = new MatTableDataSource<any>(images.map(i => { return { title: i.title, id: i._id, url: i.location } })));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onDeleteClicked(row) {
    this.image.deleteImage(row.id)
      .subscribe((value: any) => {
        if (value.success) {
          this.fetchImages();
        }
      });
  }

  onFlaggedDeleteClicked(row) {
    this.flaggedImage.deleteImage(row.id)
      .subscribe((value: any) => {
        if (value.success) {
          this.fetchFlaggedImages();
        }
      });
  }

  onFlaggedAcceptClciked(row) {
    
  }


}

export interface Element {
  title: string;
  url: string;
}
