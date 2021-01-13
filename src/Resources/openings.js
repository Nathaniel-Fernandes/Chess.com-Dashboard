const openingResources = () => {
  return (
    <div className="resources-section">
      <h2>Openings</h2>
      <p>
        The opening is one of the most important phases as mistakes here can
        affect the rest of the game. Do two things to play a solid opening:
      </p>
      <ol>
        <li>Learn basic opening strategy</li>
        <ul>
          <li>
            FREE ARTICLE:{" "}
            <a
              href="https://www.chessstrategyonline.com/content/tutorials/how-to-start-a-game-of-chess-opening-principles"
              target="_blank"
              rel="noreferrer noopener"
            >
              Opening Principles
            </a>{" "}
            discusses 8 key principles
          </li>
          <li>
            BOOK: Logical Chess by Irving Chernev is a{" "}
            <strong>fantastic</strong> resource explaining 33 master games
            move-by-move. The explanations are crystal clear and aimed at
            players Unrated-1600.
          </li>
        </ul>
        <li>
          Create an opening repertoire for white & black (>1200-1300 rating)
        </li>
        <ul>
          <li>
            Focus on understanding the <strong>themes</strong> in your openings,{" "}
            <strong>not</strong> memorizing specific move orders.
          </li>
          <li>
            The following links can help you explore different opening choices:{" "}
            <a
              href="https://www.thechesswebsite.com/chess-openings/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Opening Explorer
            </a>
            ,{" "}
            <a
              href="https://www.chess.com/lessons/openings"
              target="_blank"
              rel="noreferrer noopener"
            >
              Opening Videos
            </a>
          </li>
          <li>
            Checkout the{" "}
            <a
              href="https://shop.chessbase.com/en/products/fabiano_caruana_navigating_the_ruy_lopez_vol1?Ref=RF303-OHXQEWCXHO"
              target="_blank"
              rel="noreferrer noopener"
            >
              Chessbase Opening Courses
            </a>{" "}
            for detailed analysis into many opening systems
          </li>
        </ul>
      </ol>
      <p>
        Check out{" "}
        <a
          href="https://chessintellect.com/novice-arena/how-to-practice-chess-beginner-1600/"
          target="_blank"
          rel="noreferrer noopener"
        >
          How to Practice Chess (Beginner - 1600)
        </a>{" "}
        for more info.
      </p>

      <h3>Top Recommendation</h3>
      <iframe
        title="Logical Chess: Move by Move. Author: Irving Chernev"
        className="amazon-product"
        style={{ width: "120px", height: "240px" }}
        marginWidth="0"
        marginheight="0"
        scrolling="no"
        frameborder="0"
        src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=chessintellec-20&marketplace=amazon&amp;region=US&placement=0713484640&asins=0713484640&linkId=48c880f7e88a972714a4442cea2c0766&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
      ></iframe>
    </div>
  );
};

export default openingResources;
