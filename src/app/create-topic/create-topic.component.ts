import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateTopicDialogComponent} from '../create-topic-dialog/create-topic-dialog.component';
import {BreadcrumbData} from '../breadcrumb/breadcrumb.component';
import {ActivatedRoute} from '@angular/router';


export interface DialogData {
  titre: string;
  idMatiere: string;
}

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  titre: string;
  @Input() idMatiere: string;
  @Output() newId = new EventEmitter();
  constructor(public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTopicDialogComponent, {

      width: '50%',
      data: {titre: this.titre, idMatiere: this.idMatiere},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result !== undefined){
        this.newId.emit(result);
      }
    });
  }
}
