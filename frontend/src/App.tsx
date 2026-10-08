import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { LoadingState } from './components/LoadingState';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { ReportPage } from './pages/ReportPage';
import { AppRoute, AnalysisResultContract, AnalysisRequestPayload } from './types';
import { submitAnalysisRequest, getDevelopmentMockFixture } from './services/api';

export const App: React.FC = () => {
  // Sync initial route from browser URL or default to '/'
  const getInitialRoute = (): AppRoute => {
    const path = window.location.pathname;
    if (
      path === '/upload' ||
      path === '/analysis' ||
      path === '/knowledge' ||
      path === '/twin' ||
      path === '/report'
    ) {
      return path as AppRoute;
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultContract | null>(null);
  const [isMockFixture, setIsMockFixture] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<'see' | 'understand' | 'assess' | 'revive'>('see');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (
        path === '/upload' ||
        path === '/analysis' ||
        path === '/knowledge' ||
        path === '/twin' ||
        path === '/report' ||
        path === '/'
      ) {
        setCurrentRoute(path as AppRoute);
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: AppRoute) => {
    if (route !== currentRoute) {
      window.history.pushState(null, '', route);
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadDemoFixture = async () => {
    setIsLoading(true);
    setLoadingStep('see');

    setTimeout(() => setLoadingStep('understand'), 300);
    setTimeout(() => setLoadingStep('assess'), 600);
    setTimeout(() => setLoadingStep('revive'), 900);

    try {
      const fixture = await getDevelopmentMockFixture();
      setAnalysisResult(fixture);
      setIsMockFixture(true);
      handleNavigate('/analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async (payload: AnalysisRequestPayload) => {
    setIsLoading(true);
    setLoadingStep('see');

    try {
      // First attempt live backend API submission
      const result = await submitAnalysisRequest(payload);
      setAnalysisResult(result);
      setIsMockFixture(false);
      handleNavigate('/analysis');
    } catch {
      // Provide clear feedback and load the development sample fixture for layout inspection
      setLoadingStep('understand');
      await new Promise((r) => setTimeout(r, 400));
      setLoadingStep('assess');
      await new Promise((r) => setTimeout(r, 400));
      setLoadingStep('revive');
      await new Promise((r) => setTimeout(r, 400));

      const fixture = await getDevelopmentMockFixture();
      if (payload.structureType) {
        fixture.structure.type = payload.structureType;
      }
      if (payload.structureName) {
        fixture.structure.name = payload.structureName;
      }
      if (payload.region) {
        fixture.structure.region = payload.region;
      }
      if (payload.imagePreviewUrl) {
        fixture.structure.source_images = [payload.imagePreviewUrl];
      }

      setAnalysisResult(fixture);
      setIsMockFixture(true);
      handleNavigate('/analysis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#062B49] text-white flex flex-col font-sans selection:bg-[#087CC1] selection:text-white">
      {/* Universal Technical Header */}
      <Header
        currentRoute={currentRoute}
        onRouteChange={handleNavigate}
        hasAnalysisResult={analysisResult !== null}
      />

      {/* Main Tabbed Navigation */}
      <Navigation
        currentRoute={currentRoute}
        onRouteChange={handleNavigate}
        hasAnalysisResult={analysisResult !== null}
      />

      {/* Loading Overlay */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <LoadingState
            step={loadingStep}
            title="Executing Jal-Dharohar Pipeline"
            message="Evaluating non-invasive imagery through computer vision and deterministic conservation rules..."
          />
        </div>
      ) : (
        <>
          {currentRoute === '/' && (
            <HomePage
              onRouteChange={handleNavigate}
              onLoadDemoFixture={handleLoadDemoFixture}
            />
          )}

          {currentRoute === '/upload' && (
            <UploadPage
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          )}

          {currentRoute === '/analysis' && (
            <AnalysisPage
              result={analysisResult}
              isMockFixture={isMockFixture}
              onRouteChange={handleNavigate}
              onLoadDemoFixture={handleLoadDemoFixture}
            />
          )}

          {currentRoute === '/knowledge' && (
            <KnowledgePage
              onRouteChange={handleNavigate}
            />
          )}

          {currentRoute === '/twin' && (
            <DigitalTwinPage
              onRouteChange={handleNavigate}
            />
          )}

          {currentRoute === '/report' && (
            <ReportPage
              result={analysisResult}
              isMockFixture={isMockFixture}
              onRouteChange={handleNavigate}
              onLoadDemoFixture={handleLoadDemoFixture}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
