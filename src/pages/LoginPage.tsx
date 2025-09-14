import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Building2, Truck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import clsx from 'clsx';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

const demoCredentials = [
  { email: 'admin@emtech.com', password: 'admin123', role: 'Admin' },
  { email: 'warehouse@emtech.com', password: 'warehouse123', role: 'Warehouse Manager' },
  { email: 'sales@emtech.com', password: 'sales123', role: 'Sales Representative' },
  { email: 'ops@emtech.com', password: 'ops123', role: 'Operations Manager' },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password, data.rememberMe);
    } catch (error) {
      // Error is handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center">
              <Building2 className="h-10 w-10 text-primary-600" />
              <span className="ml-3 text-2xl font-bold text-gray-900">
                EmTech Logistics
              </span>
            </div>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your logistics management dashboard
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register('email')}
                    type="email"
                    autoComplete="email"
                    className={clsx(
                      'form-input',
                      errors.email && 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    )}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={clsx(
                      'form-input pr-10',
                      errors.password && 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    )}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    {...register('rememberMe')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={clsx(
                    'btn-primary w-full',
                    isLoading && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2">
                {demoCredentials.map((cred, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => fillDemoCredentials(cred.email, cred.password)}
                    className="text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
                  >
                    <div className="font-medium text-gray-900">{cred.role}</div>
                    <div className="text-gray-600">{cred.email}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:block relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white p-8">
              <Truck className="h-24 w-24 mx-auto mb-6 opacity-80" />
              <h1 className="text-4xl font-bold mb-4">
                Streamline Your Logistics
              </h1>
              <p className="text-xl opacity-90 max-w-md">
                Manage inventory, process orders, and track shipments all in one powerful platform.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-semibold">Real-time Tracking</div>
                  <div className="opacity-80">Monitor all operations live</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-semibold">Smart Analytics</div>
                  <div className="opacity-80">Data-driven insights</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-semibold">Multi-role Access</div>
                  <div className="opacity-80">Tailored for every user</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-semibold">Mobile Ready</div>
                  <div className="opacity-80">Access anywhere</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}