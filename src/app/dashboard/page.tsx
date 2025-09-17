'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Coins, User, ArrowLeft, Plus, Download, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { Header } from '@/components/layout/header';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface TestimonialCard {
  id: string;
  created_at: string;
  template_id: string;
  content: {
    rating: number;
    quote: string;
    author_name: string;
    author_role: string;
    company: string;
    avatar_url?: string;
  };
  background: {
    type: 'solid' | 'gradient' | 'image';
    color?: string;
    gradient?: string;
    image_url?: string;
  };
  export_settings: {
    resolution: string;
    format: 'png' | 'jpg';
    include_background: boolean;
  };
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [testimonialCards, setTestimonialCards] = useState<TestimonialCard[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { tokenBalance } = useTokenBalance();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user as User);
          // TODO: 실제 데이터베이스에서 사용자의 리뷰카드 가져오기
          // 현재는 빈 배열로 시작
          setTestimonialCards([]);
        } else {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error getting user:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCreateNew = () => {
    router.push('/app/editor');
  };

  const handleViewCard = (cardId: string) => {
    // TODO: 카드 상세 보기 모달 또는 페이지
    console.log('View card:', cardId);
  };

  const handleDownloadCard = (cardId: string) => {
    // TODO: 카드 다운로드 기능
    console.log('Download card:', cardId);
  };

  const handleDeleteCard = (cardId: string) => {
    // TODO: 카드 삭제 기능
    console.log('Delete card:', cardId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center">
        <div className="animate-pulse bg-[#D9D7CF] h-8 w-8 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F8F4]">
      <Header variant="app" />
      <div className="p-4">
        <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-[#222222]">생성한 리뷰카드를 관리하세요</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mb-8">
          <Button
            onClick={() => router.push('/checkout')}
            className="bg-black hover:bg-[#111111] text-white flex items-center space-x-2 transition-all duration-200"
          >
            <Coins className="w-4 h-4" />
            <span>토큰 구매</span>
          </Button>
          <Button
            onClick={handleCreateNew}
            className="bg-black hover:bg-[#111111] text-white flex items-center space-x-2 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>새 카드 생성</span>
          </Button>
        </div>

        {/* User Info & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* User Profile */}
          <Card className="bg-[#F8F8F4] border-[#D9D7CF]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt="User" />
                  <AvatarFallback className="bg-[#D9D7CF] text-[#222222] text-xl">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    {user.user_metadata?.full_name || 'User'}
                  </h3>
                  <p className="text-[#222222] text-sm">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Balance */}
          <Card className="bg-[#F8F8F4] border-[#D9D7CF]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#222222] text-sm">토큰 잔액</p>
                  <p className="text-3xl font-bold text-black">{tokenBalance}</p>
                  <p className="text-xs text-[#222222]/70 mt-1">
                    카드 생성 시 1토큰 소모
                  </p>
                </div>
                <Coins className="w-8 h-8 text-[#222222]" />
              </div>
            </CardContent>
          </Card>

          {/* Total Cards */}
          <Card className="bg-[#F8F8F4] border-[#D9D7CF]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#222222] text-sm">생성된 카드</p>
                  <p className="text-3xl font-bold text-black">{testimonialCards.length}</p>
                </div>
                <div className="w-8 h-8 bg-[#D9D7CF] rounded-full flex items-center justify-center">
                  <span className="text-[#222222] font-bold">📄</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-black">내 리뷰카드</h2>
            <Badge variant="secondary" className="bg-[#D9D7CF] text-[#222222] border-[#222222]/20">
              {testimonialCards.length}개
            </Badge>
          </div>

          {testimonialCards.length === 0 ? (
            <Card className="bg-[#F8F8F4] border-[#D9D7CF]">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-[#D9D7CF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-[#222222]" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">아직 생성된 카드가 없습니다</h3>
                <p className="text-[#222222] mb-6">첫 번째 리뷰카드를 생성해보세요!</p>
                <Button
                  onClick={handleCreateNew}
                  className="bg-black hover:bg-[#111111] text-white transition-all duration-200"
                >
                  카드 생성하기
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonialCards.map((card) => (
                <Card key={card.id} className="bg-[#F8F8F4] border-[#D9D7CF] overflow-hidden">
                  <CardContent className="p-0">
                    {/* Card Preview */}
                    <div 
                      className="h-48 w-full flex items-center justify-center text-white relative"
                      style={{
                        background: card.background.type === 'gradient' 
                          ? card.background.gradient 
                          : card.background.type === 'solid' 
                            ? card.background.color 
                            : `url(${card.background.image_url}) center/cover`
                      }}
                    >
                      <div className="text-center p-4">
                        <div className="flex justify-center mb-2">
                          {'★'.repeat(card.content.rating)}
                        </div>
                        <p className="text-sm font-medium mb-2">"{card.content.quote}"</p>
                        <p className="text-xs opacity-90">- {card.content.author_name}</p>
                      </div>
                    </div>

                    {/* Card Info */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-semibold text-black text-sm">템플릿 {card.template_id}</h4>
                        <p className="text-xs text-[#222222]/70">
                          {new Date(card.created_at).toLocaleDateString('ko-KR')}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-[#D9D7CF] text-[#222222] text-xs">
                          {card.export_settings.resolution}
                        </Badge>
                        <Badge variant="secondary" className="bg-[#D9D7CF] text-[#222222] text-xs">
                          {card.export_settings.format.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleViewCard(card.id)}
                          className="flex-1 bg-black hover:bg-[#111111] text-white transition-all duration-200"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          보기
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownloadCard(card.id)}
                          className="flex-1 bg-black hover:bg-[#111111] text-white transition-all duration-200"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          다운로드
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDeleteCard(card.id)}
                          className="bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
