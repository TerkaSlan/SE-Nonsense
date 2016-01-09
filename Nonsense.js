(function() {
  // random number generator from http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
  var DATA;

  function hash (data) {
    var h, i, n;

    n = 0xefc8249d;

    data = data.toString();

    for (i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  }

  // private random helper
  function rnd () {
    var t = 2091639 * this.s0 + this.c * Math.random(); // 2^-32

    this.c = t | 0;
    this.s0 = this.s1;
    this.s1 = this.s2;
    this.s2 = t - this.c;
    return this.s2;
  }

  function Nonsense () {
    this.sow.apply(this, arguments);
  }

  Nonsense.prototype.sow = function () {
    var i, seeds, seed;

    this.s0 = hash(' ');
    this.s1 = hash(this.s0);
    this.s2 = hash(this.s1);
    this.c = 1;

    seeds = Array.prototype.slice.call(arguments);

    for (i = 0; seed = seeds[i++];) {
      this.s0 -= hash(seed);
      this.s0 += ~~(this.s0 < 0);

      this.s1 -= hash(seed);
      this.s1 += ~~(this.s1 < 0);

      this.s2 -= hash(seed);
      this.s2 += ~~(this.s2 < 0);
    }
  };


  Nonsense.prototype.uint32 = function () {
    return rnd.apply(this) * 0x100000000; // 2^32
  };

  Nonsense.prototype.fract32 = function () {
    return rnd.apply(this) + (rnd.apply(this) * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };

  Nonsense.prototype.bool = function () {
    return this.uint32() & 0x1 ? true : false;
  };

  Nonsense.prototype.integer = function() {
    return this.uint32();
  };

  Nonsense.prototype.frac = function() {
    return this.fract32();
  };

  Nonsense.prototype.real = function() {
    return this.uint32() + this.fract32();
  };

  Nonsense.prototype.integerInRange = function(min, max) {
    return Math.floor(this.realInRange(min, max));
  };

  Nonsense.prototype.realInRange = function(min, max) {
    min = min || 0;
    max = max || 0;
    return this.frac() * (max - min) + min;
  };

  Nonsense.prototype.pick = function(ary) {
    return ary[this.integerInRange(0, ary.length)];
  };

  Nonsense.prototype.gender = function () {
    random = this.integerInRange(0,3);

    switch(random){
      case 0:
          return 'male'
          break;
      case 1:
          return 'female'
          break;
      case 2:
          return 'neutral'
          break;
    }
    //return this.bool() ? 'N' : 'G';
  };

  Nonsense.prototype.buzzPhrase = function(pad) {
    gender_1 = this.gender();
    gender_2 = this.gender();
    random = this.integerInRange(0,22);
    switch(random){

      case 0:
        return "" + (this.pick(DATA.N.nouns[gender_1]) + " " + this.pick(DATA.G.nouns[gender_1]) + " Je " + this.pick(DATA.N.adjectives[gender_2]) + " " + this.pick(DATA.N.nouns[gender_2]));
        break;
      case 1:
        return "" + (this.pick(DATA.N.adjectives[gender_1]) + " " + this.pick(DATA.N.nouns[gender_1]) + " Sa Vytvára Z " + this.pick(DATA.G.adjectives[gender_2]) + " " + this.pick(DATA.G.nouns[gender_2]));
        break;
      case 2:
        return "" + (this.pick(DATA.N.nouns[gender_1]) + " " + this.pick(DATA.G.nouns[gender_1]) + " Sa Používa Vrámci " + this.pick(DATA.G.adjectives[gender_2]) + " " + this.pick(DATA.G.nouns[gender_2]));
        break;  
      case 3:
        return "" + (this.pick(DATA.N.nouns['female']) + " Vykonaná " + this.pick(DATA.advebrs) + " Ťaží Z " + this.pick(DATA.G.nouns['female']));
        break;  
      case 4:
        return "" + ("Súčasťou " + this.pick(DATA.G.adjectives[gender_1]) + " " + this.pick(DATA.G.nouns[gender_1]) + " Je " + this.pick(DATA.N.nouns[gender_2]));
        break; 
      case 5:
        return "" + (this.pick(DATA.N.adjectives[gender_1]) + " " + this.pick(DATA.N.nouns[gender_1]) + " Prebieha V Dobe " + this.pick(DATA.G.adjectives[gender_2]) + " " + this.pick(DATA.G.nouns[gender_2]));
        break; 
      case 6:
        return "" + ("Optimalizáciou " + this.pick(DATA.G.nouns[gender_1]) + " Sa Zlepší " + this.pick(DATA.N.adjectives[gender_2]) + " " + this.pick(DATA.N.nouns[gender_2]));
        break;  
      case 7:
        return "" + ("Podstatou " + this.pick(DATA.G.adjectives[gender_1]) + " " + this.pick(DATA.G.nouns[gender_1]) + " Je " + this.pick(DATA.N.adjectives[gender_2]) + " " + this.pick(DATA.N.nouns[gender_2]));
        break;
      case 8:
        return "" + ("Účelom " + this.pick(DATA.G.adjectives[gender_1]) + " " + this.pick(DATA.G.nouns[gender_1]) + " Je "  + this.pick(DATA.N.adjectives[gender_2]) + " " + this.pick(DATA.N.nouns[gender_2]));
        break; 
      case 9:
        return "" + (this.pick(DATA.N.adjectives[gender_1]) + " " + this.pick(DATA.N.nouns[gender_1]) + " Je Z Hľadiska " + this.pick(DATA.G.nouns[gender_2]) + " " + this.pick(DATA.N.adjectives[gender_1]));
        break;
      case 10:
        return "" + ("Postupný " + this.pick(DATA.N.nouns['male']) + " Udržuje " + this.pick(DATA.N.adjectives['neutral']) + " " + this.pick(DATA.N.nouns['neutral']));
        break;
      case 11:
        return "" + ("Zaistenie " + this.pick(DATA.G.adjectives[gender_1]) + " " + this.pick(DATA.G.nouns[gender_1]) + " Čerpá Z " + this.pick(DATA.G.adjectives[gender_2]) + " " + this.pick(DATA.G.nouns[gender_2]));
        break;        
      case 12:
        return "" + ("Cieľom " + this.pick(DATA.G.adjectives[gender_1]) + " " + this.pick(DATA.G.nouns[gender_1]) + " Je Stanoviť Si " + this.pick(DATA.N.adjectives['male']) + " " + this.pick(DATA.N.nouns['male']));
        break;
      case 13:
        return "" + (this.pick(DATA.N.adjectives[gender_1]) + " " + this.pick(DATA.N.nouns[gender_1]) + " Prináša Lepšie Zvládnuteľný " + " " + this.pick(DATA.N.nouns['male']));
        break;
      case 14:
        return "" + (this.pick(DATA.N.adjectives[gender_1]) + " " + this.pick(DATA.N.nouns[gender_1]) + " Slúži K Ujasneniu Koncepcie " + this.pick(DATA.G.adjectives[gender_2]) + " " + this.pick(DATA.G.nouns[gender_2]));
        break;
      case 15:
        return "" + (this.pick(DATA.N.adjectives['neutral']) + " " + this.pick(DATA.N.nouns['neutral']) + " Obsahuje Okrem " + this.pick(DATA.G.adjectives['female']) + " " + this.pick(DATA.G.nouns['female']) + " aj " + this.pick(DATA.N.adjectives['male']) + " " + this.pick(DATA.N.nouns['male']));
        break;
      case 16:
        return "" + (this.pick(DATA.N.adjectives['male']) + " " + this.pick(DATA.N.nouns['male']) + " Predstavuje " + this.pick(DATA.N.adjectives['neutral']) + " " + this.pick(DATA.N.nouns['neutral']));
        break;
      case 17:
        return "" + (this.pick(DATA.N.adjectives[gender_1]) + " " + this.pick(DATA.N.nouns[gender_1]) + " Vyjadruje Množstvo " + this.pick(DATA.G.adjectives[gender_2]) + " " + this.pick(DATA.G.nouns[gender_2]));
        break;
      case 18:
        return "" + (" Vzťah Medzi " + this.pick(DATA.I.adjectives[gender_1]) + " " + this.pick(DATA.I.nouns[gender_1]) + " A " + this.pick(DATA.I.adjectives[gender_2]) + " " + this.pick(DATA.I.nouns[gender_2]) + " Je Vyjadrený Z " + this.pick(DATA.G.adjectives[gender_2]) + " " + this.pick(DATA.G.nouns[gender_2]));
        break;
      case 19:
        return "" + (this.pick(DATA.N.adjectives[gender_1]) + " " + this.pick(DATA.N.nouns[gender_1]) + " Sa Prejavuje " + this.pick(DATA.I.adjectives[gender_2]) + " " + this.pick(DATA.I.nouns[gender_2]));
        break;
      case 20:
        return "" + (this.pick(DATA.N.adjectives['female']) + " " + this.pick(DATA.N.nouns['female']) + " Je Reprezentovaná " + this.pick(DATA.I.adjectives[gender_2]) + " " + this.pick(DATA.I.nouns[gender_2]));
        break;
      case 21:
        return "" + (this.pick(DATA.N.adjectives[gender_1]) + " " + this.pick(DATA.N.nouns[gender_1]) + " Spolu S " + this.pick(DATA.I.nouns[gender_2]) + " Tvoria Základ " + this.pick(DATA.G.adjectives[gender_2]) + " " + this.pick(DATA.G.nouns[gender_2]));
        break;
        // vztah medzi --- sa nazyva ---. sa prejavuje, je reprezentovaná,   -- I -- 
        // hladanie -- G -- viedlo k -- D -- 
    }
  };

  // Dataset  -----------------------------------------------------------------
  DATA = {
    N: {
      nouns: {
        
        male: [
        "Objekt", "Projekt", "ER Diagram", "Človek", "Produkt", "Počet",
        "Proces", "Návrh", "Manuál", "Prípad", "Model", "Systém", "Dátový Typ", "Jazyk UML",
        "CASE", "Životný Cyklus", "Outsourcing", "Cieľ", "Súhrn Vlastností", "Požiadavok Na Vývojový Proces", "Zákazník",
        "Stakeholder", "Syndróm 90% Hotovo", "Syndróm Druhého Systému", "Prototyp", "SCRUM",
        "Atribút", "Stav objektu", "Polymorfizmus", "Prípad Užitia", "Balíček", "Relatívny Objekt",
        "Poblém", "Rozvoj", "Vzor", "Internet", "Prostriedok", "UML", "Prístup", "Algoritmus", "RUP", 
        "Framework", "Analytik", "Manažment", "Aspekt", "Tok", "Uživateľ", "Patent", "Copyright", 
        "Reflexívny Vzťah"
        ],

        female: [
        "Trieda", "Kvalita", "Kríza", "Agilita", "Komponenta", "Špecifikácia", "Funkcia", "Metodológia", "Metodika",
        "Údržba", "Správa Verzií", "Metrika", "Znovupoužiteľnosť", "Formálna Verifikácia", "Správnosť", "Efektívnosť", "Bezpečnosť",
        "Tvorba Dokumentácie", "Zložitosť", "Integrácia", "Implementácia", "Iterácia", "Spolupráca", "Identita", "Dedičnosť",
        "Mohutnosť vzťahu", "Kompozícia", "Agregácia", "Závislosť", "Relácia <include>", "Analýza", "Verifikácia", "Validácia",
        "Refraktorizácia", "Spätná Väzba", "Licencia", "Etapa", "Ochrana", "Podpora", "Komunita", "Miera Stupňa", "Schopnosť", 
        "Príručka", "Potreba", "Oprava", "Použiteľnosť", "Prenositeľnosť", "Interoperabilita", "Platforma", "Udržovateľnosť", 
        "Dokumentovanosť", "Náchylnosť", "Práca V Tíme", "Dekompozícia",
        "Prevádzka", "Inštalácia", "Konfigurácia", "Umelá Inteligencia", "Aplikácia", "Prax",
        "Znalosť", "Procedúra", "Testovateľnosť", "Nestálosť", "Stratégia", "Business Potreba",
        "Vizualizácia", "Databáza", "Interakcia", "Inicializácia", "Deformácia", "Inštancia", "Entita", "Entitná Množina", "Vzťahová Množina", 
        ],

        neutral: [
        "Užitie", "Inžinierstvo", "Testovanie", "Dodržanie", "Akceptačné Testovanie", "Riadenie", "Zavedenie", "Zahájenie",
        "Rozhranie", "Zapuzdrenie", "Pozorovanie", "Kritérium", "Programovanie", "Autorské Právo", "Obchodné Tajomstvo",
        "Nasadenie", "Intelektuálne Vlastníctvo", "Predlžovanie", "Využívanie", "Vybavenie", "Riziko", "Kódovanie", 
        "Zaškolenie Uživateľov", "Generovanie", "Združenie"
        ]
      },
      
      adjectives: {
        
        male: [
        "Objektovo-orientovaný", "Abstraktný", "Agilný", "Softwarový", "Maximálny", "Štrukturálny",
        "Predikovateľný", "Vývojový", "Zdrojový", "Odľahčený", "Architektonický", "Vhodný", "Špirálový",
        "Staticky typovaný", "Rozsiahly", "Výsledný", "Klasický", "Odvodený", "Generický", "Lineárny", "Vodopádový", 
        "Absolútny", "Open-source", "Distribuovaný", "Požadovaný", "Neucelený", "Nerealistický", "Sekvenčný", "Iteratívny",
        "Stabilný", "Technologický", "Grafický", "Exaktný", "Externý", "Interný", "Konzistentný"
        ],

        female: [
        "Objektovo-orientovaná", "Abstraktná","Agilná", "Softwarová", "Maximálna", "Predikovateľná", "Vývojová", "Zdrojová",
        "Odľahčená", "Architektonická", "Vhodná", "Špirálová", "Štrukturálna", "Rozsiahla", "Výsledná", 'Klasická', "Lineárna", 
        "Odvodená", "Generická", "Funkcionálna", "Logická", "Imperatívna", "Požadovaná", "Neucelená", "Nerealistická", "Sekvenčná", 
        "Iteratívna", "Stabilná",

        ],

        neutral: [
        "Objektovo-orientované", "Abstraktné", "Agilné", "Softwarové", "Maximálne", "Predikovateľné", "Vývojové", "Zdrojové",
        "Odľahčené", "Architektonické", "Vhodné", "Špirálové", "Štrukturálne", "Rozsiahle", "Výsledné", "Klasické", "Lineárne", 
        "Odvodené", "Generické", "Paralelné", "Distribuované", "Open-source", "Požadované", "Neucelené", "Nerealistické", "Sekvenčné", 
        "Iteratívne", "Stabilné", "Technologické", "Regresné", 

        ]
      }
    },

    G: {
      nouns: {
        male: [
        "Typu", "Objektu", "Projektu", "ER Diagramu", "Človeka", "Produktu", "Počtu",
        "Procesu", "Návrhu", "Manuálu", "Modelu", "Životného Cyklu", "Outsourcingu", "Požiadavku Na Vývojový Proces",
        "Cieľa", "Súhrnu Vlastností", "Zákazníka", "Stakeholdera", "Syndrómu 90% Hotovo", "Prototypu",
        "Syndrómu Druhého Systému", "Atribútu", "Stavu objektu", "Polymorfizmu", "Prípadu Užitia", "Balíčku",
        "Relatívneho Objektu", "Poblému", "Rozvoja", "Vzoru", "Internetu", "Prostriedku", "UML", "Prístupu", "Algoritmu", "RUPu", "Frameworku", "Analytika",
        "Manažmentu", "Aspektu", "Toku", "Uživateľa", "Reflexívneho Vzťahu", "Patentu", "Copyrightu", 
        ],
        female: [
        "Triedy", "Kvality", "Krízy", "Agility","Komponenty", "Špecifikácie", "Funkcie", "Metodológie", "Metodiky",
        "Údržby", "Správy Verzií", "Metriky", "Znovupoužiteľnosti", "Správnosti", "Efektívnosti", "Bezpečnosti",
        "Tvorby Dokumentácie", "Zložitosti", "Integrácie", "Implementácie", "Iterácie", "Spolupráce", "Identity",
        "Dedičnosti", "Mohutnosti vzťahu", "Kompozície", "Agregácie", "Závislosti", "Relácie <include>", "Analýzy",
        "Verifikácie", "Validácie", "Refraktorizácie", "Spätnej Väzby", "Licencie", "Etapy", "Ochrany", "Podpory", 
        "Komunity", "Miery Stupňa", "Schopnosti", "Príručky", "Potreby", "Opravy", "Použiteľnosti", "Prenositeľnosti", 
        "Interoperability", "Platformy", "Udržovateľnosti", "Dokumentovanosti", "Náchylnosti", "Práce V Tíme", "Dekompozície",
        "Prevádzky", "Inštalácie", "Konfigurácie", "Umelej Inteligencie", "Aplikácie", "Praxe",
        "Znalosti", "Procedúry", "Testovateľnosti", "Nestálosti", "Stratégie", "Business Potreby",
        "Vizualizácie", "Databázy", "Interakcie", "Inicializácie", "Deformácie", "Inštancie", "Entity", "Entitnej Množiny", "Vzťahovej Množiny", 
        ],
        neutral: [
        "Užitia", "Inžinierstva", "Testovania", "Dodržania", "Akceptačného Testovania", "Riadenia", "Zavedenia", "Zahájenia",
        "Rozhrania", "Zapuzdrenia", "Pozorovania", "Kritéria", "Programovania", "Autorského Práva", "Obchodného Tajomstva",
        "Nasadenia", "Intelektuálneho Vlastníctva", "Predlžovania", "Využívania", "Rizika", "Kódovania", "Zaškolenia Uživateľov", 
        "Generovania", "Združenia", 
        ]
      },
      adjectives: {
        
        male: [
        "Objektovo-orientovaného", "Abstraktného","Agilného","Softwarového", "Maximálneho", "Predikovateľného", "Vývojového", "Zdrojového",
        "Odľahčeného", "Architektonického", "Vhodného", "Špirálového", "Štrukturálneho", "Staticky typovaného", 
        "Rozsiahleho", "Výsledného", 'Klasického', "Odvodeného", "Generického", "Lineárneho", "Vodopádového",
        "Absolútneho", "Open-source", "Distribuovaného", "Požadovaného", "Neuceleného", "Nerealistického", "Sekvenčného", "Iteratívneho",
        "Stabilného", "Technologického", "Grafického", "Exaktného", "Externého", "Interného", "Konzistentného" 
        ],

        female: [
        "Objektovo-orientovanej", "Abstraktnej","Agilnej", "Softwarovej", "Maximálnej", "Predikovateľnej", "Vývojovej", "Zdrojovej",
        "Odľahčenej", "Architektonickej", "Vhodnej", "Špirálovej", "Štrukturálnej", "Rozsiahlej", "Výslednej", 'Klasickej', 
        "Odvodenej", "Generickej", "Lineárnej", "Funkcionálnej", "Logickej", "Imperatívnej", "Požadovanej", "Neucelenej", "Nerealistickej", 
        "Sekvenčnej", "Iteratívnej", "Stabilnej",
        ],

        neutral: [
        "Objektovo-orientovaného", "Abstraktného", "Agilného", "Softwarového", "Maximálneho", "Predikovateľného", "Vývojového", "Zdrojového",
        "Odľahčeného", "Architektonického", "Vhodného", "Špirálového", "Štrukturálneho", "Rozsiahleho", "Výsledného", 'Klasického', 
        "Odvodeného", "Generického", "Lineárneho", "Vodopádového", "Absolútneho", "Open-source", "Distribuovaného", "Požadovaného", 
        "Neuceleného", "Nerealistického", "Sekvenčného", "Iteratívneho", "Stabilného", "Technologického", "Grafického", "Exaktného", 
        "Externého", "Interného", "Konzistentného", "Paralelného", "Regresného", 
        ]
      }
    },

    I: {
      nouns: {
        
        male: [
        "Objektom", "Projektom", "ER Diagramom", "Človekom", "Produktom", "Počtom",
        "Procesom", "Návrhom", "Manuálom", "Prípadom", "Modelom", "Systémom", "Dátovým Typom", "Jazykom UML",
        "CASEom", "Životným Cyklom", "Outsourcingom", "Cieľom", "Súhrnom Vlastností", "Požiadavkom Na Vývojový Proces", "Zákazníkom",
        "Stakeholderom", "Syndróm 90% Hotovo", "Syndróm Druhého Systému", "Prototyp", "SCRUM",
        "Atribútom", "Stavom objektu", "Polymorfizmom", "Prípadom Užitia", "Balíčekom", "Relatívnym Objektom",
        "Poblémom", "Rozvojom", "Vzorom", "Internetom", "Prostriedkom", "UML-kom", "Prístupom", "Algoritmom", "RUPom", 
        "Frameworkom", "Analytikom", "Manažmentom", "Aspektom", "Tokom", "Uživateľom", "Patentom", "Copyrightom", 
        "Reflexívnym Vzťahom"
        ],

        female: [
        "Triedou", "Kvalitou", "Krízou", "Agilitou", "Komponentou", "Špecifikáciou", "Funkciou", "Metodológiou", "Metodikou",
        "Údržbou", "Správou Verzií", "Metrikou", "Znovupoužiteľnosťou", "Formálna Verifikáciou", "Správnosťou", "Efektívnosťou", "Bezpečnosťou",
        "Tvorbou Dokumentácie", "Zložitosťou", "Integráciou", "Implementáciou", "Iteráciou", "Spoluprácoua", "Identitou", "Dedičnosťou",
        "Mohutnosťou vzťahu", "Kompozíciou", "Agregáciou", "Závislosťou", "Reláciou <include>", "Analýzou", "Verifikáciou", "Validáciou",
        "Refraktorizáciou", "Spätnou Väzbou", "Licenciou", "Etapou", "Ochranou", "Podporou", "Komunitou", "Mierou Stupňa", "Schopnosťou", 
        "Príručkou", "Potrebou", "Opravou", "Použiteľnosťou", "Prenositeľnosťou", "Interoperabilitou", "Platformou", "Udržovateľnosťou", 
        "Dokumentovanosťou", "Náchylnosťou", "Prácou V Tíme", "Dekompozíciou",
        "Prevádzkou", "Inštaláciou", "Konfiguráciou", "Umelou Inteligenciou", "Aplikáciou", "Praxou",
        "Znalosťou", "Procedúrou", "Testovateľnosťou", "Nestálosťou", "Stratégiou", "Business Potrebou",
        "Vizualizáciou", "Databázou", "Interakciou", "Inicializáciou", "Deformáciou", "Inštanciou", "Entitou", "Entitnou Množinou", "Vzťahovou Množinou", 
        ],

        neutral: [
        "Užitím", "Inžinierstvom", "Testovaním", "Dodržaním", "Akceptačným Testovaním", "Riadením", "Zavedením", "Zahájením",
        "Rozhraním", "Zapuzdrením", "Pozorovaním", "Kritériom", "Programovaním", "Autorským Právom", "Obchodným Tajomstvom",
        "Nasadením", "Intelektuálnym Vlastníctvom", "Predlžovaním", "Využívaním", "Vybavením", "Rizikom", "Kódovaním", 
        "Zaškolením Uživateľov", "Generovaním", "Združením"
        ]
      },
      
      adjectives: {
        
        male: [
        "Objektovo-orientovaným", "Abstraktným", "Agilným", "Softwarovým", "Maximálnym", "Štrukturálnym",
        "Predikovateľným", "Vývojovým", "Zdrojovým", "Odľahčeným", "Architektonickým", "Vhodným", "Špirálovým",
        "Staticky typovaným", "Rozsiahlym", "Výsledným", "Klasickým", "Odvodeným", "Generickým", "Lineárnym", "Vodopádovým", 
        "Absolútnym", "Open-source", "Distribuovaný", "Požadovaným", "Neuceleným", "Nerealistickým", "Sekvenčným", "Iteratívnym",
        "Stabilným", "Technologickým", "Grafickým", "Exaktným", "Externým", "Interným", "Konzistentným"
        ],

        female: [
        "Objektovo-orientovanou", "Abstraktnou","Agilnou", "Softwarovou", "Maximálnou", "Predikovateľnou", "Vývojovou", "Zdrojovou",
        "Odľahčenou", "Architektonickou", "Vhodnou", "Špirálovou", "Štrukturálnou", "Rozsiahlou", "Výslednou", 'Klasickou', "Lineárnou", 
        "Odvodenou", "Generickou", "Funkcionálnou", "Logickou", "Imperatívnou", "Požadovanou", "Neucelenou", "Nerealistickou", "Sekvenčnou", 
        "Iteratívnou", "Stabilnou",

        ],

        neutral: [
        "Objektovo-orientovaným", "Abstraktným", "Agilným", "Softwarovým", "Maximálnym", "Predikovateľným", "Vývojovým", "Zdrojovým",
        "Odľahčeným", "Architektonickým", "Vhodným", "Špirálovým", "Štrukturálnym", "Rozsiahlym", "Výsledným", "Klasickým", "Lineárnym", 
        "Odvodeným", "Generickým", "Paralelným", "Distribuovaným", "Open-source", "Požadovaným", "Neuceleným", "Nerealistickým", "Sekvenčným", 
        "Iteratívnym", "Stabilným", "Technologickým", "Regresným", 

        ]
      }
    },

    advebrs: [
      "Zhora-dole", "Zdola-hore", "Rýchlo", "Kvalitne", "Chybne", "Na Ľudí", "Na Procesy", "Efektívne", "Dodatočne", "Presne", 
      "Intenzívne", "Zrozumiteľne", 
    ]
  };

  if (typeof module !== 'undefined') {
    module.exports = Nonsense;
  } else if (typeof define == 'function') {
    define(function () {
      return Nonsense;
    });
  } else {
    this.Nonsense = Nonsense;
  }
}).call(this);