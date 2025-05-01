import Swal from "sweetalert2";

export function alertNotification(title, message, type) {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      showConfirmButton: false,
      timer: 2000
    });
}

export function generateToken() {
  return "token-" + Math.random().toString(36).substring(2);
}