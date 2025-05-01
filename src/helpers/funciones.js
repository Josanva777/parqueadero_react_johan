import Swal from "sweetalert2";

export function alertNotification(message, success) {
  if (success) {
      Swal.fire({
          title: '¡Exitoso!',
          text: message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });  
  } else {
      Swal.fire({
          title: '¡Fallido!',
          text: message,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });          
  }
}

export function generateToken() {
  return "token-" + Math.random().toString(36).substring(2);
}