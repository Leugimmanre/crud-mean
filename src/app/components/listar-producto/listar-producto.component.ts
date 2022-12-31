import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  // Método obtener producto
  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      // console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error)
    })
  }

  // Método eliminar producto
  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado correctamente!', 'PRODUCTO ELIMINADO');
      this.obtenerProductos();
    }, error => {console.log(error)})
  }





}
