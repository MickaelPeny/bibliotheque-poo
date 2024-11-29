import { Livre } from "./Livre";

export class Emprunteur {
  constructor(
    public nom: string,
    public email: string,
    private livresEmpruntes: Livre[] = []
  ) {}

  emprunterLivre(livre: Livre): string {
    if (this.livresEmpruntes.length >= 3) {
      return `${this.nom} ne peut pas emprunter plus de 3 livres(c'est balo)`;
    }

    this.livresEmpruntes.push(livre);
    return `${this.nom} a emprunté le livre ${livre.titre}`;
  }

  rendreLivre(titre: string): string {
    const index = this.livresEmpruntes.findIndex(
      (livre) => livre.titre === titre
    );

    if (index !== -1) {
      const livreRendu = this.livresEmpruntes.splice(index, 1)[0];
      return `${this.nom} a rendu le livre ${livreRendu.titre}`;
    }
    return `${this.nom} n'a pas emprunté le livre ${titre}`;
  }

  getNombreEmprunts(): number {
    return this.livresEmpruntes.length;
  }

  afficherLivresEmpruntes(): void {
    if (this.livresEmpruntes.length === 0) {
      console.log(`${this.nom} n'a emprunté aucun livre`);
    } else {
      console.log(`Livre emprunté par ${this.nom} : `);

      this.livresEmpruntes.forEach((livre) => {
        console.log(`${livre.titre}`);
      });
    }
  }
}
