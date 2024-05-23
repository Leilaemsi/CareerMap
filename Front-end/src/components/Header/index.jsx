import React from "react";
import { Button, Text, Img } from "./..";
import "./header.css"; // Importez le fichier CSS
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matricule = searchParams.get("matricule");
  const prenom = searchParams.get("prenom");

  return (
    <header style={{ marginTop: '-17px' }} className="px-10 flex items-center justify-between gap-5">
      {/* Image au début */}
      <Img src="images/img_header_logo.png" alt="headerlogo" className="h-full w-9 object-cover" />
      
      {/* Liens au milieu */}
      <ul className="flex items-center gap-9">
        <li>
          <Link to={`/homepage?matricule=${matricule}&prenom=${prenom}`} className="cursor-pointer">
            <Text size="sm" as="p" className="text-sm tracking-[-0.50px+] !text-black-900">Accueil</Text>
          </Link>
        </li>
        <li>
        <Link to={`/test?matricule=${matricule}&prenom=${prenom}`} className="cursor-pointer">
            <Text size="sm" as="p" className="text-sm !font-normal tracking-[-0.50px] !text-black-900">Passez le Test</Text>
          </Link>
        </li>
        <li>
        <Link to={`/about?matricule=${matricule}&prenom=${prenom}`} className="cursor-pointer">
            <Text size="sm" as="p" className="text-sm !font-normal tracking-[-0.50px] !text-black-900">A propos de nous</Text>
          </Link>
        </li>
      </ul>
      
      {/* Bouton à la fin */}
      <Button color="purple_400_01" size="sm" shape="round" className="font-medium h-8 text-sm"
           onClick={() => navigate(`/login`)}>
        Déconnexion
      </Button>
    </header>
  );
}
