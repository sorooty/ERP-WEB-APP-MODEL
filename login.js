let currentProfile = '';

function selectProfile(profile) {
    currentProfile = profile;
    const loginForm = document.getElementById('loginForm');
    const loginTitle = document.getElementById('loginTitle');
    const profileSelector = document.querySelector('.profile-selector');
    
    // Définir le titre en fonction du profil
    switch(profile) {
        case 'admin':
            loginTitle.innerHTML = 'Administration <i class="fas fa-user-shield"></i>';
            break;
        case 'teacher':
            loginTitle.innerHTML = 'Espace Enseignant <i class="fas fa-chalkboard-teacher"></i>';
            break;
        case 'student':
            loginTitle.innerHTML = 'Espace Élève <i class="fas fa-user-graduate"></i>';
            break;
        case 'parent':
            loginTitle.innerHTML = 'Espace Parent <i class="fas fa-users"></i>';
            break;
    }

    // Cacher le sélecteur de profil et montrer le formulaire
    profileSelector.style.display = 'none';
    loginForm.classList.remove('hidden');
    setTimeout(() => {
        loginForm.classList.add('visible');
    }, 50);
}

function showProfiles() {
    const loginForm = document.getElementById('loginForm');
    const profileSelector = document.querySelector('.profile-selector');
    
    loginForm.classList.remove('visible');
    setTimeout(() => {
        loginForm.classList.add('hidden');
        profileSelector.style.display = 'grid';
    }, 300);
}

function handleLogin(event) {
    event.preventDefault();
    
    // Récupération des valeurs du formulaire
    const username = event.target.querySelector('input[type="text"]').value;
    const password = event.target.querySelector('input[type="password"]').value;
    
    // Simulation de connexion (pour la démo)
    const loadingButton = event.target.querySelector('button');
    loadingButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
    
    // Simulation d'authentification
    setTimeout(() => {
        // Stockage des informations utilisateur en session
        const userInfo = getUserInfoByProfile(currentProfile, username);
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        // Redirection vers la page principale
        window.location.href = 'index.html';
    }, 1500);
    
    return false;
}

// Fonction pour générer les informations utilisateur selon le profil
function getUserInfoByProfile(profile, username) {
    const baseInfo = {
        username: username,
        avatar: 'avatar.png',
        notifications: [
            { id: 1, type: 'message', message: 'Bienvenue sur ECOLSYSTEM', date: new Date().toISOString() }
        ]
    };

    switch(profile) {
        case 'admin':
            return {
                ...baseInfo,
                role: 'Administration',
                fullName: 'M. ' + username,
                permissions: ['all']
            };
        case 'teacher':
            return {
                ...baseInfo,
                role: 'Enseignant',
                fullName: 'Prof. ' + username,
                matieres: ['Mathématiques', 'Physique']
            };
        case 'student':
            return {
                ...baseInfo,
                role: 'Élève',
                fullName: username,
                classe: 'Terminale S2'
            };
        case 'parent':
            return {
                ...baseInfo,
                role: 'Parent',
                fullName: 'M/Mme ' + username,
                enfants: ['Élève 1', 'Élève 2']
            };
        default:
            return baseInfo;
    }
}

// Animation du logo au chargement
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.login-logo');
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
    }, 300);
}); 