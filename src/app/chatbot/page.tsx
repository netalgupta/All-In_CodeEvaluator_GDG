import { ChatInterface } from '@/components/chatbot/chat-interface';

export default function ChatbotPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight">AI Chatbot</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your personal AI coding assistant. Ask me anything about programming.
          </p>
        </header>
        <ChatInterface />
      </div>
    </div>
  );
}
