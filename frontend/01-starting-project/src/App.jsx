const options = ["Fundamental", "Core", "abc"];
import reactImg from "./assets/react-core-concepts.png";

function Header() {
  const option = "Fundamental";
  const flag = false; // Core    // Fundamental
  const flag2 = true; // Core    // Fundamental
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {flag ? options[1] : "Fundamental"} React concepts you will need for
        almost any app you are going to build!
      </p>
    </header>
  );
}

// function CoreConcepts() {
//   return (
//     <li>
//       <imag />
//       <h3></h3>
//       <p></p>
//     </li>
//   );
// }

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>
        {/* <section id='core-concepts'><h2>Core Concepts</h2><ul></ul></section> */}
        {/* <section id="examples"><h2>Examples</h2><menu></menu></section> */}
        <div id="tab-content"><h3></h3><p></p><pre><code></code></pre></div>
      </main>
    </div>
  );
}

export default App;
