export interface TTSPort {
  speak(text: string): void;
  cancel?(): void;
  init?(): void;
}

// TTS - Text to Speech
export class TTS implements TTSPort {
  private voices: SpeechSynthesisVoice[] = [];
  private initialized = false;

  constructor() {
    // Inicializa vozes após interação do usuário,
    document.addEventListener("click", this.init.bind(this), { once: true });
    document.addEventListener("keydown", this.init.bind(this), { once: true });
    document.addEventListener("mousemove", this.init.bind(this), {
      once: true,
    });
  }

  init() {
    if (this.initialized) return;
    this.voices = window.speechSynthesis.getVoices();
    if (this.voices.length === 0) {
      // Espera evento voiceschanged
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
        this.initialized = true;
        console.info("TTS vozes carregadas:", this.voices);
      };
    } else {
      this.initialized = true;
      console.info("TTS vozes carregadas:", this.voices);
    }
  }

  speak(text: string) {
    if (!("speechSynthesis" in window)) {
      console.warn("TTS não suportado neste navegador");
      return;
    }

    if (!this.initialized) {
      console.warn("TTS não inicializado, aguarde interação do usuário");
      return;
    }

    if (window.speechSynthesis.speaking) {
      console.info("TTS ocupado, aguardando próxima chamada");
      return;
    }

    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    u.lang = "pt-BR";

    const voiceBR = this.voices.find((v) => v.lang.startsWith("pt-BR"));
    if (voiceBR) u.voice = voiceBR;

    console.info("TTS speaking:", text);
    window.speechSynthesis.speak(u);
  }

  cancel() {
    window.speechSynthesis.cancel();
  }
}
