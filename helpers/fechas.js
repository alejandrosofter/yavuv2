export function getEdad(fechaNacimiento) {
    let hoy = new Date()
    const fecha='seconds' in fechaNacimiento?new Date(fechaNacimiento.seconds*1000):fechaNacimiento
    let edad = hoy.getFullYear() - fecha.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fecha.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fecha.getDate())
    ) {
      edad--
    }
    return edad
  }