import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { UploadZone } from '../components/UploadZone';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';
import { AnalysisRequestPayload } from '../types';

export interface UploadPageProps {
  onAnalyze: (payload: AnalysisRequestPayload) => void;
  isLoading?: boolean;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onAnalyze, isLoading = false }) => {
  return (
    <PageContainer
      title="Survey Ingestion & Typology Classification"
      subtitle="Upload high-resolution field survey imagery of stepwell masonry, catchment basins, or intake shafts."
      badge={
        <StatusBadge
          label="SEE Pipeline Ready"
          variant="jal"
          size="md"
        />
      }
    >
      <UploadZone
        onAnalyze={onAnalyze}
        isLoading={isLoading}
        className="mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        <Card
          title="Recommended Photographic Protocols"
          subtitle="Field survey guidelines for optimal defect segmentation"
        >
          <ul className="text-xs text-[#8CD8F5]/85 space-y-2.5 list-disc list-inside leading-relaxed">
            <li>Capture orthogonal (perpendicular) views of the masonry face to reduce perspective distortion.</li>
            <li>Ensure diffused natural lighting to minimize harsh subterranean shadows across joints.</li>
            <li>Maintain minimum 1080p resolution to resolve hairline mortar deterioration and micro-cracking.</li>
          </ul>
        </Card>

        <Card
          title="Target Defect Classifications"
          subtitle="Observable surface damage segments (YOLOv8 Segmentation)"
        >
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              'crack',
              'vegetation_root_intrusion',
              'spalling',
              'efflorescence',
              'biological_growth',
              'stone_dislodgement',
              'silt_accumulation'
            ].map((cls) => (
              <span
                key={cls}
                className="text-[11px] font-medium px-2 py-1 rounded-sm bg-[#062B49] border border-[#28A9E0]/25 text-[#8CD8F5]"
              >
                {cls}
              </span>
            ))}
          </div>
        </Card>

        <Card
          title="Downstream Integration"
          subtitle="Contracts governing output delivery"
        >
          <div className="text-xs text-[#8CD8F5]/80 space-y-2.5">
            <div>
              <span className="text-white font-medium">Vision:</span> contracts/vision_result.schema.json
            </div>
            <div>
              <span className="text-white font-medium">Engineering:</span> contracts/engineering_result.schema.json
            </div>
            <div>
              <span className="text-white font-medium">Unified:</span> contracts/analysis.schema.json
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
