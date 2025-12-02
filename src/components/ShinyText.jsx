// src/components/ShinyText.jsx
import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 5, variant = 'silver', className = '' }) => {
  const animationDuration = `${speed}s`;

  // Seleccionamos la clase según la variante
  const variantClass = `shiny-${variant}`;

  return (
    <div 
      className={`shiny-text ${variantClass} ${disabled ? 'disabled' : ''} ${className}`} 
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyText;