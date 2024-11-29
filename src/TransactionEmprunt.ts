import { Emprunteur } from "./Emprunteur";
import { Livre } from "./Livre";

export class TransactionEmprunt {
  public livre: Livre;
  public emprunteur: Emprunteur;
  public dateEmprunt: Date;
  public dateRetourPrevue: Date;

  constructor(
    livre: Livre,
    emprunteur: Emprunteur,
    dureeEmpruntEnJours: number
  ) {
    this.livre = livre;
    this.emprunteur = emprunteur;
    this.dateEmprunt = new Date();
    this.dateRetourPrevue = new Date();
    this.dateRetourPrevue.setDate(
      this.dateEmprunt.getDate() + dureeEmpruntEnJours
    );
  }

  afficherDetails(): void {
    console.log(`Transaction d'emprunt :
      Livre : ${this.livre.titre}
      Emprunteur : ${this.emprunteur.nom}
      Date d'emprunt : ${this.dateEmprunt.toLocaleDateString()}
      Date de retour prévue : ${this.dateRetourPrevue.toLocaleDateString()}`);
  }
}
