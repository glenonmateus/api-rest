export default (req, res, next) => {
  setTimeout(() => { next() }, process.env.DELAY_RESPONSE_IN_MS);
}
