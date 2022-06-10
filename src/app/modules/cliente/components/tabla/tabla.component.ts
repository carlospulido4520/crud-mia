import { MiaPagination } from '@agencycoda/mia-core';
import { MiaTableConfig } from '@agencycoda/mia-table';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Client } from 'src/app/entities/client';
import { EventosTabla } from '../../utils/eventosTabla';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnChanges {

  @Input() clientes?: Client[];
  @Output() accionTabla: EventEmitter<any> = new EventEmitter();

  mostrarTabla = false;
  tableConfig: MiaTableConfig = new MiaTableConfig();
  mockData?: MiaPagination<Client>;

  constructor() { }


  ngOnChanges(): void {
    this.mostrarTabla = false;
    if (this.clientes) {
      this.mostrarTabla = true;
      this.loadConfig();
    }
  }


  loadConfig() {
    this.tableConfig.id = 'table-client';
    this.tableConfig.columns = [

      { key: 'firstname', type: 'string', title: 'Nombre', field_key: 'firstname' },
      { key: 'lastname', type: 'string', title: 'Apellido', field_key: 'lastname' },
      { key: 'email', type: 'string', title: 'Mail', field_key: 'email' },
      {
        key: 'more', type: 'more', title: '', extra: {
          actions: [
            { icon: 'create', title: 'Editar', key: EventosTabla.EDITAR },
            { icon: 'delete', title: 'Eliminar', key: EventosTabla.ELIMINAR },
          ]
        }
      },
    ];

    this.tableConfig.loadingColor = 'black';
    this.tableConfig.hasEmptyScreen = true;
    this.tableConfig.emptyScreenTitle = 'No tenes cargado ningun elemento todavia';

    this.tableConfig.onClick.subscribe(result => {
      this.accionTabla.emit(result);
    });

    this.mockData = {
      current_page: 1,
      first_page_url: '',
      from: '',
      last_page: 1,
      last_page_url: '',
      next_page_url: '',
      path: '',
      per_page: 50,
      prev_page_url: '',
      to: '',
      total: 1,
      data: this.clientes ?? []
    };
  }

}
