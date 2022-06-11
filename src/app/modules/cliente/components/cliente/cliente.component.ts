import { MiaFormComponent, MiaFormModalComponent, MiaFormModalConfig } from '@agencycoda/mia-form';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  @ViewChild('miaForm') miaForm!: MiaFormComponent;

  errorMessage = '';
  isSending = false;

  constructor(
    protected dialogRef: MatDialogRef<MiaFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MiaFormModalConfig
  ) { }

  save(item: any) {
    if (this.isSending) {
      return;
    }

    this.isSending = true;

    if (this.data.service != undefined) {
      this.processWithBaseService(item);
    } else {
      this.dialogRef.close(item);
    }

  }

  async processWithBaseService(item: any) {
    const serviceSave = await this.data.service.saveClients(item).toPromise();
    if (serviceSave) {
      this.dialogRef.close(serviceSave);
      this.isSending = false;
    }
  }

  onClickSave() {
    this.miaForm.submit().subscribe(result => {
      this.save(result);
    });
  }

  setErrorMessage(error: string) {
    this.errorMessage = error;
  }

}
