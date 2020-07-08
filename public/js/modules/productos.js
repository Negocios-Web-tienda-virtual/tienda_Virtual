// Importar los módulos necesarios
import axios from "axios";
import Swal from "sweetalert2";

// Obtener el nombre del botón desde el DOM
const buttonsDelete = document.querySelectorAll(
    "button[name='eliminar-producto']");



buttonsDelete.forEach((btnDelete)=>{btnDelete.addEventListener("click", (e) => {
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
                Swal.fire({icon: "error",
            title: "!Error!",
        text: "No se ha podido eliminar el producto"});
            });
            
            setTimeout(()=> {
                window.location.href = "/ver_producto";
            }, 3000);
        }
    });
    
});})
// Agregar un evento al click del botón

export default buttonsDelete;