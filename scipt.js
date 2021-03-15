// clases
class dato {
    constructor(id, n, desviacion) {
        this.id = id;
        this.n = n;
        this.desviacion = desviacion;
    }
}

// variables

let media = 0;
let desviacionEstandar = 0;
let datos = [];
let tabla = "";
let divTabla = "";
let inputDato = document.getElementById("inputDato");

// funciones

const generarMedia = ({ datos }) => {
    // genera la media con los datos

    let aux = 0

    datos.map(e => {
        aux += e.n
    })

    return aux / datos.length
}

const generarTabla = ({ datos }) => {
    // genera la tabla a insertar en el html

    let filas = `<table class="table">
    <thead>
        <tr>
            <th scope="col">id</th>
            <th scope="col">x</th>
            <th scope="col">x - media</th>
        </tr>
    </thead>
    <tbody>`

    datos.map(e => {
        filas += `<tr>
                    <th scope="row">${e.id}</th>
                    <td>${e.n}</td>
                    <td>${e.desviacion}</td>
                  </tr>`
    }
    )
    filas += `<tbody>
                <tfoot>
                    <td>
                    </td>
                    <td>Media = ${media}</td>
                    <td>Desviación total = ${desviacionEstandar}</td>
                </tfoot>
            </table>`

    document.getElementById("tabla").innerHTML = filas;
}

const obtenerDatoDeImput = () => {
    // obtiene el dato del imput en html
    return parseFloat(inputDato.value)
}

// implementacion de funciones

// obtener numero y guardarlo en un arreglo
document.getElementById("botonDato").addEventListener("click", (e) => {
    if (inputDato.value !== "") {


        let n = obtenerDatoDeImput();
        let idNuevo;
        let datoNuevo;
        let desviAux = 0;

        // generar id
        if (datos.length <= 0) {
            idNuevo = 0;
        } else {
            idNuevo = datos[datos.length - 1].id + 1
        }

        datoNuevo = new dato(idNuevo, n, null)

        datos.push(datoNuevo)

        // generar media
        media = generarMedia({ datos })

        //generar desviacion estandar
        datos.map(e => {
            let aux = (e.n - media) * (e.n - media)
            e.desviacion = aux

            desviAux += aux;
        })

        desviacionEstandar = Math.sqrt((desviAux / (datos.length - 1)))

        // generar tabla
        generarTabla({ datos })

        // detalles
        inputDato.value = ""
        inputDato.focus()
    }
})
