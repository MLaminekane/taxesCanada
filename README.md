## Convertisseur et calculateur de taxes

### Installation et configuration

1. Clonez le repository
2. Installez les dépendances : `npm install`
3. Copiez le fichier d'environnement : `cp .env.example .env`
4. Obtenez une clé API gratuite sur [ExchangeRate-API](https://app.exchangerate-api.com/sign-up)
5. Ajoutez votre clé API dans le fichier `.env` :
   ```
   VITE_EXCHANGE_RATE_API_KEY=votre_cle_api_ici
   ```
6. Lancez l'application : `npm run dev`

### Variables d'environnement

- `VITE_EXCHANGE_RATE_API_KEY` : Clé API pour les taux de change (obligatoire pour le convertisseur de devises)