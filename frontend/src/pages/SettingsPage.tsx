import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import api from '../services/api';

const SettingsPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [keyName, setKeyName] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreateKey = async () => {
    try {
      const response = await api.post('/api/auth/keys', { name: keyName });
      setApiKey(response.data.key);
      setKeyName('');
    } catch (error) {
      console.error('Failed to create key:', error);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 max-w-2xl">
        <h2 className="text-xl font-bold mb-6">API Keys</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Key Name</label>
            <input
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="e.g., Integration Key"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
            />
          </div>
          <button
            onClick={handleCreateKey}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Generate Key
          </button>

          {apiKey && (
            <div className="mt-6 p-4 bg-gray-900 border border-gray-600 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Your API Key (keep it secret!):</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-gray-800 p-3 rounded text-green-400 font-mono text-sm break-all">
                  {apiKey}
                </code>
                <button
                  onClick={handleCopyKey}
                  className="p-2 hover:bg-gray-700 rounded transition"
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
