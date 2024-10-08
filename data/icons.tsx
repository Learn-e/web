import {
  Briefcase,
  MessageCircle,
  Headphones,
  ShoppingBag,
  ClipboardList,
  Cpu,
  BarChart,
  Globe2,
  BookOpen,
  ShieldCheck,
  HeartPulse,
  Users,
  ShieldAlert,
  UserCheck,
  DollarSign,
} from "lucide-react";

export const IconsOptions = [
  {
    label: "Leadership et Management",
    value: "Briefcase",
    selectIcon: <Briefcase />,
    icon: <Briefcase size={72} />,
  },
  {
    label: "Compétences en Communication",
    value: "MessageCircle",
    selectIcon: <MessageCircle />,
    icon: <MessageCircle size={72} />,
  },
  {
    label: "Gestion des Compétences",
    value: "Headphones",
    selectIcon: <Headphones />,
    icon: <Headphones size={72} />,
  },
  {
    label: "Vente et Négociation",
    value: "ShoppingBag",
    selectIcon: <ShoppingBag />,
    icon: <ShoppingBag size={72} />,
  },
  {
    label: "Gestion de Projet",
    value: "ClipboardList",
    selectIcon: <ClipboardList />,
    icon: <ClipboardList size={72} />,
  },
  {
    label: "Technologies de l'Information",
    value: "Cpu",
    selectIcon: <Cpu />,
    icon: <Cpu size={72} />,
  },
  {
    label: "Analyse de Données et Science des Données",
    value: "BarChart",
    selectIcon: <BarChart />,
    icon: <BarChart size={72} />,
  },
  {
    label: "Marketing Digital",
    value: "Globe2",
    selectIcon: <Globe2 />,
    icon: <Globe2 size={72} />,
  },
  {
    label: "Langues Étrangères",
    value: "BookOpen",
    selectIcon: <BookOpen />,
    icon: <BookOpen size={72} />,
  },
  {
    label: "Conformité et Réglementation",
    value: "ShieldCheck",
    selectIcon: <ShieldCheck />,
    icon: <ShieldCheck size={72} />,
  },
  {
    label: "Santé et Sécurité au Travail",
    value: "HeartPulse",
    selectIcon: <HeartPulse />,
    icon: <HeartPulse size={72} />,
  },
  {
    label: "Diversité et Inclusion",
    value: "Users",
    selectIcon: <Users />,
    icon: <Users size={72} />,
  },
  {
    label: "Cybersécurité",
    value: "ShieldAlert",
    selectIcon: <ShieldAlert />,
    icon: <ShieldAlert size={72} />,
  },
  {
    label: "Développement Personnel",
    value: "UserCheck",
    selectIcon: <UserCheck />,
    icon: <UserCheck size={72} />,
  },
  {
    label: "Compétences Financières",
    value: "DollarSign",
    selectIcon: <DollarSign />,
    icon: <DollarSign size={72} />,
  },
];

export interface IconsOptionsType {
  label: string;
  value: string;
  selectIcon: React.ReactNode;
  icon: React.ReactNode;
}

export const IconsOptionsHeader = [
  {
    label: "Leadership et Management",
    value: "Briefcase",
    selectIcon: <Briefcase />,
    icon: <Briefcase size={32} />,
  },
  {
    label: "Compétences en Communication",
    value: "MessageCircle",
    selectIcon: <MessageCircle />,
    icon: <MessageCircle size={32} />,
  },
  {
    label: "Gestion des Compétences",
    value: "Headphones",
    selectIcon: <Headphones />,
    icon: <Headphones size={32} />,
  },
  {
    label: "Vente et Négociation",
    value: "ShoppingBag",
    selectIcon: <ShoppingBag />,
    icon: <ShoppingBag size={32} />,
  },
  {
    label: "Gestion de Projet",
    value: "ClipboardList",
    selectIcon: <ClipboardList />,
    icon: <ClipboardList size={32} />,
  },
  {
    label: "Technologies de l'Information",
    value: "Cpu",
    selectIcon: <Cpu />,
    icon: <Cpu size={32} />,
  },
  {
    label: "Analyse de Données et Science des Données",
    value: "BarChart",
    selectIcon: <BarChart />,
    icon: <BarChart size={32} />,
  },
  {
    label: "Marketing Digital",
    value: "Globe2",
    selectIcon: <Globe2 />,
    icon: <Globe2 size={32} />,
  },
  {
    label: "Langues Étrangères",
    value: "BookOpen",
    selectIcon: <BookOpen />,
    icon: <BookOpen size={32} />,
  },
  {
    label: "Conformité et Réglementation",
    value: "ShieldCheck",
    selectIcon: <ShieldCheck />,
    icon: <ShieldCheck size={32} />,
  },
  {
    label: "Santé et Sécurité au Travail",
    value: "HeartPulse",
    selectIcon: <HeartPulse />,
    icon: <HeartPulse size={32} />,
  },
  {
    label: "Diversité et Inclusion",
    value: "Users",
    selectIcon: <Users />,
    icon: <Users size={32} />,
  },
  {
    label: "Cybersécurité",
    value: "ShieldAlert",
    selectIcon: <ShieldAlert />,
    icon: <ShieldAlert size={32} />,
  },
  {
    label: "Développement Personnel",
    value: "UserCheck",
    selectIcon: <UserCheck />,
    icon: <UserCheck size={32} />,
  },
  {
    label: "Compétences Financières",
    value: "DollarSign",
    selectIcon: <DollarSign />,
    icon: <DollarSign size={32} />,
  },
];

export interface IconsOptionsHeaderType {
  label: string;
  value: string;
  selectIcon: React.ReactNode;
  icon: React.ReactNode;
}
