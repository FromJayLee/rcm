'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEditor } from '../../context/EditorContext';
import { Download } from 'lucide-react';

export function Step4Export() {
  const { state } = useEditor();

  const resolutionPresets = [
    { label: '1200×900', width: 1200, height: 900 },
    { label: '1400×1050', width: 1400, height: 1050 },
    { label: '1600×1200', width: 1600, height: 1200 },
    { label: '1800×1350', width: 1800, height: 1350 },
    { label: '2000×1500', width: 2000, height: 1500 },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-charcoal mb-2">Export Your Card</h2>
        <p className="text-sm text-charcoal/60">Download your testimonial card in 4:3 ratio</p>
      </div>
      
      {/* Resolution Presets */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-charcoal">Resolution Presets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {resolutionPresets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                className="justify-start text-sm border-charcoal/30 text-charcoal hover:bg-charcoal/5"
              >
                {preset.label} (4:3)
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Resolution */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-charcoal">Custom Resolution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Width (Height auto-calculated)</Label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="1600"
                className="flex-1 px-3 py-2 border border-charcoal/30 rounded-md text-sm bg-ivory text-charcoal"
              />
              <span className="text-sm text-charcoal/60">×</span>
              <span className="text-sm text-charcoal/60">800</span>
            </div>
            <p className="text-xs text-charcoal/60">Height will be automatically calculated as width × 3 ÷ 4</p>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-charcoal">Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input type="radio" id="png" name="format" defaultChecked className="text-charcoal" />
              <Label htmlFor="png" className="text-sm">PNG (Recommended)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="jpg" name="format" className="text-charcoal" />
              <Label htmlFor="jpg" className="text-sm">JPG</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="2x" className="text-charcoal" />
              <Label htmlFor="2x" className="text-sm">2× Resolution (Retina)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="background" defaultChecked className="text-charcoal" />
              <Label htmlFor="background" className="text-sm">Include Background</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Name */}
      <Card className="bg-ivory border-charcoal/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-charcoal">File Name</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="text"
            placeholder="testimonial-card"
            className="w-full px-3 py-2 border border-charcoal/30 rounded-md text-sm bg-ivory text-charcoal"
          />
        </CardContent>
      </Card>

      {/* Export Button */}
      <Button className="w-full bg-charcoal text-ivory hover:bg-black">
        <Download className="w-4 h-4 mr-2" />
        Export Card
      </Button>

      {/* Token Cost */}
      <div className="text-center">
        <Badge variant="secondary" className="text-xs">
          Cost: 1 Token
        </Badge>
      </div>
    </div>
  );
}