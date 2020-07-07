// Importar los módulos necesarios
import axios from "axios";
import Swal from "sweetalert2";

// Obtener el nombre del botón desde el DOM
const btnDelete = document.querySelector("#eliminar-producto");

// Agregar un evento al click del botón
btnDelete.addEventListener("click", e => {
    const urlProducts = e.target.dataset.productoURL;

    Swal.fire({
        title: "Estas seguro que desea eliminar?",
        text: "Si eliminas este producto no sera posible recuperalo",
        type: "warning",
        showCancelButton: true,
        confirmButton: "Eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {

        if (result.value) {
            const url = `${location.origin}`;
            console.log(url);


            axios.delete(url, { params: { urlProducto } }).then(function(response) {
                Swal.fire("Eliminado", response.data, "success");
            })
        }
    });
});
export default btnDelete;