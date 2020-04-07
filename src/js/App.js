import Experience from "./App/Experience";
class App {
    constructor() {
        console.log('🏗 App constructor');
        this.experience = new Experience(true)
    }

    init() {
    }
}

export default App;
