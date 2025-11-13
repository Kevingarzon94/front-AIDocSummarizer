/**
 * Main App Component
 * Orchestrates the document summarizer application
 * Uses custom hooks for all business logic
 */

import { useState, useEffect } from 'react';
import { FileText, Menu } from 'lucide-react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { FileUploadZone } from './components/FileUploadZone';
import { SummaryDisplay } from './components/SummaryDisplay';
import { DocumentDetail } from './components/DocumentDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Sidebar } from './components/sidebar/Sidebar';
import { useFileUpload } from './hooks/useFileUpload';
import { useDocumentSummarizer } from './hooks/useDocumentSummarizer';
import type { DocumentSummary } from './types';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentSummary | null>(null);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    selectedFile,
    error: uploadError,
    isDragging,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    clearFile,
    clearError,
  } = useFileUpload();

  const { summary, isLoading, error: apiError, summarize, reset } = useDocumentSummarizer();

  const handleSubmit = async () => {
    if (selectedFile) {
      await summarize(selectedFile);
    }
  };

  const handleReset = () => {
    reset();
    clearFile();
    setSelectedDocument(null);
  };

  const handleDocumentSelect = (document: DocumentSummary) => {
    setSelectedDocument(document);
    reset();
    clearFile();
    setIsMobileSidebarOpen(false);
  };

  const handleBackToUpload = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          onDocumentSelect={handleDocumentSelect}
          selectedDocumentId={selectedDocument?.id || null}
          isCollapsed={false}
          onToggleCollapse={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          onDocumentSelect={handleDocumentSelect}
          selectedDocumentId={selectedDocument?.id || null}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <Button
            onClick={() => setIsMobileSidebarOpen(true)}
            size="icon"
            variant="outline"
            className="rounded-full shadow-lg bg-background"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl">
                  <FileText className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Document Summarizer
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your PDF or text file and get a concise summary in 5 key points
              </p>
            </div>

            {/* Main Content */}
            {selectedDocument ? (
              <DocumentDetail document={selectedDocument} onBack={handleBackToUpload} />
            ) : summary ? (
              <SummaryDisplay summary={summary.summary} fileName={summary.fileName} onReset={handleReset} />
            ) : (
              <div className="space-y-6">
                {/* Upload Error */}
                {uploadError && <ErrorMessage message={uploadError} onDismiss={clearError} />}

                {/* API Error */}
                {apiError && <ErrorMessage message={apiError} />}

                {/* Loading State */}
                {isLoading ? (
                  <Card className="shadow-lg">
                    <LoadingSpinner message="Processing your document..." />
                  </Card>
                ) : (
                  <>
                    {/* Upload Zone */}
                    <div className="animate-fade-in">
                      <FileUploadZone
                        isDragging={isDragging}
                        selectedFile={selectedFile}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onFileSelect={handleFileSelect}
                      />
                    </div>

                    {/* Action Buttons */}
                    {selectedFile && (
                      <div className="flex gap-4 animate-slide-up">
                        <Button onClick={handleSubmit} size="lg" className="flex-1">
                          Summarize Document
                        </Button>
                        <Button onClick={clearFile} variant="outline" size="lg">
                          Clear
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="mt-16 text-center text-sm text-muted-foreground">
              <p>Powered by Claude AI - Fast and accurate document summarization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
