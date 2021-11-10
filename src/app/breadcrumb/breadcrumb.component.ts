import {Component, Input, OnInit} from '@angular/core';

export interface BreadcrumbData {
  nom: string;
  route: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() paths: BreadcrumbData[];
  constructor() { }

  ngOnInit(): void {
  }

}
