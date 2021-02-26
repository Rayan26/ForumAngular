import { Component, OnInit } from '@angular/core';

export interface Posts {
  idTopics: number;
  titre: string;
  idMatiere: number;
  nbPost: number;
  dateLastPost: Date;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
