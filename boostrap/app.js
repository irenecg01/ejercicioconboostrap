
  $(document).ready(function(){
    $(".btn").click(function(){
      $("#myModal").modal();
    });
  });
 

  function calcularget(edad,altura,peso,sexo){
    if(sexo=="hombre"){
      return 66.473+ (13.751*peso)+(5.0033*altura)-(6.755*edad);
    }else if(sexo=="mujer"){
      return 655.0955+(9.463*peso)+(1.8496*altura)-(4.6756*edad);
    }
  }
 

  //Hacer una solicitud GET a la URL JSON
   $.getJSON("https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/clientes.json", function(data) {
    // Iterar sobre los datos y agregarlos a la tabla
    $.each(data, function(key, value) {
      const edad = parseInt(value.edad);
      const altura = parseInt(value.altura);
      const peso = parseInt(value.peso);
      const sexo = value.sexo;
      var metabolismo = calcularget(edad, altura, peso, sexo).toFixed(2);
      var row = '<tr>' +
                  '<td>' + value.nombre + '</td>' +
                  '<td>' + value.apellidos + '</td>' +
                  '<td><span class="badge bg-primary text-white">' + value.sexo + '</span></td>' +
                  '<td>' + value.edad + '</td>' +
                  '<td>' + value.altura + '</td>' +
                  '<td>' + value.peso + '</td>' +
                  '<td><span class="badge bg-secondary text-white">' + value.actividad + '</span></td>'+
                  '<td>' + metabolismo + '</td>'+
                  '<td>' + calcularger(value.sexo, value.actividad, metabolismo) + '</td>' +
                '</tr>';
      $('#table-body').append(row);
    });
  });
 
  function calcularger(sexo, actividad, metabolismo) {
    var factor = 1;
    if (sexo == "hombre") {
      if (actividad == "muy ligera") {
        factor = 1.3;
      } else if (actividad == "ligera") {
        factor = 1.6;
      } else if (actividad == "moderada") {
        factor = 1.7;
      } else if (actividad == "intensa") {
        factor = 2.1;
      }
    } else if (sexo == "mujer") {
      if (actividad == "muy ligera") {
        factor = 1.3;
      } else if (actividad == "ligera") {
        factor = 1.5;
      } else if (actividad == "moderada") {
        factor = 1.6;
      } else if (actividad == "intensa") {
        factor = 1.9;
      }
    }
    return Math.round (factor * metabolismo);
  }
  

// Define un arreglo para almacenar la lista de clientes

let listaClientes = [];
// Agrega un evento al botón "Guardar cliente"
$('#guardar').click(function() {
  // Obtén los valores ingresados por el usuario
  const nombre = $('#Nombre').val();
  const apellidos = $('#Apellidos').val();
  const sexo = $('#sexo').val();
  const nivelActividad = $('#nivelactividad').val();
  const edad = $('#edad').val();
  const peso = $('#peso').val();
  const altura = $('#altura').val();

   

  // Crea un objeto con los valores obtenidos
  const nuevoCliente = {
    nombre,
    apellidos,
    sexo,
    nivelActividad,
    edad,
    peso,
    altura
  };

  // Agrega el nuevo objeto al arreglo de clientes
  listaClientes.push(nuevoCliente);

  // Actualiza la tabla con los datos del arreglo de clientes
  actualizarTabla();
});

// Función para actualizar la tabla con los datos del arreglo de clientes
function actualizarTabla() {
  // Limpiar tabla actual
  // Recorre el arreglo de clientes y agrega cada uno como una fila en la tabla
  listaClientes.forEach(cliente => {
    // Comprueba si hay datos ingresados
    if (cliente.nombre && cliente.apellidos && cliente.sexo && cliente.nivelActividad && cliente.edad && cliente.peso && cliente.altura) {
      const row = $('<tr>').appendTo('#table-body');
      $('<td>').text(cliente.nombre).appendTo(row);
      $('<td>').text(cliente.apellidos).appendTo(row);
      $('<td span class="badge bg-primary text-white">').text(cliente.sexo).appendTo(row);
      $('<td>').text(cliente.edad).appendTo(row);
      $('<td>').text(cliente.altura).appendTo(row);
      $('<td>').text(cliente.peso).appendTo(row);
      $('<td span class="badge bg-secondary text-white">').text(cliente.nivelActividad).appendTo(row);
      const metabolismo = calcularget(cliente.edad, cliente.altura, cliente.peso, cliente.sexo);
      $('<td>').text(metabolismo.toFixed(2)).appendTo(row);
      const ger = calcularger(cliente.sexo, cliente.nivelActividad, metabolismo);
      $('<td>').text(ger).appendTo(row);
    }else{}
     
      });
}



const cargar = document.getElementById('cargar');

cargar.addEventListener('click', () => {
  $.getJSON("https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/clientes.json", function(data) {
    // Iterar sobre los datos y agregarlos a la tabla
    $.each(data, function(key, value) {
      const edad = parseInt(value.edad);
      const altura = parseInt(value.altura);
      const peso = parseInt(value.peso);
      const sexo = value.sexo;
      var metabolismo = calcularget(edad, altura, peso, sexo).toFixed(2);
      var row = '<tr>' +
                  '<td>' + value.nombre + '</td>' +
                  '<td>' + value.apellidos + '</td>' +
                  '<td><span class="badge bg-primary text-white">' + value.sexo + '</span></td>' +
                  '<td>' + value.edad + '</td>' +
                  '<td>' + value.altura + '</td>' +
                  '<td>' + value.peso + '</td>' +
                  '<td><span class="badge bg-secondary text-white">' + value.actividad + '</span></td>' +
                  '<td>' + metabolismo + '</td>'+
                  '<td>' + calcularger(value.sexo, value.actividad, metabolismo) + '</td>' +
                '</tr>';
      $('#table-body').append(row);
    });
  });
});