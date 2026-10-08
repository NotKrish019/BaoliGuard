import React, { useState, useRef } from 'react';
import { StructureTypology, AnalysisRequestPayload, InspectionROI } from '../types';
import { Button } from './Button';
import { StatusBadge } from './StatusBadge';

export interface UploadZoneProps {
  onAnalyze: (payload: AnalysisRequestPayload) => void;
  isLoading?: boolean;
  className?: string;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onAnalyze,
  isLoading = false,
  className = '',
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [structureType, setStructureType] = useState<StructureTypology>('baoli');
  const [structureName, setStructureName] = useState<string>('');
  const [region, setRegion] = useState<string>('Rajasthan');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [roi, setRoi] = useState<InspectionROI>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    isNormalized: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectSample = () => {
    setPreviewUrl('/samples/stepwell_ashlar_wall.svg');
    setSelectedFile(null);
    setStructureType('baoli');
    setStructureName('Sample Stepwell (Dholpur Sandstone Ashlar)');
    setRegion('Rajasthan');
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid photographic image (JPEG, PNG, WebP).');
      return;
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTriggerAnalysis = () => {
    onAnalyze({
      imageFile: selectedFile || undefined,
      imagePreviewUrl: previewUrl || undefined,
      structureType,
      structureName: structureName.trim() || undefined,
      region: region.trim() || undefined,
      roi,
    });
  };

  return (
    <div className={`bg-[#081E31] border border-white/10 rounded-xs p-6 sm:p-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Ingestion Dropzone */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2498D5]">
              SURVEY PHOTOGRAMMETRY INGESTION
            </span>
            {selectedFile && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-[11px] font-mono text-[#E06C68] hover:underline"
              >
                REMOVE ASSET
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />

          {previewUrl ? (
            <div>
              <div className="relative rounded-xs overflow-hidden border border-white/15 bg-[#030D16] aspect-[16/10] group">
                <img
                  src={previewUrl}
                  alt="Survey Ingestion Preview"
                  className="w-full h-full object-cover"
                />
                {/* Active ROI Box Overlay */}
                <div
                  className="absolute border border-[#2498D5] bg-[#2498D5]/10 pointer-events-none"
                  style={{
                    left: `${roi.x}%`,
                    top: `${roi.y}%`,
                    width: `${roi.width}%`,
                    height: `${roi.height}%`,
                  }}
                >
                  <span className="text-[9px] font-mono bg-[#04121E] text-[#2498D5] px-1 py-0.5 ml-1 mt-1 inline-block border border-[#2498D5]/40">
                    TARGET ROI: {roi.width}% × {roi.height}%
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#04121E]/90 via-transparent to-transparent flex items-end justify-between p-4 pointer-events-none">
                  <div className="text-xs font-mono text-white truncate">
                    <div className="font-semibold truncate">{selectedFile?.name || 'Reference Asset'}</div>
                    <div className="text-[10px] text-[#7E98A8]">
                      {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : '1920 × 1080 px'} • Ingestion validated
                    </div>
                  </div>
                  <div className="pointer-events-auto">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      CHANGE
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick ROI selection pills below preview */}
              <div className="mt-3 p-3 bg-[#051624] border border-white/10 rounded-xs flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[11px] text-[#7E98A8] uppercase">INSPECTION ROI:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'FULL SURFACE (100%)', roi: { x: 0, y: 0, width: 100, height: 100, isNormalized: true } },
                    { label: 'LOWER BASIN TIER', roi: { x: 10, y: 55, width: 80, height: 42, isNormalized: true } },
                    { label: 'CENTRAL ARCADE', roi: { x: 25, y: 20, width: 50, height: 55, isNormalized: true } },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRoi(item.roi)}
                      className={`text-[10px] font-mono px-2 py-1 transition-colors rounded-xs border ${
                        roi.x === item.roi.x && roi.width === item.roi.width
                          ? 'bg-[#2498D5] text-white border-[#2498D5] font-semibold'
                          : 'bg-[#081E31] text-[#7E98A8] border-white/10 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed p-8 text-center cursor-pointer transition-colors duration-150 flex flex-col items-center justify-center aspect-[16/10] rounded-xs ${
                isDragging
                  ? 'border-[#2498D5] bg-[#0C2B45]'
                  : 'border-white/20 hover:border-white/40 bg-[#04121E]'
              }`}
            >
              <div className="w-12 h-12 border border-white/15 flex items-center justify-center text-[#2498D5] mb-3 bg-[#081E31]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xs font-mono font-semibold text-white mb-1 uppercase tracking-wider">
                Upload Survey Photography
              </h4>
              <p className="text-xs text-[#7E98A8] max-w-xs mb-4 leading-relaxed font-sans">
                Drag and drop high-resolution photographs of masonry, intake channels, or steps.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button size="sm" variant="primary" type="button">
                  BROWSE FILES
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSample();
                  }}
                >
                  LOAD REFERENCE DOSSIER ASSET
                </Button>
              </div>
            </div>
          )}

          <div className="mt-3 text-[11px] font-mono text-[#516A7A] flex items-center justify-between">
            <span>Single-view orthogonal photogrammetry</span>
            <span>Image-space pixel quantification</span>
          </div>
        </div>

        {/* Right Column: Structure Metadata Context Form */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#7E98A8] block mb-1">
              STRUCTURAL ATTRIBUTES
            </span>
            <h3 className="text-sm font-semibold text-white font-sans">
              Typology &amp; Regional Context
            </h3>
            <p className="text-xs text-[#7E98A8] mt-0.5 font-sans leading-relaxed">
              Provides geological grounding for IKS material matching algorithms.
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-[#7E98A8] uppercase tracking-wider mb-1.5 font-semibold">
              TYPOLOGY CLASSIFICATION
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['baoli', 'kund', 'vav', 'bawari', 'tank', 'other'] as StructureTypology[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setStructureType(t)}
                  className={`h-8 px-2 text-[11px] font-mono uppercase tracking-wider font-semibold border transition-colors text-center rounded-xs ${
                    structureType === t
                      ? 'bg-[#2498D5] text-white border-[#2498D5]'
                      : 'bg-[#04121E] border-white/10 text-[#7E98A8] hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-[#7E98A8] uppercase tracking-wider mb-1.5 font-semibold">
              STRUCTURE NAME (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder="e.g. Agrasen ki Baoli, Chand Baori, Rani ki Vav"
              value={structureName}
              onChange={(e) => setStructureName(e.target.value)}
              className="w-full h-8 bg-[#04121E] border border-white/15 rounded-xs px-3 text-xs font-mono text-white placeholder:text-[#516A7A] focus:outline-none focus:border-[#2498D5] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-[#7E98A8] uppercase tracking-wider mb-1.5 font-semibold">
              HYDROLOGICAL &amp; GEOLOGICAL REGION
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full h-8 bg-[#04121E] border border-white/15 rounded-xs px-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#2498D5] transition-colors"
            >
              <option value="Rajasthan">Rajasthan (Arid / Quartzite &amp; Sandstone)</option>
              <option value="Gujarat">Gujarat (Patan / Adalaj Alluvial Sandstone)</option>
              <option value="Delhi NCR">Delhi NCR (Aravalli Quartzite / Lakhori Brick)</option>
              <option value="Madhya Pradesh">Madhya Pradesh (Malwa Plateau / Basalt &amp; Sandstone)</option>
              <option value="Bihar">Bihar (Darbhanga / Gangetic Alluvium Brick)</option>
              <option value="Maharashtra">Maharashtra (Deccan Traps / Basalt Masonry)</option>
              <option value="Karnataka">Karnataka (Hampi / Granite Stepped Tanks)</option>
              <option value="Other">Other Indigenous Hydrological Zone</option>
            </select>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#7E98A8]">
              <StatusBadge label="READY FOR INGESTION" variant="info" size="sm" />
              <span>PIPELINE: SEE → REVIVE</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              onClick={handleTriggerAnalysis}
            >
              {selectedFile ? 'INITIATE COMPUTER VISION ANALYSIS' : 'ANALYSE REFERENCE SURVEY'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
