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

// Charger depuis localStorage
const savedPCs = localStorage.getItem('pcGamerList');
if (savedPCs) {
    pcList = JSON.parse(savedPCs);
}

function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function displayPCs() {
    const pcListEl = document.getElementById('pc-list');
    
    // Affichage public
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
        
        loading.style.display = 'none';
        
        if (response.ok) {
            success.style.display = 'block';
            form.reset();
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
        
    } catch (err) {
        loading.style.display = 'none';
        error.style.display = 'block';
        console.error('Erreur:', err);
        error.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
        submitBtn.disabled = false;
    }
}

// Initialisation
displayPCs();
