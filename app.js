/**
 * Dashboard CEO ODIA HOLDING
 * Logique Alpine.js pour affichage dynamique
 */

function dashboard() {
    return {
        data: {},
        filtreFiliale: null,
        loading: true,
        error: null,

        async init() {
            try {
                const response = await fetch('data.json');
                if (!response.ok) throw new Error('Erreur chargement data.json');
                this.data = await response.json();
                this.loading = false;
            } catch (err) {
                this.error = err.message;
                this.loading = false;
                console.error('Erreur chargement dashboard:', err);
            }
        },

        // Filiales principales (sans les enfants)
        get filialesPrincipales() {
            return (this.data.filiales || []).filter(f => !f.parent);
        },

        // Missions filtrees par filiale
        get missionsFiltered() {
            const missions = this.data.missionsActives || [];
            if (!this.filtreFiliale) return missions;
            return missions.filter(m => m.filiale === this.filtreFiliale);
        },

        // Obtenir la couleur d'une filiale
        getCouleurFiliale(filialeId) {
            const filiale = (this.data.filiales || []).find(f => f.id === filialeId);
            return filiale ? filiale.couleur : '#6B7280';
        },

        // Calculer le pourcentage de progression
        getProgression(progressionStr) {
            if (!progressionStr) return 0;
            const [done, total] = progressionStr.split('/').map(Number);
            if (!total) return 0;
            return Math.round((done / total) * 100);
        },

        // Formater une date
        formatDate(dateStr) {
            if (!dateStr) return '-';
            return dateStr;
        }
    };
}
