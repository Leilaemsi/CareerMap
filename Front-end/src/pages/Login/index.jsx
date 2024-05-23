import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Img, Text, Button, Heading } from "../../components";
import { useNavigate } from "react-router-dom";
import  { loginUrl } from "../url.jsx";

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matricule, setMatricule] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

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
      email: email,
      motDePasse: password
    };

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to sign in");
      }

      const userMatricule = responseData.utilisateur.matricule;
      const prenom = responseData.utilisateur.prenom;

      setMatricule(userMatricule);
      console.log("User matricule:", userMatricule);

      navigate(`/homepage?matricule=${userMatricule}&prenom=${prenom}`);

    } catch (error) {
      console.error("Error signing in:", error.message);
      setError("Error signing in: " + error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion - Accédez à votre compte</title>
        <meta
          name="description"
          content="Connectez-vous à votre compte en utilisant votre adresse e-mail et votre mot de passe. Pas encore de compte ? Créez-en un aujourd'hui et rejoignez notre communauté !"
        />
      </Helmet>

      {/* main navigation section */}
      <div className="w-full bg-white-A700" style={{ height: "100vh", overflow: "hidden" }}>
        {/* sign in section */}
        <div className="flex items-start bg-white-A700 pr-[87px] md:flex-col md:pr-5" style={{ height: "100%" }}>
          {/* profile image section */}
          <Img src="images/img_image_5.png" alt="image five" className="h-[1029px] w-[48%] object-cover md:w-full" />

          {/* authentication area section */}
          <div className="ml-[146px] mt-56 flex w-[46%] flex-col items-center gap-[81px] md:ml-0 md:w-full md:gap-[60px] sm:gap-10" style={{ height: "100%", overflowY: "hidden" }}>
            <a href="#">
              {/* sign in link section */}
              <Heading as="h1">Se connecter</Heading>
            </a>

            {/* credentials form section */}
            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-[38px] self-stretch">
              {/* email input section */}
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
                className="gap-[11px] sm:pr-5"
                value={email}
                onChange={handleEmailChange}
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
                className="gap-[11px] sm:pr-5"
                value={password}
                onChange={handlePasswordChange}
              />

              {error && <Text className="text-red-500">{error}</Text>}

              {/* sign in button section */}
              <Button shape="round" className="w-full sm:px-5" type="submit">
                Se connecter
              </Button>

              {/* account creation prompt section */}
              <Text className="ml-2.5 md:ml-0 flex items-center">
                <span className="text-gray-500">Pas encore de compte ?&nbsp;</span>
                <span><Link to="/signup" className="text-teal_200">S'inscrire</Link></span>
              </Text>
            </form>
          </div>

          {/* logo section */}
          <Img
            src="images/img_header_logo.png"
            alt="header logo"
            className="ml-[100px] mt-[35px] h-[66px] w-[54px] object-contain md:ml-0"
          />
        </div>
      </div>
    </>
  );
};

