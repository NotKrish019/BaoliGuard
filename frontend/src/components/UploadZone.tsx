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
    <div className={`bg-[#083358]/80 border border-[#28A9E0]/25 rounded-sm p-6 sm:p-8 font-sans ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Ingestion Workspace */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#28A9E0]/20">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#28A9E0]">
              Survey Photogrammetry Ingestion
            </span>
            {selectedFile && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-xs font-medium text-[#D3455B] hover:underline"
              >
                Remove Asset
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
              <div className="relative rounded-sm overflow-hidden border border-[#28A9E0]/30 bg-[#041B2E] aspect-[16/10] group">
                <img
                  src={previewUrl}
                  alt="Survey Ingestion Preview"
                  className="w-full h-full object-cover"
                />
                {/* Active ROI Box Overlay */}
                <div
                  className="absolute border border-[#28A9E0] bg-[#28A9E0]/15 pointer-events-none"
                  style={{
                    left: `${roi.x}%`,
                    top: `${roi.y}%`,
                    width: `${roi.width}%`,
                    height: `${roi.height}%`,
                  }}
                >
                  <span className="text-[10px] font-semibold bg-[#062B49] text-[#28A9E0] px-1.5 py-0.5 ml-1 mt-1 inline-block border border-[#28A9E0]/40 rounded-xs">
                    Target ROI: {roi.width}% × {roi.height}%
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#062B49]/90 via-transparent to-transparent flex items-end justify-between p-4 pointer-events-none">
                  <div className="text-xs text-white truncate">
                    <div className="font-semibold truncate">{selectedFile?.name || 'Reference Asset'}</div>
                    <div className="text-[11px] text-[#8CD8F5]/80">
                      {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : '1920 × 1080 px'} • Ingestion Validated
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
              <div className="mt-3 p-3 bg-[#062B49] border border-[#28A9E0]/20 rounded-sm flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-[#8CD8F5]/75 font-semibold uppercase">Inspection ROI:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Full Surface (100%)', roi: { x: 0, y: 0, width: 100, height: 100, isNormalized: true } },
                    { label: 'Lower Basin Tier', roi: { x: 10, y: 55, width: 80, height: 42, isNormalized: true } },
                    { label: 'Central Arcade', roi: { x: 25, y: 20, width: 50, height: 55, isNormalized: true } },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRoi(item.roi)}
                      className={`text-[11px] font-medium px-2.5 py-1 transition-all rounded-sm border ${
                        roi.x === item.roi.x && roi.width === item.roi.width
                          ? 'bg-[#087CC1] text-white border-[#28A9E0] font-semibold'
                          : 'bg-[#083358] text-[#8CD8F5] border-[#28A9E0]/20 hover:text-white'
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
              className={`border border-[#28A9E0]/30 hover:border-[#28A9E0]/60 p-8 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center aspect-[16/10] rounded-sm ${
                isDragging
                  ? 'bg-[#0C3D66] border-[#28A9E0]'
                  : 'bg-[#062B49]/80'
              }`}
            >
              <div className="w-12 h-12 rounded-sm border border-[#28A9E0]/30 flex items-center justify-center text-[#28A9E0] mb-3 bg-[#083358]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Add Survey Images
              </h4>
              <p className="text-xs text-[#8CD8F5]/80 max-w-xs mb-4 leading-relaxed">
                Drag &amp; drop high-resolution photographs of masonry, intake channels, or steps.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button size="sm" variant="primary" type="button">
                  Browse Files
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
                  Load Reference Asset
                </Button>
              </div>
            </div>
          )}

          <div className="mt-3 text-[11px] text-[#587286] flex items-center justify-between">
            <span>Single-view orthogonal photogrammetry</span>
            <span>Image-space pixel quantification</span>
          </div>
        </div>

        {/* Right Column: Structure Metadata Context Form */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8CD8F5]/70 block mb-1">
              Structural Attributes
            </span>
            <h3 className="text-sm font-semibold text-white">
              Typology &amp; Regional Context
            </h3>
            <p className="text-xs text-[#8CD8F5]/80 mt-0.5 leading-relaxed">
              Provides geological grounding for IKS material matching algorithms.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#DDF6FC] uppercase tracking-wide mb-1.5">
              Typology Classification
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['baoli', 'kund', 'vav', 'bawari', 'tank', 'other'] as StructureTypology[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setStructureType(t)}
                  className={`h-8 px-2 text-xs font-semibold uppercase tracking-wider border transition-all text-center rounded-sm ${
                    structureType === t
                      ? 'bg-[#087CC1] text-white border-[#28A9E0]'
                      : 'bg-[#062B49] border-[#28A9E0]/20 text-[#8CD8F5] hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#DDF6FC] uppercase tracking-wide mb-1.5">
              Structure Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Agrasen ki Baoli, Chand Baori, Rani ki Vav"
              value={structureName}
              onChange={(e) => setStructureName(e.target.value)}
              className="w-full h-8 bg-[#062B49] border border-[#28A9E0]/25 rounded-sm px-3 text-xs text-white placeholder:text-[#587286] focus:outline-none focus:border-[#28A9E0] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#DDF6FC] uppercase tracking-wide mb-1.5">
              Hydrological &amp; Geological Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full h-8 bg-[#062B49] border border-[#28A9E0]/25 rounded-sm px-2.5 text-xs text-white focus:outline-none focus:border-[#28A9E0] transition-colors"
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

          <div className="pt-3 border-t border-[#28A9E0]/20 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#8CD8F5]">
              <StatusBadge label="Ready For Ingestion" variant="info" size="sm" />
              <span>Pipeline: SEE → REVIVE</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              onClick={handleTriggerAnalysis}
            >
              {selectedFile ? 'Initiate Computer Vision Analysis' : 'Analyse Reference Survey'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
