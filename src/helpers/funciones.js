import Swal from "sweetalert2";

export function alertNotification(title, message, icon) {
    // title = '¡Exitoso!' || '¡Fallido!'
    // icon: 'success' || 'error' || 'info'
    Swal.fire({
      title: title ,
      text: message,
      icon: icon,
      showConfirmButton: false,
      timer: 2000
    });
}

export function alertaConfirmar(id, getUsuarios, apiUsers) {
  Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
          fetch(apiUsers + '/' + id, {
              method: "DELETE"
          })
              .then(() => {
                getUsuarios();
              })
        Swal.fire({
          title: "¡Eliminado!",
          text: "El registro se ha eliminado.",
          icon: "success"
        });
      }
    });
}


export function generateToken() {
  return "token-" + Math.random().toString(36).substring(2);
}