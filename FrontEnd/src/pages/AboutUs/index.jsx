import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import { Img, Text, Button, Heading } from "../../components"; 

const AboutUs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matricule = searchParams.get("matricule");
  const prenom = searchParams.get("prenom");

  return (
    <>
      <div className="flex w-full flex-col gap-3 bg-gray-50 py-8 sm:py-5">
        <Header matricule={matricule} prenom={prenom} className="ml-[58px] flex  items-start justify-between gap-5 md:ml-0 md:w-full md:flex-col " />
        <div style={{ display: 'flex', height: '150vh', position: 'relative' }}>
          <div style={{ flex: 1, backgroundColor: '#B9AFC4' }}>
            <img src={process.env.PUBLIC_URL + '/images/team.png'} alt="Team" style={{ width: '80%', margin: 'auto' }} />
          </div>
          <div style={{ flex: 1, backgroundColor: '#B9AFC4', position: 'absolute', top: '50%', bottom: 10, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)', transform: 'translateY(45%)' }}>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)', textAlign: 'center', margin: '20px 0' }}>Découvrez votre avenir avec éclat grâce à CareerMap</p>
            <p style={{ color: 'white', textAlign: 'center', margin: '20px', fontSize: '16px', width: '70%', margin: 'auto' }}>Nous sommes une équipe passionnée d'innovateurs, déterminée à aider les étudiants à naviguer avec assurance dans le dédale des choix d'orientation universitaire et professionnelle. Notre mission est d'offrir une solution personnalisée et efficace, fondée sur le MBTI, pour orienter les étudiants vers des carrières qui résonnent avec leur personnalité et leurs aspirations.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
