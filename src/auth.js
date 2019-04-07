const authentication = {
  isAuthenticated: false,
  authenticate(credentials) {
    this.isAuthenticated = true
    return new Promise((res, rej) => {setTimeout(res({isAuthenticated: this.isAuthenticated, ...credentials}), 100)}) // fake async
  },
  signOut(credentials) {
    this.isAuthenticated = false
    return new Promise((res, rej) => {setTimeout(res({isAuthenticated: this.isAuthenticated, ...credentials}), 100)}) // fake async
  }
}
export default authentication;