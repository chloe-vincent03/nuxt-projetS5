<template>
  <div>
    <MTitle as="h1" size="large" >Page d'acceuil</MTitle>
    <MTitle as="h2" size="medium" >Page d'acceuil</MTitle>
    <MTitle as="h3" size="small" >Page d'acceuil</MTitle>
    <div>
      <MButton size="tiny" variant="default">Click me</MButton>
      <MButton size="small" variant="default">Click me </MButton>
      <MButton size="default" variant="default">Click me</MButton>
      <MButton size="large" variant="default">Click me</MButton>
    </div>
    <div>
      <MButton size="tiny" variant="outline">Click me</MButton>
      <MButton size="small" variant="outline">Click me</MButton>
      <MButton size="default" variant="outline">Click me</MButton>
      <MButton size="large" variant="outline">Click me</MButton>
    </div>
    <div>
      <MLabbel placeholder="Géraldine" type="text" size="small" >Prénom (type: text size: small)</MLabbel>
      <MLabbel variant="success" placeholder="Dubois" type="text" size="default" >Nom (type: text size: default)</MLabbel>
      <MLabbel variant="error" placeholder="bonjour.." type="text" size="large" >text (type: text size: large)</MLabbel>
      <MLabbel variant="default" placeholder="cdcaef@gmeil.com" type="email" size="default" >Ton adress mail</MLabbel>
      <MLabbel variant="default" placeholder="1245795" type="number" size="default" >Ton numero</MLabbel>
      <MLabbel variant="default" placeholder="1234ABC" type="password"  size="default">Password</MLabbel>
      <MLabbel variant="default" placeholder="noel" type="search"  size="default">faite une recherche</MLabbel>
    </div>

    <MLoginForm/>
  </div>
</template>