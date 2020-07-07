// Importar los módulos necesarios
import axios from "axios";
import Swal from "sweetalert2";

// Obtener el nombre del botón desde el DOM
const btnDelete = document.querySelector("#eliminar-producto");

// Agregar un evento al click del botón
btnDelete.addEventListener("click", (e) => {
    const urlProductos = e.target.dataset.productoUrl;

    Swal.fire({
        title: "Estas seguro que desea eliminar?",
        text: "Si eliminas este producto no sera posible recuperalo",
        type: "warning",
        showCancelButton: true,
        confirmButton: "Eliminar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",

    }).then((result) => {
        
        if (result.value) {
            console.log("1");
            
            const url = `${location.origin}/eliminar-producto/${urlProductos}`;



            axios.delete(url, { params: { url: urlProductos } }).then(function(response) {
                Swal.fire("Eliminado", response.data, "success");
            }).catch(() =>{
                Swal.fire("!Error", error);
                console.log("2");
            });
            
        }
    });
    
});
export default btnDelete;