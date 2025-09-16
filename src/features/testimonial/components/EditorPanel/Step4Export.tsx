'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEditor } from '../../context/EditorContext';
import { Download, Loader2 } from 'lucide-react';
import { CANVAS_RATIO, MIN_WIDTH, MAX_WIDTH } from '../../constants';
import { useState } from 'react';
import { 
  exportCardImage, 
  downloadBlob, 
  generateFileName, 
  type ExportOptions, 
  type ExportState 
} from '../../lib/export';

export function Step4Export() {
  const { state } = useEditor();
  const [selectedFormat, setSelectedFormat] = useState<'PNG' | 'JPG'>('PNG');
  const [selectedResolution, setSelectedResolution] = useState({ width: 1200, height: 900 });
  const [isCustomResolution, setIsCustomResolution] = useState(false);
  const [customWidthInput, setCustomWidthInput] = useState('');
  const [widthError, setWidthError] = useState('');
  const [exportState, setExportState] = useState<ExportState>({
    isExporting: false,
    progress: 0,
    error: null
  });
  
  // 카드 크기 제한 설정
  // 상수는 constants에서 가져옴

  const resolutionPresets = [
    { label: '800×600', width: 800, height: 600 },
    { label: '1200×900', width: 1200, height: 900 },
    { label: '1600×1200', width: 1600, height: 1200 },
    { label: '2000×1500', width: 2000, height: 1500 },
  ];

  const handleDownload = async () => {
    const canvasElement = document.getElementById('testimonial-canvas');
    if (!canvasElement) {
      setExportState(prev => ({ ...prev, error: '카드를 찾을 수 없습니다.' }));
      return;
    }

    // 실제 렌더링된 카드 크기 측정
    const actualWidth = canvasElement.offsetWidth;
    const actualHeight = canvasElement.offsetHeight;
    
    // 크기 제한 적용
    const desiredWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, selectedResolution.width));
    const desiredHeight = Math.round(desiredWidth / CANVAS_RATIO);
    
    // scale 계산: 선택한 해상도 / 실제 렌더링 크기
    const exportScale = Math.max(0.5, Math.min(4, desiredWidth / actualWidth)); // 0.5-4 범위로 제한

    const exportOptions: ExportOptions = {
      width: actualWidth, // 실제 렌더링된 크기
      height: actualHeight, // 실제 렌더링된 크기
      format: selectedFormat,
      scale: exportScale, // 선택한 해상도로 스케일링
      fileName: generateFileName(),
      quality: selectedFormat === 'JPG' ? 0.92 : undefined
    };

    setExportState({
      isExporting: true,
      progress: 0,
      error: null
    });

    // 진행률 시뮬레이션 (try 블록 밖으로 이동)
    const progressInterval = setInterval(() => {
      setExportState(prev => ({
        ...prev,
        progress: Math.min(prev.progress + 10, 90)
      }));
    }, 100);

    try {
      // Export 실행
      const blob = await exportCardImage(canvasElement, exportOptions);
      
      setExportState(prev => ({
        ...prev,
        progress: 100
      }));

      // 다운로드 실행
      const fileExtension = selectedFormat === 'PNG' ? 'png' : 'jpg';
      downloadBlob(blob, `${exportOptions.fileName}.${fileExtension}`);

      // 성공 상태로 리셋
      setTimeout(() => {
        setExportState({
          isExporting: false,
          progress: 0,
          error: null
        });
      }, 1000);

    } catch (error) {
      console.error('Export 실패:', error);
      setExportState({
        isExporting: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Export에 실패했습니다.'
      });
    } finally {
      // 모든 경우에 진행률 타이머 정리
      clearInterval(progressInterval);
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-center">
        <h2 className="text-sm font-semibold text-black mb-0.5">Export Your Card</h2>
        <p className="text-xs text-black">Download your testimonial card</p>
      </div>
      
      {/* Resolution Presets */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-1 px-2 pt-2">
          <CardTitle className="text-xs text-black">Resolution Presets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-2 pb-2">
          <div className="grid grid-cols-4 gap-1">
            {resolutionPresets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                onClick={() => {
                  setSelectedResolution({ width: preset.width, height: preset.height });
                  setCustomWidthInput(preset.width.toString());
                  setWidthError('');
                  setIsCustomResolution(false);
                }}
                className={`justify-center text-xs border-charcoal/30 text-black h-8 ${
                  !isCustomResolution && selectedResolution.width === preset.width && selectedResolution.height === preset.height
                    ? 'bg-charcoal text-ivory'
                    : 'bg-ivory hover:bg-charcoal/5'
                }`}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Resolution */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-1 px-2 pt-2">
          <CardTitle className="text-xs text-black">Custom Resolution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-2 pb-2">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter width"
                value={customWidthInput}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setCustomWidthInput(inputValue);
                  
                  // 빈 문자열이면 에러 초기화
                  if (inputValue === '') {
                    setWidthError('');
                    return;
                  }
                  
                  const numericValue = parseInt(inputValue);
                  
                  // 숫자가 아닌 경우 에러 표시하지 않음 (사용자가 입력 중일 수 있음)
                  if (isNaN(numericValue)) {
                    return;
                  }
                  
                  // 범위 체크
                  if (numericValue < MIN_WIDTH || numericValue > MAX_WIDTH) {
                    setWidthError('Value is outside the allowed range');
                  } else {
                    setWidthError('');
                    const height = Math.round(numericValue * 3 / 4);
                    setSelectedResolution({ width: numericValue, height });
                    setIsCustomResolution(true);
                  }
                }}
                onFocus={() => setIsCustomResolution(true)}
                className={`flex-1 px-2 py-1 border rounded-md text-xs bg-ivory text-black h-8 ${
                  widthError ? 'border-red-500' : 'border-charcoal/30'
                }`}
              />
              {customWidthInput && (
                <>
                  <span className="text-xs text-black">×</span>
                  <span className="text-xs text-black">{selectedResolution.height}</span>
                </>
              )}
            </div>
            {widthError && (
              <p className="text-xs text-red-500">{widthError}</p>
            )}
            <p className="text-xs text-gray-600">Height will be automatically calculated.</p>
            <p className="text-xs text-gray-500">Size range: {MIN_WIDTH}px - {MAX_WIDTH}px</p>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-1 px-2 pt-2">
          <CardTitle className="text-xs text-black">Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-2 pb-2">
          {/* Format Selection */}
          <div className="space-y-1">
            <Label className="text-xs font-medium text-black">Format</Label>
            <div className="grid grid-cols-2 gap-1">
              <Button
                variant="outline"
                onClick={() => setSelectedFormat('PNG')}
                className={`justify-center text-xs border-charcoal/30 h-8 ${
                  selectedFormat === 'PNG'
                    ? 'bg-charcoal text-ivory'
                    : 'bg-ivory text-black hover:bg-charcoal/5'
                }`}
              >
                PNG
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedFormat('JPG')}
                className={`justify-center text-xs border-charcoal/30 h-8 ${
                  selectedFormat === 'JPG'
                    ? 'bg-charcoal text-ivory'
                    : 'bg-ivory text-black hover:bg-charcoal/5'
                }`}
              >
                JPG
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>


      {/* Export Button */}
      <Button 
        onClick={handleDownload}
        disabled={exportState.isExporting}
        className="w-full bg-charcoal text-ivory hover:bg-black h-7 text-xs disabled:opacity-50"
        aria-label={exportState.isExporting ? 'Exporting...' : 'Export testimonial card'}
      >
        {exportState.isExporting ? (
          <>
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Exporting... {exportState.progress}%
          </>
        ) : (
          <>
            <Download className="w-3 h-3 mr-1" />
            Export Card
          </>
        )}
      </Button>

      {/* Progress Bar */}
      {exportState.isExporting && (
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className="bg-charcoal h-1 rounded-full transition-all duration-300"
            style={{ width: `${exportState.progress}%` }}
          />
        </div>
      )}

      {/* Error Message */}
      {exportState.error && (
        <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
          {exportState.error}
        </div>
      )}

      {/* Token Cost */}
      <div className="text-center">
        <Badge variant="secondary" className="text-xs">
          Cost: 1 Token
        </Badge>
      </div>
    </div>
  );
}