export const logout = () => {
    localStorage.removeItem('loginObject');
    localStorage.removeItem('accessToken');
    window.history.pushState(null, '', '/login');
    window.location.reload();
};
