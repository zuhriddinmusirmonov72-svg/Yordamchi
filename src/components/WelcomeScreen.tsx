import { MessageSquare, Code, BookOpen, PenTool } from 'lucide-react';

interface WelcomeScreenProps {
  onExampleClick: (text: string) => void;
}

export default function WelcomeScreen({ onExampleClick }: WelcomeScreenProps) {
  const examples = [
    {
      icon: MessageSquare,
      text: 'Menga o\'zing haqida aytib ber',
      prompt: 'Menga o\'zing haqida aytib ber'
    },
    {
      icon: Code,
      text: 'JavaScript kodini yozishda yordam ber',
      prompt: 'JavaScript kodini yozishda yordam ber'
    },
    {
      icon: BookOpen,
      text: 'Python dasturlashni o\'rgatib ber',
      prompt: 'Python dasturlashni o\'rgatib ber'
    },
    {
      icon: PenTool,
      text: 'Matn yozishda yordam ber',
      prompt: 'Professional email yozishda yordam ber'
    },
  ];

  return (
    <div className="h-full flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-nova-purple to-nova-blue rounded-2xl flex items-center justify-center">
              <MessageSquare size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Salom! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Men sizning AI yordamchingizman
          </p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            What can I help you with?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examples.map((example, index) => {
            const Icon = example.icon;
            return (
              <button
                key={index}
                onClick={() => onExampleClick(example.prompt)}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-nova-purple dark:hover:border-nova-purple hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-nova-purple/10 to-nova-blue/10 rounded-xl group-hover:from-nova-purple/20 group-hover:to-nova-blue/20 transition-colors">
                    <Icon size={24} className="text-nova-purple" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {example.text}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>💬 Savol bering • 💻 Kod yozing • 📚 O'rganing • ✍️ Matn yarating</p>
        </div>
      </div>
    </div>
  );
}
