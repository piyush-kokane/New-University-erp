import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useServiceRequest } from '@/hooks/useServiceRequest';
import { useUser } from '@/hooks/useUser';
import { useUI } from '@/hooks/useUI';

import './styles/Service.css';



/* ===================== MAIN FUNCTION ===================== */
export default function Service() {
  const [closing, setClosing] = useState(false);

  const { toggleServicePanel } = useUI();

  const { user } = useUser();

  const name = user?.fullName;
  const gmail = user?.gmail;

  const {
    issue,  
    files,
    setIssue,
    setFiles,
  } = useServiceRequest();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileListRef = useRef<HTMLDivElement>(null);


  /* ___ Handle Closing ___ */
  const handleClose = () => {
    if (issue.trim() || files.length > 0) {
      toast('Issue saved as draft');
    }

    setClosing(true); // start animation
    setTimeout(toggleServicePanel, 200); // delay must match animation duration (0.2s) // call close function after animation
  };


  /* ___ Handle Submit ___ */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();	// prevent page refresh

    toast.success('Your issue sent successfully');

    setClosing(true); // start animation
    setTimeout(() => {
      toggleServicePanel(); // close panel
      setIssue('');        // clear issue
      setFiles([]);       // clear files
    }, 200);
  }


  /* ___ Handle File Change ___ */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    // Get selected files
    const newFiles = Array.from(e.target.files);

    // Get unique files
    const unique = newFiles.filter(
      f => !files.some(ex => 
        ex.name === f.name &&
        ex.size === f.size &&
        ex.lastModified === f.lastModified
      )
    );

    // Add to files
    setFiles([...files, ...unique]);

    // Scroll file list to bottom
    fileListRef.current?.scrollTo({
      top: fileListRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }


  /* ___ Handle Remove File ___ */
  function handleRemoveFile(index: number) {
    setFiles(files.filter((_, i) => i !== index));
    
    /*
      _ → current item ( we don't need it, so we use _ )
      i → index of the current item
    */
  }


  /* ====== UI ====== */
  return (
    <div className={`bg-blur ${closing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
      <div
        className={`service-panel ${closing ? 'slide-out' : 'slide-in'}`}
        onClick={e => e.stopPropagation()}
      >

        {/*** CLOSE BUTTON ***/}
        <span className="material-icons cancel-btn" onClick={handleClose}>close</span>

        {/* HEADER */}
        <h1>Service Request</h1>
        <h2>From: {name}, {gmail}</h2>

        {/*** FORM ***/}
        <form onSubmit={handleSubmit}>
          {/* Textarea */}
          <textarea
            value={issue}
            maxLength={2000}
            placeholder="Describe your issue..."
            onChange={(e) => setIssue(e.target.value)}
          />

          {/* File Upload */}
          <div className="file-upload">
            {/* Display uploaded file names */}
            <div className="uploaded-files" ref={fileListRef}>
              <p style={{display: files.length === 0 ?"block" :"none"}}>Upload File</p> {/* placeholder */}
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <span className="material-icons" onClick={() => handleRemoveFile(index)}>close</span>
                  <p>{file.name}</p>
                </div>
              ))}
            </div>
            
            {/* Upload input & button */}
            <button type="button" className="file-upload-btn" onClick={() => fileInputRef.current?.click()}>+</button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{display: "none"}}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-btn"
            disabled={issue.trim() === ''}
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  );
}
