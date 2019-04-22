module.exports = {
  ok: (data = null) => {
    console.log(typeof data == undefined);
    return {
      success: true,
      payload: data === true || data === null  ? {} : data
    }
  },
  err: (err) => {
    return {
      success: false,
      error: err
    }
  }
}
