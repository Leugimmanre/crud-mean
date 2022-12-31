import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Método obtener listado de productos
  url = 'http://localhost:4000/api/productos/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  // Método eliminar producto
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  // Método crear producto
  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  // Método editar producto
  // 1. obtener producto
  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  // 2. Editar y actualizar producto
  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }


}
