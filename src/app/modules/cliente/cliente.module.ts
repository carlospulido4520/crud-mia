import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { MiaTableModule } from '@agencycoda/mia-table';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MiaFormModule } from '@agencycoda/mia-form';

@NgModule({
  declarations: [
    ListaClientesComponent,
    ClienteComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MiaTableModule,
    MatDialogModule,
    MiaFormModule
  ]
})
export class ClienteModule { }
