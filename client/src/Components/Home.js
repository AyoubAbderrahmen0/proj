import React from 'react';

const Home = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" 
         style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/96/79/17/360_F_296791724_6vV3Vp4RkK8igEa56GCvDD3XodpMZZGV.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="text-center text-white">
        <h1 className="display-4">Bienvenue sur notre site !</h1>
        <p className="lead">Ceci est la page d'accueil. Profitez de votre visite !</p>
      </div>
    </div>
  );
};

export default Home;
