import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../create-topic/create-topic.component';
import {MessageService} from '../message/message.service';

@Component({
  selector: 'app-create-topic-dialog',
  templateUrl: './create-topic-dialog.component.html',
  styleUrls: ['./create-topic-dialog.component.scss']
})
export class CreateTopicDialogComponent implements OnInit {
  errorMessage = '';
  @Input() idMatiere: string;
  constructor(public dialogRef: MatDialogRef<CreateTopicDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              @Inject(MessageService) private messageService: MessageService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  createTopic(): void {
    if (this.data.titre != null) {
      const formData = new FormData();
      formData.append('idMatiere', this.data.idMatiere);
      formData.append('titre', this.data.titre);

      this.messageService.sendMessage('saveNewTopic', formData).subscribe(value => {
        if (value.status === 'ok'){
          console.log(value.data);
          this.errorMessage = '';
          const newTopic = {
            idTopic : value.data,
            titre: this.data.titre,
            nbPost: 0,
            idMatiere: this.data.idMatiere,
            dateLastPost: value.data.dateLastPost
          };
          this.dialogRef.close(newTopic);
        }else if (value.status === 'error') {
          this.errorMessage = 'Titre sujet dejas prit';
          console.log("Titre sujet dejas prit");
        }
      });

  } else {
      this.errorMessage = "Champs vide";
    }
  }

  isHidden(): boolean {
    return this.errorMessage.length === 0;
  }

}
