import Swal from "sweetalert2";

export function alertNotification(hla, message, icon) {
    // title = '¡Exitoso!' || '¡Fallido!'
    // icon: 'success' || 'error' || 'info'
    Swal.fire({
      title: hla ,
      text: message,
      icon: icon,
      showConfirmButton: false,
      timer: 2000
    });
}

export function generateToken() {
  return "token-" + Math.random().toString(36).substring(2);
}