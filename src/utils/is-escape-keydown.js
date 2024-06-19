const onEscKeydown = (e, cb) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    cb();
  }
};

export { onEscKeydown };
