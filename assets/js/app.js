const cards = document.querySelector('#card-dinamic');
const template = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

/*Debemos esperar que se cargue el DOM para solicitar a la API con fetch*/
document.addEventListener('DOMContentLoaded', () => {
    fetchApi();
}) 

const fetchApi = async () => {

    try {

        loadinData(true);

        const res = await fetch(`https://rickandmortyapi.com/api/character`);
        const data = await res.json();

        pintarCards(data);

    } catch (error) {
        console.log(error);
    } finally {
        loadinData(false);
    }

}

const pintarCards = (data) => {

    data.results.forEach(item => {
        const clone = template.cloneNode(true);
        clone.querySelector('h5').textContent = item.name;
        clone.querySelector('p').textContent = item.species;
        clone.querySelector('img').setAttribute('src', item.image);

        fragment.appendChild(clone);
        
    });

    cards.appendChild(fragment);

}

const loadinData = (estado) => {

    const loading = document.querySelector('#loading');

    if (estado) {
        loading.classList.remove('d-none');
    } else {
        loading.classList.add('d-none')
    }
    
}