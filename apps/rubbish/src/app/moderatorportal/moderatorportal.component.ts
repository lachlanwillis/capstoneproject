import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-moderatorportal',
  templateUrl: './moderatorportal.component.html',
  styleUrls: ['./moderatorportal.component.css']
})
export class ModeratorportalComponent implements OnInit {

  displayedColumns = ['title', 'url', 'delete'];
  elementData;
  dataSource = new MatTableDataSource<Element>(this.elementData);

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    var imageData;
    this.http.get('/api/display-image').subscribe(res => {
      imageData = res
      console.log(imageData);
    });
    
    for (let i of imageData) {
      this.dataSource.data.push({ title: i.fileName, url: i.location });
      
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  
  onDeleteClicked(row) {
    //Call delete backend using row.title
  }

}

export interface Element {
  title: string;
  url: string;
}

const ELEMENT_DATA: Element[] = [
  {title: 'Waterway-Wilston-Bottle', url: '/images/wilston-waterway-bottle.jpg'},
];
