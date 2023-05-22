"use client";

import Image from "next/image";
import styles from "../styles/home.module.scss";
import { useState, useEffect } from "react";
import ArtistSection from "../components/ArtistSection";

interface DataProps {
  id: number;
  img: string;
  artist: string;
  desc: string;
  song: string;
  bg: string;
  count: number;
  genre: string;
}

export default function Home() {
  const [data, setData] = useState<DataProps[]>([]);
  const [votesUsed, setVotesUsed] = useState(0);
  const [selectTag, setSelectTag] = useState("");
  const [votes, setVotes] = useState<DataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/hello");
        const data = await res.json();
        setData(data);
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };

    fetchData();
  }, []);

  const handleUpvote = (itemId: number) => {
    if (votesUsed < 3) {
      const updatedItems = data.map((item) => {
        if (item.id === itemId) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });

      setData(updatedItems);
      setVotesUsed(votesUsed + 1);
    }
  };

  const handleDownvote = (itemId: number) => {
    if (votesUsed < 3) {
      const updatedItems = data.map((item) => {
        if (item.id === itemId) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });

      setData(updatedItems);
      setVotesUsed(votesUsed > 0 ? votesUsed - 1 : 0);
    }
  };

  const showVotes = (itemId: number) => {
    if (votesUsed < 3) {
      const updatedVotes = data.filter((item) => item.id === itemId);
      setVotes([...votes, ...updatedVotes]);
    }
  };

  const tagSelect = (tag: string) => {
    if (selectTag === tag) {
      setSelectTag("");
    } else {
      setSelectTag(tag);
    }
  };

  const tagCheck = selectTag
    ? data.filter((item) => item.genre.includes(selectTag))
    : data;

  return (
    <main className={styles.main}>
      <section className={styles.banner}>
        <div className={styles.intro}>
          <div className={styles.logo}>
            <img src={"/images/nrk_logo.png"} alt="nrk logo"></img>
          </div>
          <h3>{votesUsed} av 3 stemmer</h3>
          <h1>Stem på årets artist 2022</h1>
          <p>
            Frem til <strong>15. november klokken 07.00</strong>
            <br></br> kan du stemme på din favoritt!
          </p>
        </div>
        <div className={styles.images}>
          <div className={styles.ballenciage}>
            <img
              src={"/images/ballenciaga_1.png"}
              alt="Bilde av Ballenciage"
            ></img>
          </div>
          <div className={styles.karpe}>
            <img src={"/images/karpe_1.png"} alt="Bilde av Karpe diem"></img>
          </div>
          <div className={styles.synne_vo}>
            <img src={"/images/synne_vo_1.png"} alt="Bilde av Synne_vo"></img>
          </div>
          <div className={styles.ramon}>
            <img src={"/images/ramón_1.png"} alt="Bilde av Ramon"></img>
          </div>
          <div className={styles.undegrunn}>
            <img
              src={"/images/undergrunn_1.png"}
              alt="Bilde av Undergrunn"
            ></img>
          </div>
        </div>
        <div className={styles.info}>
          <p>
            Selve «P3 Gull» arrangeres 26. november. <br></br> Du kan følge med
            direkte på NRK 1 og NRK TV.
          </p>
        </div>
      </section>
      <section className={styles.tags}>
        <h3>Filtrer kategori</h3>
        <div className={styles.flex}>
          <div>
            <h4>Du har stemt på: </h4>
          </div>
          <div className={styles.flexVotes}>
            {votes.map((item) => (
              <h5 key={item.id}>{item.artist}</h5>
            ))}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={selectTag === "Rap" ? styles.activeTag : styles.tag}>
            <button onClick={() => tagSelect("Rap")}>Rap</button>
          </div>
          <div className={selectTag === "Pop" ? styles.activeTag : styles.tag}>
            <button onClick={() => tagSelect("Pop")}>Pop</button>
          </div>
          <div
            className={
              selectTag === "Dance/Electronic" ? styles.activeTag : styles.tag
            }
          >
            <button onClick={() => tagSelect("Dance/Electronic")}>
              Dance/Electronic
            </button>
          </div>
        </div>
      </section>
      {tagCheck.map((data: DataProps) => (
        <ArtistSection
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          votes={showVotes}
          key={data.id}
          data={data}
          votesUsed={votesUsed}
        ></ArtistSection>
      ))}
    </main>
  );
}
