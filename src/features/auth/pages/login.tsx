import { APP_CONFIG } from '@/core/configs';
import { Button, Input, lang, VokadashHead } from '@/core/libs';
import { InputSecure, useAlert } from '@/features/_global';
import { QRCodeSVG } from 'qrcode.react';
import { FormEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../hooks';
import { saveToken } from '../utils';
// import '../../../core/styles/index.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const alert = useAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'email' | 'barcode'>('email');
  const [barcodeToken, setBarcodeToken] = useState<string | null>(null);
  const [isLoadingBarcode, setIsLoadingBarcode] = useState(false);
  const [scannedEmail, setScannedEmail] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [hasLoginWithBarcode, setHasLoginWithBarcode] = useState(false);

  // Fetch barcode token
  const fetchBarcodeToken = async () => {
    if (barcodeToken) return;
    try {
      setIsLoadingBarcode(true);
      const response = await fetch('https://dev.kiraproject.id/generate-barcode', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data?.barcodeToken) {
        setBarcodeToken(data.barcodeToken);
        console.log('barcode', data.barcodeToken);
        socket?.emit('register', data.barcodeToken);
      } else {
        throw new Error('Failed to fetch barcode token');
      }
    } catch (err: any) {
      alert.error(err?.message || 'Failed to fetch barcode token');
    } finally {
      setIsLoadingBarcode(false);
    }
  };

  // Initialize socket connection
  useEffect(() => {
    const socketConnection = io('https://dev.kiraproject.id');

    socketConnection.on('connect', () => {
      setSocket(socketConnection);
      setIsSocketConnected(true);
    });

    socketConnection.on('disconnect', () => {
      setIsSocketConnected(false);
    });

    socketConnection.on('email-scanned', (email: string) => {
      setScannedEmail(email);
      console.log('Email scanned:', email);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // Fetch QR code when socket is connected and barcode tab is active
  useEffect(() => {
    if (socket && activeTab === 'barcode') {
      fetchBarcodeToken();
    }
  }, [socket, activeTab]);

  // Handle login with barcode
  useEffect(() => {
    if (scannedEmail && !hasLoginWithBarcode) {
      setHasLoginWithBarcode(true);
      auth.loginWithBarcode(scannedEmail)
        .then((res) => {
          const token = res?.data?.token;
          const role = res?.data?.role;

          if (role === 'siswa' || role === 'Siswa') {
            alert.error('Akses ditolak');
            setHasLoginWithBarcode(false);
            localStorage.removeItem('token');
            navigate('/auth/login', { replace: true });
            return;
          }

          console.log('barcode', res?.data);

          if (token) {
            console.log('token biasa:', token);
            saveToken(token);
            localStorage.setItem('token', token);
          }

          alert.success('Login berhasil dengan QR!');
          navigate('/', { replace: true });
        })
        .catch((err) => {
          alert.error(err?.message || 'Login gagal');
          setHasLoginWithBarcode(false);
        });
    }
  }, [scannedEmail, auth, alert, hasLoginWithBarcode, navigate]);

  // Handle tab change
  const handleTabChange = (tab: 'email' | 'barcode') => {
    setActiveTab(tab);
  };

  // Handle form submission
  const submit: FormEventHandler = async (e) => {
    e?.preventDefault?.();
    try {
      if (activeTab === 'email') {
        const res = await auth.login({ email, password });

        if (Number(res?.data?.isActive) !== 2) {
          throw new Error(lang.text('needActiovation'));
        }

        const token = res?.data?.token;
        if (token) {
          saveToken(token);
          localStorage.setItem('token', token);
        } else {
          console.log('Token tidak ditemukan dalam response');
        }

        alert.success('Selamat datang kembali');
        navigate('/', { replace: true });
      }
    } catch (err: any) {
      alert.error(err?.message || lang.text('errSystem'));
    }
  };

  return (
    <form onSubmit={submit} className="relative w-full">
      <VokadashHead>
        <title>{`${lang.text('login')} | ${APP_CONFIG.appName}`}</title>
      </VokadashHead>
      <div className='w-screen h-screen absolute left-0 top-0'>
        <div className='absolute bg-teal-800/[94%] w-screen h-screen z-[1]'></div>
        <img src="/bgAuth.jpg" alt="bg-auth" className='absolute left-0 top-0 w-screen h-screen' />
      </div>
      <section className="relative z-[4] w-screen h-screen flex items-center justify-center">
        <div className="relative rounded-2xl border border-white/20 flex flex-col justify-center items-center w-full max-w-lg sm:w-[60vw] h-auto min-h-[500px] shadow-lg bg-white p-8 transition-all duration-300 hover:shadow-xl">
          {/* Header */}
          <div className="w-full text-center mb-6">
            <h2 className="font-bold text-2xl text-black">XPRESENSI</h2>
            <h3 className="text-xl font-semibold text-gray-800 mt-2">
              Hai, orang tua siswa! 🤗
            </h3>
            <p className="text-sm text-gray-500">
              Masuk untuk melihat aktifitas siswa
            </p>
          </div>

          {/* Tabs */}
          <div className="flex w-full border-b border-gray-600 mb-6">
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'email'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-gray-400'
              }`}
              onClick={() => handleTabChange('email')}
            >
              Email & Password
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'barcode'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-gray-400'
              }`}
              onClick={() => handleTabChange('barcode')}
            >
              Scan QR Code
            </button>
          </div>

          {/* Form Content */}
          <div className="w-full">
            {activeTab === 'email' ? (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    className="w-full h-12 px-4 text-black placeholder-gray-400 bg-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    type="email"
                    placeholder={lang.text('inputEmail')}
                    required
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Password
                  </label>
                  <InputSecure
                    id="password"
                    className="w-full h-12 px-4 text-black placeholder-gray-400 bg-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    placeholder={lang.text('inputPassword')}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                {isLoadingBarcode ? (
                  <p className="text-gray-400">Loading QR Code...</p>
                ) : barcodeToken ? (
                  <>
                    <div className="border-4 border-white p-3 rounded-xl bg-white mb-4 shadow-md">
                      <QRCodeSVG value={barcodeToken} size={200} />
                    </div>
                    <p className="text-sm text-gray-500 text-center max-w-xs">
                      Buka aplikasi Xpresensi sebagai guru/admin, lalu masuk ke{" "}
                      <span className="font-semibold text-black">
                        Profil &gt; Tautkan Perangkat
                      </span>{" "}
                      untuk memindai QR code.
                    </p>
                    <p className="text-sm mt-3 text-gray-300">
                      Status:{" "}
                      <span
                        className={
                          isSocketConnected ? 'text-green-400' : 'text-red-400'
                        }
                      >
                        {isSocketConnected
                          ? '🟢 Terhubung'
                          : '🛑 Tidak terhubung'}
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="text-red-400">Failed to load QR Code</p>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          {activeTab === 'email' && (
            <Button
              type="submit"
              disabled={auth.isLoading}
              className="w-full mt-6 h-12 bg-teal-900/90 text-white font-medium rounded-lg hover:bg-slate-900 focus:ring-2 focus:ring-black/90 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
            >
              {auth.isLoading ? lang.text('pleaseWait') : lang.text('login')}
              <span className="ml-2">→</span>
            </Button>
          )}
        </div>
      </section>
    </form>
  );
};