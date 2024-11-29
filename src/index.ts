import { Bibliotheque } from "./Bibliotheque";
import { Emprunteur } from "./Emprunteur";
import { Livre } from "./Livre";

const bibliotheque = new Bibliotheque();

const livre1 = new Livre("1984", "George Orwell", 1949, true);
const livre2 = new Livre(
  "Le Petit Prince",
  "Antoine de Saint-Exupéry",
  1943,
  true
);
bibliotheque.ajouterLivre(livre1);
bibliotheque.ajouterLivre(livre2);

bibliotheque.afficherLivresDisponibles();

const emprunteur = new Emprunteur("Alice", "alice@example.com");

bibliotheque.effectuerEmprunt(livre1, emprunteur);
bibliotheque.afficherLivresDisponibles();

bibliotheque.retournerLivre(livre1, emprunteur);
bibliotheque.afficherLivresDisponibles();

bibliotheque.afficherTransactions();
