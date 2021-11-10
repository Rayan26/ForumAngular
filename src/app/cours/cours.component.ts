import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../message/message.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface Cours {
  idMatiere: number;
  nom: string;
  nbTopic: number;
  nbPost: number;
  dateLastPost: Date;
}


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {
  shownColumns: string [] = [ 'nom' , 'nbTopic' , 'nbPost', 'dateLastPost' ];
  coursData = new MatTableDataSource<Cours>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: MessageService, private router: Router) {}

  ngOnInit(): void {

    this.service.sendMessage('getCours2','').subscribe(value => {
      if (value.status === 'ok'){
        console.log(value.data);
        this.coursData.data = value.data;
        this.coursData.sort = this.sort;
        this.coursData.paginator = this.paginator;
      }
    });
  }

}
