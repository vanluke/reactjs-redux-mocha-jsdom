export default socket => store => next => action => {
  const {meta} = action;
  if (meta && meta.remote) {
    socket.emit('action', action);
    console.log('in middleware', action);
  }
  return next(action);
};
