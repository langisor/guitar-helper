"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HelpCircle, X } from "lucide-react";

interface WhatIsDrawerProps {
  title?: string;
  drawerTitle: string;
  drawerDescription: string;
  buttonLabel: string;
  drawerContent: ReactNode;
  children: ReactNode;
}

export default function WhatIsDrawer({
  title,
  drawerTitle,
  drawerDescription,
  buttonLabel,
  drawerContent,
  children,
}: WhatIsDrawerProps) {
  return (
    <Drawer direction="top">
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/50 shadow-sm px-4 py-3 flex items-center justify-between">
        {title ? (
          <CardTitle className="text-lg">{title}</CardTitle>
        ) : (
          <div />
        )}
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 hover:bg-primary/10 hover:border-primary/30 transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            {buttonLabel}
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="text-left border-b">
          <DrawerTitle>{drawerTitle}</DrawerTitle>
          <DrawerDescription>{drawerDescription}</DrawerDescription>
        </DrawerHeader>
        <div className="p-6 overflow-y-auto h-[calc(85vh-140px)]">
          {drawerContent}
        </div>
        <DrawerFooter className="border-t">
          <DrawerClose asChild>
            <Button variant="outline">
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
      {children}
    </Drawer>
  );
}
