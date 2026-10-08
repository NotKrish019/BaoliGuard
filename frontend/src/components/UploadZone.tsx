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
      alert('Please upload a valid photographic image (JPEG, PNG).');
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
    <div className={`glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Ingestion Dropzone */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sandstone-300">
              Survey Imagery Ingestion
            </span>
            {selectedFile && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
              >
                Clear Image
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
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-[16/10] group">
                <img
                  src={previewUrl}
                  alt="Survey Ingestion Preview"
                  className="w-full h-full object-cover"
                />
                {/* Active ROI Box Overlay */}
                <div
                  className="absolute border-2 border-sandstone-400 bg-sandstone-500/15 pointer-events-none transition-all duration-200"
                  style={{
                    left: `${roi.x}%`,
                    top: `${roi.y}%`,
                    width: `${roi.width}%`,
                    height: `${roi.height}%`,
                  }}
                >
                  <span className="text-[9px] font-mono bg-sandstone-950 text-sandstone-200 px-1 py-0.5 rounded ml-1 mt-1 inline-block">
                    Target ROI: {roi.width}% × {roi.height}%
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-4 pointer-events-none">
                  <div className="text-xs font-mono text-slate-200 truncate">
                    <div className="font-semibold text-white truncate">{selectedFile?.name || 'Survey Base Asset'}</div>
                    <div className="text-[10px] text-slate-400">
                      {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : '1920 × 1080 px'} • Ready for segmentation
                    </div>
                  </div>
                  <div className="pointer-events-auto">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick ROI selection pills below preview */}
              <div className="mt-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-400">Inspection ROI:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Full Image (100%)', roi: { x: 0, y: 0, width: 100, height: 100, isNormalized: true } },
                    { label: 'Lower Basin Tier', roi: { x: 10, y: 55, width: 80, height: 42, isNormalized: true } },
                    { label: 'Central Archway', roi: { x: 25, y: 20, width: 50, height: 55, isNormalized: true } },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRoi(item.roi)}
                      className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${
                        roi.x === item.roi.x && roi.width === item.roi.width
                          ? 'bg-sandstone-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
              className={`rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center aspect-[16/10] bg-blueprint ${
                isDragging
                  ? 'border-sandstone-400 bg-sandstone-950/20'
                  : 'border-slate-700/80 hover:border-slate-500 bg-slate-950/40'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-heritage-900 border border-slate-700 flex items-center justify-center text-3xl mb-3 shadow-lg">
                📷
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Upload Heritage Survey Image
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mb-4 leading-relaxed">
                Drag and drop high-resolution photographic survey image (Baoli wall, steps, inlet, or basin masonry).
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button size="sm" variant="sandstone" type="button">
                  Browse Files (JPEG / PNG)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSample();
                  }}
                >
                  Load Sample Stepwell Asset
                </Button>
              </div>
            </div>
          )}

          <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Supports single-view surface photography</span>
            <span>Non-destructive optical input</span>
          </div>
        </div>

        {/* Right Column: Structure Metadata Context */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Structure Context & Typology</h3>
            <p className="text-xs text-slate-400">
              Provide context to anchor IKS principles and material compatibility formulas.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
              TYPOLOGY CLASSIFICATION
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['baoli', 'kund', 'vav', 'bawari', 'tank', 'other'] as StructureTypology[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setStructureType(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium capitalize border transition-all text-center ${
                    structureType === t
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
              HERITAGE MONUMENT NAME (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder="e.g. Chand Baori, Agrasen ki Baoli, Rani ki Vav"
              value={structureName}
              onChange={(e) => setStructureName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sandstone-400 focus:ring-1 focus:ring-sandstone-400 font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
              GEOGRAPHICAL / HYDROLOGICAL REGION
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sandstone-400 focus:ring-1 focus:ring-sandstone-400"
            >
              <option value="Rajasthan">Rajasthan (Arid / Quartzite & Sandstone)</option>
              <option value="Gujarat">Gujarat (Patan / Adalaj Alluvial Sandstone)</option>
              <option value="Delhi NCR">Delhi NCR (Aravalli Quartzite / Lakhori Brick)</option>
              <option value="Madhya Pradesh">Madhya Pradesh (Malwa Plateau / Basalt & Sandstone)</option>
              <option value="Bihar">Bihar (Darbhanga / Gangetic Alluvium Brick)</option>
              <option value="Maharashtra">Maharashtra (Deccan Traps / Basalt Masonry)</option>
              <option value="Karnataka">Karnataka (Hampi / Granite Stepped Tanks)</option>
              <option value="Other">Other Indigenous Hydrological Zone</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2">
              <StatusBadge
                label="Preliminary Prototype"
                variant="sandstone"
                size="sm"
              />
              <span className="text-[11px] text-slate-500 font-mono">
                Pipeline: SEE → UNDERSTAND → ASSESS → REVIVE
              </span>
            </div>

            <Button
              variant="sandstone"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              onClick={handleTriggerAnalysis}
            >
              {selectedFile ? 'Begin Conservation Inspection' : 'Start Inspection with Sample Asset'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
