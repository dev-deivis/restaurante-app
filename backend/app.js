const express = require('express');
const app = express();
app.use(express.json());

// Datos en memoria
let productos = [
  { id: 1, nombre: "Pizza Margarita", precio: 120, disponible: true },
  { id: 2, nombre: "Hamburguesa Clásica", precio: 90, disponible: true },
  { id: 3, nombre: "Alitas BBQ", precio: 85, disponible: true },
  { id: 4, nombre: "Refresco", precio: 25, disponible: true },
  { id: 5, nombre: "Pastel de chocolate", precio: 55, disponible: true }
];
let pedidos = [];

// ── ENDPOINTS PRODUCTOS ──
app.get('/productos', (req, res) => {
  res.json({ mensaje: "Lista de productos", total: productos.length, productos });
});

app.get('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
  res.json(producto);
});

app.post('/productos', (req, res) => {
  const nuevo = { id: productos.length + 1, ...req.body, disponible: true };
  productos.push(nuevo);
  res.status(201).json({ mensaje: "Producto agregado correctamente", producto: nuevo });
});

// ── ENDPOINTS PEDIDOS ──
app.post('/pedido', (req, res) => {
  const producto = productos.find(p => p.nombre === req.body.producto);
  const total = producto ? producto.precio * req.body.cantidad : 0;
  const pedido = { id: pedidos.length + 1, ...req.body, total, estado: "pendiente", fecha: new Date() };
  pedidos.push(pedido);
  res.status(201).json({ mensaje: "Pedido recibido y guardado", pedido });
});

app.get('/pedidos', (req, res) => {
  res.json({ mensaje: "Lista de pedidos", total: pedidos.length, pedidos });
});

app.get('/pedidos/:id', (req, res) => {
  const pedido = pedidos.find(p => p.id === parseInt(req.params.id));
  if (!pedido) return res.status(404).json({ mensaje: "Pedido no encontrado" });
  res.json(pedido);
});

app.put('/pedidos/:id', (req, res) => {
  const pedido = pedidos.find(p => p.id === parseInt(req.params.id));
  if (!pedido) return res.status(404).json({ mensaje: "Pedido no encontrado" });
  Object.assign(pedido, req.body);
  res.json({ mensaje: "Estado del pedido actualizado", pedido });
});

// ── INICIO DEL SERVIDOR ──
app.listen(3000, () => {
  console.log('====================================');
  console.log('  Servidor corriendo en puerto 3000');
  console.log('  http://localhost:3000');
  console.log('====================================');
  console.log('Endpoints disponibles:');
  console.log('  GET    /productos');
  console.log('  GET    /productos/:id');
  console.log('  POST   /productos');
  console.log('  POST   /pedido');
  console.log('  GET    /pedidos');
  console.log('  GET    /pedidos/:id');
  console.log('  PUT    /pedidos/:id');
});
