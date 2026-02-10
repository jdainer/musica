const STORAGE_KEY = 'te_exaltamos_songs_v1';
const defaultData = {
    "do mayor": [
      { nombre: "El Espíritu de Dios se mueve" },
      { nombre: "En ese nombre" },
      { nombre: "La sangre de Cristo" },
      { nombre: "Qué bueno es Jesucristo" },
      { nombre: "Solamente en Cristo" },
      { nombre: "El amor de Dios" },
      { nombre: "El gozo de Jehová" },
      { nombre: "Hay una fiesta" },
      { nombre: "Un altar" },
      { nombre: "Si toda Colombia" },
      { nombre: "Oh qué regalo" },
      { nombre: "Vamos a alabar" },
      { nombre: "Ya viene Cristo" }
    ],
    "re mayor": [
      { nombre: "En esta reunión" }, { nombre: "Espíritu de Dios desciende" },
      { nombre: "Los salvados cantan" }, { nombre: "Tu misericordia" },
      { nombre: "No hay Dios" }, { nombre: "Hay un pueblo" },
      { nombre: "Jacob luchó" }, { nombre: "Mirad bendecid" },
      { nombre: "Mi corazón contento" }, { nombre: "Soy libertado" },
      { nombre: "El Espíritu Santo que" }, { nombre: "Yo tengo el Cristo vivo" },
      { nombre: "El culto de hoy" }, { nombre: "Testifiquemos" },
      { nombre: "Estamos de fiesta" }, { nombre: "La iglesia es tuya" },
      { nombre: "Quién dijo que no" }, { nombre: "Si has conocido al Señor" },
      { nombre: "Yo quiero un avivamiento" }, { nombre: "Dale un toque" },
      { nombre: "Te alabarán oh Jehová" }, { nombre: "El nombre de Jesús es dulce" },
      { nombre: "Esta es una fiesta" }, { nombre: "Siento que me lleno" }
    ],
    "mi mayor": [
      { nombre: "Honra y gloria" }, { nombre: "Yo siento gozo" },
      { nombre: "Hay un motivo" }, { nombre: "Jehová está en su templo" },
      { nombre: "Vamos por montes" }, { nombre: "Soy feliz" },
      { nombre: "el es el gran yo soy" }, { nombre: "Una vez andaba yo" }
    ],
    "sol mayor": [
      { nombre: "Es un canto de" }, { nombre: "La fuente" },
      { nombre: "Mirad cuán bueno" }, { nombre: "Si mi pueblo se humilla" },
      { nombre: "Si quito la mirada" }, { nombre: "Viva el evangelio" },
      { nombre: "Yo siento en mí" }, { nombre: "Yo quiero sentir" },
      { nombre: "El Cristo de poder" }, { nombre: "Yo vine a adorar a Dios" }
    ],
    "la mayor": [
      { nombre: "Estoy alegre" }, { nombre: "La dulce presencia" },
      { nombre: "Por todo el mundo" }, { nombre: "Yo vengo a tu presencia" },
      { nombre: "Gracias Señor" }, { nombre: "Quién como tú" },
      { nombre: "Damos gracias al Señor" }, { nombre: "Yo vivo porque Cristo" },
      { nombre: "Oh qué alegría" }
    ],
    "la menor": [
      { nombre: "la unica razon" }, { nombre: "todo lo que respire" },
      { nombre: "hay muchas formas" }
    ],
    "si menor": [
      { nombre: "Hay victoria" }, { nombre: "Una zarza" },
      { nombre: "Vamos escalando" }, { nombre: "Somos más que vencedores" },
      { nombre: "Yo me alegré" }, { nombre: "Aunque un ejército" }
    ],
    "do menor": [
      { nombre: "Este avivamiento" }, { nombre: "Esta alabanza es" },
      { nombre: "Qué bonito es" }, { nombre: "Yo he creído" },
      { nombre: "Te espero" }, { nombre: "Gocémonos" }
    ],
    "re menor": [
      { nombre: "Vamos a romper" }, { nombre: "Adoremos al Rey" },
      { nombre: "Santo dicen" }, { nombre: "La alabanza a Dios" },
      { nombre: "En el altar de Dios" }, { nombre: "Para ti oh Señor" },
      { nombre: "La fortaleza" }, { nombre: "El Cristo de Nazaret" },
      { nombre: "Enviado soy de Dios" }
    ],
    "mi menor": [
      { nombre: "Jesucristo es tan" }, { nombre: "El León de Judá" },
      { nombre: "Sin Dios nada" }
    ],
    "sol menor": [
      { nombre: "estoy aqui desesperado por ti " }, { nombre: "Yo navegaré" }
    ]
  };
  
 // 2. Cargar datos del LocalStorage
let currentSongs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData;
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSongs));

const audioPlayer = new Audio();

document.addEventListener("DOMContentLoaded", () => {
    console.log("JS listo - AriaSoftware 2026");

    const panel = document.getElementById('panel');
    const menuItems = document.querySelectorAll('.menu-item');
    const searchInput = document.getElementById("perfume-search");
    const searchResults = document.getElementById("search-results");

    /* =====================
       LÓGICA DE WHATSAPP
    ===================== */
    window.shareList = (tone) => {
    const songs = currentSongs[tone] || [];
    if (songs.length === 0) return alert("La lista está vacía");

    // Fecha actual para darle contexto al listado
    const fecha = new Date().toLocaleDateString('es-CO', { 
        weekday: 'long', day: 'numeric', month: 'long' 
    });

    // 1. Saludo y encabezado personalizado
    let text = ` *¡Dios te bendiga!* \n`;
    text += `Te comparto este listado de canciones para el servicio de hoy:\n\n`;
    text += `🎼 Hacedlo bien, tañendo con júbilo\n \n`;
    text += `🎹 *Tono:* ${tone.toUpperCase()}\n`;
    text += `📅 *Fecha:* ${fecha}\n`;
    

    // 2. Listado numerado
    songs.forEach((s, i) => {
        text += `${i + 1}️  ${s.nombre}\n\n\n\n\n`;
    });

    text += `➡🌎ingresa a https://github.com/jdainer/musica.git.\n\n\n\n`;
    text += `para usar esta herramienta✨`;
    
    // 3. Apertura de enlace
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
};

    /* =====================
       RENDERIZADO DE LISTA
    ===================== */
    window.renderSongs = (tone) => {
        const toneKey = tone.toLowerCase();
        const songs = currentSongs[toneKey] || [];
        
        let audioFileName = toneKey.includes("mayor") 
            ? toneKey.replace(" mayor", "") 
            : toneKey.replace(" menor", "_m");

        audioPlayer.src = `audios/${audioFileName}.mp3`;
        audioPlayer.play().catch(() => console.warn("Audio no disponible"));

        panel.innerHTML = `
            <div class="fade">
                <div class="h2 text-accent">${toneKey.toUpperCase()}</div>
                <p class="small mb-4">Lista de canciones para este tono</p>
                
                <ul class="song-list">
                    ${songs.map((s, idx) => `
                        <li class="song-item">
                            <span><i class="fa fa-music mr-2 text-accent"></i>${s.nombre}</span>
                        </li>
                    `).join('')}
                </ul>

                <div class="input-row mt-4" style="display:flex; flex-direction:column; gap:10px; margin-top:20px;">
                    <button onclick="shareList('${toneKey}')" class="btn" style="background-color: #25d366; color: white; width: 100%;">
                        <i class="fa-brands fa-whatsapp"></i> Compartir por WhatsApp
                    </button>
                </div>
            </div>
        `;
    };

    /* =====================
       MOTOR DE BÚSQUEDA
    ===================== */
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        searchResults.innerHTML = "";
        if (query.length < 2) return searchResults.classList.add("hidden");

        let matches = [];
        for (const tono in currentSongs) {
            currentSongs[tono].forEach(song => {
                if (song.nombre.toLowerCase().includes(query)) matches.push({ ...song, tono: tono });
            });
        }

        if (matches.length > 0) {
            searchResults.classList.remove("hidden");
            matches.forEach(match => {
                const div = document.createElement("div");
                div.className = "search-item";
                div.innerHTML = `<strong>${match.nombre}</strong> <small>(${match.tono})</small>`;
                div.onclick = () => {
                    renderSongs(match.tono);
                    searchInput.value = "";
                    searchResults.classList.add("hidden");
                };
                searchResults.appendChild(div);
            });
        } else {
            searchResults.classList.add("hidden");
        }
    });

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target)) searchResults.classList.add("hidden");
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const tone = item.getAttribute('data-menu');
            if (tone) renderSongs(tone);
        });
    });

    renderSongs("do mayor");
});