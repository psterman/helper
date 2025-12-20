import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
<script src="https://cdn.tailwindcss.com"></script>

<!-- 配置 Tailwind 允许通过 class 切换暗色模式 -->
<script>
  tailwind.config = {
    darkMode: 'class',
  }
</script>
