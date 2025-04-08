/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans Devanagari', sans-serif;
  background: #f0f0f3;
  color: #333;
  padding: 1rem;
  line-height: 1.6;
}

h1 {
  text-align: center;
  color: #e91e63;
  margin-bottom: 1rem;
}

.container {
  max-width: 500px;
  margin: auto;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.08);
}

label {
  font-weight: bold;
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}

select,
textarea,
input[type="file"],
input[type="color"],
input[type="range"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

textarea {
  resize: none;
}

button {
  background: #e91e63;
  color: white;
  border: none;
  padding: 0.75rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #c2185b;
}

canvas, #outputImage {
  max-width: 100%;
  margin-top: 1rem;
  border: 1px solid #ddd;
  display: block;
  border-radius: 6px;
}

.actions {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ad-banner {
  margin: 1rem auto;
  text-align: center;
}

/* Mobile First */
@media (max-width: 480px) {
  body {
    padding: 0.5rem;
  }

  .container {
    padding: 1rem;
  }

  button {
    font-size: 0.95rem;
  }
}
