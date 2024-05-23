import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Img, Text, Button, Heading } from "../../components";
import Column from "../../components/Card";
import Header from "../../components/Header";
import "./index.css";
import { useNavigate } from "react-router-dom";


const data = [
  {
    image: "images/intj.png",
    personalityType: "Architecte",
    title: "INTJ",
    description: "Penseurs imaginatifs et stratèges, avec un plan pour tout.",
  },
  {
    image: "images/intp.png",
    personalityType: "Logicien",
    title: "INTP",
    description: "Inventeurs innovateurs démontrant une soif inextinguible de connaissances.",
    advantages: [
      "Créativité et originalité",
      "Capacité à résoudre des problèmes complexes",
      "Perspicacité et curiosité"
    ],
    disadvantages: [
      "Peut être perçu comme indifférent ou détaché",
      "Peut avoir du mal à suivre les routines",
      "Peut être trop critique envers soi-même"
    ]
  },
  {
    image: "images/entj.png",
    personalityType: "Commandant",
    title: "ENTJ",
    description: "Leaders hardis, imaginatifs et dotés d’un fort caractère.",
    advantages: [
      "Compétences de leadership naturelles",
      "Grande capacité à atteindre des objectifs",
      "Vision stratégique"
    ],
    disadvantages: [
      "Peut être perçu comme autoritaire ou dominateur",
      "Peut avoir du mal à déléguer des tâches",
      "Peut être impitoyable envers les autres"
    ]
  },
  {
    image: "images/entp.png",
    personalityType: "Innovateur",
    title: "ENTP",
    description: "Penseurs astucieux et curieux incapables de résister à un défi.",
    advantages: [
      "Créativité et esprit vif",
      "Capacité à penser de manière non conventionnelle",
      "Capacité à voir les opportunités"
    ],
    disadvantages: [
      "Peut être perçu comme insouciant ou imprévisible",
      "Peut avoir du mal à se concentrer sur une seule tâche",
      "Peut être perçu comme argumentatif ou provocateur"
    ]
  }
];


const Data2 = [
  {
    image: "images/infj.png",
    personalityType: "Avocat",
    title: "INFJ",
    description: "Idéalistes calmes et mystiques, très inspirants et infatigables."
  },
  {
    image: "images/infp.png",
    personalityType: "Médiateur",
    title: "INFP",
    description: "Personnes poétiques, gentilles, prêtes à soutenir une bonne cause."
  },
  {
    image: "images/enfj.png",
    personalityType: "Protagoniste",
    title: "ENFJ",
    description: "Leaders charismatiques et inspirants, capables de fasciner leur public."
  },
  {
    image: "images/enfp.png",
    personalityType: "Inspirateur",
    title: "ENFP",
    description: "Esprits libres, créatifs, trouvant toujours une raison de sourire."
  }
];

const Data3 = [
  {
    image: "images/istj.png",
    personalityType: "Logisticien",
    title: "ISTJ",
    description: "Pragmatiques et intéressés par les faits, dont le sérieux n'est pas mis en cause."
  },
  {
    image: "images/isfj.png",
    personalityType: "Défenseur",
    title: "ISFJ",
    description: "Très dévoués et très chaleureux, prêts à défendre ceux qu’ils aiment."
  },
  {
    image: "images/estj.png",
    personalityType: "Directeur",
    title: "ESTJ",
    description: "Excellents gestionnaires, efficaces à gérer les choses, ou les gens."
  },
  {
    image: "images/esfj.png",
    personalityType: "Consul",
    title: "ESFJ",
    description: "Attentionnées, sociables et populaires, prêtes à aider les autres."
  }
];

const Data4 = [
  {
    image: "images/istp.png",
    personalityType: "Virtuose",
    title: "ISTP",
    description: "Expérimentateurs hardis et pragmatiques, maîtres d’outils."
  },
  {
    image: "images/isfp.png",
    personalityType: "Aventurier",
    title: "ISFP",
    description: "Artistes flexibles et charmants, prêts à explorer et à essayer le nouveau."
  },
  {
    image: "images/estp.png",
    personalityType: "Entrepreneur",
    title: "ESTP",
    description: "Astucieuses, énergiques et très perspicaces, qui aiment vivre à la pointe du progrès."
  },
  {
    image: "images/esfp.png",
    personalityType: "Amuseur",
    title: "ESFP",
    description: "Amuseurs spontanés, énergiques et enthousiastes; avec eux, on ne s’ennuie jamais."
  }
];



export default function Homepage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matricule = searchParams.get("matricule");
  const prenom = searchParams.get("prenom");
  return (
    <> 

<div className="flex w-full flex-col gap-[29px] bg-gray-50 py-8 sm:py-5">
        {/* header section */}
        <Header matricule={matricule} prenom={prenom} className="ml-[58px] flex w-[61%] items-start justify-between gap-5 md:ml-0 md:w-full md:flex-col md:p-5" />
        <div>
          {/* main content section */}
          <div className="mb-[57px] mt-[-16px] flex flex-col items-center">
            <div className="relative h-[704px] self-stretch md:h-auto">
              <div className="w-full">
           
            <div className="relative z-[1] flex bg-color  sm:p-5">
                  <Heading
                    className="w-full text-center leading-[50px] mt-7 !text-white-A700"
                    >
                      Découvrez-vous.
                            <br />
                            Découvrez la carrière parfaite pour vous
                            <Link to={{
                              pathname: '/test',
                              search: `?matricule=${matricule}&prenom=${prenom}`,
                            }}>
                                    <Button
                                shape="round"
                                className=" min-w-[77px] mt-4 mx-auto px-5 h-10 text-sm !rounded-[29px] font-medium tracking-[0.50px] sm:px-2"
                              
                              >
                                Commencez ici
                              </Button> 
                            </Link>
                                
                  </Heading>
                
                </div>
                 <Img
                src="images/img_group_12.png"
                alt="imagethree"
                className=" bottom-0 right-[14%] top-0 z-[2] h-[70%]"
              />
              </div>
              
              <Text
            size="md"
            as="p"
            className="mt-[102px] mx-auto w-[70%] text-center leading-[15px] !text-gray-800 md:w-full md:p-5"
          >
            <span className="text-[50px] font-bold text-gray-800">
              <>
                Curieux sur le MBTI ? <br />
              </>
            </span>
            <span className="text-[31px] font-normal text-gray-800">Découvrez les types de personnalités</span>
          </Text>
          
          <h1 className="font-bold mx-auto mt-[30px] flex w-[83%] md:flex-col md:p-5">Analystes</h1>
          <div className="mx-auto mt-[30px] flex w-[85%] gap-[5] md:flex-col md:p-5">
            {data.map((d, index) => (
              <Column
                key={`${index}`}
                image={d.image}
                personalityType={d.personalityType}
                title={d.title}
                description={d.description}
                className="mx-auto flex h-96 w-72 flex-col items-center rounded-lg border border-solid border-gray-400 bg-gray-50_01 shadow-xs py-5"
              />
            ))}
          </div>

          <h1 className="font-bold mx-auto mt-[30px] flex w-[83%] md:flex-col md:p-5">Diplomates</h1>
          <div className="mx-auto mt-[30px] flex w-[85%] gap-[5] md:flex-col md:p-5">
          {Data2.map((d, index) => (
            <Column
              key={`${index}`}
              image={d.image}
              personalityType={d.personalityType}
              title={d.title}
              description={d.description}
              className="mx-auto flex h-96 w-72 flex-col items-center rounded-lg border border-solid border-gray-400 bg-4F9B7C text-white shadow-xs py-5" style={{ backgroundColor: '#F8FCF4' }}
            />
          ))}
        </div>

        <h1 className="font-bold mx-auto mt-[30px] flex w-[83%] md:flex-col md:p-5">Explorateurs</h1>
        <div className="mx-auto mt-[30px] flex w-[85%] gap-[5] md:flex-col md:p-5">
          {Data3.map((d, index) => (
            <Column
              key={`${index}`}
              image={d.image}
              personalityType={d.personalityType}
              title={d.title}
              description={d.description}
              className="mx-auto flex h-96 w-72 flex-col items-center rounded-lg border border-solid border-gray-400 bg-4F9B7C text-white shadow-xs py-5" style={{ backgroundColor: '#F0FBFB' }}
            />
          ))}
        </div>

        <h1 className="font-bold mx-auto mt-[30px] flex w-[83%] md:flex-col md:p-5">Sentinelles</h1>
        <div className="mx-auto mt-[30px] flex w-[85%] gap-[5] md:flex-col md:p-5">
          {Data4.map((d, index) => (
            <Column
              key={`${index}`}
              image={d.image}
              personalityType={d.personalityType}
              title={d.title}
              description={d.description}
              className="mx-auto flex h-96 w-72 flex-col items-center rounded-lg border border-solid border-gray-400 bg-4F9B7C text-white shadow-xs py-5" style={{ backgroundColor: '#FFFDF2' }}
            />
          ))}
        </div>

          {/* call to action section */}
          <div className="mt-[234px] flex flex-col items-center gap-[39px] self-stretch">
            
                <Link to={{
                        pathname: '/test',
                        search: `?matricule=${matricule}&prenom=${prenom}`,
                        }}>
                    <Button shape="round" className=" min-w-[77px] mt-4 mx-auto px-5 h-10 text-sm !rounded-[29px] font-medium tracking-[0.50px] sm:px-2">
                      Passez le test
                    </Button>
                </Link>
            <Img
              src="images/img_footer_desktop_1.png"
              alt="footerdesktop"
              className="h-[388px] w-full object-cover md:h-auto"
            />
          </div>

          {/* footer section */}
          <div className="mx-auto mt-[194px] flex w-[40%] flex-col items-center gap-[54px] md:w-full md:p-5 sm:gap-[27px]">
              <div className="flex flex-wrap justify-between gap-9 ">
                <a href="#">
                  <Text size="s" as="p" className="text-sm tracking-[0.50px] !text-black-900">
                    Contact{" "}
                  </Text>
                </a>
                <a href="#">
                  <Text size="s" as="p" className="text-sm tracking-[0.50px] !text-black-900">
                    Termes & Conditions
                  </Text>
                </a>
                <a href="#">
                  <Text size="s" as="p" className=" text-sm tracking-[0.50px] !text-black-900">
                    A propos de nous
                  </Text>
                </a>
              </div>
              <div className="flex w-[27%] items-center justify-center gap-8 md:w-full">
                <Img src="images/img_ic_baseline_facebook.svg" alt="icbaseline" className="h-[30px] w-[30px]" />
                <Img src="images/img_mdi_instagram.svg" alt="mdiinstagram" className="h-[30px] w-[30px]" />
                <Img src="images/img_pajamas_twitter.svg" alt="pajamastwitter" className="h-[25px] w-[25px]" />
              </div>
            </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}