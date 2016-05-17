import Server from 'socket.io';

const ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
const port = process.env.OPENSHIFT_NODEJS_PORT || '8190';

export const start = function (store) {
   const io = new Server()
   .attach(port);
   store.subscribe (() => {
      io.emit('state', store.getState().toJS());
   });

   io.on('connection', (socket) => {
      socket.emit('state', store.getState().toJS());
      socket.on('action', store.dispatch.bind(store));
   });

   return io;
};
