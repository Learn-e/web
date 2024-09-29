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
    icon: <Briefcase size={72} />,
  },
  {
    label: "Compétences en Communication",
    value: "MessageCircle",
    icon: <MessageCircle size={72} />,
  },
  {
    label: "Gestion des Compétences",
    value: "Headphones",
    icon: <Headphones size={72} />,
  },
  {
    label: "Vente et Négociation",
    value: "ShoppingBag",
    icon: <ShoppingBag size={72} />,
  },
  {
    label: "Gestion de Projet",
    value: "ClipboardList",
    icon: <ClipboardList size={72} />,
  },
  {
    label: "Technologies de l'Information",
    value: "Cpu",
    icon: <Cpu size={72} />,
  },
  {
    label: "Analyse de Données et Science des Données",
    value: "BarChart",
    icon: <BarChart size={72} />,
  },
  { label: "Marketing Digital", value: "Globe2", icon: <Globe2 size={72} /> },
  {
    label: "Langues Étrangères",
    value: "BookOpen",
    icon: <BookOpen size={72} />,
  },
  {
    label: "Conformité et Réglementation",
    value: "ShieldCheck",
    icon: <ShieldCheck size={72} />,
  },
  {
    label: "Santé et Sécurité au Travail",
    value: "HeartPulse",
    icon: <HeartPulse size={72} />,
  },
  {
    label: "Diversité et Inclusion",
    value: "Users",
    icon: <Users size={72} />,
  },
  {
    label: "Cybersécurité",
    value: "ShieldAlert",
    icon: <ShieldAlert size={72} />,
  },
  {
    label: "Développement Personnel",
    value: "UserCheck",
    icon: <UserCheck size={72} />,
  },
  {
    label: "Compétences Financières",
    value: "DollarSign",
    icon: <DollarSign size={72} />,
  },
];

export interface IconsOptionsType {
  label: string;
  value: string;
  icon: React.ReactNode;
}
