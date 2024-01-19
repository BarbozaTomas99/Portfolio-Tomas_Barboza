      // Array de productos
      let productos = [];
        
      // Función para agregar un producto al array y almacenar en localStorage
      function agregarProducto() {
       const nombreProducto = document.getElementById("nombreProducto").value;
       const valorProducto = Number(document.getElementById("valorProducto").value);
       const cuotasProducto = Number(document.getElementById("cuotasProducto").value);
       const pagoMensual = valorProducto / cuotasProducto;
       const nuevoProducto = {
        nombre: nombreProducto,
        valor: valorProducto,
        cuotas: cuotasProducto,
        pagoMensual: pagoMensual
       };
       productos.push(nuevoProducto);
       localStorage.setItem("productos", JSON.stringify(productos));
       mostrarProductos();
       // Limpiar campos del formulario
       document.getElementById("nombreProducto").value = "";
       document.getElementById("valorProducto").value = "";
       document.getElementById("cuotasProducto").value = "";
     }

        // Función para mostrar los productos en la tabla y cargar desde localStorage
        function mostrarProductos() {
        const tablaProductos = document.getElementById("tablaProductos");
        tablaProductos.innerHTML = `
            <tr>
            <th>Producto</th>
            <th>Valor</th>
            <th>Cuotas</th>
            <th>Pago Mensual</th>
            </tr>
        `;
        productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.sort((a, b) => b.valor - a.valor);
        for (let i = 0; i < productos.length; i++) {
            const producto = productos[i];
            const tr = document.createElement("tr");
            const tdNombre = document.createElement("td");
            tdNombre.innerHTML = producto.nombre;
            const tdValor = document.createElement("td");
            tdValor.innerHTML = producto.valor;
            const tdCuotas = document.createElement("td");
            tdCuotas.innerHTML = producto.cuotas;
            const tdPagoMensual = document.createElement("td");
            tdPagoMensual.innerHTML = producto.pagoMensual.toFixed(2);
            tr.appendChild(tdNombre);
            tr.appendChild(tdValor);
            tr.appendChild(tdCuotas);
            tr.appendChild(tdPagoMensual);
            tablaProductos.appendChild(tr);
        }
        }

      // Llamamos a la función mostrarProductos para que se muestren los productos al cargar la página
      mostrarProductos();

      // Función para borrar el último producto ingresado
      function borrarUltimoProducto() {
        swal({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará el último producto ingresado.",
          icon: "warning",
          buttons: ["Cancelar", "Sí, borrar"],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            productos.pop();
            localStorage.setItem("productos", JSON.stringify(productos));
            mostrarProductos();
            swal("El producto ha sido borrado.", {
              icon: "success",
            });
          }
        });
      }

      // Función para borrar todos los productos ingresados
      function borrarTodosLosProductos() {
        swal({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará todos los productos ingresados.",
          icon: "warning",
          buttons: ["Cancelar", "Sí, borrar"],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            productos = [];
            localStorage.setItem("productos", JSON.stringify(productos));
            mostrarProductos();
            swal("Los productos han sido borrados.", {
              icon: "success",
            });
          }
        });
      }
      
      // Agregar botones para borrar productos
      const botonBorrarUltimo = document.createElement("button");
      botonBorrarUltimo.innerText = "Borrar último producto";
      botonBorrarUltimo.onclick = borrarUltimoProducto;
      const botonBorrarTodos = document.createElement("button");
      botonBorrarTodos.innerText = "Borrar todos los productos";
      botonBorrarTodos.onclick = borrarTodosLosProductos;
      const tablaProductos = document.getElementById("tablaProductos");
      tablaProductos.parentElement.appendChild(botonBorrarUltimo);
      tablaProductos.parentElement.appendChild(botonBorrarTodos);
