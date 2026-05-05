import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, ArrowRight, Download, Share2, MessageCircle, Smartphone } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0b141a] flex flex-col items-center p-6 overflow-hidden text-white font-sans">
      {/* Top Bar */}
      <div className="w-full max-w-lg flex items-center justify-between mb-12 mt-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-300" />
        </button>
      </div>

      <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center gap-10">
        {/* QR Section */}
        <div className="relative group">
          {/* Outer glow */}
          <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all duration-700" />
          
          {/* QR Container */}
          <div className="relative bg-white p-4 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <QRCodeSVG 
              value="https://selfleadership.vercel.app/"
              size={280}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
                x: undefined,
                y: undefined,
                height: 60,
                width: 60,
                excavate: true,
              }}
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full space-y-8 mt-4">
          <div className="space-y-4 text-center sm:text-left">
            <h1 className="text-4xl font-normal text-slate-100">Connectez-vous sur WhatsApp</h1>
            
            <div className="flex items-start gap-4 py-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-900 font-bold shrink-0 mt-1">
                1
              </div>
              <p className="text-xl text-slate-300 leading-relaxed">
                Scannez le code QR avec la caméra de votre téléphone
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-4 pt-6">
            <button 
              onClick={onEnter}
              className="w-full py-4 bg-[#00a884] hover:bg-[#00c298] text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#00a884]/20 active:scale-[0.98]"
            >
              <span className="text-xl">دخول التطبيق</span>
              <ArrowRight size={22} />
            </button>

            <div className="flex gap-3">
              <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/10 group">
                <Download size={20} className="text-[#00a884] group-hover:scale-110 transition-transform" />
                <span className="font-medium">تثبيت</span>
              </button>
              <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/10 group">
                <Share2 size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium">مشاركة</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-auto py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-1 opacity-60">
          <Smartphone size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase">Self-Leadership RAED</span>
        </div>
        <p className="text-[10px] text-slate-600 font-medium">Aomar Ait Loutou &copy; 2026</p>
      </div>
    </div>
  );
}
