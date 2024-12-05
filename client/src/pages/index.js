import Head from "next/head";
import styles from "@/styles/HomeScreen.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [isFlashing, setIsFlashing] = useState(false); // Track the flash state

  const playSound = () => {
    const audio = new Audio("/songs/buttonclick.wav"); // Ensure the sound file path is correct
    audio.currentTime = 0; // Reset the sound to start
    audio
      .play()
      .then(() => console.log("Sound played successfully"))
      .catch((error) => console.error("Audio playback failed:", error));
  };

  const handleDoubleFlashEffect = () => {
    // Start the first flash
    setIsFlashing(true);
    setTimeout(() => {
      // End the first flash
      setIsFlashing(false);
      setTimeout(() => {
        // Start the second flash
        setIsFlashing(true);
        setTimeout(() => {
          // End the second flash and navigate to the next route
          setIsFlashing(false);
          router.push("/select");
        }, 200); // Duration of the second flash
      }, 200); // Time between the two flashes
    }, 200); // Duration of the first flash
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        playSound();
        handleDoubleFlashEffect();
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Dance Dance ReVision</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.homeScreen} ${isFlashing ? styles.flash : ""}`}
      >
        <h1 className={styles.title}>Dance Dance ReVision</h1>
        <p className={styles.instruction}>Press Enter to Begin</p>
        <img className={styles.sleepGif} src="/assets/sleepNote.gif" alt="sleeping gif" />
      </div>
    </>
  );
}