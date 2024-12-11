// Vérification de l'authentification
document.addEventListener('DOMContentLoaded', () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    
    if (!userInfo) {
        // Redirection vers la page de login si non authentifié
        window.location.href = 'login.html';
        return;
    }

    // Mise à jour des informations utilisateur dans l'interface
    updateUserInterface(userInfo);
    
    // ... reste du code existant ...
});

function updateUserInterface(userInfo) {
    // Mise à jour du header
    const userNameElements = document.querySelectorAll('.user-name');
    const userRoleElements = document.querySelectorAll('.user-role');
    const userAvatar = document.querySelector('.user-avatar');
    
    userNameElements.forEach(el => el.textContent = userInfo.fullName);
    userRoleElements.forEach(el => el.textContent = userInfo.role);
    if (userAvatar) userAvatar.src = userInfo.avatar;

    // Mise à jour des notifications
    const notifBadge = document.querySelector('.notification-badge');
    if (notifBadge) {
        notifBadge.textContent = userInfo.notifications.length;
    }

    // Adaptation de l'interface selon le rôle
    document.body.setAttribute('data-role', userInfo.role.toLowerCase());
}

// Données factices enrichies
const MOCK_DATA = {
    EDT: {
        Lundi: [
            { heure: "08:00-10:00", matiere: "Mathématiques", prof: "M. Diop", salle: "102" },
            { heure: "10:15-12:15", matiere: "Français", prof: "Mme Sow", salle: "205" },
            { heure: "14:00-16:00", matiere: "SVT", prof: "M. Fall", salle: "Lab 1" }
        ],
        Mardi: [
            { heure: "08:00-10:00", matiere: "Physique-Chimie", prof: "M. Ndiaye", salle: "Lab 2" },
            { heure: "10:15-12:15", matiere: "Anglais", prof: "Mme Diallo", salle: "201" }
        ]
    },
    
    NOTES: {
        Mathematiques: [
            { date: "2024-04-01", type: "Devoir", note: "15/20", commentaire: "Excellent travail" },
            { date: "2024-03-15", type: "Contrôle", note: "13/20", commentaire: "Peut mieux faire" }
        ],
        Francais: [
            { date: "2024-04-05", type: "Oral", note: "16/20", commentaire: "Très bonne présentation" },
            { date: "2024-03-20", type: "Dissertation", note: "14/20", commentaire: "Bonnes idées" }
        ],
        SVT: [
            { date: "2024-04-02", type: "TP", note: "18/20", commentaire: "Excellent TP" }
        ]
    },
    
    DEVOIRS: [
        {
            matiere: "Mathématiques",
            date_donnee: "2024-04-10",
            pour_le: "2024-04-17",
            contenu: "Exercices 15 à 20 page 45 du manuel",
            ressources: "Manuel + polycopié distribué"
        },
        {
            matiere: "Français",
            date_donnee: "2024-04-11",
            pour_le: "2024-04-18",
            contenu: "Rédaction : 'Les enjeux du développement durable'",
            ressources: "Documents du cours"
        }
    ],
    
    VIE_SCOLAIRE: {
        absences: [
            { date: "2024-03-15", motif: "Maladie", justifie: true, duree: "Journée" },
            { date: "2024-04-02", motif: "Rendez-vous médical", justifie: true, duree: "Matin" }
        ],
        retards: [
            { date: "2024-04-01", duree: "15 min", motif: "Transport" }
        ],
        sanctions: [],
        observations: [
            { date: "2024-03-20", type: "Positive", commentaire: "Excellent comportement en classe" }
        ]
    },
    
    MESSAGES: [
        {
            id: 1,
            date: "2024-04-10",
            expediteur: "M. Diop",
            sujet: "Préparation contrôle",
            contenu: "N'oubliez pas de réviser le chapitre 5 pour le contrôle de la semaine prochaine.",
            lu: false
        },
        {
            id: 2,
            date: "2024-04-09",
            expediteur: "Administration",
            sujet: "Réunion parents-professeurs",
            contenu: "La réunion parents-professeurs aura lieu le 20 avril à partir de 14h.",
            lu: true
        },
        {
            id: 3,
            date: "2024-04-08",
            expediteur: "Vie Scolaire",
            sujet: "Sortie scolaire",
            contenu: "La sortie au musée est prévue pour le 25 avril. Merci de rapporter l'autorisation parentale.",
            lu: false
        }
    ]
};

// Message d'accueil simplifié
const WELCOME_HTML = `
    <div class="welcome-message">
        <div class="welcome-section">
            <i class="fas fa-school welcome-icon"></i>
            <h2>Bienvenue sur ECOLSYSTEM</h2>
            <p>Version de démonstration d'un ERP scolaire innovant</p>
        </div>
        
        <div class="features-grid">
            <div class="feature-card">
                <i class="fas fa-users"></i>
                <h3>Multi-utilisateurs</h3>
                <p>Élèves, professeurs, administration</p>
            </div>
            <div class="feature-card">
                <i class="fas fa-clock"></i>
                <h3>Temps réel</h3>
                <p>Suivi en direct</p>
            </div>
            <div class="feature-card">
                <i class="fas fa-chart-line"></i>
                <h3>Analyses</h3>
                <p>Statistiques détaillées</p>
            </div>
        </div>
    </div>
`;

// Information utilisateur
const USER_INFO = {
    nom: "Abdoulaye Watt",
    role: "Élève",
    classe: "Seconde A",
    avatar: "avatar.png", // Assurez-vous d'avoir une image par défaut
    notifications: [
        { id: 1, type: "note", message: "Nouvelle note en Mathématiques", date: "2024-04-15" },
        { id: 2, type: "devoir", message: "Nouveau devoir en Français", date: "2024-04-15" },
        { id: 3, type: "absence", message: "Absence justifiée du 12/04", date: "2024-04-14" }
    ]
};

// Fonction de changement de section mise à jour
function changeSection(sectionId) {
    const mainContent = document.querySelector('.dashboard-container');
    
    // Mise à jour du menu actif
    document.querySelectorAll('.sidebar nav a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
    
    // Contenu selon la section
    switch(sectionId) {
        case 'dashboard':
            mainContent.innerHTML = WELCOME_HTML;
            break;
            
        case 'edt':
            mainContent.innerHTML = generateEDT();
            break;
            
        case 'notes':
            mainContent.innerHTML = generateNotes();
            break;
            
        case 'devoirs':
            mainContent.innerHTML = generateDevoirs();
            break;
            
        case 'vie-scolaire':
            mainContent.innerHTML = generateVieScolaire();
            break;
            
        case 'messages':
            mainContent.innerHTML = generateMessages();
            break;
    }
}

// Fonctions de génération de contenu
function generateEDT() {
    const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const heures = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    
    let html = `
        <div class="edt-container">
            <div class="edt-header">
                <h2>Emploi du temps</h2>
                <div class="edt-controls">
                    <button class="btn-prev"><i class="fas fa-chevron-left"></i></button>
                    <div class="date-selector">
                        <span class="current-week">Semaine du 15 au 21 Avril 2024</span>
                        <select>
                            <option>Semaine 15 (8-14 Avril)</option>
                            <option selected>Semaine 16 (15-21 Avril)</option>
                            <option>Semaine 17 (22-28 Avril)</option>
                        </select>
                    </div>
                    <button class="btn-next"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
            <div class="edt-grid-container">
                <table class="edt-table">
                    <thead>
                        <tr>
                            <th class="time-column"></th>
                            ${jours.map(jour => `<th>${jour}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${heures.map(heure => `
                            <tr>
                                <td class="time-cell">${heure}</td>
                                ${jours.map(jour => {
                                    const cours = MOCK_DATA.EDT[jour]?.find(c => c.heure.startsWith(heure));
                                    if (cours) {
                                        return `
                                            <td class="cours-cell" data-matiere="${cours.matiere.toLowerCase()}">
                                                <div class="cours-content">
                                                    <div class="cours-matiere">${cours.matiere}</div>
                                                    <div class="cours-prof">${cours.prof}</div>
                                                    <div class="cours-salle">${cours.salle}</div>
                                                </div>
                                            </td>
                                        `;
                                    }
                                    return '<td></td>';
                                }).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    return html;
}

function generateNotes() {
    let html = `
        <div class="notes-container">
            <div class="notes-header">
                <h2>Notes et évaluations</h2>
                <div class="notes-filters">
                    <select class="periode-select">
                        <option>Année complète</option>
                        <option selected>2ème Semestre</option>
                        <option>1er Semestre</option>
                    </select>
                </div>
            </div>
            <div class="notes-summary">
                <div class="moyenne-generale">
                    <span class="label">Moyenne générale</span>
                    <span class="value">14.52</span>
                    <span class="classe-avg">Moyenne classe: 13.75</span>
                </div>
                <div class="stats-container">
                    <canvas id="notesChart"></canvas>
                </div>
            </div>
            <div class="notes-detail-container">
                <table class="notes-table">
                    <thead>
                        <tr>
                            <th>Matière</th>
                            <th>Évaluation</th>
                            <th>Note</th>
                            <th>Moyenne classe</th>
                            <th>Coefficient</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(MOCK_DATA.NOTES).map(([matiere, notes]) => 
                            notes.map(note => `
                                <tr>
                                    <td class="matiere">${matiere}</td>
                                    <td>${note.type}</td>
                                    <td class="note ${parseFloat(note.note) >= 15 ? 'excellent' : parseFloat(note.note) >= 12 ? 'bien' : parseFloat(note.note) >= 10 ? 'moyen' : 'insuffisant'}">${note.note}</td>
                                    <td>13.5/20</td>
                                    <td>1</td>
                                    <td>${note.date}</td>
                                </tr>
                            `).join('')
                        ).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    return html;
}

function generateDevoirs() {
    return `
        <div class="devoirs-container">
            <div class="devoirs-header">
                <h2>Travail à faire</h2>
                <div class="devoirs-filters">
                    <button class="active">Cette semaine</button>
                    <button>Semaine prochaine</button>
                    <button>Tout voir</button>
                </div>
            </div>
            <div class="devoirs-timeline">
                ${MOCK_DATA.DEVOIRS.map(devoir => `
                    <div class="devoir-item">
                        <div class="devoir-date">
                            <div class="date-pour">${new Date(devoir.pour_le).toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'})}</div>
                            <div class="date-donne">Donné le ${new Date(devoir.date_donnee).toLocaleDateString('fr-FR', {day: 'numeric', month: 'numeric'})}</div>
                        </div>
                        <div class="devoir-content">
                            <div class="devoir-matiere">${devoir.matiere}</div>
                            <div class="devoir-description">
                                <p>${devoir.contenu}</p>
                                <div class="devoir-ressources">
                                    <i class="fas fa-book"></i>
                                    <span>${devoir.ressources}</span>
                                </div>
                            </div>
                            <div class="devoir-status">
                                <label class="checkbox-container">
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                    Fait
                                </label>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateVieScolaire() {
    const vs = MOCK_DATA.VIE_SCOLAIRE;
    return `
        <div class="vie-scolaire-container">
            <div class="vs-header">
                <h2>Vie Scolaire</h2>
                <div class="vs-stats">
                    <div class="stat-item">
                        <span class="stat-value">${vs.absences.length}</span>
                        <span class="stat-label">Absences</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${vs.retards.length}</span>
                        <span class="stat-label">Retards</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${vs.observations.length}</span>
                        <span class="stat-label">Observations</span>
                    </div>
                </div>
            </div>
            <div class="vs-tabs">
                <button class="tab-btn active">Absences</button>
                <button class="tab-btn">Retards</button>
                <button class="tab-btn">Observations</button>
            </div>
            <div class="vs-content">
                <table class="vs-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Motif</th>
                            <th>Durée</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vs.absences.map(abs => `
                            <tr>
                                <td>${abs.date}</td>
                                <td>Absence</td>
                                <td>${abs.motif}</td>
                                <td>${abs.duree}</td>
                                <td><span class="status-badge ${abs.justifie ? 'justifie' : 'non-justifie'}">${abs.justifie ? 'Justifiée' : 'Non justifiée'}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function generateMessages() {
    return `
        <div class="messages-container">
            <div class="messages-header">
                <h2>Messagerie</h2>
                <div class="messages-actions">
                    <button class="btn-new-message">
                        <i class="fas fa-pen"></i>
                        Nouveau message
                    </button>
                    <div class="messages-search">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Rechercher...">
                    </div>
                </div>
            </div>
            
            <div class="messages-layout">
                <div class="messages-sidebar">
                    <div class="messages-folders">
                        <div class="folder active">
                            <i class="fas fa-inbox"></i>
                            Réception (${MOCK_DATA.MESSAGES.filter(m => !m.lu).length})
                        </div>
                        <div class="folder">
                            <i class="fas fa-paper-plane"></i>
                            Envoyés
                        </div>
                        <div class="folder">
                            <i class="fas fa-star"></i>
                            Important
                        </div>
                        <div class="folder">
                            <i class="fas fa-trash"></i>
                            Corbeille
                        </div>
                    </div>
                    
                    <div class="messages-filters">
                        <h3>Filtres</h3>
                        <div class="filter-group">
                            <label class="checkbox-container">
                                <input type="checkbox" checked>
                                <span class="checkmark"></span>
                                Non lus
                            </label>
                            <label class="checkbox-container">
                                <input type="checkbox" checked>
                                <span class="checkmark"></span>
                                Administration
                            </label>
                            <label class="checkbox-container">
                                <input type="checkbox" checked>
                                <span class="checkmark"></span>
                                Professeurs
                            </label>
                        </div>
                    </div>
                </div>

                <div class="messages-list">
                    ${MOCK_DATA.MESSAGES.map(msg => `
                        <div class="message-item ${msg.lu ? 'lu' : 'non-lu'}" data-id="${msg.id}">
                            <div class="message-status">
                                <i class="fas ${msg.lu ? 'fa-envelope-open' : 'fa-envelope'}"></i>
                            </div>
                            <div class="message-content">
                                <div class="message-sender">
                                    <span class="sender-name">${msg.expediteur}</span>
                                    <span class="message-date">${formatDate(msg.date)}</span>
                                </div>
                                <div class="message-subject">${msg.sujet}</div>
                                <div class="message-preview">${msg.contenu.substring(0, 100)}${msg.contenu.length > 100 ? '...' : ''}</div>
                            </div>
                            <div class="message-actions">
                                <button class="btn-icon" title="Marquer comme important">
                                    <i class="far fa-star"></i>
                                </button>
                                <button class="btn-icon" title="Supprimer">
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Fonction utilitaire pour formater les dates
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return `Aujourd'hui ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
        return `Hier ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    } else {
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Fonction pour générer le header
function generateHeader() {
    const header = document.querySelector('.top-header');
    if (header) {
        header.innerHTML = `
            <div class="search-bar">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Rechercher un cours, un devoir...">
            </div>
            
            <div class="header-actions">
                <div class="notifications-dropdown">
                    <button class="notifications-toggle">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">${USER_INFO.notifications.length}</span>
                    </button>
                    <div class="notifications-menu">
                        <div class="notifications-header">
                            <h3>Notifications</h3>
                            <button class="mark-all-read">Tout marquer comme lu</button>
                        </div>
                        <div class="notifications-list">
                            ${USER_INFO.notifications.map(notif => `
                                <div class="notification-item" data-type="${notif.type}">
                                    <div class="notification-icon">
                                        <i class="fas ${getNotificationIcon(notif.type)}"></i>
                                    </div>
                                    <div class="notification-content">
                                        <p>${notif.message}</p>
                                        <span class="notification-time">${formatNotificationDate(notif.date)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="notifications-footer">
                            <a href="#notifications">Voir toutes les notifications</a>
                        </div>
                    </div>
                </div>
                
                <div class="user-profile-dropdown">
                    <button class="profile-toggle">
                        <img src="${USER_INFO.avatar}" alt="Profile" class="user-avatar">
                        <div class="user-info">
                            <span class="user-name">${USER_INFO.nom}</span>
                            <span class="user-role">${USER_INFO.role} - ${USER_INFO.classe}</span>
                        </div>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="profile-menu">
                        <a href="#profile">
                            <i class="fas fa-user"></i>
                            Mon profil
                        </a>
                        <a href="#settings">
                            <i class="fas fa-cog"></i>
                            Paramètres
                        </a>
                        <div class="menu-divider"></div>
                        <a href="#logout" class="logout-link">
                            <i class="fas fa-sign-out-alt"></i>
                            Déconnexion
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        initializeHeaderEvents();
    }
}

// Fonctions utilitaires pour le header
function getNotificationIcon(type) {
    switch(type) {
        case 'note': return 'fa-graduation-cap';
        case 'devoir': return 'fa-book';
        case 'absence': return 'fa-calendar-times';
        default: return 'fa-bell';
    }
}

function formatNotificationDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Hier";
    return date.toLocaleDateString('fr-FR');
}

function initializeHeaderEvents() {
    // Toggle notifications
    const notifToggle = document.querySelector('.notifications-toggle');
    const notifMenu = document.querySelector('.notifications-menu');
    if (notifToggle && notifMenu) {
        notifToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            notifMenu.classList.toggle('show');
        });
    }

    // Toggle profile menu
    const profileToggle = document.querySelector('.profile-toggle');
    const profileMenu = document.querySelector('.profile-menu');
    if (profileToggle && profileMenu) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('show');
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.notifications-menu, .profile-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            changeSection(sectionId);
        });
    });

    // Afficher le dashboard par défaut
    changeSection('dashboard');
    generateHeader();
});

// Pour déboguer
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.message);
});

function handleLogout(event) {
    event.preventDefault();
    
    // Nettoyage des données de session
    sessionStorage.clear();
    
    // Redirection vers la page de login
    window.location.href = 'login.html';
}