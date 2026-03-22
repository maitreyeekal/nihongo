// Audio engine for Nihongo learning platform
// Web Speech API wrapper for Japanese text-to-speech

let jaVoice = null;
let voicesLoaded = false;

/**
 * Initializes the audio engine by finding a Japanese voice.
 * Handles the asynchronous nature of voice loading via the voiceschanged event.
 * Returns a promise that resolves when a voice is found (or rejects if unsupported).
 */
export function initAudio() {
  return new Promise((resolve, reject) => {
    if (!isAudioSupported()) {
      reject(new Error('Speech synthesis is not supported in this browser.'));
      return;
    }

    const synth = window.speechSynthesis;

    function findJapaneseVoice() {
      const voices = synth.getVoices();
      if (!voices || voices.length === 0) {
        return false;
      }

      // Prefer a voice that explicitly matches ja-JP, then ja
      jaVoice = voices.find(v => v.lang === 'ja-JP')
        || voices.find(v => v.lang.startsWith('ja'))
        || null;

      voicesLoaded = true;
      return true;
    }

    // Some browsers load voices synchronously
    if (findJapaneseVoice()) {
      resolve(jaVoice);
      return;
    }

    // Others fire voiceschanged asynchronously
    let attempts = 0;
    const maxAttempts = 10;

    function onVoicesChanged() {
      attempts++;
      if (findJapaneseVoice()) {
        synth.removeEventListener('voiceschanged', onVoicesChanged);
        resolve(jaVoice);
      } else if (attempts >= maxAttempts) {
        synth.removeEventListener('voiceschanged', onVoicesChanged);
        voicesLoaded = true;
        resolve(null); // No Japanese voice found, but not an error
      }
    }

    synth.addEventListener('voiceschanged', onVoicesChanged);

    // Fallback timeout in case voiceschanged never fires
    setTimeout(() => {
      if (!voicesLoaded) {
        synth.removeEventListener('voiceschanged', onVoicesChanged);
        findJapaneseVoice();
        resolve(jaVoice);
      }
    }, 3000);
  });
}

/**
 * Speaks the given Japanese text using the Web Speech API.
 * @param {string} text - The Japanese text to speak.
 * @param {number} rate - Speech rate (default 0.85 for clearer pronunciation).
 */
export function speak(text, rate = 0.85) {
  try {
    if (!isAudioSupported()) {
      console.warn('Speech synthesis not supported.');
      return;
    }

    if (!text || typeof text !== 'string') {
      console.warn('Invalid text provided to speak().');
      return;
    }

    // Cancel any ongoing speech first
    stopSpeaking();

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;

    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
    };

    synth.speak(utterance);
  } catch (e) {
    console.error('Failed to speak text:', e);
  }
}

/**
 * Cancels any currently playing speech.
 */
export function stopSpeaking() {
  try {
    if (isAudioSupported()) {
      window.speechSynthesis.cancel();
    }
  } catch (e) {
    console.error('Failed to stop speaking:', e);
  }
}

/**
 * Checks if the Web Speech API is available.
 */
export function isAudioSupported() {
  return typeof window !== 'undefined'
    && 'speechSynthesis' in window;
}
