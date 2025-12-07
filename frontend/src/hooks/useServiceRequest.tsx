import { createContext, useContext, useState, type ReactNode } from 'react';



/* ===================== PROPS ===================== */
interface ServiceRequestContextType {
  issue: string;
  files: File[];
  setIssue: (value: string) => void;
  setFiles: (value: File[]) => void;
}



/* ===================== CONTEXT SETUP ===================== */
const ServiceRequestContext = createContext<ServiceRequestContextType | undefined>(undefined);



/* ===================== CONTEXT PROVIDER ===================== */
export const ServiceRequestProvider = ({ children }: { children: ReactNode }) => {
  const [issue, setIssue] = useState('');
  const [files, setFiles] = useState<File[]>([]);


  return (
    <ServiceRequestContext.Provider value={{
      issue,
      files,
      setIssue,
      setFiles,
    }}>
      {children}
    </ServiceRequestContext.Provider>
  );
};



/* ===================== CUSTOM HOOK ===================== */
export const useServiceRequest = () => {
  const context = useContext(ServiceRequestContext);
  if (!context) throw new Error('useServiceRequest must be used within a ServiceRequestProvider');
  return context;
};
