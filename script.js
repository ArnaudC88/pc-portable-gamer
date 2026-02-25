// Données par défaut des PC
let pcList = [
    {
        name: "LENOVO LOQ 15IRX10 -1 000€",
        price: "999€",
        badge: "MEILLEUR RAPPORT QUALITÉ/PRIX",
        badgeColor: "#667eea",
        image: "https://www.cdiscount.com/pdt2/q/f/r/1/700x700/83je001qfr/rw/pc-portable-gamer-lenovo-loq-15irx10-15-6-fhd.jpg",
        processor: "Core i5-13450HX",
        gpu: "RTX 5060 100W",
        ram: "16 Go DDR5",
        storage: "512 Go SSD",
        screen: "15\" FHD 144hz",
        link: "https://tidd.ly/4pFp7rf"
    },
    {
        name: "Lenovo Legion 5 15IRX10",
        price: "1 479€",
        badge: "TOP PERFORMANCE -1 500€",
        badgeColor: "#ff6b6b",
        image: "https://www.cdiscount.com/pdt2/q/f/r/1/700x700/83je001qfr/rw/pc-portable-gamer-lenovo-loq-15irx10-15-6-fhd.jpg",
        processor: "Core i7-13650HX",
        gpu: "RTX 5070 115W",
        ram: "32 Go DDR5",
        storage: "512 Go",
        screen: "15,3\" 165 Hz IPS",
        link: "https://tidd.ly/47TVBbg"
    },
    {
        name: "MSI GF63 Thin",
        price: "1 999€",
        badge: "LE PLUS PUISSANT - 2 000€",
        badgeColor: "#00c853",
        image: "https://m.media-amazon.com/images/I/71ruDhbWgjL._AC_SL1500_.jpg",
        processor: "Intel Ultra 7 255HX",
        gpu: "Nvidia RTX5070Ti 12GB 140W",
        ram: "16 Go DDR4",
        storage: "SSD 1TB",
        screen: "16\" QHD+ 240Hz",
        link: "https://amzn.to/4s7Hhmx"
    },
    {
        name: "LENOVO LOQ 15IRX10",
        price: "1 399€",
        badge: "TOP CONFIGURATION -1 400€",
        badgeColor: "#00bcd4",
        image: "https://www.cdiscount.com/pdt2/m/f/r/1/700x700/83je003mfr/rw/pc-portable-gamer-lenovo-loq-15irx10-15-fhd-1.jpg",
        processor: "Core i7-13650HX",
        gpu: "RTX 5070 115W",
        ram: "RAM 32 Go",
        storage: "SSD 1 To",
        screen: "15\" FHD 144hz",
        link: "https://tidd.ly/4tVSsQU"
    },
    {
        name: "Lenovo gaming LOQ 15IRX10",
        price: "1 199 €",
        badge: "BON PLAN DU MOMENT",
        badgeColor: "#9c27b0",
        image: "https://www.cdiscount.com/pdt2/q/f/r/1/700x700/83je001qfr/rw/pc-portable-gamer-lenovo-loq-15irx10-15-6-fhd.jpg",
        processor: "i7 13700HX",
        gpu: "RTX 5060 100W",
        ram: "24 Go DDR5",
        storage: "1 To SSD",
        screen: "15,6\" Full HD 144 Hz",
        link: "https://tidd.ly/46re11X"
    }
];

// Paramètres YouTube
let youtubeSettings = {
    videoId: "0jk5W8Y4fzo",
    showVideo: true
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
            <div class="pc-badge-top" style="background: ${pc.badgeColor}">${pc.badge}</div>
            <div class="pc-image">
                <img src="${pc.image}" alt="${pc.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400?text=Image+non+disponible'">
            </div>
            <div class="pc-content">
                <h3 class="pc-title">${pc.name}</h3>
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
    
    if (success) success.style.display = 'none';
    if (error) error.style.display = 'none';
    if (loading) loading.style.display = 'block';
    if (submitBtn) submitBtn.disabled = true;
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        usage: document.getElementById('usage') ? document.getElementById('usage').value : 'non-spécifié',
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
Utilisation : ${usageLabels[formData.usage] || formData.usage}
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
        
        if (loading) loading.style.display = 'none';
        
        if (response.ok) {
            console.log('✅ Succès!');
            if (success) {
                success.style.display = 'block';
                success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            form.reset();
        } else {
            console.error('❌ Erreur HTTP:', data);
            throw new Error(data.error || 'Erreur lors de l\'envoi');
        }
        
    } catch (err) {
        console.error('❌ Erreur complète:', err);
        if (loading) loading.style.display = 'none';
        if (error) {
            error.style.display = 'block';
            error.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } finally {
        if (submitBtn) submitBtn.disabled = false;
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
