const app = require('./app');
const server = app.listen(3333);
const socketio = require('socket.io');

const io = socketio(server);


io.on('connection', (socket) => {
  console.log(`Socket id: ${socket.id}`);

  socket.on('toggle_inventory_modal', () => {
    io.emit('toggle_inventory_modal')
  })

  socket.on('change_input', (data) => {
    io.emit('change_input', data);
  })

  socket.on('cancel_register', () => {
    io.emit('cancel_register')
  })

  socket.on('init_sale', () => {
    io.emit('init_sale')
  })

  socket.on('scanned_products', data => {
    io.emit('scanned_products', data);
  })

  socket.on('change_amount', data => {
    io.emit('change_amount', data);
  })

  socket.on('finish_sale', () => {
    io.emit('finish_sale');
  })

  socket.on('confirm_sale', (data) => {
    io.emit('confirm_sale', data);
  })
})

// app.listen(3333, () => console.log('Server running on port 3333 with socket'));