'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Upload, 
  Palette, 
  Download, 
  Star, 
  User, 
  Building, 
  Image as ImageIcon,
  FileText,
  Settings
} from 'lucide-react';
import { useEditor } from '../context/EditorContext';

interface EditorPanelProps {
  currentStep: number;
}

export function EditorPanel({ currentStep }: EditorPanelProps) {
  const { state, dispatch } = useEditor();

  const handleTemplateChange = (templateId: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9') => {
    dispatch({ type: "SET_TEMPLATE", templateId });
  };

  const handleContentChange = (field: keyof typeof state.content, value: any) => {
    dispatch({ type: "SET_CONTENT", patch: { [field]: value } });
  };

  const handleBackgroundChange = (field: keyof typeof state.background, value: any) => {
    dispatch({ type: "SET_BACKGROUND", patch: { [field]: value } });
  };

  return (
    <div className="h-full overflow-y-auto">
      <Tabs value={currentStep.toString()} className="h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="1" className="text-xs">
            <FileText className="w-3 h-3 mr-1" />
            Content
          </TabsTrigger>
          <TabsTrigger value="2" className="text-xs">
            <Palette className="w-3 h-3 mr-1" />
            Background
          </TabsTrigger>
          <TabsTrigger value="3" className="text-xs">
            <Download className="w-3 h-3 mr-1" />
            Export
          </TabsTrigger>
        </TabsList>

        {/* Step 1: Content */}
        <TabsContent value="1" className="h-full p-4 space-y-6">
          {/* Templates Tab */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {['T1', 'T2', 'T3', 'T4', 'T5'].map((template) => (
                  <Button
                    key={template}
                    variant={cardConfig.templateId === template ? "default" : "outline"}
                    size="sm"
                    className="h-16 text-xs"
                    onClick={() => handleTemplateChange(template as CardConfig['templateId'])}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Tab */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <User className="w-4 h-4 mr-2" />
                Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Rating */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Rating: {state.content.rating}</Label>
                <Slider
                  value={[state.content.rating]}
                  onValueChange={([value]) => handleContentChange('rating', value)}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full [&_.slider-track]:h-0.5 [&_.slider-track]:bg-charcoal/10 [&_.slider-range]:h-0.5 [&_.slider-range]:bg-charcoal/60 [&_.slider-thumb]:h-2 [&_.slider-thumb]:w-2 [&_.slider-thumb]:border-0 [&_.slider-thumb]:bg-charcoal [&_.slider-thumb]:shadow-none"
                />
                <div className="flex justify-between text-xs text-charcoal/60">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>

              {/* Quote Text */}
              <div className="space-y-2">
                <Label htmlFor="quote" className="text-sm font-medium">
                  Quote Text
                </Label>
                <Textarea
                  id="quote"
                  placeholder="Enter testimonial quote..."
                  className="min-h-[100px] text-sm"
                  value={cardConfig.content.quote}
                  onChange={(e) => handleContentChange('quote', e.target.value)}
                />
              </div>

              {/* Author Name */}
              <div className="space-y-2">
                <Label htmlFor="author" className="text-sm font-medium">
                  Author Name
                </Label>
                <Input
                  id="author"
                  placeholder="John Doe"
                  className="text-sm"
                  value={cardConfig.content.authorName}
                  onChange={(e) => handleContentChange('authorName', e.target.value)}
                />
              </div>

              {/* Role/Company */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role & Company
                </Label>
                <Input
                  id="role"
                  placeholder="CEO, TechStart"
                  className="text-sm"
                  value={cardConfig.content.authorRole}
                  onChange={(e) => handleContentChange('authorRole', e.target.value)}
                />
              </div>

              {/* Avatar Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Avatar</Label>
                <Button variant="outline" className="w-full h-20 border-dashed">
                  <div className="flex flex-col items-center space-y-1">
                    <Upload className="w-4 h-4" />
                    <span className="text-xs">Upload Image</span>
                  </div>
                </Button>
              </div>

              {/* Anonymous Toggle */}
              <div className="flex items-center justify-between">
                <Label htmlFor="anonymous" className="text-sm">
                  Anonymous testimonial
                </Label>
                <Switch
                  id="anonymous"
                  checked={cardConfig.content.isAnonymous}
                  onCheckedChange={(checked) => handleContentChange('isAnonymous', checked)}
                />
              </div>

              {/* Light/Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <Label htmlFor="mode" className="text-sm">
                  Dark mode
                </Label>
                <Switch
                  id="mode"
                  checked={cardConfig.style.mode === 'dark'}
                  onCheckedChange={(checked) => handleStyleChange('mode', checked ? 'dark' : 'light')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Background */}
        <TabsContent value="2" className="h-full p-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Background Styling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Background Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Background Type</Label>
                <Select defaultValue="solid">
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
                  <div className="w-8 h-8 rounded border bg-blue-500"></div>
                  <div className="w-8 h-8 rounded border bg-purple-500"></div>
                  <div className="w-8 h-8 rounded border bg-green-500"></div>
                  <div className="w-8 h-8 rounded border bg-orange-500"></div>
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

              {/* Opacity Slider */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Opacity</Label>
                <div className="space-y-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={state.cardConfig.shadow.opacity}
                    onChange={(e) => dispatch({ type: "SET_CARD_SHADOW", patch: { opacity: parseInt(e.target.value) } })}
                    className="w-full h-1 bg-charcoal/10 appearance-none [&::-webkit-slider-track]:h-1 [&::-webkit-slider-track]:bg-charcoal/10 [&::-webkit-slider-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-charcoal [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:shadow-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-charcoal/10 [&::-moz-range-track]:rounded-full [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-charcoal [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-none [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-charcoal/60 mb-2">
                    <span>0%</span>
                    <span>{state.cardConfig.shadow.opacity}%</span>
                    <span>100%</span>
                  </div>
                  <div className="mt-4">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // 전체 설정 초기화
                      dispatch({ type: "SET_TEMPLATE", templateId: "T1" });
                      dispatch({ type: "SET_CONTENT", patch: {
                        quote: "Great tool! Saves us hours of work. Highly recommend!",
                        authorName: "Sarah Chen",
                        authorRole: "Marketing Manager",
                        rating: 5,
                        avatarUrl: null,
                        isAnonymous: false,
                        theme: "light",
                        company: "TechCorp",
                        sourceName: "Google Reviews",
                        sourceLogoUrl: null,
                        dateISO: "2024-01-15",
                        verified: true,
                        badges: ["Verified"],
                        align: "left",
                        accentColor: "#3B82F6"
                      }});
                      dispatch({ type: "SET_BACKGROUND", patch: {
                        kind: "solid",
                        value: "#000000"
                      }});
                      dispatch({ type: "SET_CARD_SCALE", value: 1.0 });
                      dispatch({ type: "SET_CARD_SHADOW", patch: {
                        enabled: true,
                        blur: 10,
                        offsetX: 0,
                        offsetY: 4,
                        opacity: 50
                      }});
                    }}
                    className="w-full text-xs bg-ivory text-charcoal border-charcoal/20 hover:bg-charcoal/5"
                  >
                    Reset All Settings
                  </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Export */}
        <TabsContent value="3" className="h-full p-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Resolution */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Resolution</Label>
                <Select defaultValue="1x">
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1x">1x (Standard)</SelectItem>
                    <SelectItem value="2x">2x (High DPI)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Format */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Format</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    PNG
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    JPG
                  </Button>
                </div>
              </div>

              {/* File Name */}
              <div className="space-y-2">
                <Label htmlFor="filename" className="text-sm font-medium">
                  File Name
                </Label>
                <Input
                  id="filename"
                  placeholder="testimonial-card"
                  defaultValue="testimonial-card"
                  className="text-sm"
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-bg" className="rounded" defaultChecked />
                  <Label htmlFor="include-bg" className="text-sm">
                    Include background
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="watermark" className="rounded" />
                  <Label htmlFor="watermark" className="text-sm">
                    Add watermark (free tier)
                  </Label>
                </div>
              </div>

              <Separator />

              {/* Export Button */}
              <Button className="w-full" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Export Testimonial
              </Button>

              {/* Token Cost */}
              <div className="text-center">
                <Badge variant="secondary" className="text-xs">
                  Cost: 1 Token
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
