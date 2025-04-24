const datos = [
    { id: 1, nombre: "Juan", apellido: "Pérez", correo: "juan.perez@example.com", telefono: "1234567890", comentario: "Comentario 1" },
    { id: 2, nombre: "María", apellido: "Gómez", correo: "maria.gomez@example.com", telefono: "0987654321", comentario: "Comentario 2" },
    { id: 3, nombre: "Carlos", apellido: "López", correo: "carlos.lopez@example.com", telefono: "1122334455", comentario: "Comentario 3" },
    { id: 4, nombre: "Ana", apellido: "Martínez", correo: "ana.martinez@example.com", telefono: "2233445566", comentario: "Comentario 4" },
    { id: 5, nombre: "Luis", apellido: "Hernández", correo: "luis.hernandez@example.com", telefono: "3344556677", comentario: "Comentario 5" },
    { id: 6, nombre: "Laura", apellido: "Díaz", correo: "laura.diaz@example.com", telefono: "4455667788", comentario: "Comentario 6" },
    { id: 7, nombre: "José", apellido: "Ramírez", correo: "jose.ramirez@example.com", telefono: "5566778899", comentario: "Comentario 7" },
    { id: 8, nombre: "Elena", apellido: "Torres", correo: "elena.torres@example.com", telefono: "6677889900", comentario: "Comentario 8" },
    { id: 9, nombre: "Miguel", apellido: "Sánchez", correo: "miguel.sanchez@example.com", telefono: "7788990011", comentario: "Comentario 9" },
    { id: 10, nombre: "Sofía", apellido: "Cruz", correo: "sofia.cruz@example.com", telefono: "8899001122", comentario: "Comentario 10" }
];

tabla=document.querySelector("#tabla");

function creartabla(){
    var cadena="<table>";
    cadena=cadena+"<thead>";
    cadena=cadena+"<tr>";
    cadena=cadena+"<th>ID</th>";
    cadena=cadena+"<th>Nombre</th>";
    cadena=cadena+"<th>Apellido</th>";
    cadena=cadena+"<th>Correo</th>";
    cadena=cadena+"<th>Teléfono</th>";
    cadena=cadena+"<th>Comentario</th>";
    cadena=cadena+"</tr>";
    cadena=cadena+"</thead>";
    cadena=cadena+"<tbody>";

    for(const dato of datos){
        cadena=cadena+"<tr>";
        cadena=cadena+"<td>"+dato.id + "</td>";
        cadena=cadena+"<td>"+dato.nombre + "</td>";
        cadena=cadena+"<td>"+dato.apellido + "</td>";
        cadena=cadena+"<td>"+dato.correo + "</td>";
        cadena=cadena+"<td>"+dato.telefono + "</td>";
        cadena=cadena+"<td>"+dato.comentario + "</td>"
        cadena=cadena+"</tr>";

    }
    cadena=cadena+"</tbody></table>";
    tabla.innerHTML=cadena;

}
function  agregarfila(){
    const id=document.getSelection("id").value;
    const nombre=document.getSelection("nombre").value;
    const apellido=document.getSelection("apellido").value;
    const correo=document.getSelection("correo").value;
    const telefono=document.getSelection("telefono").value;
    const comentario=document.getSelection("comentario").value;
    //validacion de campos

    if(id && nombre && apellido && correo && telefono && comentario){
        //crear una nueva fial en la tabla con los datos del formulario
        const body = tabla.getElementsByTagName("#tabla")[0];
        const nuevafila= body.insertRow();
        nuevafila.innerHTML=`
        <td>${id}</td>
        <td>${nombre}</td>
        
        
        
        
        
        
        <td>${apellido}</td>
        <td>${correo}</td>
        <td>$      
    {telefono}</td>
        <td>${comentario}</td>      
        `;
        document.getElementById(formulario).reset();
    }
    else{
        alert("Datos incompletos");
    }


}

creartabla();