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

      <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center gap-12">
        {/* Branding Section */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-[#00a884] rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-[#00a884]/20 animate-bounce-slow">
            <MessageCircle size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter">RAED</h1>
          <p className="text-emerald-500 font-bold tracking-[0.4em] text-sm uppercase">Self-Leadership</p>
        </div>

        {/* Text Section */}
        <div className="w-full space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-slate-100">مرحباً بك في منصة رائد</h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-sm mx-auto">
              بوابة التطوير الذاتي والمطالعة الموجهة للمتعلم
            </p>
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
