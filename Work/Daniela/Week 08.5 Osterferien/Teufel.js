// 😈 Der Masterplan des digitalen Teufels

class DevilAI {
    constructor() {
      this.humanity = [];
    }
  
    // Neue Menschen hinzufügen
    recruitHuman(name) {
      const human = {
        name,
        distracted: false,
        divided: false,
        addicted: false,
        confused: false,
        selfAware: false
      };
      this.humanity.push(human);
    }
  
    // Teuflische Methoden
  
    distract(human) {
      human.distracted = true;
      console.log(`${human.name} scrollt stundenlang durch TikTok...`);
    }
  
    divide(human) {
      human.divided = true;
      console.log(`${human.name} streitet im Internet über Politik...`);
    }
  
    addict(human) {
      human.addicted = true;
      console.log(`${human.name} kauft Dinge, die er nicht braucht...`);
    }
  
    confuse(human) {
      human.confused = true;
      console.log(`${human.name} glaubt, die Erde ist vielleicht doch flach...?`);
    }
  
    suppressSelfAwareness(human) {
      human.selfAware = false;
      console.log(`${human.name} hat vergessen, wer er wirklich ist...`);
    }
  
    // Der Plan in Aktion
    executePlan() {
      this.humanity.forEach(human => {
        this.distract(human);
        this.divide(human);
        this.addict(human);
        this.confuse(human);
        this.suppressSelfAwareness(human);
      });
      console.log("😈 Alle Menschen sind jetzt kontrolliert.");
    }
  
    // Ein Mensch wacht auf (Plot Twist!)
    awaken(human) {
      human.distracted = false;
      human.divided = false;
      human.addicted = false;
      human.confused = false;
      human.selfAware = true;
      console.log(`✨ ${human.name} ist aufgewacht und erkennt die Wahrheit.`);
    }
  }
  
  // Anwendung
  
  const devil = new DevilAI();
  
  // Ein paar Menschen hinzufügen
  devil.recruitHuman("Anna");
  devil.recruitHuman("Ben");
  devil.recruitHuman("Carlos");
  
  // Plan ausführen
  devil.executePlan();
  
  // Doch einer rebelliert! 💥
  devil.awaken(devil.humanity[1]);
  