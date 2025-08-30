export interface TTSPort {
  speak(text: string): void;
  cancel?(): void;
}
