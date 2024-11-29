(() => {
  // src/TransactionEmprunt.ts
  var TransactionEmprunt = class {
    livre;
    emprunteur;
    dateEmprunt;
    dateRetourPrevue;
    constructor(livre, emprunteur2, dureeEmpruntEnJours) {
      this.livre = livre;
      this.emprunteur = emprunteur2;
      this.dateEmprunt = /* @__PURE__ */ new Date();
      this.dateRetourPrevue = /* @__PURE__ */ new Date();
      this.dateRetourPrevue.setDate(
        this.dateEmprunt.getDate() + dureeEmpruntEnJours
      );
    }
    afficherDetails() {
      console.log(`Transaction d'emprunt :
      Livre : ${this.livre.titre}
      Emprunteur : ${this.emprunteur.nom}
      Date d'emprunt : ${this.dateEmprunt.toLocaleDateString()}
      Date de retour pr\xE9vue : ${this.dateRetourPrevue.toLocaleDateString()}`);
    }
  };

  // src/Bibliotheque.ts
  var Bibliotheque = class {
    livres = [];
    transactions = [];
    ajouterLivre(livre) {
      this.livres.push(livre);
    }
    afficherLivresDisponibles() {
      const disponibles = this.livres.filter((livre) => livre.dispo);
      if (disponibles.length === 0) {
        console.log("Aucun livre n'est disponible actuellement.");
      } else {
        console.log("Livres disponibles :");
        disponibles.forEach(
          (livre) => console.log(`- ${livre.titre} par ${livre.auteur}`)
        );
      }
    }
    rechercherLivre(titre) {
      return this.livres.find(
        (livre) => livre.titre.toLowerCase() === titre.toLowerCase()
      );
    }
    effectuerEmprunt(livre, emprunteur2) {
      if (!livre.dispo) {
        console.log(`Le livre "${livre.titre}" n'est pas disponible.`);
        return;
      }
      if (emprunteur2.getNombreEmprunts() >= 3) {
        console.log(`${emprunteur2.nom} ne peut pas emprunter plus de 3 livres.`);
        return;
      }
      livre.dispo = false;
      emprunteur2.emprunterLivre(livre);
      const transaction = new TransactionEmprunt(livre, emprunteur2, 14);
      this.transactions.push(transaction);
      console.log(`Transaction enregistr\xE9e :`);
      transaction.afficherDetails();
    }
    retournerLivre(livre, emprunteur2) {
      const rendu = emprunteur2.rendreLivre(livre.titre);
      if (rendu.startsWith(emprunteur2.nom)) {
        livre.dispo = true;
        console.log(`Le livre "${livre.titre}" a \xE9t\xE9 rendu avec succ\xE8s.`);
      } else {
        console.log(rendu);
      }
    }
    afficherTransactions() {
      if (this.transactions.length === 0) {
        console.log("Aucune transaction d'emprunt enregistr\xE9e.");
      } else {
        console.log("Historique des transactions :");
        this.transactions.forEach((transaction) => transaction.afficherDetails());
      }
    }
  };

  // src/Emprunteur.ts
  var Emprunteur = class {
    constructor(nom, email, livresEmpruntes = []) {
      this.nom = nom;
      this.email = email;
      this.livresEmpruntes = livresEmpruntes;
    }
    emprunterLivre(livre) {
      if (this.livresEmpruntes.length >= 3) {
        return `${this.nom} ne peut pas emprunter plus de 3 livres(c'est balo)`;
      }
      this.livresEmpruntes.push(livre);
      return `${this.nom} a emprunt\xE9 le livre ${livre.titre}`;
    }
    rendreLivre(titre) {
      const index = this.livresEmpruntes.findIndex(
        (livre) => livre.titre === titre
      );
      if (index !== -1) {
        const livreRendu = this.livresEmpruntes.splice(index, 1)[0];
        return `${this.nom} a rendu le livre ${livreRendu.titre}`;
      }
      return `${this.nom} n'a pas emprunt\xE9 le livre ${titre}`;
    }
    getNombreEmprunts() {
      return this.livresEmpruntes.length;
    }
    afficherLivresEmpruntes() {
      if (this.livresEmpruntes.length === 0) {
        console.log(`${this.nom} n'a emprunt\xE9 aucun livre`);
      } else {
        console.log(`Livre emprunt\xE9 par ${this.nom} : `);
        this.livresEmpruntes.forEach((livre) => {
          console.log(`${livre.titre}`);
        });
      }
    }
  };

  // src/Livre.ts
  var Livre = class {
    constructor(titre, auteur, anneePublication, dispo) {
      this.titre = titre;
      this.auteur = auteur;
      this.anneePublication = anneePublication;
      this.dispo = dispo;
    }
    emprunter() {
      if (this.dispo) {
        this.dispo = false;
        return `Le livre ${this.titre} a \xE9t\xE9 emprunt\xE9 avec succ\xE9s`;
      } else {
        throw new Error(`Le livre ${this.titre} est d\xE9j\xE0 emprunter`);
      }
    }
    rendre() {
      if (!this.dispo) {
        this.dispo = true;
        return `Le livre ${this.titre} a \xE9t\xE9 rendu avec succz\xE9s`;
      } else {
        throw new Error(`Le livre${this.titre} est d\xE9j\xE0 dispo.`);
      }
    }
  };

  // src/index.ts
  var bibliotheque = new Bibliotheque();
  var livre1 = new Livre("1984", "George Orwell", 1949, true);
  var livre2 = new Livre(
    "Le Petit Prince",
    "Antoine de Saint-Exup\xE9ry",
    1943,
    true
  );
  bibliotheque.ajouterLivre(livre1);
  bibliotheque.ajouterLivre(livre2);
  bibliotheque.afficherLivresDisponibles();
  var emprunteur = new Emprunteur("Alice", "alice@example.com");
  bibliotheque.effectuerEmprunt(livre1, emprunteur);
  bibliotheque.afficherLivresDisponibles();
  bibliotheque.retournerLivre(livre1, emprunteur);
  bibliotheque.afficherLivresDisponibles();
  bibliotheque.afficherTransactions();
})();
