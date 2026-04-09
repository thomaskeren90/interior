export interface DesignRequest {
  imageUrl?: string;
  imageBase64?: string;
  roomType: string;
  style: string;
  mode: 'interior-design' | 'style-transfer' | 'virtual-staging' | 'sketch2image' | 'outdoor-design' | 'empty-space';
  prompt?: string;
  numDesigns: number;
  orientation: 'portrait' | 'landscape';
  addPeople?: string;
}

export interface DesignResult {
  id: string;
  imageUrl: string;
  prompt: string;
  roomType: string;
  style: string;
  mode: string;
  createdAt: string;
  width: number;
  height: number;
}

export interface RoomType {
  id: string;
  name: string;
  icon: string;
  category: 'residential' | 'commercial' | 'outdoor' | 'special';
}

export interface InteriorStyle {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: 'modern' | 'classic' | 'themed' | 'seasonal';
  promptModifier: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'starter' | 'pro' | 'premium';
  designsUsed: number;
  designsLimit: number;
}

export interface CostEstimate {
  materials: { name: string; cost: number }[];
  labor: { name: string; cost: number }[];
  total: number;
  currency: string;
}
