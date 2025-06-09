class jwtToken {
  getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return token;
  }
  createToken(token) {
    localStorage.setItem('token', token);
  }
}

export default jwtToken;
