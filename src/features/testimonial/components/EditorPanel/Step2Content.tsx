'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEditor } from '../../context/EditorContext';
import { User, Upload, Building, Calendar, CheckCircle, MessageCircle, Star } from 'lucide-react';
import { useState } from 'react';
import { DefaultAvatar } from '@/components/ui/default-avatar';
import { 
  getTemplateFields, 
  getCharacterLimits, 
  isFieldUsed, 
  isFieldRequired,
  templateFieldConfigs 
} from '../../lib/template-fields';

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

  const templateFields = getTemplateFields(state.templateId);
  const characterLimits = getCharacterLimits(state.templateId);
  const showField = (field: string) => isFieldUsed(state.templateId, field);
  const isRequired = (field: string) => isFieldRequired(state.templateId, field);
  
  // 현재 템플릿 설정 정보
  const templateConfig = templateFieldConfigs[state.templateId];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-charcoal mb-1">Edit Content</h2>
        <p className="text-sm text-charcoal/60">
          {templateConfig?.description || 'Customize your testimonial content'}
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="bg-ivory border-charcoal/20">
        <CardContent className="p-4 space-y-4">
          {/* Avatar Section - 템플릿에서 사용하는 경우만 표시 */}
          {showField('avatarUrl') && (
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
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                    title="Click to upload avatar"
                  >
                    <DefaultAvatar 
                      size="md" 
                      isAnonymous={state.content.isAnonymous}
                      name={state.content.authorName}
                    />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-charcoal/60">
                  {isUploading ? 'Uploading...' : 'Click avatar to upload image'}
                </p>
              </div>
            </div>
          )}

          {/* Name and Role Row */}
          <div className="grid grid-cols-2 gap-4">
            {showField('authorName') && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-charcoal flex items-center">
                  Name {isRequired('authorName') && <span className="text-red-500 ml-1">*</span>}
                  <span className="ml-2 text-charcoal/60">
                    ({state.content.authorName.length}/{characterLimits.authorName})
                  </span>
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
            )}
            {showField('authorRole') && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-charcoal flex items-center">
                  Role & Company {isRequired('authorRole') && <span className="text-red-500 ml-1">*</span>}
                  <span className="ml-2 text-charcoal/60">
                    ({state.content.authorRole.length}/{characterLimits.authorRole})
                  </span>
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
            )}
          </div>

          {/* Company Field */}
          {showField('company') && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-charcoal flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Company {isRequired('company') && <span className="text-red-500 ml-1">*</span>}
                <span className="ml-2 text-charcoal/60">
                  ({(state.content.company || '').length}/{characterLimits.company})
                </span>
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
          {showField('quote') && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-charcoal flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Quote Text {isRequired('quote') && <span className="text-red-500 ml-1">*</span>}
                <span className="ml-2 text-charcoal/60">
                  ({state.content.quote.length}/{characterLimits.quote})
                </span>
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
          )}


          {/* Theme Toggle */}
          {showField('theme') && (
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
          )}


          {/* Review Details */}
          {showField('verified') && (
            <div className="grid grid-cols-2 gap-4">
              {/* Verified Toggle */}
              <div className="flex items-center justify-between">
                <Label className="text-sm text-charcoal flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verified Review {isRequired('verified') && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <Switch
                  checked={state.content.verified || false}
                  onCheckedChange={(checked) => handleContentChange('verified', checked)}
                />
              </div>

              {/* Date */}
              {showField('dateISO') && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-charcoal flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Review Date {isRequired('dateISO') && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    type="date"
                    className="text-sm bg-ivory text-charcoal"
                    value={state.content.dateISO ? state.content.dateISO.split('T')[0] : ''}
                    onChange={(e) => handleContentChange('dateISO', e.target.value ? new Date(e.target.value).toISOString() : '')}
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}