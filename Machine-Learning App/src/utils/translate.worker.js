import { pipeline } from "@xenova/transformers";

class MyTranlationPipeline{
    static task = 'translation';  // Task type for ASR
    static model = 'Xenova/nllb-200-distilled-600M';  // Model path (ensure it's correct and accessible)
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (!this.instance) {
            try {
                this.instance = await pipeline(this.task, null, { progress_callback });
            } catch (err) {
                if (err.response) {
                    console.error('Response:', await err.response.text());
                }
                throw new Error('Failed to initialize the transcription pipeline. Please check the model path and try again.');
            }
        }
        return this.instance;
    }
}

self.addEventListener('message' , async(event) => {
     let translator = await MyTranlationPipeline.getInstance(x => {
          self.postMessage(x)
     })

     let output = await translator(event.data.text,{
         tgt_lang: event.data.tgt_lang,
         src_lang: event.data.src_lang,
         callback_function: x=>{
            self.postMessage(x)
            status: 'update'
            output: translator.tokenizer.decode(x[0].output_token_ids,{
                 skip_special_tokens: true
            })
         }
     })

     self.postMessage({
        status: 'complete',
        output
     })
})