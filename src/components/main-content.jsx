import FootballNav from "./footballnav/footballnav";
import LiveMatch from "./livematch/livematch";
import News from "./news/news";

function Grid() {
  return (
    <main className="grid container">
      <FootballNav />
      <section class="banner"></section>
      <LiveMatch />
      <News />
    </main>
  );
}

export default Grid;
