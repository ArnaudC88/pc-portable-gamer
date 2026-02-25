// Données par défaut des PC
let pcList = [
    {
        name: "ASUS TUF Gaming A15",
        price: "999€",
        badge: "MEILLEUR RAPPORT QUALITÉ/PRIX",
        badgeColor: "#667eea",
        image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SL1500_.jpg",
        processor: "AMD Ryzen 7 7735HS",
        gpu: "RTX 4060 8Go",
        ram: "16 Go DDR5",
        storage: "512 Go SSD",
        screen: "15.6\" FHD 144Hz",
        link: "#"
    },
    {
        name: "Lenovo Legion Pro 5",
        price: "1 499€",
        badge: "TOP PERFORMANCE",
        badgeColor: "#ff6b6b",
        image: "https://m.media-amazon.com/images/I/71sJy9GZb+L._AC_SL1500_.jpg",
        processor: "Intel i7-13700HX",
        gpu: "RTX 4070 8Go",
        ram: "32 Go DDR5",
        storage: "1 To SSD",
        screen: "16\" WQXGA 165Hz",
        link: "#"
    },
    {
        name: "MSI GF63 Thin",
        price: "799€",
        badge: "BUDGET MALIN",
        badgeColor: "#ffa726",
        image: "https://m.media-amazon.com/images/I/71h1c0Kl6qL._AC_SL1500_.jpg",
        processor: "Intel i5-12450H",
        gpu: "RTX 3050 4Go",
        ram: "16 Go DDR4",
        storage: "512 Go SSD",
        screen: "15.6\" FHD 144Hz",
        link: "#"
    }
];

// Paramètres YouTube
let youtubeSettings = {
    videoId: '', // ID de la vidéo YouTube (ex: dQw4w9WgXcQ)
    showVideo: false
};

// Charger depuis localStorage
const savedPCs = localStorage.getItem('pcGamerList');
if (savedPCs) {
    pcList = JSON.parse(savedPCs);
}

const savedYouTube = localStorage.getItem('youtubeSettings');
if (savedYouTube) {
    youtubeSettings = JSON.parse(savedYouTube);
}

function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    
    // Trouver et activer le bon bouton
    buttons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function displayLastUpdate() {
    const lastUpdate = localStorage.getItem('pcListLastUpdate');
    const lastUpdateEl = document.getElementById('last-update');
    
    if (lastUpdate && lastUpdateEl) {
        const date = new Date(lastUpdate);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit'
        };
        lastUpdateEl.textContent = `Dernière mise à jour : ${date.toLocaleDateString('fr-FR', options)}`;
    }
}

function displayYouTubeVideo() {
    const videoSection = document.getElementById('youtube-video-section');
    const videoContainer = document.getElementById('youtube-video-container');
    
    if (youtubeSettings.showVideo && youtubeSettings.videoId) {
        videoSection.style.display = 'block';
        
        // Nettoyer l'ID de la vidéo
        let cleanVideoId = youtubeSettings.videoId.trim();
        
        // Si l'utilisateur a collé une URL complète, extraire l'ID
        if (cleanVideoId.includes('youtube.com') || cleanVideoId.includes('youtu.be')) {
            const urlMatch = cleanVideoId.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            if (urlMatch) {
                cleanVideoId = urlMatch[1];
            }
        }
        
        // Nettoyer l'ID
        cleanVideoId = cleanVideoId.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 11);
        
        console.log('📹 ID vidéo YouTube:', cleanVideoId);
        
        // Créer un lien cliquable vers YouTube
        videoContainer.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${cleanVideoId}" 
               target="_blank" 
               rel="noopener noreferrer"
               style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                      display: block; text-decoration: none; background: #000;">
                <div style="position: relative; width: 100%; height: 100%; 
                            background-image: url(https://i.ytimg.com/vi/${cleanVideoId}/maxresdefault.jpg); 
                            background-size: cover; background-position: center;">
                    
                    <!-- Overlay sombre au hover -->
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                                background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s;"
                         onmouseover="this.style.opacity='1'" 
                         onmouseout="this.style.opacity='0'"></div>
                    
                    <!-- Bouton Play YouTube -->
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                                width: 100px; height: 70px; background: #ff0000; 
                                border-radius: 20px; display: flex; align-items: center; justify-content: center;
                                transition: all 0.3s; box-shadow: 0 10px 30px rgba(255,0,0,0.4);"
                         onmouseover="this.style.transform='translate(-50%, -50%) scale(1.1)'" 
                         onmouseout="this.style.transform='translate(-50%, -50%) scale(1)'">
                        <!-- Triangle Play -->
                        <div style="width: 0; height: 0; border-left: 30px solid white; 
                                    border-top: 18px solid transparent; border-bottom: 18px solid transparent; 
                                    margin-left: 10px;"></div>
                    </div>
                    
                    <!-- Texte "Voir sur YouTube" -->
                    <div style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
                                background: rgba(0,0,0,0.8); color: white; padding: 12px 30px; 
                                border-radius: 25px; font-weight: 600; font-size: 1.1em;
                                box-shadow: 0 5px 20px rgba(0,0,0,0.3);">
                        🎬 Voir la vidéo sur YouTube
                    </div>
                </div>
            </a>
        `;
    } else {
        videoSection.style.display = 'none';
    }
}

function displayPCs() {
    const pcListEl = document.getElementById('pc-list');
    
    pcListEl.innerHTML = pcList.map((pc, index) => `
        <div class="pc-card">
            <img src="${pc.image}" alt="${pc.name}" class="pc-image" onerror="this.src='https://via.placeholder.com/400x200?text=Image+non+disponible'">
            <div class="pc-content">
                <span class="pc-badge" style="background: ${pc.badgeColor}">${pc.badge}</span>
                <h3>${pc.name}</h3>
                <div class="pc-price">${pc.price}</div>
                <ul class="pc-specs">
                    <li><strong>Processeur:</strong> ${pc.processor}</li>
                    <li><strong>Carte graphique:</strong> ${pc.gpu}</li>
                    <li><strong>RAM:</strong> ${pc.ram}</li>
                    <li><strong>Stockage:</strong> ${pc.storage}</li>
                    <li><strong>Écran:</strong> ${pc.screen}</li>
                </ul>
                <a href="${pc.link}" target="_blank" class="pc-link">Voir l'offre →</a>
            </div>
        </div>
    `).join('');
    
    displayLastUpdate();
    displayYouTubeVideo();
}

async function submitForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('pc-form');
    const loading = document.getElementById('loading');
    const success = document.getElementById('success');
    const error = document.getElementById('error');
    const submitBtn = form.querySelector('.btn-submit');
    
    success.style.display = 'none';
    error.style.display = 'none';
    loading.style.display = 'block';
    submitBtn.disabled = true;
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        usage: document.getElementById('usage').value,
        screen: document.getElementById('screen').value,
        budget: document.getElementById('budget').value,
        comments: document.getElementById('comments').value
    };
    
    const usageLabels = {
        'gaming-competitif': 'Gaming Compétitif (Valorant, Fortnite, CS2, etc.)',
        'gaming-aaa': 'Gaming AAA (Cyberpunk, Elden Ring, etc.)',
        'gaming-creation': 'Gaming + Création de contenu (Streaming, Montage)',
        'gaming-polyvalent': 'Polyvalent (Gaming + Travail/Études)'
    };
    
    const emailBody = `
Nouvelle demande d'aide pour choix PC Portable Gamer

📝 Informations du client :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom : ${formData.name}
Email : ${formData.email}

🎮 Critères de recherche :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Utilisation : ${usageLabels[formData.usage]}
Taille d'écran : ${formData.screen} pouces
Budget : ${formData.budget}€

💬 Commentaires :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.comments || 'Aucun commentaire'}
    `.trim();
    
    console.log('📤 Envoi du formulaire...', formData);
    
    try {
        const response = await fetch('https://formspree.io/f/xojnyloe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                message: emailBody,
                _subject: `Demande PC Gamer - ${formData.name}`
            })
        });
        
        console.log('📥 Réponse reçue:', response.status, response.statusText);
        
        const data = await response.json();
        console.log('📋 Données:', data);
        
        loading.style.display = 'none';
        
        if (response.ok) {
            console.log('✅ Succès!');
            success.style.display = 'block';
            form.reset();
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            console.error('❌ Erreur HTTP:', data);
            throw new Error(data.error || 'Erreur lors de l\'envoi');
        }
        
    } catch (err) {
        console.error('❌ Erreur complète:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
        error.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
        submitBtn.disabled = false;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la date de dernière mise à jour si elle n'existe pas
    if (!localStorage.getItem('pcListLastUpdate')) {
        const now = new Date().toISOString();
        localStorage.setItem('pcListLastUpdate', now);
    }
    
    // Afficher les PC et la vidéo
    displayPCs();
});
