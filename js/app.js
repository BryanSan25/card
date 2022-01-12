/* 
1. Leer Datos
2. Mostrar en el Carrito el curso Seleccionado
3. Mostrando el resto de la informacion
4. Actualizar la cantidad de elementos si el elemento ya existe
5. Eliminar Curso del carrito
6. Vaciar el Carrito de compras
*/

//variables
const carrito = document.querySelector('.carrito');
const listaCurso = document.querySelector('.cursos-lista');
const vaciarCarrito = document.querySelector('.vaciar-carrito');
const elementosCart = document.querySelector('.elementos-carrito');

//Registro
const cargarEventos = () => {
    //Aqui agrega un curso haciendo click presionando en AgregarCurso
    listaCurso.addEventListener('click', agregarCurso);

    //Vaciar carrito
    vaciarCarrito.addEventListener('click', vaciarCart);

    //Borrar elemento
    carrito.addEventListener('click', borrarCurso);
}

let carritoArray = [];

//Funciones 

//Agregar Curso
const agregarCurso = (e) => {
    if (e.target.classList.contains('agregar-carrito-button')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        e.target.value = 'Ir a la cesta';
        e.target.classList.add('ir-cesta');
        e.target.classList.remove('agregar-carrito-button');

        leerDatos(cursoSeleccionado);
        //Con el parentElement nos vamos del hijo al padre - Traversing de DOM
    }

}

const actualizarBtn = (e) => {
    vaciarCarrito.addEventListener('click', () => {
        if(e.target.classList.contains('ir-cesta')) {
            e.target.classList.add('agregar-carrito-button');
            e.target.classList.remove('ir-cesta');
            e.target.value = 'Añadir Carrito';
        }
    });
}

const leerDatos = (curso) => {
    const infoCurso = {
        img: curso.querySelector('img').src,
        creador: curso.querySelector('p').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('input').getAttribute('data-id'),
    }    

    carritoArray = [...carritoArray, infoCurso];
    carritoHTML();
}

const borrarCurso = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Quitar las llaves, es importante para que funcione
        carritoArray = carritoArray.filter((cursos) => cursoId !== cursos.id);
    } 
    carritoHTML();
    actualizarBtn(e)
    
}

const carritoHTML = () => {

    limpiarHTML();

    carritoArray.forEach((curso) => {
        const {img, creador, precio, id} = curso;
        const divCart = document.createElement('div')
        divCart.classList.add('contenedor-producto');
        divCart.innerHTML = `
            <img src="${img}" width="100px"></img>
        <div class="flex-card-creador-precio">
            <p> ${creador} </p>
            <span> ${precio} <span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon borrar-curso icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round" data-id="${id}">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
        `;
        
        elementosCart.appendChild(divCart);
    });
    lengthArray();
}

const lengthArray = () => {
    const redButton = document.querySelector('.elementos-cart-length');
    redButton.textContent = carritoArray.length;
}

const limpiarHTML = () => {
    while(elementosCart.firstChild) {
        elementosCart.removeChild(elementosCart.firstChild)
    }
}

//Vaciar Carrito
const vaciarCart = () => {

    carritoArray = []; 
/*     console.log(e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[1]);*/ 
    carritoHTML(); 

}

cargarEventos();




