import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  titulo = 'Crear producto';
  boton = 'Aceptar';
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute
  ) {
    this.productoForm = this.formBuilder.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });

    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.esEditar();
  }

  // AGREGAR / EDITAR PODUCTO
  agregarProducto() {
    // console.log(this.productoForm);
    // console.log(this.productoForm.get('producto')?.value);
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if (this.id !== null) {
      // Significa que el producto existe, es editar
      // EDITAR PRODUCTO EXISTENTE
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info(
          'El producto fue actualizado correctamente!',
          'PRODUCTO ACTUALIZADO'
        );
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })

    } else {
        // El producto no existe, es nuevo
        // CREAR PRODUCTO NUEVO
        // console.log(producto);
        this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
          this.toastr.success(
            'El producto fue registrado correctamente!',
            'PRODUCTO REGISTRADO'
          );
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.productoForm.reset();
        })
      }
  }

  // EDITAR PRODUCTO
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this.boton = 'Editar';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      })
    }

  }
}
