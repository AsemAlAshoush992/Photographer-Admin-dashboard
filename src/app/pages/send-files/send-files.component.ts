import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/backend/main-services.service';
import { SendFileForClientDTO } from 'src/app/DTOs/Gallery/sendFileForClientDTO';

@Component({
  selector: 'app-send-files',
  templateUrl: './send-files.component.html',
  styleUrls: ['./send-files.component.css']
})
export class SendFilesComponent {
  constructor(public dialogRef: MatDialogRef<SendFilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SendFileForClientDTO, public backend: MainServicesService,
    private notification: ToastrService, public load: NgxSpinnerService) { }


  fileExists: boolean = false;
  fileTouched: boolean = false;


  sendFile: SendFileForClientDTO = new SendFileForClientDTO
  file: File | undefined;
  onFileSelected(event: any) {
    this.fileTouched = true;
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      this.fileExists = true;
    } else {
      this.fileExists = false;
    }
  }

  SendFile() {
    if (this.file == undefined || this.sendFile.orderID == 0) {
      return;
    } else {
      this.load.show()
      this.backend.uploadFile(this.file).subscribe(res => {
        this.sendFile.path = res;
        this.backend.SendFilesForClient(this.sendFile).subscribe(res => {
          this.load.hide()
          this.notification.success('The file has been sent')
          this.dialogRef.close(true)
        }, error => {
          this.load.hide()
          this.notification.warning(' file sent faild')
          this.dialogRef.close(false)
        })
      }, error => {
        return;
      });
    }

  }
}
