// Vesuvio Quantico - Mini App Logic
const tracks = [
    { num: 1, titolo: "Core 'ngrato", artista: "Roberto Murolo", prezzo: 10 },
    { num: 2, titolo: "Luna rossa", artista: "Featuring tradizione", prezzo: 10 },
    { num: 3, titolo: "Vesuvio", artista: "Roberto Murolo", prezzo: 10 },
    { num: 4, titolo: "Era de maggio", artista: "Sergio Bruni", prezzo: 10 },
    { num: 5, titolo: "Nun te scurdà", artista: "Roberto Murolo", prezzo: 10 },
    { num: 6, titolo: "Funiculì Funiculà", artista: "Tradizione", prezzo: 10 },
    { num: 7, titolo: "Pupille", artista: "Lucio Dalla", prezzo: 10 },
    { num: 8, titolo: "Napoli", artista: "Sergio Bruni", prezzo: 10 },
    { num: 9, titolo: "O sole mio", artista: "Tradizione", prezzo: 10 },
    { num: 10, titolo: "Torna a Surriento", artista: "Tradizione", prezzo: 10 },
    { num: 11, titolo: "Dicitencello vuie", artista: "Roberto Murolo", prezzo: 10 },
    { num: 12, titolo: "Malazena", artista: "Tradizione", prezzo: 10 },
    { num: 13, titolo: "'O paese d' 'e sciore", artista: "Roberto Murolo", prezzo: 10 },
    { num: 14, titolo: "Comme facette mammeta", artista: "Sergio Bruni", prezzo: 10 },
    { num: 15, titolo: "Tu vuò fà l'americano", artista: "Domenico Modugno", prezzo: 10 },
    { num: 16, titolo: "Napule è", artista: "Pino Daniele", prezzo: 10 },
    { num: 17, titolo: "Anema e core", artista: "Sergio Bruni", prezzo: 10 },
    { num: 18, titolo: "'O marenariello", artista: "Roberto Murolo", prezzo: 10 },
    { num: 19, titolo: "Canzone per te", artista: "Sergio Bruni", prezzo: 10 },
    { num: 20, titolo: "Vulesse", artista: "Roberto Murolo", prezzo: 10 },
    { num: 21, titolo: "Canzone all'antica", artista: "Sergio Bruni", prezzo: 10 },
    { num: 22, titolo: "Passione", artista: "Roberto Murolo", prezzo: 10 },
    { num: 23, titolo: "Africa", artista: "Pino Daniele", prezzo: 10 },
    { num: 24, titolo: "Jesce sole", artista: "Roberto Murolo", prezzo: 10 },
    { num: 25, titolo: "Napoli che fa", artista: "Sergio Bruni", prezzo: 10 },
    { num: 26, titolo: "'A legge", artista: "Roberto Murolo", prezzo: 10 },
    { num: 27, titolo: "Stelle", artista: "Sergio Bruni", prezzo: 10 },
    { num: 28, titolo: "Ricominciamo", artista: "Roberto Murolo", prezzo: 10 },
    { num: 29, titolo: "Mmeravigghiuso", artista: "Sergio Bruni", prezzo: 10 },
    { num: 30, titolo: "Quanno chiove", artista: "Roberto Murolo", prezzo: 10 },
    { num: 31, titolo: "Tiemme accuntà", artista: "Sergio Bruni", prezzo: 10 },
    { num: 32, titolo: "Sulo", artista: "Roberto Murolo", prezzo: 10 },
    { num: 33, titolo: "Canzoneapposta", artista: "Sergio Bruni", prezzo: 10 },
    { num: 34, titolo: "E Babbà ft DaP", artista: "DaP", prezzo: 10 }
];

const prices = {
    album: 100,
    founder: 300,
    monthly: 30
};

let tracksExpanded = false;

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
    const list = document.getElementById('tracks-list');
    const btn = document.querySelector('.toggle-tracks');
    const text = document.getElementById('toggle-text');

    if (tracksExpanded) {
        list.classList.add('show');
        btn.classList.add('expanded');
        text.textContent = 'Nascondi';
    } else {
        list.classList.remove('show');
        btn.classList.remove('expanded');
        text.textContent = 'Mostra tutte';
    }
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