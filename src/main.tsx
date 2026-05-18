import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 隐藏初始Loading
const hideInitialLoading = () => {
  const loading = document.getElementById('initial-loading')
  if (loading) {
    loading.classList.add('hidden')
    setTimeout(() => {
      loading.remove()
    }, 500)
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// 等React挂载完成后隐藏loading
setTimeout(hideInitialLoading, 100)
