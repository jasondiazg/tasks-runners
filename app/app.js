$(document).ready(setDefaults);

function setDefaults() {
    var hola = "Hola";
    var mundo = new String(" mundo");
    var signoAdmiracion = String("!");

    console.log(hola + mundo + signoAdmiracion);
    $("h1").html(hola + mundo + signoAdmiracion);
}
