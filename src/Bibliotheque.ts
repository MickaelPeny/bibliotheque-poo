import { Emprunteur } from "./Emprunteur";
import { Livre } from "./Livre";
import { TransactionEmprunt } from "./TransactionEmprunt";

export class Bibliotheque {
  private livres: Livre[] = [];
  private transactions: TransactionEmprunt[] = [];

  ajouterLivre(livre: Livre): void {
    this.livres.push(livre);
  }

  afficherLivresDisponibles(): void {
    const disponibles = this.livres.filter((livre) => livre.dispo);
    if (disponibles.length === 0) {
      console.log("Aucun livre n'est disponible actuellement.");
    } else {
      console.log("Livres disponibles :");
      disponibles.forEach((livre) =>
        console.log(`- ${livre.titre} par ${livre.auteur}`)
      );
    }
  }

  rechercherLivre(titre: string): Livre | undefined {
    return this.livres.find(
      (livre) => livre.titre.toLowerCase() === titre.toLowerCase()
    );
  }

  effectuerEmprunt(livre: Livre, emprunteur: Emprunteur): void {
    if (!livre.dispo) {
      console.log(`Le livre "${livre.titre}" n'est pas disponible.`);
      return;
    }

    if (emprunteur.getNombreEmprunts() >= 3) {
      console.log(`${emprunteur.nom} ne peut pas emprunter plus de 3 livres.`);
      return;
    }

    livre.dispo = false;

    emprunteur.emprunterLivre(livre);

    const transaction = new TransactionEmprunt(livre, emprunteur, 14);
    this.transactions.push(transaction);

    console.log(`Transaction enregistrée :`);
    transaction.afficherDetails();
  }

  retournerLivre(livre: Livre, emprunteur: Emprunteur): void {
    const rendu = emprunteur.rendreLivre(livre.titre);

    if (rendu.startsWith(emprunteur.nom)) {
      livre.dispo = true;
      console.log(`Le livre "${livre.titre}" a été rendu avec succès.`);
    } else {
      console.log(rendu);
    }
  }

  afficherTransactions(): void {
    if (this.transactions.length === 0) {
      console.log("Aucune transaction d'emprunt enregistrée.");
    } else {
      console.log("Historique des transactions :");
      this.transactions.forEach((transaction) => transaction.afficherDetails());
    }
  }
}
