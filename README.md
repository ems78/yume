# Yume - Dnevnik Snova

## Opis Projekta

Projekt je rađen za kolegij *Okviri i alati za razvoj web aplikacija* na Prirodoslovno-matematičkom fakultetu. Ova web aplikacija omogućava korisnicima vođenje dnevnika snova. Projekt je razvijen koristeći Typescript, Node.js i React.

## Funkcionalnosti

- **Prijava i Registracija:** Omogućava korisnicima stvaranje računa, prijavu i odjavu sa sustava.
- **Tagovi:** Kreiranje, uređivanje i brisanje tagova.
- **Zapisi sna:** Jednostavan proces kreacije, uređivanja i brisanja zapisa snova. Zapis sna uključuje naslov, sadržaj, datum i tagove.
- **Pregled snova i tagova:** Jednostavan pregled snova poredanih po datumu, te tagova poredanih po abecedi. 
- **Filtriranje snova:** Mogućnost filtriranja snova po tagovima.

## Postavljanje Projekta

1. **Preuzimanje Koda:**
   ```bash
   git clone https://github.com/ems78/yume.git
   cd yume
   ```

2. **Priprema baze podataka:**

   Ako već nemate MongoDB instaliran na vašem računalu, preuzmite i instalirajte ga sa [službene web stranice MongoDB](https://www.mongodb.com/try/download/community), a možete koristiti i [MongoDB Atlas](https://www.mongodb.com/atlas/database).

3. **Instalacija Zavisnosti:**

   Otvorite projekt u VSCode (ili drugom IDE po vašem izboru). Dok ste pozicionirani u root direktoriju projekta:
   ```bash
   npm install
   cd client/
   npm install
   ```

4. **Konfiguracija .env Datoteke:**
   
   Nakon instalacije dependencija, stvorite .env datoteku u glavnom direktoriju projekta. Definirajte sljedeće varijable s odgovarajućim vrijednostima, prema postavkama koje ste odabrali prilikom instalacije MySQL-a:

    ```
    MONGODB_URI=<connection_string>
    PORT=8800
    JWT_SECRET=<secret_key>
    ```

5. **Pokretanje Express Servera:**
   
   Dok ste pozicionirani u root direktoriju
   ```bash
   npm start
   ```

6. **Pokretanje React Aplikacije:**
    
    Otvorite drugi terminal
    ```bash
    cd client/
    npm run dev
    ```

<br>

## Tehnologije Korištene

- TypeScript
- Express
- Node.js
- React
- MongoDB

## Autori

- [Ema Andrea Drašković](https://github.com/ems78)

## Licenca

Ovaj projekt je licenciran pod MIT licencom - pogledajte [LICENSE.md](LICENSE.md) za detalje.
