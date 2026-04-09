'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ROOM_TYPES, INTERIOR_STYLES, MODES, PEOPLE_OPTIONS } from '@/constants';
import { fileToBase64 } from '@/lib/utils';
import { DesignResult } from '@/types';

export default function AppPage() {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [roomType, setRoomType] = useState('living-room');
  const [style, setStyle] = useState('modern');
  const [mode, setMode] = useState('interior-design');
  const [prompt, setPrompt] = useState('');
  const [numDesigns, setNumDesigns] = useState(1);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [addPeople, setAddPeople] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DesignResult[]>([]);
  const [activeTab, setActiveTab] = useState<'designs' | 'saved'>('designs');
  const [saved, setSaved] = useState<DesignResult[]>([]);
  const [styleFilter, setStyleFilter] = useState('all');
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  }, []);

  const handleGenerate = async () => {
    if (!imageFile && mode !== 'empty-space') return;
    setLoading(true);
    setResults([]);

    try {
      let imageBase64: string | undefined;
      if (imageFile) {
        imageBase64 = await fileToBase64(imageFile);
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          roomType,
          style,
          mode,
          prompt: prompt + (addPeople ? `, ${addPeople}` : ''),
          numDesigns,
          orientation,
        }),
      });

      const data = await res.json();
      if (data.designs) {
        setResults(data.designs);
      }
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveDesign = (design: DesignResult) => {
    if (!saved.find(s => s.id === design.id)) {
      setSaved(prev => [...prev, design]);
    }
  };

  const filteredStyles = styleFilter === 'all'
    ? INTERIOR_STYLES
    : INTERIOR_STYLES.filter(s => s.category === styleFilter);

  const roomCategories = ['residential', 'commercial', 'outdoor', 'special'] as const;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔮</span>
            <span className="text-lg font-bold gradient-text">SpaceCraft</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Account</button>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Billing</button>
            <button className="btn-primary text-sm py-2 px-4">Upgrade</button>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
          {/* Left Panel — Controls */}
          <div className="space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
            {/* Upload */}
            <div className="glass rounded-2xl p-5">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <span>📷</span> Your Interior
              </h2>
              <div
                className={cn('upload-zone', dragOver && 'drag-over')}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                {image ? (
                  <img src={image} alt="Uploaded interior" className="max-h-48 mx-auto rounded-xl object-cover" />
                ) : (
                  <>
                    <div className="text-4xl mb-3">🤳</div>
                    <p className="text-gray-300 font-medium">Drop an image or click to upload</p>
                    <p className="text-gray-500 text-sm mt-1">JPG, PNG, WebP • Or paste from clipboard (Ctrl+V)</p>
                  </>
                )}
              </div>
            </div>

            {/* Room Type */}
            <div className="glass rounded-2xl p-5">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <span>🏠</span> Room Type
              </h2>
              {roomCategories.map(cat => {
                const rooms = ROOM_TYPES.filter(r => r.category === cat);
                return (
                  <div key={cat} className="mb-3">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{cat}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {rooms.map(r => (
                        <button
                          key={r.id}
                          onClick={() => setRoomType(r.id)}
                          className={cn(
                            'px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5',
                            roomType === r.id
                              ? 'bg-[#e94560]/20 text-[#e94560] border border-[#e94560]/40'
                              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent'
                          )}
                        >
                          <span>{r.icon}</span> {r.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mode */}
            <div className="glass rounded-2xl p-5">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <span>⚙️</span> Mode
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {MODES.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={cn(
                      'p-3 rounded-xl text-left transition-all border',
                      mode === m.id
                        ? 'bg-[#e94560]/10 border-[#e94560]/40'
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                    )}
                  >
                    <div className="text-lg mb-1">{m.icon}</div>
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{m.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div className="glass rounded-2xl p-5">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <span>🎨</span> Style
              </h2>
              <div className="flex gap-2 mb-3">
                {['all', 'modern', 'classic', 'themed', 'seasonal'].map(f => (
                  <button
                    key={f}
                    onClick={() => setStyleFilter(f)}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs capitalize transition-all',
                      styleFilter === f
                        ? 'bg-[#e94560]/20 text-[#e94560]'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1.5 max-h-60 overflow-y-auto">
                {filteredStyles.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={cn(
                      'p-2 rounded-lg text-center transition-all border text-xs',
                      style === s.id
                        ? 'bg-[#e94560]/15 border-[#e94560]/40 text-white'
                        : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <div className="text-lg">{s.emoji}</div>
                    <div className="mt-0.5 truncate">{s.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="glass rounded-2xl p-5 space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Prompt (optional)</label>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Add specific details about what you want..."
                  className="w-full bg-white/5 rounded-xl p-3 text-sm border border-white/10 focus:border-[#e94560]/50 focus:outline-none resize-none h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Orientation</label>
                  <div className="flex gap-2">
                    {(['landscape', 'portrait'] as const).map(o => (
                      <button
                        key={o}
                        onClick={() => setOrientation(o)}
                        className={cn(
                          'flex-1 py-2 rounded-lg text-xs capitalize transition-all',
                          orientation === o
                            ? 'bg-[#e94560]/20 text-[#e94560]'
                            : 'bg-white/5 text-gray-400'
                        )}
                      >
                        {o === 'landscape' ? '▬' : '▮'} {o}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Variations</label>
                  <div className="flex gap-2">
                    {[1, 4].map(n => (
                      <button
                        key={n}
                        onClick={() => setNumDesigns(n)}
                        className={cn(
                          'flex-1 py-2 rounded-lg text-xs transition-all',
                          numDesigns === n
                            ? 'bg-[#e94560]/20 text-[#e94560]'
                            : 'bg-white/5 text-gray-400'
                        )}
                      >
                        {n}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Add People (experimental)</label>
                <select
                  value={addPeople}
                  onChange={e => setAddPeople(e.target.value)}
                  className="w-full bg-white/5 rounded-xl p-3 text-sm border border-white/10 focus:border-[#e94560]/50 focus:outline-none"
                >
                  {PEOPLE_OPTIONS.map(p => (
                    <option key={p.id} value={p.value}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || (!imageFile && mode !== 'empty-space')}
              className={cn(
                'w-full py-4 rounded-xl font-bold text-lg transition-all',
                loading
                  ? 'bg-gray-700 cursor-wait'
                  : (!imageFile && mode !== 'empty-space')
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
              )}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Generating...
                </span>
              ) : (
                `✨ Create Design${numDesigns > 1 ? ` (${numDesigns}x)` : ''}`
              )}
            </button>
          </div>

          {/* Right Panel — Results */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setActiveTab('designs')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  activeTab === 'designs' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                )}
              >
                Designs ({results.length})
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  activeTab === 'saved' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                )}
              >
                Saved ({saved.length})
              </button>
            </div>

            {activeTab === 'designs' && (
              <>
                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: numDesigns }).map((_, i) => (
                      <div key={i} className="aspect-[4/3] rounded-2xl skeleton" />
                    ))}
                  </div>
                )}

                {!loading && results.length === 0 && (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏠</div>
                      <h3 className="text-xl font-semibold mb-2">Ready to Design</h3>
                      <p className="text-gray-400">Upload a photo and hit generate to see your new interior.</p>
                    </div>
                  </div>
                )}

                {!loading && results.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map(r => (
                      <div key={r.id} className="glass rounded-2xl overflow-hidden group">
                        <div className="aspect-[4/3] relative">
                          <img src={r.imageUrl} alt="Generated design" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                              onClick={() => saveDesign(r)}
                              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
                            >
                              💾 Save
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm">
                              📥 Download
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm">
                              💰 Estimate Cost
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-[#e94560]">{INTERIOR_STYLES.find(s => s.id === r.style)?.emoji}</span>
                            <span className="capitalize">{r.style}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400 capitalize">{r.roomType.replace(/-/g, ' ')}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{r.prompt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'saved' && (
              <>
                {saved.length === 0 ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="text-6xl mb-4">💾</div>
                      <h3 className="text-xl font-semibold mb-2">No Saved Designs</h3>
                      <p className="text-gray-400">Generate designs and save your favorites here.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {saved.map(r => (
                      <div key={r.id} className="glass rounded-2xl overflow-hidden">
                        <div className="aspect-square">
                          <img src={r.imageUrl} alt="Saved design" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <div className="text-sm capitalize">{r.style} • {r.roomType.replace(/-/g, ' ')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
