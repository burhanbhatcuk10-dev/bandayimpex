import React from "react";
import {
  ShoppingBag,
  ShoppingCart,
  Tags,
  Images,
  Newspaper,
  Briefcase,
  Sprout,
  Users,
  Milestone,
  BarChart3,
  Leaf,
  Mail,
  FileText,
  AtSign,
  TrendingUp,
  Globe,
  Circle,
} from "lucide-react";

const MAP = {
  ShoppingBag,
  ShoppingCart,
  Tags,
  Images,
  Newspaper,
  Briefcase,
  Sprout,
  Users,
  Milestone,
  BarChart3,
  Leaf,
  Mail,
  FileText,
  AtSign,
  TrendingUp,
  Globe,
};

export const ResourceIcon = ({ name, ...props }) => {
  const C = MAP[name] || Circle;
  return <C {...props} />;
};
