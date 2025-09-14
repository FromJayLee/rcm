'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEditor } from '../../context/EditorContext';
import { Image as ImageIcon, X } from 'lucide-react';

export function Step3Background() {
  const { state, dispatch } = useEditor();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#000000');
  const [showGradientEditor, setShowGradientEditor] = useState(false);
  const [gradientConfig, setGradientConfig] = useState({
    startColor: '#3B82F6',
    endColor: '#1D4ED8',
    middleColor: '#60A5FA',
    middlePosition: 50,
    direction: 135
  });
  const [imageOpacity, setImageOpacity] = useState(100);

  const handleBackgroundChange = (field: keyof typeof state.background, value: any) => {
    // 배경 타입이 변경될 때 적절한 초기값 설정
    if (field === 'kind') {
      if (value === 'solid') {
        // 솔리드 컬러 타입으로 변경할 때 연한 회색 배경 설정
        dispatch({ type: "SET_BACKGROUND", patch: { kind: value, value: '#F3F4F6' } });
      } else if (value === 'gradient') {
        // 그라디언트 타입으로 변경할 때 연한 회색으로 설정
        dispatch({ type: "SET_BACKGROUND", patch: { kind: value, value: '#F3F4F6' } });
      } else if (value === 'image') {
        // 이미지 타입으로 변경할 때 연한 회색 배경 설정
        dispatch({ type: "SET_BACKGROUND", patch: { kind: value, value: '#F3F4F6' } });
      } else {
        // 다른 경우는 기존 동작
        dispatch({ type: "SET_BACKGROUND", patch: { [field]: value } });
      }
    } else {
    dispatch({ type: "SET_BACKGROUND", patch: { [field]: value } });
    }
  };

  const handleCardScaleChange = (value: number) => {
    dispatch({ type: "SET_CARD_SCALE", value });
  };

  const handleShadowChange = (field: keyof typeof state.cardConfig.shadow, value: any) => {
    dispatch({ type: "SET_CARD_SHADOW", patch: { [field]: value } });
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
  };

  const handleCustomColorConfirm = () => {
    handleBackgroundChange('value', customColor);
    setShowColorPicker(false);
  };

  const handleGradientConfigChange = (field: keyof typeof gradientConfig, value: any) => {
    const newConfig = { ...gradientConfig, [field]: value };
    setGradientConfig(newConfig);
    
    // 그라디언트 CSS 생성
    const gradientCSS = `linear-gradient(${newConfig.direction}deg, ${newConfig.startColor} 0%, ${newConfig.middleColor} ${newConfig.middlePosition}%, ${newConfig.endColor} 100%)`;
    handleBackgroundChange('value', gradientCSS);
  };

  const handleGradientEditorConfirm = () => {
    setShowGradientEditor(false);
  };

  const generateGradientCSS = (config: typeof gradientConfig) => {
    return `linear-gradient(${config.direction}deg, ${config.startColor} 0%, ${config.middleColor} ${config.middlePosition}%, ${config.endColor} 100%)`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }

      // 이미지 파일 타입 확인
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // FileReader를 사용하여 이미지를 base64로 변환
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          handleBackgroundChange('value', result);
          setImageOpacity(100); // 이미지 업로드 시 어두움 정도 초기화
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageOpacityChange = (value: number) => {
    setImageOpacity(value);
    // 이미지가 업로드된 상태에서만 어두움 정도 적용
    if (state.background.kind === 'image' && state.background.value) {
      // CSS filter를 사용하여 어두움 정도 조절
      const opacityValue = value / 100;
      const brightnessValue = opacityValue;
      const filter = `brightness(${brightnessValue})`;
      handleBackgroundChange('value', `${state.background.value}|${filter}`);
    }
  };

  return (
    <div className="space-y-1">
      <div className="text-center">
        <h2 className="text-xs font-semibold text-charcoal mb-0.5">Background Settings</h2>
      </div>

      {/* Background Type */}
      <Card className="bg-ivory border-charcoal/20">
        <CardContent className="space-y-1 px-2 py-2">
          {/* Background Type */}
          <div className="space-y-1">
            <Select 
              value={state.background.kind} 
              onValueChange={(value) => handleBackgroundChange('kind', value)}
            >
              <SelectTrigger className="text-xs bg-ivory text-charcoal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid Color</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color Picker - Only show when background type is solid */}
          {state.background.kind === 'solid' && (
            <div className="space-y-1">
              <Label className="text-xs font-medium text-charcoal">Color</Label>
              <div className="grid grid-cols-5 gap-1">
                {/* Row 1 */}
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-black hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', '#000000')}
                  title="Black"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-white border-2 border-charcoal/20 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', '#FFFFFF')}
                  title="White"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-red-500 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', '#EF4444')}
                  title="Red"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-orange-500 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', '#F97316')}
                  title="Orange"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-yellow-500 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', '#EAB308')}
                  title="Yellow"
                />
                
                {/* Row 2 */}
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-green-500 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', '#22C55E')}
                  title="Green"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-blue-500 hover:scale-110 transition-transform"
                onClick={() => handleBackgroundChange('value', '#3B82F6')}
                  title="Blue"
              />
              <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-purple-500 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', '#A855F7')}
                  title="Purple"
              />
              <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-pink-500 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', '#EC4899')}
                  title="Pink"
              />
              <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 hover:scale-110 transition-transform"
                  onClick={() => setShowColorPicker(true)}
                  title="Custom Color"
              />
              </div>
              
            </div>
          )}

          {/* Gradient Picker - Only show when background type is gradient */}
          {state.background.kind === 'gradient' && (
            <div className="space-y-1">
              <Label className="text-xs font-medium text-charcoal">Gradient</Label>
              <div className="grid grid-cols-5 gap-1">
                {/* Row 1 */}
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-br from-blue-300 to-blue-700 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', 'linear-gradient(135deg, #93C5FD, #1D4ED8)')}
                  title="Blue to Cyan"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-br from-pink-300 to-rose-700 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', 'linear-gradient(135deg, #F9A8D4, #BE185D)')}
                  title="Pink to Rose"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-br from-green-300 to-emerald-700 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', 'linear-gradient(135deg, #86EFAC, #047857)')}
                  title="Green to Emerald"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-br from-yellow-300 to-orange-700 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', 'linear-gradient(135deg, #FDE047, #C2410C)')}
                  title="Yellow to Orange"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-br from-purple-300 to-violet-700 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', 'linear-gradient(135deg, #C4B5FD, #6B21A8)')}
                  title="Purple to Violet"
                />
                
                {/* Row 2 */}
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-br from-indigo-300 to-blue-700 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', 'linear-gradient(135deg, #A5B4FC, #1D4ED8)')}
                  title="Indigo to Blue"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-br from-teal-300 to-green-700 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', 'linear-gradient(135deg, #5EEAD4, #15803D)')}
                  title="Teal to Green"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-br from-red-300 to-orange-700 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', 'linear-gradient(135deg, #FCA5A5, #C2410C)')}
                  title="Red to Orange"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-br from-slate-300 to-gray-700 hover:scale-110 transition-transform"
                  onClick={() => handleBackgroundChange('value', 'linear-gradient(135deg, #CBD5E1, #374151)')}
                  title="Slate to Gray"
                />
                <div 
                  className="w-8 h-8 rounded border cursor-pointer bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 hover:scale-110 transition-transform"
                  onClick={() => setShowColorPicker(true)}
                  title="Custom Gradient"
                />
          </div>

              {/* Advanced Gradient Editor Button */}
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGradientEditor(true)}
                  className="w-full text-xs bg-ivory text-charcoal border-charcoal/20 hover:bg-charcoal/5"
                >
                  Advanced Gradient Editor
                </Button>
              </div>
              
            </div>
          )}

          {/* Image Upload - Only show when background type is image */}
          {state.background.kind === 'image' && (
            <div className="space-y-1">
              <Label className="text-xs font-medium text-charcoal">Background Image</Label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" className="w-full h-12 border-dashed bg-ivory text-charcoal hover:bg-charcoal/5 pointer-events-none">
              <div className="flex flex-col items-center space-y-1">
                    <ImageIcon className="w-3 h-3" />
                <span className="text-xs">Upload Background</span>
              </div>
            </Button>
          </div>
              
              {/* Image Opacity Slider - Only show when image is uploaded */}
              {state.background.value && (
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-charcoal">
                    Darkness: {imageOpacity}%
                  </Label>
                  <Slider
                    value={[imageOpacity]}
                    onValueChange={([value]) => handleImageOpacityChange(value)}
                    min={10}
                    max={100}
                    step={1}
                    className="w-full [&_.slider-track]:h-0.5 [&_.slider-track]:bg-charcoal/10 [&_.slider-range]:h-0.5 [&_.slider-range]:bg-charcoal/60 [&_.slider-thumb]:h-2 [&_.slider-thumb]:w-2 [&_.slider-thumb]:border-0 [&_.slider-thumb]:bg-charcoal [&_.slider-thumb]:shadow-none"
                  />
                  <div className="flex justify-between text-xs text-charcoal/60">
                    <span>Darker</span>
                    <span>Lighter</span>
                  </div>
                </div>
              )}
              
            </div>
          )}
        </CardContent>
      </Card>


      {/* Card Size Control */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-0 px-2 pt-1">
          <CardTitle className="text-xs text-charcoal">Card Size</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 px-2 pb-1">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-charcoal">
              Size: {Math.round(state.cardConfig.scale * 100)}%
            </Label>
            <Slider
              value={[state.cardConfig.scale]}
              onValueChange={([value]) => handleCardScaleChange(value)}
              min={0.6}
              max={1.5}
              step={0.01}
              className="w-full [&_.slider-track]:h-0.5 [&_.slider-track]:bg-charcoal/10 [&_.slider-range]:h-0.5 [&_.slider-range]:bg-charcoal/60 [&_.slider-thumb]:h-2 [&_.slider-thumb]:w-2 [&_.slider-thumb]:border-0 [&_.slider-thumb]:bg-charcoal [&_.slider-thumb]:shadow-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Card Shadow Control */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-0 px-2 pt-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs text-charcoal">Card Shadow</CardTitle>
            <Switch
              checked={state.cardConfig.shadow.enabled}
              onCheckedChange={(checked) => handleShadowChange('enabled', checked)}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-1 px-2 pb-1">
          <div className="space-y-1">

            {/* Shadow Controls - Only show when enabled */}
            {state.cardConfig.shadow.enabled && (
              <div className="space-y-1">
                {/* Blur */}
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-charcoal">
                    Blur: {state.cardConfig.shadow.blur}px
                  </Label>
                  <Slider
                    value={[state.cardConfig.shadow.blur]}
                    onValueChange={([value]) => handleShadowChange('blur', value)}
                    min={0}
                    max={50}
                    step={1}
                    className="w-full [&_.slider-track]:h-0.5 [&_.slider-track]:bg-charcoal/10 [&_.slider-range]:h-0.5 [&_.slider-range]:bg-charcoal/60 [&_.slider-thumb]:h-2 [&_.slider-thumb]:w-2 [&_.slider-thumb]:border-0 [&_.slider-thumb]:bg-charcoal [&_.slider-thumb]:shadow-none"
                  />
                </div>

                {/* Offset X */}
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-charcoal">
                    Offset X: {state.cardConfig.shadow.offsetX}px
                  </Label>
                  <Slider
                    value={[state.cardConfig.shadow.offsetX]}
                    onValueChange={([value]) => handleShadowChange('offsetX', value)}
                    min={-50}
                    max={50}
                    step={1}
                    className="w-full [&_.slider-track]:h-0.5 [&_.slider-track]:bg-charcoal/10 [&_.slider-range]:h-0.5 [&_.slider-range]:bg-charcoal/60 [&_.slider-thumb]:h-2 [&_.slider-thumb]:w-2 [&_.slider-thumb]:border-0 [&_.slider-thumb]:bg-charcoal [&_.slider-thumb]:shadow-none"
                  />
                </div>

                {/* Offset Y */}
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-charcoal">
                    Offset Y: {state.cardConfig.shadow.offsetY}px
                  </Label>
                  <Slider
                    value={[state.cardConfig.shadow.offsetY]}
                    onValueChange={([value]) => handleShadowChange('offsetY', value)}
                    min={-50}
                    max={50}
                    step={1}
                    className="w-full [&_.slider-track]:h-0.5 [&_.slider-track]:bg-charcoal/10 [&_.slider-range]:h-0.5 [&_.slider-range]:bg-charcoal/60 [&_.slider-thumb]:h-2 [&_.slider-thumb]:w-2 [&_.slider-thumb]:border-0 [&_.slider-thumb]:bg-charcoal [&_.slider-thumb]:shadow-none"
                  />
                </div>

                {/* Opacity */}
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-charcoal">
                    Opacity: {state.cardConfig.shadow.opacity}%
                  </Label>
                  <Slider
                    value={[state.cardConfig.shadow.opacity]}
                    onValueChange={([value]) => handleShadowChange('opacity', value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full [&_.slider-track]:h-0.5 [&_.slider-track]:bg-charcoal/10 [&_.slider-range]:h-0.5 [&_.slider-range]:bg-charcoal/60 [&_.slider-thumb]:h-2 [&_.slider-thumb]:w-2 [&_.slider-thumb]:border-0 [&_.slider-thumb]:bg-charcoal [&_.slider-thumb]:shadow-none"
                  />
            </div>

          </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reset All Settings Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // 현재 배경 타입에 따라 해당 영역만 초기화
          if (state.background.kind === 'solid') {
            // 솔리드 컬러: 연한 회색으로 초기화
            dispatch({ type: "SET_BACKGROUND", patch: { value: "#F3F4F6" } });
          } else if (state.background.kind === 'gradient') {
            // 그라디언트: 연한 회색으로 초기화 (그라디언트 영역 유지)
            dispatch({ type: "SET_BACKGROUND", patch: { value: "#F3F4F6" } });
            setGradientConfig({
              startColor: '#F3F4F6',
              endColor: '#F3F4F6',
              middleColor: '#F3F4F6',
              middlePosition: 50,
              direction: 135
            });
          } else if (state.background.kind === 'image') {
            // 이미지: 연한 회색으로 초기화 (이미지 영역 유지)
            dispatch({ type: "SET_BACKGROUND", patch: { value: "#F3F4F6" } });
            setImageOpacity(100);
          }
          
          // 카드 설정도 초기화
          dispatch({ type: "SET_CARD_SCALE", value: 1.0 });
          dispatch({ type: "SET_CARD_SHADOW", patch: {
            enabled: true,
            blur: 10,
            offsetX: 0,
            offsetY: 4,
            color: '#000000',
            opacity: 50
          }});
          
          // 로컬 상태도 초기화
          setShowColorPicker(false);
          setCustomColor('#3B82F6');
          setShowGradientEditor(false);
        }}
        className="w-full text-xs bg-ivory text-charcoal border-charcoal/20 hover:bg-charcoal/5"
      >
        Reset to Default
      </Button>

      {/* Custom Color Picker Modal */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-ivory rounded-lg p-6 w-80 max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-charcoal">Custom Color</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowColorPicker(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-charcoal">Color Picker</Label>
                <div className="mt-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => handleCustomColorChange(e.target.value)}
                    className="w-full h-12 rounded border border-charcoal/30 cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-charcoal">Hex Code</Label>
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-charcoal/30 rounded-md text-sm bg-ivory text-charcoal"
                  placeholder="#000000"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleCustomColorConfirm}
                  className="flex-1 bg-charcoal text-ivory hover:bg-charcoal/90 text-sm"
                >
                  Apply
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowColorPicker(false)}
                  className="flex-1 bg-ivory text-charcoal border-charcoal/20 hover:bg-charcoal/5 text-sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Gradient Editor Modal */}
      {showGradientEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-ivory rounded-lg p-6 w-[800px] max-w-[90vw] mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-charcoal">Advanced Gradient Editor</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGradientEditor(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-6">
              {/* Left Side - Controls */}
              <div className="flex-1 space-y-4">

              {/* Direction */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-charcoal">
                  Direction: {gradientConfig.direction}°
                </Label>
                <Slider
                  value={[gradientConfig.direction]}
                  onValueChange={([value]) => handleGradientConfigChange('direction', value)}
                  min={0}
                  max={360}
                  step={1}
                  className="w-full [&_.slider-track]:h-0.5 [&_.slider-track]:bg-charcoal/10 [&_.slider-range]:h-0.5 [&_.slider-range]:bg-charcoal/60 [&_.slider-thumb]:h-2 [&_.slider-thumb]:w-2 [&_.slider-thumb]:border-0 [&_.slider-thumb]:bg-charcoal [&_.slider-thumb]:shadow-none"
                />
              </div>

              {/* Start Color */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-charcoal">Start Color</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={gradientConfig.startColor}
                    onChange={(e) => handleGradientConfigChange('startColor', e.target.value)}
                    className="w-12 h-8 rounded border border-charcoal/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={gradientConfig.startColor}
                    onChange={(e) => handleGradientConfigChange('startColor', e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-charcoal/30 rounded bg-ivory text-charcoal"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Middle Color */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-charcoal">Middle Color</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={gradientConfig.middleColor}
                    onChange={(e) => handleGradientConfigChange('middleColor', e.target.value)}
                    className="w-12 h-8 rounded border border-charcoal/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={gradientConfig.middleColor}
                    onChange={(e) => handleGradientConfigChange('middleColor', e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-charcoal/30 rounded bg-ivory text-charcoal"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Middle Position */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-charcoal">
                  Middle Position: {gradientConfig.middlePosition}%
                </Label>
                <Slider
                  value={[gradientConfig.middlePosition]}
                  onValueChange={([value]) => handleGradientConfigChange('middlePosition', value)}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full [&_.slider-track]:h-0.5 [&_.slider-track]:bg-charcoal/10 [&_.slider-range]:h-0.5 [&_.slider-range]:bg-charcoal/60 [&_.slider-thumb]:h-2 [&_.slider-thumb]:w-2 [&_.slider-thumb]:border-0 [&_.slider-thumb]:bg-charcoal [&_.slider-thumb]:shadow-none"
                />
              </div>

              {/* End Color */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-charcoal">End Color</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={gradientConfig.endColor}
                    onChange={(e) => handleGradientConfigChange('endColor', e.target.value)}
                    className="w-12 h-8 rounded border border-charcoal/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={gradientConfig.endColor}
                    onChange={(e) => handleGradientConfigChange('endColor', e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-charcoal/30 rounded bg-ivory text-charcoal"
                    placeholder="#000000"
                  />
                </div>
              </div>

              </div>

              {/* Right Side - Preview */}
              <div className="w-80 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-charcoal">Card Preview</Label>
                  <div className="relative w-full h-full min-h-[300px] rounded-lg border border-charcoal/30 overflow-hidden">
                    <div 
                      className="absolute inset-0"
                      style={{ background: generateGradientCSS(gradientConfig) }}
                    />
                    <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-lg border border-charcoal/20">
                      <div className="p-2 text-xs text-charcoal">
                        <div className="font-semibold">Sample Testimonial</div>
                        <div className="mt-1 text-charcoal/70">This is how your gradient will look with content.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Centered at bottom */}
            <div className="flex justify-center space-x-2 pt-4 mt-4 border-t border-charcoal/20">
              <Button
                onClick={handleGradientEditorConfirm}
                className="bg-charcoal text-ivory hover:bg-charcoal/90 text-sm px-6"
              >
                Apply
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowGradientEditor(false)}
                className="bg-ivory text-charcoal border-charcoal/20 hover:bg-charcoal/5 text-sm px-6"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
