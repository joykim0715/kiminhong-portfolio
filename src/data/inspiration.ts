export type InspirationItem = {
  id: string;
  title: string;
  category: "Travel" | "Nature" | "Lifestyle" | "Photography";
  image: string;
  height: "short" | "medium" | "tall";
};

export const inspirationItems: InspirationItem[] = [
  {
    id: "i1",
    title: "Mountain trail",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    height: "tall",
  },
  {
    id: "i2",
    title: "Coastal walk",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    height: "medium",
  },
  {
    id: "i3",
    title: "Morning routine",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    height: "short",
  },
  {
    id: "i4",
    title: "Forest light",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    height: "tall",
  },
  {
    id: "i5",
    title: "City escape",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1476514529935-07ba3e4aa1d0?w=600&q=80",
    height: "medium",
  },
  {
    id: "i6",
    title: "Wellness moment",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    height: "short",
  },
];
