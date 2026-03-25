'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X } from 'lucide-react';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 h-[400px] flex flex-col shadow-2xl bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <CardTitle className="text-base font-headline">AI Assistant</CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close chat</span>
            </Button>
          </CardHeader>
          <CardContent className="flex-grow p-4 overflow-y-auto">
            <div className="flex flex-col gap-2">
                <div className="bg-muted p-3 rounded-lg self-start max-w-[80%]">
                    <p className="text-sm">Hello! How can I help you with the EDGE portal today?</p>
                </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="AI integration pending..." disabled />
              <Button type="submit" size="icon" disabled>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Button
          className="rounded-full h-16 w-16 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
}
