import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class AlertsService {

    public alertWarning() {
        return Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas eliminar este registro?',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            showCancelButton: true
        })
    }

}