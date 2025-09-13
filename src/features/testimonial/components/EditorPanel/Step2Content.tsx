'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEditor } from '../../context/EditorContext';
import { User, Upload } from 'lucide-react';

export function Step2Content() {
  const { state, dispatch } = useEditor();

  const handleContentChange = (field: keyof typeof state.content, value: any) => {
    dispatch({ type: "SET_CONTENT", patch: { [field]: value } });
  };

  return (
    <Card className="bg-ivory border-charcoal/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center text-charcoal">
          <User className="w-4 h-4 mr-2" />
          Edit Content
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
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
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
            value={state.content.quote}
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
            value={state.content.authorName}
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
            value={state.content.authorRole}
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
            checked={state.content.isAnonymous}
            onCheckedChange={(checked) => handleContentChange('isAnonymous', checked)}
          />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="theme" className="text-sm">
            Dark mode
          </Label>
          <Switch
            id="theme"
            checked={state.content.theme === 'dark'}
            onCheckedChange={(checked) => handleContentChange('theme', checked ? 'dark' : 'light')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
