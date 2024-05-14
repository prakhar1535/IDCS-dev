import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyPdfViewer = ({ myFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [text, setText] = useState('');
  const [speakingWordIndex, setSpeakingWordIndex] = useState(null);
  const [pausedAtWordIndex, setPausedAtWordIndex] = useState(null);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjs.getDocument(myFile);
      const pdf = await loadingTask.promise;

      setNumPages(pdf.numPages);

      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      setText(content.items.map(item => item.str).join(' '));
    };

    loadPdf();
  }, [myFile, pageNumber]);

  const speakText = () => {
    const words = text.split(/\s+/);
    let i = pausedAtWordIndex !== null ? pausedAtWordIndex : 0;

    const speakWord = () => {
      if (i < words.length) {
        setSpeakingWordIndex(i);
        const utterance = new SpeechSynthesisUtterance(words[i]);
        utterance.rate = 1.5``; // Increase the speed of the speech
        utterance.onend = () => {
          i++;
          speakWord();
        };
        window.speechSynthesis.speak(utterance);
      }
    };

    speakWord();
  };

  const stopSpeech = () => {
    setPausedAtWordIndex(speakingWordIndex);
    window.speechSynthesis.cancel();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div style={{height:'100%'}} className="pdf-viewer-container">
      <nav className="pdf-viewer-nav">
        <button onClick={goToPrevPage}>Prev</button>
        <button onClick={goToNextPage}>Next</button>
        <button onClick={speakText}>Speak</button>
        <button onClick={stopSpeech}>Stop</button>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </nav>

      <div className="pdf-viewer-content">
        <Document
          file={myFile}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>

        {/* Render the extracted text */}
        
      </div>
    </div>
  );
};

export default MyPdfViewer;
