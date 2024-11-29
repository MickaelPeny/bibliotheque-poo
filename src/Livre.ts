export class Livre {
  constructor(
    public titre: string,
    public auteur: string,
    public anneePublication: number,
    public dispo: boolean
  ) {}

  emprunter() {
    if (this.dispo) {
      this.dispo = false;
      return `Le livre ${this.titre} a été emprunté avec succés`;
    } else {
      throw new Error(`Le livre ${this.titre} est déjà emprunter`);
    }
  }

  rendre() {
    if (!this.dispo) {
      this.dispo = true;
      return `Le livre ${this.titre} a été rendu avec succzés`;
    } else {
      throw new Error(`Le livre${this.titre} est déjà dispo.`);
    }
  }
}
