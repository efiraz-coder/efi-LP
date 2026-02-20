import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, Eye, EyeOff } from 'lucide-react'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (login(password)) {
      navigate('/admin/dashboard')
    } else {
      setError('סיסמה שגויה')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 border-2 border-accent mb-6">
            <Lock className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">כניסת מנהל</h1>
          <p className="text-zinc-400">הזן סיסמה לגישה למערכת הניהול</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-zinc-300 mb-2 text-right">
              סיסמה
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white text-right focus:border-accent focus:outline-none transition-colors"
                placeholder="הזן סיסמה"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-900/50 text-red-400 text-right">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-accent text-white font-bold text-lg hover:bg-red-700 transition-colors"
          >
            כניסה
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-zinc-900/50 border border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm">
            הסיסמה ברירת המחדל: <span className="text-accent font-mono">admin2026</span>
          </p>
        </div>

        {/* Back to Site */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-zinc-400 hover:text-accent transition-colors text-sm"
          >
            ← חזרה לאתר
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
