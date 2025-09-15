'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEditor } from '../../context/EditorContext';
import { User, Upload, Building, Calendar, CheckCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function Step2Content() {
  const { state, dispatch } = useEditor();
  const [isUploading, setIsUploading] = useState(false);

  const handleContentChange = (field: keyof typeof state.content, value: any) => {
    dispatch({ type: "SET_CONTENT", patch: { [field]: value } });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // TODO: 실제 파일 업로드 로직 구현
      // 임시로 더미 URL 사용
      const dummyUrl = `https://picsum.photos/200/200?random=${Date.now()}`;
      handleContentChange('avatarUrl', dummyUrl);
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // 템플릿별 필드 정의
  const getTemplateFields = (templateId: string) => {
    const baseFields = ['quote', 'authorName', 'authorRole', 'avatarUrl', 'isAnonymous', 'theme'];
    
    switch (templateId) {
      case 'T1': // Classic Center
        return [...baseFields];
      
      case 'T2': // Modern Left
        return [...baseFields];
      
      case 'T3': // Card Style
        return [...baseFields];
      
      case 'T4': // Review Card
        return [...baseFields, 'company', 'verified', 'dateISO'];
      
      case 'T5': // Progress Style
        return [...baseFields];
      
      case 'T6': // Split Layout
        return [...baseFields];
      
      case 'T7': // Quote Style
        return [...baseFields];
      
      case 'T8': // Profile Centric
        return [...baseFields];
      
      case 'T9': // Minimal
        return [...baseFields];
      
      default:
        return baseFields;
    }
  };

  // 템플릿별 글자수 제한
  const getCharacterLimits = (templateId: string) => {
    switch (templateId) {
      case 'T1': // Classic Center - 중앙 정렬, 간단한 레이아웃
        return { quote: 120, authorName: 20, authorRole: 30 };
      case 'T2': // Modern Left - 좌측 정렬, 모던한 스타일
        return { quote: 100, authorName: 18, authorRole: 25 };
      case 'T3': // Card Style - 카드 형태, 중간 크기
        return { quote: 80, authorName: 15, authorRole: 20 };
      case 'T4': // Review Card - 리뷰 형태, 많은 정보
        return { quote: 150, authorName: 25, authorRole: 35, company: 30 };
      case 'T5': // Progress Style - 진행률 표시, 간단한 텍스트
        return { quote: 60, authorName: 12, authorRole: 18 };
      case 'T6': // Split Layout - 분할 레이아웃, 중간 크기
        return { quote: 100, authorName: 18, authorRole: 25 };
      case 'T7': // Quote Style - 인용문 중심, 긴 텍스트
        return { quote: 200, authorName: 20, authorRole: 30 };
      case 'T8': // Profile Centric - 프로필 중심, 중간 크기
        return { quote: 80, authorName: 15, authorRole: 20 };
      case 'T9': // Minimal - 미니멀, 짧은 텍스트
        return { quote: 50, authorName: 10, authorRole: 15 };
      default:
        return { quote: 100, authorName: 20, authorRole: 30 };
    }
  };

  const templateFields = getTemplateFields(state.templateId);
  const characterLimits = getCharacterLimits(state.templateId);
  const showField = (field: string) => templateFields.includes(field);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-charcoal mb-1">Edit Content</h2>
        <p className="text-sm text-charcoal/60">Customize your testimonial content</p>
      </div>

      {/* Main Content Card */}
      <Card className="bg-ivory border-charcoal/20">
        <CardContent className="p-4 space-y-4">
          {/* Avatar Section */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
              {state.content.avatarUrl ? (
                <div 
                  className="w-12 h-12 rounded-full overflow-hidden border-2 border-charcoal/20 cursor-pointer hover:border-charcoal/40 transition-colors"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  title="Click to change avatar"
                >
                  <img 
                    src={state.content.avatarUrl} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div 
                  className="w-12 h-12 rounded-full bg-charcoal/10 border-2 border-dashed border-charcoal/30 flex items-center justify-center cursor-pointer hover:border-charcoal/50 hover:bg-charcoal/20 transition-colors"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  title="Click to upload avatar"
                >
                  <User className="w-6 h-6 text-charcoal/40" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-charcoal/60">
                {isUploading ? 'Uploading...' : 'Click avatar to upload image'}
              </p>
            </div>
          </div>

          {/* Name and Role Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-charcoal">
                Name ({state.content.authorName.length}/{characterLimits.authorName})
              </Label>
              <Input
                placeholder="John Doe"
                className="text-sm bg-ivory text-charcoal"
                value={state.content.authorName}
                onChange={(e) => {
                  if (e.target.value.length <= characterLimits.authorName) {
                    handleContentChange('authorName', e.target.value);
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-charcoal">
                Role & Company ({state.content.authorRole.length}/{characterLimits.authorRole})
              </Label>
              <Input
                placeholder="CEO, TechStart"
                className="text-sm bg-ivory text-charcoal"
                value={state.content.authorRole}
                onChange={(e) => {
                  if (e.target.value.length <= characterLimits.authorRole) {
                    handleContentChange('authorRole', e.target.value);
                  }
                }}
              />
            </div>
          </div>

          {/* Company Field (T4 only) */}
          {showField('company') && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-charcoal flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Company ({(state.content.company || '').length}/{characterLimits.company})
              </Label>
              <Input
                placeholder="TechCorp Inc."
                className="text-sm bg-ivory text-charcoal"
                value={state.content.company || ''}
                onChange={(e) => {
                  if (e.target.value.length <= characterLimits.company) {
                    handleContentChange('company', e.target.value);
                  }
                }}
              />
            </div>
          )}

          {/* Quote Text */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-charcoal flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Quote Text ({state.content.quote.length}/{characterLimits.quote})
            </Label>
            <Textarea
              placeholder="Enter testimonial quote..."
              className="min-h-[80px] text-sm bg-ivory text-charcoal resize-none"
              value={state.content.quote}
              onChange={(e) => {
                if (e.target.value.length <= characterLimits.quote) {
                  handleContentChange('quote', e.target.value);
                }
              }}
            />
            {state.content.quote.length > characterLimits.quote * 0.9 && (
              <p className="text-xs text-orange-600">
                {characterLimits.quote - state.content.quote.length} characters remaining
              </p>
            )}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-center">
            <div className="flex bg-charcoal/10 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleContentChange('theme', 'light')}
                className={`px-4 py-2 text-sm ${
                  state.content.theme === 'light' 
                    ? 'bg-charcoal text-ivory shadow-sm hover:bg-charcoal/90' 
                    : 'text-charcoal hover:bg-charcoal/20'
                }`}
              >
                Light Mode
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleContentChange('theme', 'dark')}
                className={`px-4 py-2 text-sm ${
                  state.content.theme === 'dark' 
                    ? 'bg-charcoal text-ivory shadow-sm hover:bg-charcoal/90' 
                    : 'text-charcoal hover:bg-charcoal/20'
                }`}
              >
                Dark Mode
              </Button>
            </div>
          </div>

          {/* Review Details (T4 only) */}
          {showField('verified') && (
            <div className="grid grid-cols-2 gap-4">
              {/* Verified Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-sm text-charcoal flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verified Review
                </Label>
                <Switch
                  checked={state.content.verified || false}
                  onCheckedChange={(checked) => handleContentChange('verified', checked)}
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-charcoal flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Review Date
                </Label>
                <Input
                  type="date"
                  className="text-sm bg-ivory text-charcoal"
                  value={state.content.dateISO ? state.content.dateISO.split('T')[0] : ''}
                  onChange={(e) => handleContentChange('dateISO', e.target.value ? new Date(e.target.value).toISOString() : '')}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}