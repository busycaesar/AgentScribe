function resolveLocalDirectory(local) {
  return local ? process.cwd() : undefined;
}

module.exports = {
  resolveLocalDirectory,
};
