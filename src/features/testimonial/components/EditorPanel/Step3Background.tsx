'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEditor } from '../../context/EditorContext';
import { Palette, Image as ImageIcon } from 'lucide-react';

export function Step3Background() {
  const { state, dispatch } = useEditor();

  const handleBackgroundChange = (field: keyof typeof state.background, value: any) => {
    dispatch({ type: "SET_BACKGROUND", patch: { [field]: value } });
  };

  const handleCardScaleChange = (value: number) => {
    dispatch({ type: "SET_CARD_SCALE", value });
  };

  return (
    <div className="space-y-6">
      {/* Background Type */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center text-charcoal">
            <Palette className="w-4 h-4 mr-2" />
            Background Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Background Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Background Type</Label>
            <Select 
              value={state.background.kind} 
              onValueChange={(value) => handleBackgroundChange('kind', value)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid Color</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Color</Label>
            <div className="flex space-x-2">
              <div 
                className="w-8 h-8 rounded border cursor-pointer bg-blue-500"
                onClick={() => handleBackgroundChange('value', '#3B82F6')}
              />
              <div 
                className="w-8 h-8 rounded border cursor-pointer bg-purple-500"
                onClick={() => handleBackgroundChange('value', '#8B5CF6')}
              />
              <div 
                className="w-8 h-8 rounded border cursor-pointer bg-green-500"
                onClick={() => handleBackgroundChange('value', '#10B981')}
              />
              <div 
                className="w-8 h-8 rounded border cursor-pointer bg-orange-500"
                onClick={() => handleBackgroundChange('value', '#F59E0B')}
              />
              <Button variant="outline" size="sm" className="text-xs">
                Custom
              </Button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Background Image</Label>
            <Button variant="outline" className="w-full h-20 border-dashed">
              <div className="flex flex-col items-center space-y-1">
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs">Upload Background</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Canvas Info */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-charcoal">Canvas Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-charcoal">4:3 비율 고정</div>
            <div className="text-sm text-charcoal/60 mt-1">
              가로×세로 · 4:3
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Size Control */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-charcoal">Card Size</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Size: {Math.round(state.cardConfig.scale * 100)}%
            </Label>
            <Slider
              value={[state.cardConfig.scale]}
              onValueChange={([value]) => handleCardScaleChange(value)}
              min={0.6}
              max={0.95}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>60%</span>
              <span>95%</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Adjust the size of the testimonial card within the background. The card will scale proportionally.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
