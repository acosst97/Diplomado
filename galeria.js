document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.card');
    console.log("probando carruseñ", cards);
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    function updateCarousel() {
        const containerWidth = carouselContainer.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const scrollLeft = carouselContainer.scrollLeft;
        const center = scrollLeft + containerWidth / 2;

        cards.forEach(card => {
            const cardCenter = card.offsetLeft + cardWidth / 2;
            const distance = Math.abs(center - cardCenter);
            const maxDistance = containerWidth / 2;

            const scale = 2 - (distance / maxDistance) * 0.2;
            const opacity = 0.6 + (1 - (distance / maxDistance)) * 0.4;

            if (!card.classList.contains('filtered-out')) { // Only apply styles if not filtered out
                card.style.transform = `scale(${Math.max(0.8, scale)})`;
                card.style.opacity = Math.max(0.6, opacity);
                card.style.display = 'block'; // Ensure it's displayed
            } else {
                card.style.transform = 'scale(0.8)'; // Reset scale
                card.style.opacity = '0.6';       // Reset opacity
                card.style.display = 'none';        // Hide it
            }
            card.classList.remove('active');
        });

        let closestCard = null;
        let minDistance = Infinity;
        cards.forEach(card => {
            if (!card.classList.contains('filtered-out')) {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(center - cardCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            }
        });
        if (closestCard) {
            closestCard.classList.add('active');
        }
    }


    function animateCarousel() {
        updateCarousel();
        requestAnimationFrame(animateCarousel);
    }

    const initialCards = Array.from(cards);
    initialCards.forEach(card => {
        const duplicate = card.cloneNode(true);
        carouselContainer.appendChild(duplicate);
    });

    setTimeout(animateCarousel, 1000);


    function adjustPadding() {
        const cardWidth = cards[0].offsetWidth || 300;
        carouselContainer.style.paddingLeft = `calc(50% - ${cardWidth / 2}px)`;
    }

    window.addEventListener('load', adjustPadding);
    window.addEventListener('resize', adjustPadding);

    function filterCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        cards.forEach(card => {
            const titleElement = card.querySelector('.card-title');
            const descriptionElement = card.querySelector('.card-text:first-of-type');
            if (titleElement && descriptionElement) {
                const title = titleElement.textContent.toLowerCase();
                const description = descriptionElement.textContent.toLowerCase();
                const category = card.dataset.category;

                const titleMatch = title.includes(searchTerm);
                const descriptionMatch = description.includes(searchTerm);
                const categoryMatch = selectedCategory === "" || category === selectedCategory;

                if ((titleMatch || descriptionMatch) && categoryMatch) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            }
        });
        updateCarousel();
    }
    searchInput.addEventListener('input', filterCards);
    categoryFilter.addEventListener('change', filterCards);
});

  function mostrarModal(button) {
    const modal = document.getElementById('modal-enviado');
    const title = button.getAttribute('data-title');
    const key = button.getAttribute('data-key');
    const image = button.getAttribute('data-image');
    const description = descripciones[key] || "Descripción no disponible.";
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-img').src = image;
  
    modal.classList.remove('hidden');
  
    // Cierra al hacer clic fuera
    window.onclick = function(e) {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    }
  
    // Botón cerrar
    document.getElementById('close-btn').onclick = function() {
      modal.classList.add('hidden');
    }
  
  
    const modalEnviado = document.getElementById('modal-enviado');
    modalEnviado.style.display = 'block';

    window.addEventListener('click', (e) => {
      if (e.target === modalEnviado) { 
        modalEnviado.style.display = 'none';
        
      }
    });
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
      modalEnviado.style.display = 'none';
    
    });
    setTimeout(() => {
        modalEnviado.style.display = 'none';
        document.querySelector('form').reset();
      }, 6000); 
  }

  const descripciones = {
    adele: "Adele dijo a The Sun:  Bueno, es un poco como Chasing Pavements ,  yo estaba jugando en mi mente mientras estaba tratando de encender un cigarrillo, bajo la lluvia frente a un restaurante. Fue una de las primeras canciones que escribió Adele para el registro, y lo describió como una canción de la  liberación . Adele dijo que la canciónera acerca de las contradicciones que están en las relaciones ..,",


    gigi: "La canción 'La Passion' de Gigi D'Agostino, un DJ italiano conocido por sus contribuciones al género dance y música electrónica, es una oda al amor y al deseo de cercanía emocional y física. La letra refleja un anhelo profundo por la compañía y el afecto de una persona amada, expresando la intensidad de los sentimientos del narrador y su desesperación por no querer estar solo.",

    roses1:"En una noche calurosa de los años ochenta, bajo el resplandor de las luces de Sunset Strip, un joven Axl Rose enfrentó una despedida que cambiaría el rumbo de su vida y el de su música. Frente al legendario club Roxy, su entonces pareja, Monique Lewis, le dio las palabras que más tarde inmortalizaría en una de las baladas más icónicas del rock:",
    tell: "La canción 'Tell Me Why' de Taylor Swift es un desgarrador relato de una relación marcada por la incomprensión y el dolor emocional. La letra refleja la lucha interna de la narradora, quien se ve afectada por la actitud y el comportamiento hiriente de su pareja.",

    komodo:  " Komodo es más que una pista de baile; es un himno que inspira a buscar un propósito más elevado y a unirnos en el proceso. A través de su música electrónica estimulante y su mensaje esperanzador, Picotto nos anima a perseguir una existencia mejor con optimismo y colaboración.",
    crazy:"“Crazy” es una balada de hard rock de la banda Aerosmith que habla de una relación en crisis. La canción fue escrita por Steven Tyler, Joe Perry y Desmond Child, y producida por Bruce Fairbairn. Trata de una relación que está pasando por un mal momento, pero que aún así emociona a quienes la viven.  "
  };