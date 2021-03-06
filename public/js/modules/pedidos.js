//Importar axios
import axios from "axios";
//Importar sweetalert2
import Swal from "sweetalert2";

//Evento click
const pedidos = document.querySelector("#listado-pedidos");
if (pedidos) {
    //Si el evento es un click cambiara el estado de pago
    pedidos.addEventListener("click", (e) => {
        if (e.target.classList.contains("fa-check-circle")) {
            const icono = e.target;
            const idPedido =
                icono.parentElement.parentElement.parentElement.dataset.pedido;
            const url = `${location.origin}/Pedido/${idPedido}`;
            axios.patch(url, { idPedido }).then(function(response) {
                if (response.status == 200) {
                    icono.parentElement.classList.toggle("btn-primary");
                }
            });
            setTimeout(() => {
                window.location.href = "/Pedidos";
            }, 1000);
        }
        if (e.target.classList.contains("fa-thumbs-up")) {
            const pedido = e.target.parentElement.parentElement;
            const idPedido = pedidos.dataset.pedido;
            Swal.fire({
                title: "El pago ha sido realizado",
                text: "verificacion de pago",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Verificado",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/Pedidos/${idPedido}`;

                    axios.delete(url, { params: { idPedido } })
                        .then((response) => {
                            pedido.parentElement.removeChild(pedido);

                            Swal.fire("Producto Eliminado", response.data.message, "success");
                        }).catch((result) => {
                            Swal.fire(
                                "Error",
                                "Ha ocurrido un error al momento de eliminar",
                                "error"
                            );
                        });
                }
            });
        }
    });
}
export default pedidos;