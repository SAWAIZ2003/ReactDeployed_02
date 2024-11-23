import React , {useState , useEffect , useRef} from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
    
  const {output} = props
  const [tab , setTab] = useState('transcription')
  const [translation , setTranslation] = useState(null)
  const [toLanguage , setToLanguage] = useState('Select Language')
  const [translating , setTranslating] = useState(null)
  console.log(output)

  const worker = useRef()

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
        type: 'module'
      })
     }

     const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case 'initiate':
          console.log('DOWNLOADING')
          break;
        case 'progress':
          console.log('LOADING')
          break;
        case 'update':
          setTranslation(e.data.output)
          console.log(e.data.output)
          break;
        case 'complete':
          setTranslating(false)
          console.log("DONE")
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', 
      onMessageReceived)
  })

  const textElement = tab === 'transcription' ? output.map(val => val.text) : 
  translation || 'No tranlation'

  function HandleCopy(){
     navigator.clipboard.writeText(textElement)
  }
  
  function HandleDownload(){
     const element = document.createElement('a')
     const file = new Blob([textElement] , {type: 'text/plain'})
     element.href = URL.createObjectURL(file)
     element.download = `Freescribe_${new Date().toString()}.txt`
     document.body.appendChild(element)
     element.click()
  }


  function generateTranslation(){
      if( translating || toLanguage === 'Select language'){
         return 
      }

      setTranslating(true)

      worker.current.postMessage({
         text: output.map(val => val.text),
         src_lang: 'eng_latin',
         tgt_lang: toLanguage
      })
  }
  

  

  return (
    <main className="flex min-h-screen flex-col justify-center items-center text-blue-400 p-4 gap-3 text-center sm:gap-4 -translate-y-6">
    <h1 className="flex items-center justify-center gap-2 text-4xl 
     sm:text-5xl md:text-6xl font-semibold whitespace-nowrap">Your <span 
     className="text-blue-400 font-bold">Transcription</span></h1>

     <div className='grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center'>
        <button  onClick = {() =>setTab('transcription')}className={ 'px-4 duration-200 py-1 font-medium ' +
            (tab === 'transcription'
              ? 'bg-blue-400 text-white hover:text-blue-500 duration-2'
              : 'text-blue-400 hover:text-blue-600')}>Transcription</button>
        <button onClick= {() => setTab('translation')}className={'px-4 duration-200 py-1 font-medium' +
          (tab === 'translation'
              ? 'bg-blue-400 text-white hover:text-blue-500 duration-2'
              : 'text-blue-400 hover:text-blue-600')
         }>Translation</button>
     </div>
      <div className='my-8 flex flex-col'>
      {tab === 'transcription' ? (
            <Transcription {...props}  textElement={textElement}/>
         ) : (
           <Translation {...props} toLanguage={toLanguage} textElement={textElement}
               translation={translation} setTranslating={setTranslating} 
               setTranslation = {setTranslation} setToLanguage= {setToLanguage}
                generateTranslation = {generateTranslation}/>
         )}
      </div>
          <div className='flex items-center gap-4 mx-auto text-base'>
               <button onClick={HandleCopy} title="Copy" className='bg-white hover:text-blue-500 duration-200 text-blue-300  px-2 aspect-sqaure grid place-items-center rounded'>
               <i className="fa-solid fa-copy"></i>
               </button>
               <button onClick={HandleDownload} title = "download" className='bg-white hover:text-blue-500 duration-200 text-blue-300  px-2 aspect-sqaure grid place-items-center rounded'>
               <i className="fa-solid fa-download"></i>
               </button>
          </div>
     </main>
  )
}
