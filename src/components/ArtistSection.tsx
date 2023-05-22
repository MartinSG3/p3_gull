"use client";

import { FC } from "react";
import styles from "../styles/home.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
interface ArtistProps {
  data: {
    id: number;
    img: string;
    artist: string;
    desc: string;
    bg: string;
    count: number;
  };
  votesUsed: number;
  onUpvote: (params: number) => any;
  onDownvote: (params: number) => any;
}

const ArtistSection = ({
  data,
  votesUsed,
  onUpvote,
  onDownvote,
}: ArtistProps) => {
  const [show, setShow] = useState(false);

  const Popup = () => {
    return (
      <>
        <div className={styles.popup}>
          <div className={styles.close}>
            <button onClick={() => setShow(!show)}>Lukk</button>
          </div>
          <div className={styles.info}>
            <div className={styles.image}>
              <img
                src={`/images/${data.img}.png`}
                alt={`Bilde av ${data.artist}`}
              ></img>
            </div>
            <div>
              <h2>Takk for din stemme!</h2>
              {data.count > 0 ? (
                <h3>
                  Du har gitt {data.count} poeng {data.artist}
                </h3>
              ) : (
                ""
              )}

              {votesUsed < 3 ? (
                <>
                  <h4>Du har {votesUsed} av 3 gratis stemmer igjen.</h4>
                  <div className={styles.downVote}>
                    <button onClick={handleDownvote}>Fjern en stemme</button>
                  </div>
                </>
              ) : (
                <>
                  <h4>Du har brukt opp alle stemmene dine</h4>
                  <div className={styles.downVote}>
                    <button onClick={handleDownvote}>Fjern en stemme</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleUpvote = () => {
    setShow(!show);
    onUpvote(data.id);
  };

  const handleDownvote = () => {
    setShow(!show);
    onDownvote(data.id);
  };

  return (
    <>
      <section
        className={styles.artistSection}
        style={{
          backgroundColor: data.bg,
          color: data.bg === "#54A3E5" ? "black" : "white",
        }}
      >
        <div className={styles.flex}>
          <div className={styles.image}>
            <img
              src={`/images/${data.img}.png`}
              alt={`Bilde av ${data.artist}`}
            ></img>
          </div>
          <div className={styles.info}>
            <div className={styles.top}>
              <div>
                <h2>{data.artist}</h2>
                <p>{data.desc}</p>
              </div>
            </div>

            <div className={styles.bottom}>
              <div>
                <h4>Stem frem {data.artist}</h4>
              </div>
              <div className={styles.vote}>
                <button onClick={handleUpvote}>Årets artist</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {show ? <Popup></Popup> : ""}
    </>
  );
};

export default ArtistSection;
