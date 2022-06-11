import { MiaField, MiaFormConfig, MiaFormModalConfig } from '@agencycoda/mia-form';
import { MiaTableConfig } from '@agencycoda/mia-table';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/entities/client';
import { AlertsService } from 'src/app/services/alets.service';
import { ClientService } from 'src/app/services/client.service';
import { EventosTabla } from '../../utils/eventosTabla';
import { ClienteComponent } from '../cliente/cliente.component';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  tableConfig: MiaTableConfig = new MiaTableConfig();
  clientes?: Client[];

  constructor(
    public clientService: ClientService,
    protected dialog: MatDialog,
    public alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }


  createClient() {
    this.onClickOpenForm(false);
  }

  async getClients() {
    const clients = await this.clientService.getClients().toPromise();
    const nuevaData = clients.response.data;
    this.clientes = nuevaData;
  }


  accionTabla(evento: any) {
    if (evento.key === EventosTabla.EDITAR) {
      this.onClickOpenForm(true, evento.item);
    }
    else if (evento.key === EventosTabla.ELIMINAR) {
      this.showAlertError(evento.item.id);
    }
  }

  onClickOpenForm(isEdit: boolean, client?: Client) {
    let data = new MiaFormModalConfig();
    data.item = isEdit ? client : { firstname: '', lastname: '', email: '' };

    let config = new MiaFormConfig();
    config.hasSubmit = false;
    config.fields = [
      { key: 'firstname', type: MiaField.TYPE_STRING, label: 'Nombre', validators: [Validators.required] },
      { key: 'lastname', type: MiaField.TYPE_STRING, label: 'Apellido', validators: [Validators.required] },
      { key: 'email', type: MiaField.TYPE_EMAIL, label: 'Email', validators: [Validators.required] },
    ];
    config.errorMessages = [
      { key: 'required', message: 'The "%label%" is required.' }
    ];
    data.service = this.clientService;
    data.config = config;

    return this.dialog.open(ClienteComponent, {
      width: '500px',
      panelClass: 'modal-full-width-mobile',
      data: data
    }).afterClosed().subscribe(
      () => {
        this.getClients();
      }
    );
  }

  showAlertError(id: number) {
    this.alertsService.alertWarning().then(
      async result => {
        if (result.isConfirmed) {
          const response = await this.clientService.deleteClient(id).toPromise();
          if (response) {
            this.getClients();
          }
        }
      }
    );
  }
  
}
