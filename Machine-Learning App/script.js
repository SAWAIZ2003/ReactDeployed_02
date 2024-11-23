
  // ! debigging script for testing the model

import { pipeline } from '@xenova/transformers';

async function testModelPath() {
    try {
        console.log('Testing model path...');
        const asr = await pipeline('automatic-speech-recognition', 'openai/whisper-small');
        console.log('Model loaded successfully:', asr);
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

testModelPath();
