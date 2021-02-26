import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MessageService} from '../message/message.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';




@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {
  displayedColumns: string [] = [ 'nom' , 'nbTopic' , 'nbPost', 'dateLastPost' ];
  dataSource = [];

  constructor(private service: MessageService, private router: Router) { }

  ngOnInit(): void {

    this.service.sendMessage('getCours','').subscribe(value => {
      if (value.status === 'ok'){
        console.log(value.data);
        this.dataSource = value.data;

      }
    });
  }

}
