let participantes = [];

function agregarNombre() {
    const input = document.getElementById("nombre");
    const nombre = input.value.trim();
    
    if (nombre && !participantes.includes(nombre)) {
        participantes.push(nombre);
        actualizarLista();
        input.value = "";
        document.getElementById("sortearBtn").disabled = participantes.length < 2;
    }
}

function actualizarLista() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    participantes.forEach((nombre, index) => {
        const li = document.createElement("li");
        li.textContent = nombre;
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "❌";
        eliminarBtn.onclick = () => eliminarNombre(index);
        li.appendChild(eliminarBtn);
        lista.appendChild(li);
    });
}

function eliminarNombre(index) {
    participantes.splice(index, 1);
    actualizarLista();
    document.getElementById("sortearBtn").disabled = participantes.length < 2;
}

function sortear() {
    let mezcla = [...participantes];
    let resultado = {};

    do {
        mezcla = participantes.slice().sort(() => Math.random() - 0.5);
    } while (mezcla.some((nombre, i) => nombre === participantes[i]));

    participantes.forEach((nombre, i) => {
        resultado[nombre] = mezcla[i];
    });

    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h3>Resultados:</h3>" + 
        Object.entries(resultado)
              .map(([a, b]) => `${a} → ${b}`)
              .join("<br>");
}
