import React from 'react';

export default function FileDisplay(props) {
  const { handleAudioReset, file , handleFormSubmission } = props;

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-4 gap-3 text-center sm:gap-4 -translate-y-6">
      <h1 className="flex items-center justify-center gap-2 text-4xl 
       sm:text-5xl md:text-6xl font-semibold">Your <span 
       className="text-blue-400 font-bold">File</span></h1>
      <div className="flex flex-col text-left my-4">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file?.name : 'Custom audio'}</p> {/* Show 'Custom audio' if no file */}
      </div>
      {/* Increased gap between buttons */}
      <div className="flex items-center justify-between" style={{ gap: '40px' }}>
        <button
          onClick={handleAudioReset}
          className="text-slate-400 hover:text-blue-600 duration-200"
        >
          Reset
        </button>
        <button onClick={handleFormSubmission} className="specialBtn px-3 p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium">
          <p>Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
}


