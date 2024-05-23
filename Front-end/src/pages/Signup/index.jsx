import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Img, Text, Button, Heading } from "../../components";
import { useNavigate } from "react-router-dom";
import  { saveUrl } from "../url.jsx";

export function Input(props) {
  const [value, setValue] = useState(props.value);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <input
      onChange={handleChangeValue}
      type={props.type}
      name={props.name}
      value={value}
      placeholder={props.placeholder}
      className={props.className}
    />
  );
}

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matricule, setMatricule] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;


    if (!emailRegex.test(email)) {
      setError('Format d\'email invalide');
      return;
    }


    if (!passwordRegex.test(password)) {
      setError('Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre et un chiffre');
      return;
    }


    setError('');

    const userData = {
      matricule: 0,
      nom: lastName,
      prenom: firstName,
      email: email,
      motDePasse: password
    };

    try {
      const response = await fetch(saveUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to create account");
      }

      const responseData = await response.json(); // Parse response data as JSON
      const userMatricule = responseData.matricule;
      const prenom = responseData.prenom; 

      setMatricule(userMatricule);
      navigate(`/homepage?matricule=${userMatricule}&prenom=${prenom}`);

    } catch (error) {
      console.error("Error creating account:", error.message);
      setError("Error creating account: " + error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Créez votre compte - Rejoignez-nous aujourd'hui</title>
        <meta
         name="description"
         content="Inscrivez-vous pour accéder à des fonctionnalités exclusives. Inscrivez-vous avec votre nom complet, votre adresse e-mail et votre mot de passe pour créer votre compte. Déjà membre ? Connectez-vous maintenant !" />
      </Helmet>

      <div className="w-full bg-white-A700" style={{ height: "100vh", overflow: "hidden" }}>
        <div className="flex items-start border border-solid border-black-900 bg-white-A700 pr-[46px] md:flex-col md:pr-5" style={{ height: "100%" }}>
          <Img src="images/img_image_5.png" alt="image" className="h-[1029px] w-[48%] object-cover md:w-full" />

          <div className="ml-[149px] mt-[190px] flex w-[46%] flex-col items-center gap-[85px] md:ml-0 md:w-full md:gap-[63px] sm:gap-[42px]" style={{ height: "100%", overflowY: "hidden" }}>
            <a href="#">
              <Heading as="h1">Créer compte</Heading>
            </a>

            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-8 self-stretch">
              <Input
                shape="square"
                type="text"
                name="First Name Input"
                placeholder="Prénom"
                prefix={<Img src="images/img_lock.svg" alt="lock" className="h-[22px] w-[22px]" />}
                className="gap-2.5"
                value={firstName}
                onChange={(value) => setFirstName(value)}
              />

              <Input
                shape="square"
                type="text"
                name="Last Name Input"
                placeholder="Nom"
                prefix={<Img src="images/img_lock.svg" alt="lock" className="h-[22px] w-[22px]" />}
                className="gap-2.5"
                value={lastName}
                onChange={(value) => setLastName(value)}
              />

              <Input
                shape="square"
                type="email"
                name="Email Input"
                placeholder="Email"
                prefix={
                  <div className="flex h-[14px] w-[18px] items-center justify-center">
                    <Img src="images/img_lock_gray_500.svg" alt="lock" className="h-[14px] w-[18px]" />
                  </div>
                }
                className="gap-[11px]"
                value={email}
                onChange={(value) => setEmail(value)}
              />

              <Input
                shape="square"
                type="password"
                name="Password Input"
                placeholder="Mot de passe"
                prefix={
                  <div className="flex h-[14px] w-[18px] items-center justify-center">
                    <Img src="images/img_lock_gray_500.svg" alt="lock" className="h-[14px] w-[18px]" />
                  </div>
                }
                className="gap-[11px]"
                value={password}
                onChange={(value) => setPassword(value)}
              />

              {error && <Text className="text-red-500">{error}</Text>}
              <Button shape="round" className="w-full" type="submit">
                Créer un compte
              </Button>
          <Text className="ml-2.5 md:ml-0 flex items-center">
            <span className="text-gray-500">Vous avez déjà un compte ?&nbsp;</span>
            <span><Link to="/login" className="text-teal_200">Se connecter</Link></span>
          </Text>
            </form>
          </div>

          <Img
            src="images/img_header_logo.png"
            alt="header logo"
            className="ml-[100px] mt-[35px] h-[66px] w-[54px] object-contain md:ml-0"
          />
        </div>
      </div>
    </>
  );
}
