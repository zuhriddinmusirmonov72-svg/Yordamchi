import { useState, useEffect, useRef } from 'react';

function TelegramLogin({ onAuth }: { onAuth: (user: any) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (window as any).onTelegramAuth = (user: any) => {
      onAuth(user);
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'InstagramtgNakrutka_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(script);
    }
  }, [onAuth]);

  return <div ref={containerRef}></div>;
}

interface Props {
  onVerified: () => void;
}

export default function TelegramSubscriptionModal({ onVerified }: Props) {
  const [telegramUser, setTelegramUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tg_user');
    if (saved) {
      setTelegramUser(JSON.parse(saved));
    }
  }, []);

  const checkSub = async (user: any) => {
    setIsLoading(true);
    setError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';
      const res = await fetch(`${API_URL}/check-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramId: user.id, username: user.username })
      });
      const data = await res.json();
      if (data.isSubscribed) {
        // if resolvedId is returned from backend, update the user object
        if (data.resolvedId) user.id = data.resolvedId;
        localStorage.setItem('tg_user', JSON.stringify(user));
        onVerified();
      } else {
        setError(data.error || "Siz hali kanalga a'zo bo'lmagansiz. Iltimos kanalga a'zo bo'ling va \"Tekshirish\" tugmasini bosing.");
      }
    } catch (e) {
      setError("Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Chatdan foydalanish uchun kanalga a'zo bo'ling!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          AI xizmatidan bepul foydalanish uchun bizning rasmiy Telegram kanalimizga obuna bo'lishingiz shart.
        </p>

        <a 
          href="https://t.me/ccpc770" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl mb-6 transition-colors"
        >
          Kanalga O'tish
        </a>

        {!telegramUser ? (
          <div>
            <p className="text-sm text-gray-500 mb-2">A'zo bo'lganingizni tasdiqlash uchun Telegram orqali kiring:</p>
            <div className="flex justify-center mb-4">
              <TelegramLogin onAuth={(user) => {
                setTelegramUser(user);
                checkSub(user);
              }} />
            </div>
            <div className="mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-400 mb-2 text-left">Yoki Telegram Username (nomingiz) orqali tekshiring:</p>
              <div className="flex gap-2">
                <input 
                   type="text" 
                   id="manual-username"
                   placeholder="Masalan: @cccp770k" 
                   className="flex-1 bg-gray-100 dark:bg-gray-700 rounded p-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={() => {
                    const el = document.getElementById('manual-username') as HTMLInputElement;
                    if (el && el.value) {
                       const username = el.value.trim();
                       checkSub({ username, first_name: username });
                    }
                  }}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 px-3 rounded text-sm text-gray-800 dark:text-white transition-colors"
                >
                  Tekshirish
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-left">
              Eslatma: Username orqali tekshirish uchun avval botimizga (<strong>@InstagramtgNakrutka_bot</strong>) kirib /start bosgan bo'lishingiz shart.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-green-500 font-semibold mb-4">Telegram hisobingiz ulandi: {telegramUser.first_name}</p>
            <button
              onClick={() => checkSub(telegramUser)}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-nova-purple to-nova-blue hover:opacity-90 text-white font-semibold py-3 px-4 rounded-xl disabled:opacity-50 transition-opacity"
            >
              {isLoading ? 'Tekshirilmoqda...' : 'A\'zolikni Tekshirish'}
            </button>
            <button 
              onClick={() => { setTelegramUser(null); localStorage.removeItem('tg_user'); }}
              className="text-xs text-gray-400 mt-4 hover:text-gray-300 transition-colors underline block w-full text-center"
            >
              Boshqa hisobdan kirish
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-left">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
