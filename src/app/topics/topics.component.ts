import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MessageService} from '../message/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbData} from '../breadcrumb/breadcrumb.component';

export interface Topics {
  idTopic: number;
  titre: string;
  idMatiere: number;
  nbPost: number;
  dateLastPost: Date;
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  shownColumns: string [] = [ 'titre' , 'nbPost' , 'dateLastPost' ];
  listTopic: Topics[] = [];
  topicsData = new MatTableDataSource<Topics>(this.listTopic);
  breadcrumb: BreadcrumbData[];
  idMatiere: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: MessageService, private route: ActivatedRoute, private  router: Router) { }

  ngOnInit(): void {
    const formData = new FormData();
    this.breadcrumb = [
      { nom: 'Tous les cours', route: '/cours' },
      { nom: 'Un cours', route: '' }
    ];
    this.idMatiere = this.route.snapshot.paramMap.get('idMatiere');
    formData.append('idMatiere', this.route.snapshot.paramMap.get('idMatiere'));
    this.service.sendMessage('getTopics', formData).subscribe(value => {
      if (value.status === 'ok'){
        console.log(value.data);
        this.listTopic = value.data;
        this.topicsData.data = this.listTopic;
        this.topicsData.sort = this.sort;
        this.topicsData.paginator = this.paginator;
      }
    });
  }

  onCreateTopic(value: Topics): void {
    this.listTopic.push(value);
    this.topicsData.data = this.listTopic;
  }

}
