//Se debe ver igual en todos los navegadores (Firefox, Opera, Chrome y Safari)
//Todas las funciones tienen que estar documentadas, explicando brevemente su funcionamiento.
// Se debe especificar el tipo de dato de las variables.

document.addEventListener('DOMContentLoaded', () => {

    /* VARIABLES */
    const urlBase = 'assets/img/viajes/';
    const fragment = document.createDocumentFragment();
    const btnTags = document.querySelector('#btn-tags');
    const portada = document.querySelector('#portada');
    const galeria = document.querySelector('#galeria');
    const resultado = document.querySelector('#resultado');
    const otrasImgs = document.querySelector('#otras-imgs');
    
    let arrayBotones = [];
    let tarjetasElejidas = [];

    const arrayTarjetas = [
        {
            id: 'foto1',
            src: `${urlBase}viajes-1.jpg`,
            alt: 'Bali',
            titulo: 'Bali',
            texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quos, iste perferendis officia minus quas expedita autem aspernatur aliquam velit nesciunt quaerat amet? Tempora dolorum nostrum deserunt perferendis, iste laudantium.',
            title: 'Bali',
            tags: ['mar', 'playa', 'viaje']
        },
        {
            id: 'foto2',
            src: `${urlBase}viajes-2.jpg`,
            alt: 'Maldivas',
            titulo: 'Maldivas',
            texto: 'Numquam quos, iste perferendis officia minus quas expedita autem aspernatur aliquam velit nesciunt quaerat amet? Tempora dolorum nostrum deserunt perferendis, iste laudantium.',
            title: 'Maldivas',
            tags: ['mar', 'camino', 'puente', 'viaje']
        },
        {
            id: 'foto3',
            src: `${urlBase}viajes-3.jpg`,
            alt: 'Señales',
            titulo: 'Señales',
            texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quos, iste perferendis officia minus quas expedita autem aspernatur aliquam velit nesciunt quaerat amet? Tempora dolorum nostrum deserunt perferendis, iste laudantium.',
            title: 'Señales',
            tags: ['viaje', 'ciudad']
        },
        {
            id: 'foto4',
            src: `${urlBase}viajes-4.jpg`,
            alt: 'Sevilla',
            titulo: 'Sevilla',
            texto: 'Iste perferendis officia minus quas expedita autem aspernatur aliquam velit nesciunt quaerat amet? Tempora dolorum nostrum deserunt perferendis, iste laudantium.',
            title: 'Sevilla',
            tags: ['edificio', 'puente', 'ciudad', 'viaje']
        },
        {
            id: 'foto5',
            src: `${urlBase}viajes-5.jpg`,
            alt: 'Ciudad1',
            titulo: 'Ciudad1',
            texto: 'Consectetur adipisicing elit. Numquam quos, iste perferendis officia minus quas expedita autem aspernatur aliquam velit nesciunt quaerat amet? Tempora dolorum nostrum deserunt perferendis, iste laudantium.',
            title: 'Ciudad1',
            tags: ['edificio', 'puente', 'ciudad', 'viaje']
        },
        {
            id: 'foto6',
            src: `${urlBase}viajes-6.jpg`,
            alt: 'País Vasco',
            titulo: 'País Vasco',
            texto: 'Aspernatur aliquam velit nesciunt quaerat amet? Tempora dolorum nostrum deserunt perferendis, iste laudantium.',
            title: 'País Vasco',
            tags: ['mar', 'monte', 'camino', 'viaje']
        },
        {
            id: 'foto7',
            src: `${urlBase}viajes-7.jpg`,
            alt: 'Ciudad2',
            titulo: 'Ciudad2',
            texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quos, iste perferendis officia minus quas expedita autem aspernatur aliquam velit nesciunt quaerat amet? Tempora dolorum nostrum deserunt perferendis, iste laudantium.',
            title: 'Ciudad2',
            tags: ['ciudad', 'edificio', 'monte', 'viaje']
        },
    ];

    /* EVENTOS */
    //Capturamos el id del botón pulsado para usar los tags para pintar las imagenes correspondientes
    document.addEventListener('click', (ev) => {
        if (ev.target.matches('.btn')) {
            const tag = ev.target.id;
            galeria.innerHTML = "";
            portada.innerHTML = "";
            filtrarImg(tag);
            pintarImg(tarjetasElejidas);
        }
    });
    //Capturamos la imágen sobre cual hacen el click y la intercambiamos con la de la portada.
    document.addEventListener('click', (ev) => {
        if (ev.target.matches('.img-galeria')) {
            const imgPulsado = ev.target;
            const imgGrande = document.querySelector('.img-grande');
            let tempSrc = imgGrande.src;
            imgGrande.src = imgPulsado.src;
            imgPulsado.src = tempSrc;
        }
    });

    /* FUNCIONES */
    //Creamos botones según las etiquetas (tags) que tienen las imagenes en común y les asignamos los atributos y el texto:
    const crearArrayBotones = (array) => {

        let todosTags = [];
        array.forEach(foto => todosTags.push(foto.tags));
        todosTags = todosTags.flat();
        //Filtramos los elementos del array quitando los duplicados:
        //comprobamos que el elemento tag solo se aparezca 1 vez (en su primera posición)
        arrayBotones = todosTags.filter((tag, i) => todosTags.indexOf(tag) === i);
        return arrayBotones;
    }

    const pintarBotones = (array) => {
        array.forEach((tag) => {
            const boton = document.createElement('BUTTON');

            boton.classList.add('btn');
            boton.id = `${tag}`;
            boton.textContent = tag;
            fragment.append(boton);

        });
        btnTags.append(fragment);
    }

    const filtrarImg = (tag) => {
        tarjetasElejidas = arrayTarjetas.filter((tarjeta) => tarjeta.tags.includes(tag));
        let sumTags = tarjetasElejidas.length;
        if (sumTags === 1) {
            otrasImgs.classList.add('oculto');
            resultado.innerHTML = `Se ha encontrado <span class="negrita" id="tag-number">${sumTags}</span> imágen con el tag <span class="negrita" id="tag-name">${tag}</span>`;
        } else {
            otrasImgs.classList.remove('oculto');
            resultado.innerHTML = `Se han encontrado <span class="negrita" id="tag-number">${sumTags}</span> imagenes con el tag <span class="negrita" id="tag-name">${tag}</span>`;
        }
        return tarjetasElejidas;
    }

    const pintarImg = (array) => {
        array.forEach((tarjeta, i) => {
            const articleElemento = document.createElement('ARTICLE');
            const tituloElemento = document.createElement('H3');
            const divElemento = document.createElement('DIV');
            const foto = document.createElement('IMG');

            tituloElemento.textContent = tarjeta.titulo;
            foto.classList.add('img-galeria');
            foto.src = tarjeta.src;
            foto.alt = tarjeta.alt;
            foto.title = tarjeta.title;
            foto.id = tarjeta.id;

            divElemento.append(foto);
            articleElemento.append(tituloElemento);
            articleElemento.append(divElemento);
            if (i === 0) {
                articleElemento.classList.add('portada-article');
                divElemento.classList.add('img-principal');
                foto.classList.remove('img-galeria');
                foto.classList.add('img-grande');
                portada.append(articleElemento);
            } else {
                fragment.append(articleElemento);
            }
        });

        galeria.append(fragment);
    }

    /* INVOCACIÓN A LAS FUNCIONES */
    crearArrayBotones(arrayTarjetas);
    pintarBotones(arrayBotones);
}); 