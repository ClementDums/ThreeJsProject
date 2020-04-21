const ScreenLoader = {

    loadScreen(isLoading) {
        const loader = document.getElementById('loader');
        if (!isLoading) {
            loader.style.display = 'none';
            return
        }
        loader.style.display = 'block';
    }
};
export default ScreenLoader
