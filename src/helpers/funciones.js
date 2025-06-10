import Swal from 'sweetalert2';

export function alertNotification(title, message, icon) {
  // title = '¡Exitoso!' || '¡Fallido!'
  // icon: 'success' || 'error' || 'info'
  Swal.fire({
    title: title,
    text: message,
    icon: icon,
    showConfirmButton: false,
    timer: 1100
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
      const token = JSON.parse(localStorage.getItem('token'));

      fetch(`${apiUsers}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
          'Accept': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El registro se ha eliminado.",
              icon: "success"
            });
            getUsuarios()
          } else {
            console.error('Error al eliminar el usuario:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    }
  });
}

export function generateToken() {
  return "token-" + Math.random().toString(36).substring(2);
}

export function alertaCerrarSesion(navigate) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Deseas cerrar sesión",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, cerrar!"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  });
}