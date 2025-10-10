import React, { useState, createContext, useContext } from 'react';
import { Send, Moon, Sun, Menu, X, Brain, FileText, Image, Search, Heart, Upload, Loader2 } from 'lucide-react';

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);
  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
const useTheme = () => useContext(ThemeContext);

function Navigation({ currentPage, setCurrentPage }) {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'chat', label: 'Chat' },
    { id: 'text-analysis', label: 'Text Analysis' },
    { id: 'image-analysis', label: 'Image Analysis' },
    { id: 'research', label: 'Research' }
  ];

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md ${isDark ? 'bg-teal-900/80' : 'bg-white/80'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-teal-400 to-cyan-500' : 'bg-gradient-to-br from-teal-500 to-cyan-600'}`}>
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">MediCare AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`hover:text-teal-500 transition-colors ${currentPage === item.id ? 'text-teal-500 font-semibold' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.label}
              </button>
            ))}
            <button onClick={toggleTheme} className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300' : 'bg-blue-100 hover:bg-blue-200 text-blue-600'}`}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="p-2">{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-teal-800' : 'bg-white'} border-t ${isDark ? 'border-teal-700' : 'border-gray-200'}`}>
          <div className="px-4 py-3 space-y-2">
            {navItems.map(item => (
              <button key={item.id} onClick={() => { setCurrentPage(item.id); setMenuOpen(false); }} className="block w-full text-left py-2 hover:text-teal-500">{item.label}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function HomePage({ setCurrentPage }) {
  const { isDark } = useTheme();
  const features = [
    { id: 'chat', icon: <Brain className="w-12 h-12" />, title: 'AI-Powered Chat', description: 'Interactive health conversation', color: isDark ? 'from-blue-400 to-blue-600' : 'from-blue-100 to-blue-200', iconColor: isDark ? 'text-blue-300' : 'text-blue-600' },
    { id: 'text-analysis', icon: <FileText className="w-12 h-12" />, title: 'Medical Text Analysis', description: 'Insights from patient records', color: isDark ? 'from-green-400 to-green-600' : 'from-green-100 to-green-200', iconColor: isDark ? 'text-green-300' : 'text-green-600' },
    { id: 'image-analysis', icon: <Image className="w-12 h-12" />, title: 'Analyze Medical Images', description: 'AI-based image interpretation', color: isDark ? 'from-red-400 to-red-600' : 'from-red-100 to-red-200', iconColor: isDark ? 'text-red-300' : 'text-red-600' },
    { id: 'research', icon: <Search className="w-12 h-12" />, title: 'Medical Research Search', description: 'Search trusted medical sources', color: isDark ? 'from-purple-400 to-purple-600' : 'from-purple-100 to-purple-200', iconColor: isDark ? 'text-purple-300' : 'text-purple-600' }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-6">Welcome to <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">MediCare AI</span></h1>
        <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Your AI-powered medical assistant for Cameroon</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
        {features.map((feature) => (
          <div key={feature.id} onClick={() => setCurrentPage(feature.id)} className={`rounded-2xl p-6 shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${isDark ? 'bg-gradient-to-br from-teal-800/50 to-cyan-900/50 backdrop-blur-sm' : `bg-gradient-to-br ${feature.color}`}`}>
            <div className={`${feature.iconColor} mb-4`}>{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>{feature.description}</p>
            <button className="mt-4 text-teal-500 font-semibold hover:text-teal-600">Try it now →</button>
          </div>
        ))}
      </div>
      <div className="text-center py-8">
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>⚠️ This is an AI assistant for informational purposes only. Always consult qualified healthcare professionals.</p>
      </div>
    </main>
  );
}

function ChatPage() {
  const { isDark } = useTheme();
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([{ type: 'ai', text: 'Hello! How can I assist you today? ✨' }]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, language: 'en' })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { type: 'ai', text: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'ai', text: 'Error: Unable to connect. Please ensure backend is running.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Chat Assistant</h1>
      <div className={`rounded-2xl p-6 shadow-2xl min-h-[500px] flex flex-col ${isDark ? 'bg-teal-800/50' : 'bg-teal-50'}`}>
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-96">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-lg ${msg.type === 'user' ? (isDark ? 'bg-teal-600 text-white' : 'bg-teal-500 text-white') : (isDark ? 'bg-teal-900/50' : 'bg-white')}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-teal-900/50' : 'bg-white'}`}>
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask a medical question..." className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${isDark ? 'bg-teal-900/50 text-gray-100 placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`} />
          <button onClick={handleSendMessage} disabled={isLoading} className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}

function TextAnalysisPage() {
  const { isDark } = useTheme();
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context: '', language: 'en' })
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      alert('Error connecting to backend');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Medical Text Analysis</h1>
      <div className={`rounded-2xl p-6 shadow-2xl mb-6 ${isDark ? 'bg-teal-800/50' : 'bg-green-50'}`}>
        <label className="block text-lg font-semibold mb-3">Enter Medical Text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type medical records, symptoms, test results..." rows="8" className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-teal-900/50 text-gray-100 placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`} />
        <button onClick={handleAnalyze} disabled={isLoading} className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin inline" /> : 'Analyze Text'}
        </button>
      </div>
      {analysis && (
        <div className={`rounded-2xl p-6 shadow-2xl ${isDark ? 'bg-teal-800/50' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-lg mb-2">Summary</h3><p>{analysis.summary}</p></div>
            <div><h3 className="font-semibold text-lg mb-2">Key Findings</h3><ul className="list-disc list-inside space-y-1">{analysis.key_findings?.map((f, i) => <li key={i}>{f}</li>)}</ul></div>
            <div><h3 className="font-semibold text-lg mb-2">Recommendations</h3><ul className="list-disc list-inside space-y-1">{analysis.recommendations?.map((r, i) => <li key={i}>{r}</li>)}</ul></div>
            <div><h3 className="font-semibold text-lg mb-2">Next Steps</h3><ul className="list-disc list-inside space-y-1">{analysis.next_steps?.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
            <p className="text-sm text-gray-500 italic mt-4">{analysis.disclaimer}</p>
          </div>
        </div>
      )}
    </main>
  );
}

function ImageAnalysisPage() {
  const { isDark } = useTheme();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setAnalysis(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', 'en');
    try {
      const response = await fetch('http://localhost:8000/api/analyze-image', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      alert('Error connecting to backend');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Medical Image Analysis</h1>
      <div className={`rounded-2xl p-6 shadow-2xl mb-6 ${isDark ? 'bg-teal-800/50' : 'bg-red-50'}`}>
        <label className="block text-lg font-semibold mb-3">Upload Medical Image</label>
        <div className={`border-2 border-dashed rounded-lg p-8 text-center ${isDark ? 'border-teal-600' : 'border-red-300'}`}>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg mb-2">Click to upload medical image</p>
            <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
          </label>
        </div>
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
            <button onClick={handleAnalyze} disabled={isLoading} className="mt-4 w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin inline" /> : 'Analyze Image'}
            </button>
          </div>
        )}
      </div>
      {analysis && (
        <div className={`rounded-2xl p-6 shadow-2xl ${isDark ? 'bg-teal-800/50' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <div className="space-y-4">
            <div><h3 className="font-semibold text-lg mb-2">Extracted Text</h3><p className={`p-3 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>{analysis.extracted_text}</p></div>
            <div><h3 className="font-semibold text-lg mb-2">Summary</h3><p>{analysis.analysis?.summary}</p></div>
            <div><h3 className="font-semibold text-lg mb-2">Key Findings</h3><ul className="list-disc list-inside space-y-1">{analysis.analysis?.key_findings?.map((f, i) => <li key={i}>{f}</li>)}</ul></div>
            <div><h3 className="font-semibold text-lg mb-2">Recommendations</h3><ul className="list-disc list-inside space-y-1">{analysis.analysis?.recommendations?.map((r, i) => <li key={i}>{r}</li>)}</ul></div>
          </div>
        </div>
      )}
    </main>
  );
}

function ResearchPage() {
  const { isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, max_results: 5, language: 'en' })
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      alert('Error connecting to backend');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Medical Research Search</h1>
      <div className={`rounded-2xl p-6 shadow-2xl mb-6 ${isDark ? 'bg-teal-800/50' : 'bg-purple-50'}`}>
        <label className="block text-lg font-semibold mb-3">Search Medical Information</label>
        <div className="flex space-x-2">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} placeholder="e.g., diabetes treatment, COVID-19 symptoms..." className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDark ? 'bg-teal-900/50 text-gray-100 placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`} />
          <button onClick={handleSearch} disabled={isLoading} className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {results && (
        <div className="space-y-6">
          <div className={`rounded-2xl p-6 shadow-2xl ${isDark ? 'bg-teal-800/50' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <p>{results.summary}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Sources</h2>
            {results.results?.map((result, idx) => (
              <div key={idx} className={`rounded-2xl p-6 shadow-xl mb-4 ${isDark ? 'bg-teal-800/50' : 'bg-white'}`}>
                <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                <p className="text-sm mb-2">{result.content}</p>
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-600 text-sm">Read more →</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function MediCareApp() {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900'}`}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'chat' && <ChatPage />}
      {currentPage === 'text-analysis' && <TextAnalysisPage />}
      {currentPage === 'image-analysis' && <ImageAnalysisPage />}
      {currentPage === 'research' && <ResearchPage />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MediCareApp />
    </ThemeProvider>
  );
}