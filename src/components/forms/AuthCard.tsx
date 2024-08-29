import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import netFuelLogo from '@/assets/NetFuel/netfuel-darkmode.png';

interface CardProps {
  title?: string; // The title of the card.
  description: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, description, children }: CardProps) {
  return (
    <Card className="w-10/12 max-w-[450px] md:w-[450px]">
      <CardHeader className="pb-4 flex flex-col items-center">
        <img src={netFuelLogo} alt="Net Fuel Logo" className="h-24 w-52" />
        {title && (
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
        )}
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
