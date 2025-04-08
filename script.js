body {
  font-family: 'Noto Sans Devanagari', sans-serif;
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

h1 {
  margin-bottom: 20px;
  color: #222;
}

.section {
  margin-bottom: 15px;
}

.section label {
  margin-right: 10px;
  font-weight: bold;
}

textarea {
  width: 100%;
  height: 80px;
  margin-top: 10px;
  resize: none;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
}

input[type="file"],
select,
input[type="color"],
input[type="range"],
button {
  margin-top: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #999;
}

button {
  cursor: pointer;
  background-color: #007BFF;
  color: white;
  margin: 5px;
  border: none;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.row {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

img#outputImage {
  margin-top: 20px;
  max-width: 100%;
  border: 2px solid #666;
  border-radius: 5px;
}
