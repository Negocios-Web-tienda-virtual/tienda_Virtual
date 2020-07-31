import Axios from "axios";

const pedidos = document.querySelector("#listado-pedidos");

if(pedidos){
    pedidos.addEventListener("click", (e)=>{
        if(e.target.classList.contains("fa-check-circle")){
            const icono = e.target;
            const idPedido =
            icono.parentElement.parentElement.parentElement.pedido;

            const url = `${location.origin}/Pedido/${idPedido}`;

            axios.patch(url, {idPedido}).then(function(response){
                if(response.status == 200){
                    icono.parentElement.classList.toggle("btn-primary");
                }
            });
        }
    })
}

export default pedidos;