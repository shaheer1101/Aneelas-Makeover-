import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getBeautyAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello, darling! I am Aura. How can I assist you with your beauty journey today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const advice = await getBeautyAdvice(userMessage);

    setMessages(prev => [...prev, { role: 'ai', text: advice }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gradient-to-r from-gold-500 to-yellow-600 text-dark-900 p-4 rounded-full shadow-lg hover:shadow-gold-500/20 hover:scale-105 transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center gap-2 font-bold`}
      >
        <Sparkles className="h-6 w-6" />
        <span className="hidden md:inline">Ask Aura AI</span>
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-dark-800 border border-gold-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-gold-600 to-yellow-500 p-4 flex justify-between items-center text-dark-900">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-serif font-bold text-lg">Aura Stylist</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-900/50 min-h-[300px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gold-500 text-dark-900 rounded-br-none'
                      : 'bg-dark-700 text-gray-100 rounded-bl-none border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-dark-700 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                  <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-dark-800 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about styles, treatments..."
                className="flex-1 bg-dark-900 text-white border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-gold-500 placeholder-gray-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gold-500 text-dark-900 p-2 rounded-xl hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">Powered by Gemini AI</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIConsultant;
