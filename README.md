# Pokémon Card Collection Manager

> Frontend eindproject voor de Full Stack Developer Bootcamp bij NOVI — succesvol afgerond en behaald.

## Inhoudsopgave

* [Inleiding](#inleiding)
* [Belangrijkste functionaliteiten](#belangrijkste-functionaliteiten)
* [Screenshots](#screenshots)
* [Gebruikte technieken en frameworks](#gebruikte-technieken-en-frameworks)
* [Project lokaal opzetten](#project-lokaal-opzetten)
* [Configuratie](#configuratie)
* [Inloggen](#inloggen)
* [Beschikbare npm commando’s](#beschikbare-npm-commandos)

---

## Inleiding

De Pokémon Card Collection Manager is een webapplicatie waarmee gebruikers Pokémon kaarten kunnen zoeken, bekijken en beheren in een persoonlijke digitale collectie.

Het doel van de applicatie is om verzamelaars een duidelijk overzicht te geven van hun kaarten en de actuele waarde van hun collectie.

---

## Belangrijkste functionaliteiten

* Account aanmaken en inloggen via de NOVI Dynamic API
* Pokémon kaarten zoeken op naam
* Detailinformatie per kaart bekijken
* Kaarten toevoegen aan een persoonlijke collectie
* Kaarten verwijderen uit de collectie
* Live prijsinformatie bekijken (alleen voor ingelogde gebruikers)
* Totale waarde van de collectie berekenen
* Responsive design voor desktop, tablet en mobiel

---

## Screenshots

<p align="center">
  <img src="./src/assets/screenshot-homepage.png" width="49%" alt="Pokémon Card Collection Manager homepage">
  <img src="./src/assets/screenshot-collection.png" width="49%" alt="Pokémon Card Collection Manager collection page">
</p>

---

## Gebruikte technieken en frameworks

Deze applicatie is ontwikkeld met de volgende technieken:

* React
* React Router DOM
* Context API
* CSS / Flexbox / Media Queries
* Axios
* Vite
* NOVI Dynamic API
* Local Storage

---

## Project lokaal opzetten

Volg onderstaande stappen om het project lokaal op te zetten.

### 1. Repository clonen

```bash
git clone https://github.com/RemcoKuipers/pokemon-app.git
```

### 2. Navigeer naar de projectmap

```bash
cd pokemon-app
```

### 3. Dependencies installeren

```bash
npm install
```

### 4. Project starten

```bash
npm run dev
```


---

## Configuratie

Deze applicatie gebruikt de NOVI Dynamic API.

Het JSON-configuratiebestand voor de NOVI API is toegevoegd aan het project.

---

## Inloggen

Via de registratiepagina kan een nieuw account worden aangemaakt. Na het inloggen krijgt de gebruiker toegang tot de persoonlijke collectie en aanvullende functionaliteiten.

---

## Beschikbare npm commando’s

### Project starten

```bash
npm run dev
```

Start de development server.

### Productie build maken

```bash
npm run build
```

Maakt een productieversie van de applicatie.

### Preview build

```bash
npm run preview
```

Preview van de productie build lokaal.

### Linting

```bash
npm run lint
```

Controleert de code op mogelijke fouten en code style issues.
---

### Linting

npm run lint

Controleert de code op mogelijke fouten en code style issues.

