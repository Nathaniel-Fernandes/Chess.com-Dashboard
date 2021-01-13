const strategyResources = () => {
  return (
    <div className="resources-section">
      <h2>Middlegame Strategy</h2>
      <p>
        Crafting a coherent plan in the middlegame is often the hardest part of
        chess. However, your plan should be tailored to your playing level.
      </p>
      <ul>
        <li>
          <span className="bold-me">Beginner - 1000:</span> You don't really
          need a plan at this level. Just focus on not blundering :). Studying
          endgames would be more helpful.
        </li>
        <li>
          <span className="bold-me">1000-1400:</span> At this level, you should
          start to practice making a plan so you're not mindlessly pushing
          pieces. Consult the free resources below.
        </li>
        <li>
          <span className="bold-me">1400-2200:</span> Congrats! You are a strong
          player. Now it becomes imperative to create a (good) plan. The first
          step is to gain a deep understanding of the imbalances. Check out the
          recommended products <span className="bold-me">in order</span>.
        </li>
      </ul>

      <figure className="resource-figure">
        <h3>Best Free Resources</h3>
        <ul>
          <li>
            <a
              href="https://www.chess.com/lessons/strategy?ref_id=9730606"
              rel="noreferrer noopener"
              target="_blank"
            >
              Chess.com Strategy
            </a>{" "}
            (Might require{" "}
            <a
              href="https://www.chess.com/membership?ref_id=9730606"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chess.com membership
            </a>
            )
          </li>
        </ul>
      </figure>

      <h3>Top Recommendation</h3>
      <iframe
        title="How to Reassess Your Chess"
        className="amazon-product"
        style={{ width: "120px", height: "240px" }}
        marginWidth="0"
        marginheight="0"
        scrolling="no"
        frameborder="0"
        src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=chessintellec-20&marketplace=amazon&amp;region=US&placement=B00M9WCX7A&asins=B00M9WCX7A&linkId=5c77cd7661b24d08e36b25c578bd9fbb&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
      ></iframe>
    </div>
  );
};

export default strategyResources;
