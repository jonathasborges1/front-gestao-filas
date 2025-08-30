import type { TTSPort } from "./tts.port";

export class WebSpeechTTS implements TTSPort {
  speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    u.lang = "pt-BR";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
  cancel() {
    window.speechSynthesis?.cancel();
  }
}
