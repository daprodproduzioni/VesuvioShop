// Vesuvio Quantico - Mini App Logic
const tracks = [
    { num: 1, titolo: "(BONUS TRACK) E Babbà ft DaProd", artista: "", prezzo: 0 },
    { num: 2, titolo: "Sei una cosa grande ft Modugno", artista: "", prezzo: 0 },
    { num: 3, titolo: "1 voce 1 chitarra ft Bruno Martino", artista: "", prezzo: 0 },
    { num: 4, titolo: "Balla balla ballerino ft Lucio Dalla", artista: "", prezzo: 0 },
    { num: 5, titolo: "Che Femmina! ft Aurelio Fierro", artista: "", prezzo: 0 },
    { num: 6, titolo: "Come ha fatto tua mamma! ft Orchestra Italiana", artista: "", prezzo: 0 },
    { num: 7, titolo: "Fumo negli occhi ft FrancoBruno", artista: "", prezzo: 0 },
    { num: 8, titolo: "Giacca Rossa ft Massimo Ranieri", artista: "", prezzo: 0 },
    { num: 9, titolo: "Indifferentemente ft Maria Nazionale", artista: "", prezzo: 0 },
    { num: 10, titolo: "Infermiera di notte ft Gianni Celeste", artista: "", prezzo: 0 },
    { num: 11, titolo: "li per li ft Aurelio Fierro", artista: "", prezzo: 0 },
    { num: 12, titolo: "Lusingami ft Sergio Bruni", artista: "", prezzo: 0 },
    { num: 13, titolo: "Ma se viene stasera ft Alessio", artista: "", prezzo: 0 },
    { num: 14, titolo: "Malafemmina ft Toto", artista: "", prezzo: 0 },
    { num: 15, titolo: "Malammore ft Franco Ricciardi", artista: "", prezzo: 0 },
    { num: 16, titolo: "Malinconia ft Aurelio Fierro (Patrizio REMIX)", artista: "", prezzo: 0 },
    { num: 17, titolo: "maliziosa ft eddy Napoli", artista: "", prezzo: 0 },
    { num: 18, titolo: "Na Sbandata ft Patrizio", artista: "", prezzo: 0 },
    { num: 19, titolo: "Passione ft Alan Sorrenti", artista: "", prezzo: 0 },
    { num: 20, titolo: "Pensaci Bene ft Roberto Murolo (Remix)", artista: "", prezzo: 0 },
    { num: 21, titolo: "Pensaci Bene ft Roberto Murolo", artista: "", prezzo: 0 },
    { num: 22, titolo: "Ragione e Sentimento ft Maria Nazionale", artista: "", prezzo: 0 },
    { num: 23, titolo: "Reginella ft Libero Bovio e Mario Abbate", artista: "", prezzo: 0 },
    { num: 24, titolo: "Resta con me ft Maria Nazionale e Domenico Modugno", artista: "", prezzo: 0 },
    { num: 25, titolo: "Sabato notte ft Franco Moreno", artista: "", prezzo: 0 },
    { num: 26, titolo: "Soffro per te ft Corrado", artista: "", prezzo: 0 },
    { num: 27, titolo: "Sono il vento ft Aurelio Fierro", artista: "", prezzo: 0 },
    { num: 28, titolo: "Svegliati ft Sergio Bruni", artista: "", prezzo: 0 },
    { num: 29, titolo: "Treno ft Franco Ricciardi", artista: "", prezzo: 0 },
    { num: 30, titolo: "Una sera di maggio ft Sergio Bruni", artista: "", prezzo: 0 },
    { num: 31, titolo: "Vaffanculo con chi vuoi tu ft Squallor", artista: "", prezzo: 0 },
    { num: 32, titolo: "Vorrei Baciarti ft Teresa de Sio", artista: "", prezzo: 0 },
    { num: 33, titolo: "失控的心 (Remix)", artista: "", prezzo: 0 },
    { num: 34, titolo: "Voce e Chitarra ft Pino Daniele", artista: "", prezzo: 0 }
];

const prices = {
    album: 100,
    founder: 300,
    monthly: 30
};

let tracksExpanded = true;

// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#0a0a0a');
    tg.setBackgroundColor('#0a0a0a');
}

// Render tracks
function renderTracks() {
    const container = document.getElementById('tracks-list');
    container.innerHTML = tracks.map(track => `
        <div class="track-item">
            <div class="track-num">${track.num}</div>
            <div class="track-info">
                <div class="track-title">${track.titolo}</div>
                <div class="track-artist">${track.artista}</div>
            </div>
        </div>
    `).join('');
}

// Toggle tracks visibility
function toggleTracks() {
    tracksExpanded = !tracksExpanded;
    const container = document.getElementById('tracks-list');
    container.style.display = tracksExpanded ? 'block' : 'none';
}

// Buy functions - communicate with bot
function buyAlbum() {
    if (tg) {
        tg.showAlert('🤖 Per acquistare l\'album completo (100 ⭐), scrivi /acquista al bot!');
        tg.openBot('VesuvioQuanticoBot');
    } else {
        alert('Per acquistare: @VesuvioQuanticoBot');
    }
}

function buyFounder() {
    if (tg) {
        tg.showAlert('🌟 Founder Pass a 300 ⭐! Scrivii /founder al bot per informazioni.');
        tg.openBot('VesuvioQuanticoBot');
    } else {
        alert('Per Founder Pass: @VesuvioQuanticoBot');
    }
}

function buyMonthly() {
    if (tg) {
        tg.showAlert('📅 Abbonamento mensile 30 ⭐/mese. Scrivii /abbonamento al bot!');
        tg.openBot('VesuvioQuanticoBot');
    } else {
        alert('Per abbonamento: @VesuvioQuanticoBot');
    }
}

function openBot() {
    if (tg) {
        tg.openBot('VesuvioQuanticoBot');
    } else {
        window.open('https://t.me/VesuvioQuanticoBot', '_blank');
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    renderTracks();
});
